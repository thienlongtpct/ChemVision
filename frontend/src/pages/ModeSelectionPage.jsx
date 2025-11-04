import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext.jsx";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScienceIcon from "@mui/icons-material/Science";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import en from "../locales/en";
import vi from "../locales/vi";

export default function ModeSelectionPage() {
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const t = lang === "vi" ? vi : en;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        p: 2,
      }}
      flexGrow={1}
      bgcolor="background.default"
    >
      <Paper
        elevation={8}
        sx={{
          borderRadius: 4,
          p: 5,
          textAlign: "center",
          width: "90%",
          maxWidth: 800,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 2,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {t?.modeSelection.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 4,
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          {t?.modeSelection.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ScienceIcon />}
            sx={{
              width: 300,
              height: 60,
              borderRadius: 3,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
            onClick={() => navigate("/visualize")}
          >
            {t?.modeSelection.visualizeButton}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<ShowChartIcon />}
            sx={{
              width: 300,
              height: 60,
              borderRadius: 3,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
            onClick={() => navigate("/predict")}
          >
            {t?.modeSelection.predictButton}
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 4,
            color: "text.disabled",
            fontSize: "0.9rem",
          }}
        >
          {t?.modeSelection.footer}
        </Typography>
      </Paper>
    </Box>
  );
}
