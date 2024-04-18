import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button_component from "./Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import EditUser from './EditUser.jsx'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const User = () => {

  
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [rows, setRows] = useState([]);
  const [user, setUser]= useState({firstName:"d", lastName:"d"});
  const [edit, setEdit] = useState(false);
  let users=[];
  let email1 ="fdjfd";
  const [curr_edit, setCurr_edit] = useState({});
  
  
  

  const handleLogoutClick = () => {
    navigate("/login");
  };

  const handleEditClick = ( curr_user) => {
     setCurr_edit(curr_user);
     setEdit(true);
  };
  const editDone = (editedUser)=>{
    console.log(typeof editedUser.email);
    const arr = users.filter((data) => data.email!==editedUser.email);
    console.log(arr);
    arr.push(editedUser);
    console.log(arr);
    localStorage.setItem('dev',JSON.stringify(arr));
    setRows(arr);
    setEdit(false);
  }
  const handleDeleteClick = (id) => {

    console.log(arr);
    //why outer variable is not used?
    const arr = rows.filter((data) =>  data.email !== id); 
    users = arr;   
    const arr_string = JSON.stringify(arr);

    if (id === email) {
      localStorage.setItem("dev", arr_string);
      navigate("/login");
    } 
    else {
      setRows(arr);
      localStorage.setItem("dev", arr_string);
    }
  };



  useEffect(()=>{
    // why state is prioritized
    let curr_email;
    if (location.state === null) {
      navigate('/login');
    }
    else curr_email = location.state.email;
    setEmail(curr_email);
    users = JSON.parse(localStorage.getItem("dev"));
    const curr_user = users.filter((data) => data.email === curr_email);
    setUser(curr_user[0]);

    const rows_array = users.filter((data) => curr_email === "admin@gmail.com" || curr_email === data.email);
    setRows(rows_array);
  },[]);


  return (
    <>
      
          <Grid container justifyContent={"space-between"} sx={{mb:"20px"}}>
            <Grid item>
              <Typography variant="h3">
                Hello {user.firstName + " " + user.lastName + "  "}
              </Typography>
            </Grid>
            <Grid item sx={{mt:"5px"}}>
              <Button_component name="logout" onclick={handleLogoutClick} />
            </Grid>
          </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Password</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.email}>
                <StyledTableCell component="th" scope="row">
                  {row.firstName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.lastName}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.password}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button_component
                    name="edit"
                    onclick={() => handleEditClick(row)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button_component
                    name="delete"
                    onclick={() => handleDeleteClick(row.email)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     { edit && <Grid container>
        <EditUser user={curr_edit} edit ={editDone}/>
      </Grid>}
    </>
  );
};

export default User;
