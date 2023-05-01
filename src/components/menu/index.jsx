import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Icon from "@mui/material/Icon";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import {MENU} from "../../services/constantes";

export default function Menu() {
  const [open, setOpen] = useState(false);

  const menuAbierto = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={menuAbierto}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Propiedades Ultramar - RRHH
          </Typography>
        </Toolbar>
        <Drawer anchor="left" open={open} onClose={menuAbierto}>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton onClick={menuAbierto}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {
              MENU.map((item) => {
                return (
                  <ListItemButton key={item.id} component={Link} to={item.path}>
                  <ListItemIcon>
                    <Icon>{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
                )
              })
            }
          </List>
        </Drawer>
      </AppBar>
    </>
  );
}
