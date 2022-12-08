import React, { useState, useEffect } from "react"
import { Grid } from "@mui/material"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';




export const AddSalesPage = () => {

  const userdetails = JSON.parse(localStorage.getItem("user") || "")
  const [data, setData] = useState([]);
  // const [inputData,setInputData] = useState({})
  const defaultData = { proname: "", quantity: "" }
  const [inputData, setInputData] = useState(defaultData)

  async function handleGetData() {

    const id = userdetails.userid

    const url = `http://localhost:5000/api/getProducts?userid=${id}`

    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
    });


    var data = await response.json();

    console.log(data);
    setData(data)

  }



  useEffect(() => {
    handleGetData()
  }, [])


  function handleChange(event: SelectChangeEvent) {
    const da = { ...inputData }
    da.proname = event.target.value as string
    setInputData(da)
  }


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      proname: "",
      procode: "",
      proid: "",
      quantity: "",
      price: "",
      userid: userdetails.userid,
      fullquantity: ""
    }

    data.map((ele: any) => {
      if (ele.PRODUCTNAME === inputData.proname) {
        payload.procode = ele.PRODUCTCODE
        payload.proid = ele.PRODUCTID
        payload.price = ele.PRICE
        payload.fullquantity = ele.QUANTITY
        return
      }
    })


    payload.proname = inputData.proname
    payload.quantity = inputData.quantity
    //    fetch ("API Address", {
    //    method: "POST",
    //    body: JSON.stringify({
    //      Product:inputFeilds[0].Product,
    //      Categories:inputFeilds[0].Categories,
    //      Qty:inputFeilds[0].Qty,
    //      Price:inputFeilds[0].Price,
    //      GST:inputFeilds[0].GST
    //   }),
    //   })
    // .then((response) => response.json())
    // .then((result) => {
    //     if(result.message === "SUCCESS"){
    //     alert("Sale added successfully");
    //     
    //    } 
    //   });

    console.log("dsas",payload);
    
  }

  return (
    <>
      <Grid style={{ marginLeft: "100px" }}>
        <h2 style={{ fontFamily: "sans-serif" }}>
          Add Sales
        </h2>
        <Grid item>

          <Box>
            <FormControl style={{ width: "220px" }}>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"

                label="Customer"

                value={inputData.proname}
                onChange={handleChange}
                // onBlur={formik.handleBlur}
                name="Customer"
              // error={formik.touched.Customer && Boolean(formik.errors.Customer)}
              >
                {/* <MenuItem value={""}>none</MenuItem> */}
                {
                  data.map((ele: any, index: any) => (
                    <MenuItem
                      key={index}
                      value={ele?.PRODUCTNAME}>{ele?.PRODUCTNAME}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>

          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            style={{ marginLeft: "240px", marginTop: "-55px" }}
            value={inputData.quantity}
            onChange={(e) => {
              const da = { ...inputData }
              da.quantity = e.target.value as string
              setInputData(da)
            }}
            // onBlur={handleBlur}
            name="Qunatity"
          />
            <button
onClick={handleSubmit}
          >submit</button>
        </Grid>
      </Grid>
    </>
  )
}
