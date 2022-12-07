import React,{useState} from "react"
import { Grid } from "@mui/material"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
export const AddSalesPage=()=>{
const[inputFeilds,SetInputFeilds]=useState([{Product:"",Categories:"",Qty:"",Price:"",GST:""}])

 const addNewRow=()=>{
  let values=[...inputFeilds]
  values.push({Product:"",Categories:"",Qty:"",Price:"",GST:""})
  SetInputFeilds(values)
  
 }
 const removeNewRow=(index:any)=>{
  let values=[...inputFeilds]
 values.splice(index,1)
  SetInputFeilds(values)
  
 }
 const handleFormChange=(index:number,event:any)=>{
  let data:any =[...inputFeilds]
  data[index][event.target.name]=event.target.value
  SetInputFeilds(data)
  
 }
 const handleSubmit=(e:any)=>{
  e.preventDefault();
  console.log("collectDatas",inputFeilds)

            fetch ("API Address", {
            method: "POST",
            body: JSON.stringify({
              Product:inputFeilds[0].Product,
              Categories:inputFeilds[0].Categories,
              Qty:inputFeilds[0].Qty,
              Price:inputFeilds[0].Price,
              GST:inputFeilds[0].GST
           }),
           })
         .then((response) => response.json())
         .then((result) => {
             if(result.message === "SUCCESS"){
             alert("Sale added successfully");
             
            } 
           });
}
 
    return(
        <>
       <Grid style={{marginLeft:"100px"}}>
         <h2 style={{fontFamily:"sans-serif"}}>
            Add Sales
            </h2>
         
        <Grid item>
          <TextField label="Quantity"></TextField>
          

      </Grid>
        </Grid>
        </>
    )
}