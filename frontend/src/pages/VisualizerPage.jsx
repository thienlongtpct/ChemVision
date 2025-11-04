import React, { useState, useContext } from "react";
import { IconButton, Box, Typography, TextField, Button, Card, CardContent, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MoleculeViewer from "../components/MoleculeViewer";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import vi from "../locales/vi";
import { useTheme } from "@mui/material/styles";

export default function VisualizerPage() {
  const { lang } = useContext(LanguageContext);
  const theme = useTheme();
  const isDarkMode = theme?.palette?.mode === "dark";
  const t = lang === "vi" ? vi : en;

  const [tempSmiles, setTempSmiles] = useState(""); // default ethanol
  const [smiles, setSmiles] = useState(""); // default ethanol
  const [submitted, setSubmitted] = useState(true);

  const handleVisualize = () => {
    setSmiles(tempSmiles);
    setSubmitted(true);
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
    setTempSmiles("");
    setSmiles("");
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
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
      bgcolor="background.default"
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "text.primary" }}
        mb={2}
      >
        {t?.visualize.title}
      </Typography>

      <Box
        display="flex"
        flexDirection="row"
        gap={2}
        alignItems="stretch"
        mb={4}
      >
        <TextField
          label={""}
          value={tempSmiles}
          onChange={(e) => setTempSmiles(e.target.value)}
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
          onClick={handleVisualize}
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
          {t?.visualize.button}
        </Button>
      </Box>

      {submitted && smiles && (
        <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MoleculeViewer
            smiles={smiles}
            darkMode={isDarkMode}
            handleError={handleError}
            height={250} 
            width={800}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {t?.visualize.label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {smiles || "(none)"}
            </Typography>
          </CardContent>
        </Card>
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
