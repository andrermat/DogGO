import { loginRequest, registerRequest} from "../../Services/httpRequests";
import { Fragment, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


//out of rendering cycle - functions to verify input
const isEmail = (value: string) => value.trim().match("^(.+)@(.+)$");
//mudar
const isPassword = (value: string) => value.trim().length > 4;
const isName = (value: string) => value.trim().length > 0;
const isNumber = (value:number) => value > 0;

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
  firstNameIsValid:boolean,
  lastNameIsValid:boolean,
  phoneNumberIsValid:boolean,
  firstName:string,
  lastName:string,
  phoneNumber:number,
  email:string,
  password:string
}

const Register = () => {
  let navigate = useNavigate();

  const [error, setError] = useState<String>("");
  const [emailHasError, setEmailHasError] = useState<boolean>(false);
  const [passwordHasError, setPasswordHasError] = useState<boolean>(false);
  const [firstNameHasError, setFirstNameHasError] = useState<boolean>(false);
  const [lastNameHasError, setLastNameHasError] = useState<boolean>(false);
  const [phoneNumberHasError, setPhoneNumberHasError] = useState<boolean>(false)
  const [input, setInput] = useState<inputHandler>({
    emailIsValid:false,
    passwordIsValid:false,
    firstNameIsValid:false,
    lastNameIsValid:false,
    phoneNumberIsValid:false,
    firstName: "",
    lastName:"",
    email:"",
    password:"",
    phoneNumber:0
  });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

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
    if(isNumber(input.phoneNumber)){
      setInput(input => (input.phoneNumberIsValid = true, input));
      setPhoneNumberHasError(false)}
      else{
       setInput(input => (input.phoneNumberIsValid = false, input));
       setPhoneNumberHasError(true)
     }
  }, [input.email])
  useEffect(()=>{
    if(isName(input.firstName)){
      setInput({... input,firstNameIsValid:true});
      setFirstNameHasError(false)}
      else{
       setInput(input => (input.firstNameIsValid = false, input));
       setFirstNameHasError(true)
     }
  }, [input.firstName])
  useEffect(()=>{
    if(isName(input.lastName)){
      setInput(input => (input.lastNameIsValid = true, input));
      setLastNameHasError(false)}
      else{
       setInput(input => (input.lastNameIsValid = false, input));
       setLastNameHasError(true)
     }
  }, [input.lastName])

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
    if (input.emailIsValid && input.passwordIsValid && input.firstNameIsValid && input.lastNameIsValid && input.phoneNumberIsValid) {
      setFormIsValid(true);
  }
  else
    setFormIsValid(false);
  }, [input.emailIsValid, input.passwordIsValid, input.firstNameIsValid, input.lastNameIsValid, input.phoneNumber])


  const emailChangeHandler = (event: any) => {
    setInput({... input, email:event.target.value});
   }
  const passwordChangeHandler = (event: any) => {
    setInput({... input, password:event.target.value});
  }
  const firstNameChangeHandler = (event: any) => {
    setInput({... input, firstName:event.target.value});
  }
  const lastNameChangeHandler = (event: any) => {
    setInput({... input, lastName:event.target.value});
  }

  const phoneNumberChangeHandler = (event: any) => {
    setInput({... input, phoneNumber:event.target.value});
  }


const formSubmissionHandler = (event: any) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    setError("");

    registerRequest(input.email, input.password, input.firstName,
       input.lastName, input.phoneNumber).then(
      (response: any) => {
        navigate("/")
      },
      (error: any) => {
        if (error.status === 409) {
          setError("Esta conta já está associada a outra conta");
        }  else {
          setError("Algo inesperado aconteceu, tente novamente");
        }
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
              <BorderColorIcon />
            </Avatar>
            <Typography style = {{fontFamily: "'Poppins', sans-serif", fontWeight: "bold"}} component="h1" variant="h3">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={formSubmissionHandler} style={{width:"85%"}} sx={{ mt: 10}}>
              <label style = {{fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "bold"}}>First Name*</label>
              {firstNameHasError && (
                  <p style = {{fontFamily: "'Poppins', sans-serif", fontSize: "14px"}}>
                    Please insert your first name.
                  </p>
              )}
              <div  style = {{ marginBottom: "5%"}}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  onChange={firstNameChangeHandler}
                />
              </div>
              <label style = {{fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "bold"}}>Last Name*</label>
              {lastNameHasError && (
                  <p style = {{fontFamily: "'Poppins', sans-serif", fontSize: "14px"}}>
                    Please insert your last name.
                  </p>
              )}
              <div style = {{ marginBottom: "5%"}}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                  onChange={lastNameChangeHandler}
                />
              </div>
            
              <label style = {{fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "bold"}}>Phone Number</label>
              <div  style = {{ marginBottom: "5%"}}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  autoFocus
                  required
                  onChange={phoneNumberChangeHandler}
                />
              </div>
              <label style = {{fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "bold"}}>E-Mail*</label>
              {emailHasError && (
                <p style = {{fontFamily: "'Poppins', sans-serif",fontSize: "14px"}}>
                  Please insert a valid email.
                </p>
              )}
              <div  style = {{ marginBottom: "5%"}}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  onChange={emailChangeHandler}
                />
              </div>
              <label style = {{fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "bold"}}>Password*</label>
              {passwordHasError && (
                <p style = {{fontFamily: "'Poppins', sans-serif",fontSize: "14px"}}>
                  Password must contain at least 5 characters.
                </p>
              )}
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
                sx={{ mt: 3, mb: 2, fontFamily: "'Poppins', sans-serif",fontSize: "14px"}}
                disabled={!formIsValid}
              >
                Sign Up
              </Button>
              {error !== "" && (
              <p >
                {error}
              </p>
              )}
              
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-playing-with-stick-on-a-flower-royalty-free-image-1595490411.jpg)',
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

export default Register;