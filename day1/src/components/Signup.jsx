import { useContext, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Debounce from "../../modules/Debounce";
import UsersContext from "../context/UsersContext";
const defaultTheme = createTheme();

var timer;
export default function SignUp() {
  const navigate = useNavigate();
  const {users, setUsers}= useContext(UsersContext);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const [helperText, setHelperText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleTextError = (user) => {
    console.log("inside validation");
    const { firstName, lastName, email, password, confirmPassword } = user;
    const helper = {};
    if (firstName.length === 0) {
      helper.firstName = "";
    } else {
      let result = [...firstName].every(
        (char) => (char >= "a" && char <= "z") || (char >= "A" && char <= "Z")
      );

      if (!result) {
        console.log("inside firstname");
        helper.firstName = "First name must only contain alphabets";
      } else if (firstName.length < 3) {
        console.log("inside firstname length 3")
        helper.firstName = "First Name must contain atleast 3 characters";
      } else {
        helper.firstName = "";
      }
    }
    if (lastName.length === 0) helper.lastName = "";
    else {
      let result = [...lastName].every(
        (char) => (char >= "a" && char <= "z") || (char >= "A" && char <= "Z")
      );

      if (!result) {
        helper.lastName = "Last Name must only contain alphabets";
      } else if (lastName.length < 3) {
        helper.lastName = "Last Name must contain atleast 3 characters";
      } else {
        helper.lastName = "";
      }
    }
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
    if (password.length === 0) helper.password = "";
    else {
      let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
      let result = pattern.test(password);
      if (password.length < 7 || password.length > 15) {
        helper.password = "Password length must be between 7 to 15";
      } else if (!result) {
        helper.password =
          "Password must contain atleast one numeric and one special character";
      } else helper.password = "";
    }
    helper.confirmPassword = "";
    setHelperText(helper);
  };

  const handleHelperText = Debounce(handleTextError);
  const handleOnChange = (e, name) => {
    switch (name) {
      case "firstName":
        setUser({ ...user, firstName: e.target.value });
        break;
      case "lastName":
        setUser({ ...user, lastName: e.target.value });
        break;
      case "email":
        setUser({ ...user, email: e.target.value });
        break;
      case "password":
        setUser({ ...user, password: e.target.value });
        break;
      case "confirmPassword":
        setUser({ ...user, confirmPassword: e.target.value });
        break;
      case "showPassword":
        setUser({ ...user, showPassword: !user.showPassword });
      default:
        break;
    }
    // console.log("timeout clear");
    clearTimeout(timer);

    timer =setTimeout(()=>{handleTextError({...user, [name]: e.target.value}); console.log("Validated");
  console.log();}, 1000);
    handleHelperText({...user, [name]: e.target.value});
  };

  
  // const timer = setInterval(()=>{handleTextError()},1000)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      setHelperText({
        ...helperText,
        confirmPassword: "Password and Confirm Password doesn't match",
      });
    } else {
      const value=JSON.parse(localStorage.getItem("dev"));
      setUsers(value===null?{}:value);
      if (users[user.email] !== undefined) {
        setHelperText({ ...helperText, email: "Email already exists!" });
      } else {
        // users[user.email] = { firstName: user.firstName,lastName: user.lastName, password:user.password };
        // localStorage.setItem("dev", JSON.stringify(users));
        setUsers({...users, [user.email] :{ firstName: user.firstName,lastName: user.lastName, password:user.password }})
        setUsers ((data)=>{localStorage.setItem("dev",JSON.stringify(data)); return data;});
        navigate("/login");
      }
    }
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
            Sign up
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
                  value={user.firstName}
                  label="First Name"
                  autoFocus
                  onChange={(e) => {
                    handleOnChange(e, "firstName");
                  }}
                  error={helperText.firstName.length > 0}
                  helperText={helperText.firstName}
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
                  value={user.lastName}
                  onChange={(e) => handleOnChange(e, "lastName")}
                  error={helperText.lastName.length > 0}
                  helperText={helperText.lastName}
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
                  onChange={(e) => handleOnChange(e, "email")}
                  error={helperText.email.length > 0}
                  helperText={helperText.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={user.showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={(e) => handleOnChange(e, "password")}
                  error={helperText.password.length > 0}
                  helperText={helperText.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {user.password.length > 0 && (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(e) => handleOnChange(e, "showPassword")}
                            edge="end"
                          >
                            {user.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={user.confirmPassword}
                  onChange={(e) => handleOnChange(e, "confirmPassword")}
                  error={helperText.confirmPassword.length > 0}
                  helperText={helperText.confirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !(
                  user.firstName.length > 0 &&
                  helperText.firstName.length === 0 &&
                  user.lastName.length > 0 &&
                  helperText.lastName.length === 0 &&
                  user.email.length > 0 &&
                  helperText.email.length === 0 &&
                  user.password.length > 0 &&
                  helperText.password.length === 0 &&
                  user.confirmPassword.length > 0 &&
                  helperText.confirmPassword.length === 0
                )
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink to="/login" variant="body2">
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
