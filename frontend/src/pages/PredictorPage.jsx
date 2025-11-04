import React, { useState, useContext } from "react";
import { IconButton, Box, Typography, TextField, Button, Card, CardContent, Snackbar } from "@mui/material";
import MoleculeViewer from "../components/MoleculeViewer";
import { LanguageContext } from "../context/LanguageContext";
import CloseIcon from '@mui/icons-material/Close';
import en from "../locales/en";
import vi from "../locales/vi";
import { useTheme } from "@mui/material/styles";

export default function PredictorPage() {
  const { lang } = useContext(LanguageContext);
  const theme = useTheme();
  const isDarkMode = theme?.palette?.mode === "dark";
  const t = lang === "vi" ? vi : en;

  const [tempReactant, setTempReactant] = useState("");
  const [reactant, setReactant] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      // Placeholder for API callgit
      const query = new URLSearchParams({ reactants: tempReactant }).toString();
      const host = import.meta.env.VITE_BACKEND_HOST || "localhost";
      const port = import.meta.env.VITE_BACKEND_PORT;
      const baseUrl = port ? `http://${host}:${port}` : `https://${host}`;
      const response = await fetch(`${baseUrl}/predict?${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      const data = await response.json();
      console.log("Prediction response:", data.output);
      setReactant(tempReactant);
      setPrediction(data.output);
    } catch (err) {
      console.error(err);
      setPrediction("Error");
    }
    setLoading(false);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleError = (err) => {
    console.error("MoleculeViewer error:", err);
    const msg =
      typeof err === "string"
        ? err
        : err?.message || t?.predict?.viewerError || "Viewer error";
    setSnackbarMessage(msg);
    setSnackbarOpen(true);
    setTempReactant("");
    setReactant("");
    setPrediction("");
    setTimeout(() => setSnackbarOpen(false), 4000);
  };


  const handleClose = (
    event,
    reason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 6,
        px: 3,
      }}
      bgcolor="background.default"
    >
      <Typography
        variant="h4"
        sx={{ mb: 1, fontWeight: "bold", color: "text.primary" }}
      >
        {t?.predict.title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 4,
          color: "text.secondary",
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        {t?.predict.description}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "stretch",
          mb: 4,
        }}
      >
        <TextField
          label={""}
          value={tempReactant}
          onChange={(e) => setTempReactant(e.target.value)}
          variant="outlined"
          sx={{
            width: 400,
            // make the input background and text adapt to theme for good contrast
            backgroundColor: "background.paper",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              color: "text.primary",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            },
            // label color
            "& .MuiInputLabel-root": {
              color: "text.secondary",
            },
          }}
          InputLabelProps={{ shrink: false }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePredict}
          sx={{
            py: 1.2,
            px: 3,
            borderRadius: 1,
            // ensure good contrast for both modes
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          {loading ? t?.predict.loading : t?.predict.button}
        </Button>
      </Box>
      
      {prediction && prediction !== "Error" && (
        <>
        <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start", overflow: "hidden" }}>
          <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <MoleculeViewer smiles={reactant} darkMode={isDarkMode} handleError={handleError} height={500} width={700} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {t?.predict.reactantLabel}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {reactant || "(none)"}
              </Typography>
            </CardContent>
          </Card>


          <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <MoleculeViewer smiles={prediction} darkMode={isDarkMode} handleError={handleError} height={500} width={700} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {t?.predict.resultLabel}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {prediction || "(none)"}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        </>
      )}

      {prediction === "Error" && (
        <Typography color="error" sx={{ mt: 3 }}>
          {t?.predict.error}
        </Typography>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
      />
    </Box>
  );
}
