import React, { useEffect, useState } from "react"
import { CustomGrid } from "../../../components/DataGrid";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

export const CustomerTablePage = () => {
  const [data, setData] = useState([])

  const Navigate = useNavigate()

  useEffect(() => {
    getData()
  }, []);

  async function getData() {

    const id = "sanjith"

    const url = `http://localhost:5000/api/getCustomer?userid=${id}`

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
    // setData(data)

    if (data?.status) {
      setData([])
    } else {
      const row = data.map((ele: any, index: any) => {
        const element = {
          Sno: index,
          CustomerName: ele.CUSTNAME,
          CustomerEmail: ele.CUSTEMAIL,
          WarehouseName: ele.CUSTADDRESS,
          Phone: ele.CUSTMOBILE,

        }
        return element
      })

      console.log(row);
      setData(row)
    }
  }


  const columnDefs = [
    { field: 'Sno' },
    { field: 'CustomerName' },
    { field: 'CustomerEmail' },
    { field: 'WarehouseName' },
    { field: 'Phone' },
  ];

  const rowDef = [
    { Sno: "1", CustomerName: "Sudev", CustomerEmail: "sudev@gmail.com", WarehouseName: 'Ware', Phone: '9876543210', Country: 'India' },
    { Sno: "1", CustomerName: "Sudev", CustomerEmail: "sudev@gmail.com", WarehouseName: 'Ware', Phone: '9876543210', Country: 'India' },
    { Sno: "1", CustomerName: "Sudev", CustomerEmail: "sudev@gmail.com", WarehouseName: 'Ware', Phone: '9876543210', Country: 'India' },
    { Sno: "1", CustomerName: "Sudev", CustomerEmail: "sudev@gmail.com", WarehouseName: 'Ware', Phone: '9876543210', Country: 'India' },
    { Sno: "1", CustomerName: "Sudev", CustomerEmail: "sudev@gmail.com", WarehouseName: 'Ware', Phone: '9876543210', Country: 'India' }
  ]

  return (
    <>
      <Grid container spacing={2} style={{ marginLeft: "15px" }}>
        <Grid xs={10}>
          <h2 style={{ fontSize: "20px", fontFamily: "sans-serif" }}>Customers</h2>
        </Grid>
        <Grid xs={2}>
          <Button variant="contained" style={{ marginTop: "10px" }} onClick={() => Navigate("/CustomerPage")}>Add Customer</Button>
        </Grid>
      </Grid>

      <CustomGrid columnDefs={columnDefs} rowData={data || []} />
    </>
  )
}
