import { Avatar, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Grid } from '@mui/material';
import React, { useContext, useState } from "react"
import { Link, useNavigate} from "react-router-dom";
import { UserContext } from "../../context";

export const Register=()=>{
    const [Remail, setRemail] = useState("");
    const [Rpass, setRpass] = useState("");
    const [Rname, setRname] = useState("");
    const [mob,SetMob]=useState("");
    const navigate=useNavigate();
    const pstyle={padding:30 ,height:'50vh', width:280,margin:'40px auto'}
    const{setUser}:any=useContext(UserContext)

    function handleRegister() {
        if(Remail!=="" && Rpass!=="" && Rname!==""){
            fetch ("http://localhost:5000/user/signup", {
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
                  email: Remail,
                  password:Rpass,
                  name:Rname,
                  mobile:mob
               }),
               })
             .then((response) => response.json())
             .then((result) => {
                 if(result.message === "success"){
                 alert("Registeration Successfull");
                 setUser(true);
                 
                } 
                else {
                    alert("Please check your login information.");
                }
               });
    
        
        }
        else{
            alert("Enter correct details")
        }
    }
    return(
        <Grid>
            <Paper elevation={10} style={pstyle}>
                <Grid>
                {/* <Avatar style={astyle}><LockOutlinedIcon/></Avatar> */}
                <h2 >Register</h2>
                </Grid>
                <TextField  onChange={(event) => {setRemail(event.target.value);}}  label='Email' id='outlined-basic' fullWidth/><br/><br/>
                <TextField  onChange={(event) => {setRpass(event.target.value);}}  label='Password'  type='password'id='outlined-basic' fullWidth/><br/><br/>
                <TextField  onChange={(event) => {setRname(event.target.value);}}  label='Username' id='outlined-basic' fullWidth/><br/><br/>
                <TextField  onChange={(event) => {SetMob(event.target.value);}}  label='Mobile No' id='outlined-basic' fullWidth/><br/><br/>
                <Button onClick={() => {handleRegister()}} type='submit' fullWidth>SignUp</Button><br/>
                Already a user?<Link to="/Login"> Login</Link>
                
            </Paper>
        </Grid>
    )
}