import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home.jsx";
import Button from "./components/Button.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import User from "./components/User.jsx";
import EditUser from "./components/EditUser.jsx";
import UsersContext from "./context/UsersContext.js";
import NewsPage from "./components/NewsPage.jsx";
import Error from "./components/Error.jsx";


function App() {
  const [users, setUsers] = useState({});
  useEffect(() => {
    let data = localStorage.getItem("dev");
    if (data === null) data = {};
    setUsers(data);
  }, []);
  return (
    // <UsersContext.Provider value={{users,setUsers}}>
    <div>
      <Router>
        <Routes>
          <Route actual path="/" element={<Home />} />
          <Route actual path="/signup" element={<Signup isAdmin={false} />} />
          <Route actual path="/login" element={<Login />} />
          {/* <Route actual path="/user"> */}
          <Route key="123" actual path="/user/editUser" element={<EditUser />} />
          <Route key="234" actual path="/user/:category" element={<User />} />
          <Route key="456" actual path="/user/:category/:pageNumber" element={<User />} />
          <Route key="567" actual path="/user" element={<User/>}/>
          {/* </Route> */}
          <Route
            actual
            path="/user/signup"
            element={<Signup isAdmin={true} />}
          />
          <Route actual path='/user/error' element={<Error/>}/>
          
        </Routes>
      </Router>
    </div>
    // </UsersContext.Provider>
  );
}

export default App;
