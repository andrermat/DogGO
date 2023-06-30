import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "./dogGO.png";
import { useState } from "react";
import { root } from "../../store/store";
import { changeIdiom, logout } from "../../store/slices";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import profile from "./profilePic.jpg";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#FFFFFF',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#000',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    info: {
      main: '#68D0D0',
    },
    success: {
      main: '#343F4B',
    }
  }
});

const NavBar = () => {
  const [disabledButton, setDisabledButton] = useState(false);

  const currentStore = useSelector(root);
  let code = currentStore.idiom.code;
  let navigate = useNavigate();

  const dispatch = useDispatch()

  const logoutHandler = () => {
    setDisabledButton(true);
    setTimeout(() => {
      setDisabledButton(() => false);
    }, 2000);
    if (!disabledButton) {
      dispatch(logout())
      localStorage.removeItem("token");
      navigate("/");
    }
  }
    ;
  const changedIdiom = () => {
    if (code === "pt")
      dispatch(changeIdiom(require("../../assets/idioms/en.json")))
    else
      dispatch(changeIdiom(require("../../assets/idioms/pt.json")))
  }

  const image = {
    width: "100%",
    height: "40%",
  }

  const language = {
    flexGrow: 1, color: "#343F4B", fontFamily: "'Poppins', sans-serif"
  }

  const middle = {
    textDecoration: "none", color: "#343F4B", marginTop: "0.13cm", marginLeft: "auto", marginRight: "auto", fontSize: "22px"
  }

  const middleContent = {
    fontSize: "22px",
    fontFamily: "'Poppins', sans-serif",
    '&:hover': {
      textDecoration: "underline",
      opacity: [0.6, 0.6, 0.6],
      transition: "0.3s",
    },
    color: "#343F4B"
  }

  const rightContent = {
    flexGrow: 1,
    color: "#343F4B",
    fontFamily: "'Poppins', sans-serif",
    '&:hover': {
      opacity: [0.6, 0.6, 0.6],
      transition: "0.3s",
    },
  }

  const rightContentOff = {
    fontSize: "14px",
    color: "#343F4B",
    fontFamily: "'Poppins', sans-serif",
    '&:hover': {
      opacity: [0.6, 0.6, 0.6],
      transition: "0.3s",
    },
    width: "100%",
    marginLeft: "0.5cm"
  }

  const logoutIcon = {
    '&:hover': {
      color: "#343F4B",
      opacity: [0.6, 0.6, 0.6],
      transition: "0.3s",
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static" color="primary" style={{ flexGrow: 1 }}>
          <Toolbar>

            <div style={{ width: "25%" }}>
              <Link to="/">
                <img src={logo} alt="juntos" style={image}></img>
              </Link>
            </div>

            <div style={{ display: "flex", width: "50%", marginTop: "10px" }}>
              <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                <LanguageIcon color="info" style={{ marginTop: "0.3cm" }} />

                <Button color="secondary" onClick={changedIdiom} style={{ marginBottom: "0.4cm" }}>
                  <Typography variant="h6" component="div" sx={middleContent}>
                    EN
                  </Typography>
                  <Typography variant="h6" component="div" sx={language}>
                    |
                  </Typography>
                  <Typography variant="h6" component="div" sx={middleContent}>
                    PT
                  </Typography>
                </Button>
              </div>

              <Link to="/home#herois" style={middle}>
                <Typography variant="h6" component="div" sx={middleContent}>
                  Our community
                </Typography>
              </Link>

              <Link to="/home#parceiros" style={middle}>
                <Typography variant="h6" component="div" sx={middleContent}>
                  About us
                </Typography>
              </Link>

            </div>

            {!currentStore.session.isLogged && (

              <div style={{ display: "flex", width: "25%"}}>

                <Link to="/login" style={{ textDecoration: "none", marginLeft: "auto" }}>
                  <Typography variant="h6" component="div" sx={rightContent}>
                    Login
                  </Typography>
                </Link>

                <Typography variant="h6" component="div" sx={{ color: "#343F4B", fontFamily: "'Poppins', sans-serif" }}>
                  |
                </Typography>

                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography variant="h6" component="div" sx={rightContent}>
                    Register
                  </Typography>
                </Link>

              </div>
            )}

            {currentStore.session.isLogged && (
              <div style={{ display: "flex", width: "25%" }}>
                <div style={{ display: "flex", marginLeft:"15%"}}>

                  <Avatar alt="happy person" src={profile} sx={{ width: 48, height: 48, }} />

                  <div style={{}}>
                    <Link to="/myservices" style={{ textDecoration: "none" }}>
                      <Typography variant="h6" component="div" sx={rightContentOff}>
                        My services
                      </Typography>
                    </Link>

                    <Link to="/servicehistory" style={{ textDecoration: "none" }}>
                      <Typography variant="h6" component="div" sx={rightContentOff}>
                        Used Services History
                      </Typography>
                    </Link>
                  </div>
                </div>

                <div style={{ marginBottom: "auto", marginLeft: "auto", marginTop: "auto" }}>
                  <LogoutIcon color="info" sx={logoutIcon}
                    onClick={logoutHandler}
                  />
                </div>

              </div>
            )}

          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};
export default NavBar;