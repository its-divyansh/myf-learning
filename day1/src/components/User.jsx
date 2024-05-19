import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Dialogbox from "./Dialogbox";
// import NewsCategory from "./NewsCategory";
import Navbar from "./Navbar.jsx";
// import EditUser from "./EditUser.jsx";
import NewsPage from "./NewsPage.jsx";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import axios from "axios";
// const api_key= process.env.REACT_APP_API_KEY;



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

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];
let country='in', pageSize= 12;
const User = () => {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(0);
  // const [users, setUsers] = useState({});
  const [rows, setRows] = useState([]);
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [delId, setDelId] = useState("");
  const [id, setId] = useState(localStorage.getItem("token"));
  const [toggle, setToggle] = useState(false);
  // const [news, setNews] = useState({});
  const [currCategory, setCategory] = useState("general");

  const params = useParams();
  // console.log(params);
  let {category, pageNumber} = params;
  if(!category)category = "general";
  if(!pageNumber) pageNumber  = 1;
  // pageNumber = pageNumber?pageNumber:1;

  // console.log(useParams());
  const handleClick = async (e, category) => {
    
    if(category !== currCategory){
      setCategory(category);
      const url = `https://newsapi.org/v2/everything?apikey=${api_key}&category=${category}&size=10&language=en`;
      console.log(url);
      let result = await fetch(url);
      result= await result.json();
      if (result) setNews(result);
      else {
        console.log("some error", result);
      }
    }
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditClick = (curr_user) => {
    navigate("/user/editUser", { state: { user: curr_user, email: id } });
  };
  const handleAddUser = () => {
    navigate("/user/signup");
  };
  const handleDeleteClick = (id) => {
    setDelId(id);
    setShowDialogBox(true);
  };
  const handleNoClick = () => {
    setDelId("");
    setShowDialogBox(false);
  };
  const handleYesClick = () => {
    setShowDialogBox(false);
    let token = localStorage.getItem('token');
    axios.delete(`http://localhost/backend/?del_id=${delId}`, {headers : {token : `Bearer ${token}`}})
    .then(res=>{
      // console.log("user deleted successfully");
    })
    .catch(err => {console.log(err);})
    if (currUser === delId) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      const arr = rows.filter(row => row.id !== delId);
      setRows(arr);
    }
  };
  const handleToggleClick = () => {
    setToggle(!toggle);
  };
  useEffect( () => {
    console.log(category, pageNumber);
    let token = localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    } else {
    //  console.log(token);

      // setCategory(category?category:"general");
      // if(!pageNumber)pageNumber=1;
      
      axios.get('http://localhost/backend/', {headers : {token : `Bearer ${token}`}})
      .then((res)=>{setCurrUser(res.data.user);setRows(res.data.results);})
      .catch(err=> {
        if(err.response.data.status){
          localStorage.removeItem('token');
          navigate('/login');
        }
        else console.log(err);
      });
    }
  }, [currCategory, pageNumber]);

  return (
    <>
      <Navbar handleAddUser={handleAddUser} handleLogoutClick={handleLogoutClick} handleToggleClick={handleToggleClick}/>
      <Dialogbox
        open={showDialogBox}
        handleNo={handleNoClick}
        handleYes={handleYesClick}
      />

      {toggle && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">User Id</StyledTableCell>
                <StyledTableCell align = "right">First Name</StyledTableCell>
                <StyledTableCell align="right">Last Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="right" component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="right" >
                    {row.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  
                  <StyledTableCell align="right">
                    <Button_component
                      name="edit"
                      onclick={() => handleEditClick(row)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button_component
                      name="delete"
                      onclick={() => handleDeleteClick(row.id)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
     {!toggle &&  <NewsPage category={category} country={country} pageSize={pageSize} pageNumber={pageNumber}/>}
     
    </>
  );
};

export default User;
