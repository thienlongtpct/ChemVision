import { Outlet } from "react-router-dom";
import { ThemeProviderWrapper } from "./context/ThemeProvider.jsx";
import { LanguageProvider } from "./context/LanguageProvider.jsx";
import { Box } from "@mui/material";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <ThemeProviderWrapper>
      <LanguageProvider>
        <Box display="flex" flexDirection="column" minHeight="100vh" justifyContent="space-between">
          <NavBar />
          <Outlet />
          <Footer />
        </Box>
      </LanguageProvider>
    </ThemeProviderWrapper>
  );
}
