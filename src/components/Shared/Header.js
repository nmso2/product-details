import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { deepPurple } from "@mui/material/colors";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Link } from "@mui/material";
import { useState } from "react";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const [cart, setCart] = useState({});
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // #f8ebf2
    <AppBar position="sticky" sx={{ background: "#f1f1f1", color: "#000000" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={"/"} underline="none">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              LOGO
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href={"/shop"} underline="none">
                  <Typography textAlign="center">Shop</Typography>
                </Link>
              </MenuItem>
              <Link href={"/pricing"} underline="none">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Pricing</Typography>
                </MenuItem>
              </Link>
              <Link href={"/blog"} underline="none">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Blog</Typography>
                </MenuItem>
              </Link>
              <Link href={"/dashboard"} underline="none">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Link href={"/"} underline="none">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              LOGO
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link href={"/shop"} underline="none">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#000000", display: "block" }}
              >
                Shop
              </Button>
            </Link>

            <Link href={"/pricing"} underline="none">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#000000", display: "block" }}
              >
                Pricing
              </Button>
            </Link>
            <Link href={"/blog"} underline="none">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#000000", display: "block" }}
              >
                Blog
              </Button>
            </Link>
            <Link href={"/dashboard"} underline="none">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#000000", display: "block" }}
              >
                Dashboard
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Added Products">
              <Badge badgeContent={Object.keys(cart).length} color="secondary">
                <IconButton sx={{ p: 0 }}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ ml: { md: 2 } }}>
                <Avatar
                  sx={{ bgcolor: deepPurple[100] }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
