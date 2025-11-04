import { useEffect, useRef, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

export default function MoleculeViewer({ smiles, darkMode, handleError, height, width }) {
  const viewerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rdkitReady, setRdkitReady] = useState(false);

  // ✅ Initialize RDKit once globally
  useEffect(() => {
    async function init() {
      try {
        if (!window.initRDKitModule) {
          console.error('RDKit script not found. Check index.html script URL.');
          setError('RDKit.js script missing');
          return;
        }
        if (!window.RDKit) {
          const RDKitModule = await window.initRDKitModule();
          window.RDKit = RDKitModule;
          console.log('✅ RDKit.js initialized');
        }
        setRdkitReady(true);
      } catch (e) {
        console.error('RDKit init failed:', e);
        setError('Failed to initialize RDKit.js');
        handleError && handleError(e);
      }
    }
    init();
  }, []);

  // ✅ Render molecule when RDKit ready
  useEffect(() => {
    if (!smiles || !rdkitReady) return;

    async function renderMol() {
      setLoading(true);
      setError('');

      try {
        const RDKit = window.RDKit;
        const mol = RDKit.get_mol(smiles);
        if (!mol) throw new Error('Invalid SMILES');

        mol.add_hs(); // ensure hydrogens are added
        const molBlock = mol.get_molblock();
        mol.delete();

        if (!window.$3Dmol) {
          setError('3Dmol.js not loaded');
          setLoading(false);
          return;
        }

        // Create viewer
        viewerRef.current.innerHTML = '';
        viewerRef.current.style.borderRadius = '4px';
        viewerRef.current.style.overflow = 'hidden';
        const viewer = window.$3Dmol.createViewer(viewerRef.current, {
          backgroundColor: darkMode ? '#282E39' : '#e3f2fd',
        });

        const model = viewer.addModel(molBlock, 'mol');
        model.setStyle({}, { stick: { radius: 0.15 }, sphere: { scale: 0.25 } });

        // ✅ Proper centering, zooming, and orientation
        viewer.zoomTo();
        viewer.center();
        viewer.render();
        viewer.zoom(1.1, 1000); // smooth zoom animation

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to visualize molecule');
        handleError && handleError(err);
        setLoading(false);
      }
    }

    renderMol();
  }, [smiles, darkMode, rdkitReady]);

  return (
    <Box
      ref={viewerRef}
      sx={{
        borderRadius: 4,
        mx: 0,
        position: 'relative',
        height: height ? height : '100%',
        width: width ? width : '100%',
      }}
    >
      {loading && (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      {error && (
        <Typography
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'red',
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
