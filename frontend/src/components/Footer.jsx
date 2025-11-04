import { Box, Container, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

  console.log(theme);
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        py: { xs: 4, md: 5 },
        bgcolor: theme.palette.mode === "dark" ? theme.palette.background.paper : theme.palette.primary.main,
        color: '#ffffff !important',
      })}
    >
      <Container maxWidth="lg">
        {/* 🔹 Title */}
        <Typography
          variant="h6"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ letterSpacing: 0.3, color: "primary.contrastText" }}
        >
          ĐỀ TÀI: NGHIÊN CỨU, HUẤN LUYỆN AI PHỤC VỤ MÔ HÌNH DỰ BÁO PHẢN ỨNG HÓA HỌC HỮU CƠ
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* 🔹 Information Grid */}
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          {/* Left column */}
          <Box flexGrow={1}>
            <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: "primary.contrastText" }}>
              Thông tin học sinh
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
              <Typography variant="body2" color="primary.contrastText">Họ và tên Học sinh 1: </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ ml: 1, color: "primary.contrastText" }}>Nguyễn Hoàng Vĩnh Khang</Typography>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
              <Typography variant="body2" color="primary.contrastText">Họ và tên Học sinh 2: </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ ml: 1, color: "primary.contrastText" }}>Nguyễn Ngọc Thủy Tiên</Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={1} alignItems="flex-end" mt={2}>
              <Typography variant="body2" sx={{ mt: 1, color: "primary.contrastText" }}>
                Lĩnh vực: 
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
                Trí tuệ nhân tạo
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
                Hóa học
              </Box>
            </Box>
          </Box>

          {/* Right column */}
          <Box flexGrow={1}>
            <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: "primary.contrastText" }}>
              Thông tin giáo viên hướng dẫn:
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
              <Typography variant="body2" color="primary.contrastText">Họ và tên: </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ ml: 1, color: "primary.contrastText" }}>CN. Võ Minh Thiên Long</Typography>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
              <Typography variant="body2" color="primary.contrastText">Đơn vị công tác: </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ ml: 1, color: "primary.contrastText" }}>Viện Công nghệ Thông tin &amp; Truyền thông, Học viện Kỹ thuật Quân sự</Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 🔹 Footer note */}
        <Typography
          variant="caption"
          display="block"
          align="center"
          sx={{ mt: 1, opacity: 0.85, color: "primary.contrastText" }}
        >
          © {currentYear} Viện Công nghệ Thông tin &amp; Truyền thông - Học viện Kỹ thuật Quân sự
        </Typography>
      </Container>
    </Box>
  );
}
