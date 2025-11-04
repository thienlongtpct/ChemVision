import { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import PreviewIcon from "@mui/icons-material/Preview";
import ScienceIcon from "@mui/icons-material/Science";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import en from "../locales/en";
import vi from "../locales/vi";

export default function NavBar() {
  const { mode, toggleMode } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const t = lang === "vi" ? vi : en;

  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const pageTitle =
    path === "/"
      ? t.navbar.home
      : path.startsWith("/visualize")
      ? t.navbar.visualize
      : path.startsWith("/predict")
      ? t.navbar.predict
      : "";

  const handleNavigate = (to) => {
    navigate(to);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* 🔹 AppBar */}
      <AppBar
        position="static"
        color="primary"
        elevation={4}
        sx={{ backdropFilter: "blur(6px)" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* 🔹 Left: Menu icon */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* 🔹 Center: Page Title */}
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {pageTitle}
          </Typography>

          {/* 🔹 Right: Language & Theme */}
          <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
            <Select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              size="small"
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
                fontWeight: 500,
              }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="vi">Tiếng Việt</MenuItem>
            </Select>

            <IconButton onClick={toggleMode} color="inherit">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔹 Drawer Menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 400, p: 1 }} role="presentation">
          <List>
            <ListItem key={"/"}>
              <ListItemButton
                selected={path === "/"}
                onClick={() => handleNavigate("/")}
              >
                {/* Added icon */}
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <HomeIcon />
                </Box>

                <ListItemText
                  primary={t?.navbar.home}
                  primaryTypographyProps={{
                    fontWeight: path.startsWith("/") ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ m: 2 }} />

            <ListItem>
              <Box sx={{ px: 2, pb: 1 }}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 700 }}>
                  {t?.navbar.function}
                </Typography>
              </Box>
            </ListItem>

            <ListItem key={"/visualize"}>
              <ListItemButton
                selected={path === "/visualize" || path.startsWith("/visualize")}
                onClick={() => handleNavigate("/visualize")}
              >
                {/* Added icon */}
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <PreviewIcon />
                </Box>

                <ListItemText
                  primary={t?.navbar.visualize}
                  primaryTypographyProps={{
                    fontWeight: path.startsWith("/visualize") ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem key={"/predict"}>
              <ListItemButton
                selected={path === "/predict" || path.startsWith("/predict")}
                onClick={() => handleNavigate("/predict")}
              >
                {/* Added icon */}
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <ScienceIcon />
                </Box>

                <ListItemText
                  primary={t?.navbar.predict}
                  primaryTypographyProps={{
                    fontWeight: path.startsWith("/predict") ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
