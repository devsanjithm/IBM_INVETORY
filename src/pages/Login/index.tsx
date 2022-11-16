import { Avatar, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Grid } from '@mui/material';
import React from "react"
import { Link, useNavigate} from "react-router-dom";

export const Login=()=>{
    const navigate=useNavigate();
    const pstyle={padding:30 ,height:'50vh', width:280,margin:'40px auto'}

    function handleLogin() {
      navigate("/HomePage")
        
    }
    return(
        <Grid>
            <Paper elevation={10} style={pstyle}>
                <Grid>
                {/* <Avatar style={astyle}><LockOutlinedIcon/></Avatar> */}
                <h2 >Signin</h2>
                </Grid>
                <TextField  label='Email' id='outlined-basic' fullWidth/><br/><br/>
                <TextField  label='Password'  type='password'id='outlined-basic' fullWidth/><br/><br/>
                <Button onClick={() => {handleLogin()}} type='submit' fullWidth>Login</Button>
                New here?<Link to="/signup"> Signup</Link>
                
            </Paper>
        </Grid>
    )
}