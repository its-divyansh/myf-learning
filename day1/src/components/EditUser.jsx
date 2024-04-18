import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const EditUser = ({user,edit}) => {
    const [firstName, setFirstName] =useState(user.firstName);
    const [firstNameHelperText, setFirstNameHelperText] =useState('');
    const [lastName, setLastName] =useState(user.lastName);
    const [lastNameHelperText, setLastNameHelperText] =useState('');
    const [password,setPassword] = useState(user.password);
    const [passwordHelperText,setPasswordHelperText] = useState('');
   
    const navigate = useNavigate();
    
  const handleFirstNameChange =(e)=>{
    setFirstName(e.target.value);
    const result = [...(e.target.value)]
          .every(char => (char >= 'a' && char <= 'z') 
                      || (char >= 'A' && char <= 'Z'));
  
    if(!result){
      setFirstNameHelperText("First Name must only contain alphabets")
    }
    else if(e.target.value.length<3){
      setFirstNameHelperText('First Name must contain atleast 3 characters')
    }
    else {
      setFirstNameHelperText('');
    }
  }
  const handleLastNameChange =(e)=>{
    setLastName(e.target.value);
    const result = [...(e.target.value)]
          .every(char => (char >= 'a' && char <= 'z') 
                      || (char >= 'A' && char <= 'Z'));
  
    if(!result){
      setLastNameHelperText("Last Name must only contain alphabets")
    }
    else if(e.target.value.length<3){
      setLastNameHelperText('Last Name must contain atleast 3 characters')
    }
    else {
      setLastNameHelperText('');
    }
  }
  
  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
    const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    const result = pattern.test(e.target.value);
    if(e.target.value.length<7 || e.target.value.length>15){
      setPasswordHelperText("Password length must be between 7 to 15");
    }
    else if(!result){
      setPasswordHelperText("Password must contain atleast one numeric and one special character")
    }
    else setPasswordHelperText('');
  }
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
           
        const new_user ={firstName,lastName,password,email:user.email};
        edit(new_user);
      
    };
   
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit Details
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    value={firstName}
                    label="First Name"
                    autoFocus
                    onChange={handleFirstNameChange}
                    error = {firstNameHelperText.length>0}
                    helperText = {firstNameHelperText}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    error = {lastNameHelperText.length>0}
                    helperText = {lastNameHelperText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={user.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value ={password}
                    onChange={handlePasswordChange}
                    error={passwordHelperText.length>0}
                    helperText = {passwordHelperText}
                  />
                </Grid>
                
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled = {!(firstName.length>0 && firstNameHelperText.length ===0 
                           && lastName.length>0 && lastNameHelperText.length ===0 
                          && password.length>0 && passwordHelperText.length===0 )}
              >
                Update Details
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}

export default EditUser