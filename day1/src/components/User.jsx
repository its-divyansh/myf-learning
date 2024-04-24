import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

// import EditUser from "./EditUser.jsx";

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
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState({});
  const [users, setUsers] = useState({});
  const [rows, setRows] = useState([]);
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [delId, setDelId] = useState("");
  const [id, setId] = useState(localStorage.getItem("token"));

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditClick = (curr_user) => {
    navigate("/user/editUser", { state: { user: curr_user, email: id } });
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
    let id = delId;
    let arr = users;
    delete arr[id];
    setUsers(arr);
    localStorage.setItem("dev", JSON.stringify(users));
    let email = localStorage.getItem("token");
    if (id === email) {
      localStorage.removeItem('token');
      navigate("/login");
    } else {
      setRows(rows.filter((data) => id !== data.email));
    }
  };
  useEffect(() => {
    const email = localStorage.getItem("token");
    // console.log(email);
    if (email === null) {
      navigate("/login");
    } else {
      // let email = value;
      const userObj = JSON.parse(localStorage.getItem("dev"));
      setCurrUser(userObj[email]);
      setUsers(userObj);
      if (email === "admin@gmail.com") {
        const arr = [];
        for (let email in userObj) {
          arr.push({ email, ...userObj[email] });
        }
        setRows(arr);
      } else {
        setRows([{ ...userObj[email], email }]);
      }
    }
  }, []);

  return (
    <>
      <Dialogbox
        open={showDialogBox}
        handleNo={handleNoClick}
        handleYes={handleYesClick}
      />
      <Grid container justifyContent={"space-between"} sx={{ mb: "20px" }}>
        <Grid item>
          <Typography variant="h3">
            Hello {currUser.firstName + " " + currUser.lastName + "  "}
          </Typography>
        </Grid>
        <Grid item sx={{ mt: "5px" }}>
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
      {/* {edit && (
        <Grid container>
          <EditUser user={curr_edit} edit={editDone} />
        </Grid>
      )} */}
    </>
  );
};

export default User;
