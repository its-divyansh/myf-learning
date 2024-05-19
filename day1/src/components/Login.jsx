import { useCallback, useEffect, useState } from "react";
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
import { useNavigate,Link as RouterLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Debounce from "../../modules/Debounce";
import axios from "axios";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [helperText, setHelperText] = useState({email: ""});
  const handleTextError = () => {
    const {email, password} = user;
    const helper = {};
    
    if (email.length === 0) helper.email = "";
    else {
      let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let result = pattern.test(email);
      if (result === false) {
        helper.email = "Invalid Email";
      } else {
        helper.email = "";
      }
    }
    setHelperText(helper);
  };
  const handleHelperText = useCallback( Debounce(handleTextError,1000),[]);
  
  const handleOnChange =(e,name)=>{
    setUser({ ...user, [name]: e.target.value });
    handleHelperText();
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {...user};
    delete data.showPassword;

    axios.post('http://localhost/backend/?type=login',
      {
        ...data
      }
  )
    .then(res=>{localStorage.setItem('token',res.data.token); navigate('/user')})
    .catch (err =>{
      if(err.response.data.status)
       setHelperText({email:err.response.data.message});
      else console.log(err)});
    
  };
  useEffect(()=>{
    if(localStorage.getItem('token')!==null)
     navigate('/user');
  },[])
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={(e)=>handleOnChange(e,"email")}
                error={helperText.email.length > 0}
                helperText={helperText.email}
              />
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={user.showPassword?"text":"password"}
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={(e)=>handleOnChange(e,"password")}
              
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    { user.password.length>0 && <IconButton
                      aria-label="toggle password visibility"
                      onClick={(e)=>handleOnChange(e,"showPassword")}
                      edge="end"
                    >
                      {user.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>}
                  </InputAdornment>
                ),
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled = {user.email.length===0 || user.password.length===0 || helperText.length>0 }
            >
              Sign In
            </Button>
            <Grid container justifyContent={"flex-end"}>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <RouterLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
