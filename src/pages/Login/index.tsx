import { Alert, Avatar, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Grid } from '@mui/material';
import React, { useEffect, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
// import axios from "axios";
export const Login = () => {
  const [Lemail, setLemail] = useState("");
  const [Lpass, setLpass] = useState("");
  const navigate = useNavigate();
  const pstyle = { padding: 30, height: '50vh', width: 280, margin: '40px auto' }
  const { setUser }: any = useContext(UserContext)



  function handleLogin() {
    if (Lemail !== "" && Lpass !== "") {
      fetch("http://localhost:5000/user/login", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          email: Lemail,
          password: Lpass
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          localStorage.setItem("user", JSON.stringify(result))
          if (result.message === "LOGIN SUCCESSFULLY") {
            alert("You are logged in.");
            setUser(true);
            localStorage.setItem("islogged","true")

          }
          else {
            alert("Please check your login information.");
          }
        });

    }
    //     else {
    //         alert("Enter valid Email address and password")
    //     }
  }

  return (
    <Grid>
      <Paper elevation={10} style={pstyle}>
        <Grid>
          {/* <Avatar style={astyle}><LockOutlinedIcon/></Avatar> */}
          <h2 >Signin</h2>
        </Grid>
        <TextField onChange={(event) => { setLemail(event.target.value); }} label='Email' id='outlined-basic' fullWidth /><br /><br />
        <TextField onChange={(event) => { setLpass(event.target.value); }} label='Password' type='password' id='outlined-basic' fullWidth /><br /><br />
        <Button onClick={() => { handleLogin() }} type='submit' fullWidth>Login</Button>
        New here?<Link to="/signup"> Signup</Link>

      </Paper>
    </Grid>
  )
}
