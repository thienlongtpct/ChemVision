import { useContext } from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LanguageContext } from "../context/LanguageContext"; // adjust path to your project

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const { t } = useContext(LanguageContext) || {};

  return (
    <Box
      component="footer"
      sx={() => ({
        py: { xs: 2, md: 4 },
        bgcolor: theme.palette.mode === "dark" ? theme.palette.background.paper : theme.palette.primary.main,
        color: "#ffffff !important",
      })}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h6"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ letterSpacing: 0.3, color: "primary.contrastText" }}
        >
          {t("footer.title")}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Information Grid */}
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          {/* Left column */}
          <Box flexGrow={1}>
            <Typography variant="body1" fontWeight={800} gutterBottom sx={{ color: "primary.contrastText" }}>
              {t("footer.studentInfoTitle")}
            </Typography>

            <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
              <Typography variant="body2" color="primary.contrastText">
                {t("footer.student1Label")}
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ ml: 1, color: "primary.contrastText" }}>
                Nguyễn Hoàng Vĩnh Khang
              </Typography>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
              <Typography variant="body2" color="primary.contrastText">
                {t("footer.student2Label")}
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ ml: 1, color: "primary.contrastText" }}>
                Nguyễn Ngọc Thủy Tiên
              </Typography>
            </Box>

            <Box display="flex" flexWrap="wrap" gap={1} alignItems="flex-end" mt={1}>
              <Typography variant="body2" sx={{ color: "primary.contrastText" }}>
                {t("footer.fieldLabel")}
              </Typography>

              <Box
                component="span"
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: "rgba(255,255,255,0.30)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {t("footer.field.ai")}
              </Box>

              <Box
                component="span"
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: "rgba(255,255,255,0.30)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {t("footer.field.chemistry")}
              </Box>
            </Box>
          </Box>

          {/* Right column */}
          <Box flexGrow={1}>
            <Typography variant="body1" fontWeight={800} gutterBottom sx={{ color: "primary.contrastText" }}>
              {t("footer.supervisorTitle")}
            </Typography>

            <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
              <Typography variant="body2" color="primary.contrastText">
                {t("footer.supervisorNameLabel")}
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ ml: 1, color: "primary.contrastText" }}>
                Võ Minh Thiên Long
              </Typography>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
              <Typography variant="body2" color="primary.contrastText">
                {t("footer.supervisorUnitLabel")}
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ ml: 1, color: "primary.contrastText" }}>
                {t("footer.supervisorUnit")}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Footer note */}
        <Typography
          variant="caption"
          display="block"
          align="center"
          sx={{ mt: 1, opacity: 0.85, color: "primary.contrastText" }}
        >
          {t(
            "footer.copyright",
            `© ${currentYear} Viện Công nghệ Thông tin & Truyền thông - Học viện Kỹ thuật Quân sự`
          )}
        </Typography>
      </Container>
    </Box>
  );
}
