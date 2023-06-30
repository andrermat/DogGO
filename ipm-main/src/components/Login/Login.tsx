import { loginRequest} from "../../Services/httpRequests";
import { Fragment, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/slices";

import { useNavigate } from "react-router-dom";



import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { sessionSelector } from "../../store/store";



//out of rendering cycle - functions to verify input
const isEmail = (value: string) => value.trim().match("^(.+)@(.+)$");
const isPassword = (value: string) => value.trim().length > 0;

const theme = createTheme({
  palette: {
    info: {
      // light: will be calculated from palette.primary.main,
      main: '#68D0D0',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
  }
});

interface inputHandler{
  emailIsValid:boolean,
  passwordIsValid:boolean,
  email:string,
  password:string
}

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<String>("");
  const [emailHasError, setEmailHasError] = useState<boolean>(false);
  const [passwordHasError, setPasswordHasError] = useState<boolean>(false);
  const [input, setInput] = useState<inputHandler>({
    emailIsValid:false,
    passwordIsValid:false,
    email:"",
    password:""
  });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const session = useSelector(sessionSelector)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isEmail(input.email)){
      setInput(input => (input.emailIsValid = true, input));
      setEmailHasError(false)}
      else{
       setInput(input => (input.emailIsValid = false, input));
       setEmailHasError(true)
     }
  }, [input.email])

  useEffect(()=>{
    if(isPassword(input.password)){
      setInput({... input, passwordIsValid:true});
      setPasswordHasError(false)
      }
    else{
        setInput({... input, passwordIsValid:false});
        setPasswordHasError(true)
    }
  }, [input.password])

  useEffect(()=>{
    if (input.emailIsValid && input.passwordIsValid) {
      setFormIsValid(true);
  }
  else
    setFormIsValid(false);
  }, [input.passwordIsValid, input.emailIsValid])

  const emailChangeHandler = (event: any) => {
   setInput({... input, email:event.target.value});
  }
  const passwordChangeHandler = (event: any) => {
    setInput({... input, password:event.target.value});
  }

const formSubmissionHandler = (event: any) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    setError("");

    loginRequest(input.email, input.password).then(
      (response: any) => {
        const token = response.headers.authorization;
        const parsedToken:any = jwt_decode(token);
         dispatch(login({
            isLogged: true,
            token: token,
            email: parsedToken.email,
            profileImg: parsedToken.profileImg
          }))

        localStorage.setItem("token", token);
        navigate("/")
      },
      (error: any) => {
       
          setError("Algo Inesperado aconteceu, tente novamente");
        
       }
    );
  };
  

  return (

    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              mt: "20%",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography style = {{fontFamily: "'Poppins', sans-serif"}} component="h1" variant="h3">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={formSubmissionHandler} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={emailChangeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={passwordChangeHandler}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontFamily: "'Poppins', sans-serif"}}
                disabled={!formIsValid}
              >
                Log In
              </Button>
              {error !== "" && (
              <p >
                {error}
              </p>
              )}
              <Grid container>
                <Grid item xs sx= {{mr: 3}}>
                  <Link to="/recuperatePassword" style={{fontFamily: "'Poppins', sans-serif", textDecoration: "underline", color: "black"}}>
                    Forgot your password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" style={{fontFamily: "'Poppins', sans-serif", textDecoration: "underline", color: "black"}}>
                    {"Don't have an account?  Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/good-dog-owner-1607958527.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default Login;