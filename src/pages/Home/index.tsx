import React, { useEffect, useState } from "react"
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FaceIcon from '@mui/icons-material/Face';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WomanIcon from '@mui/icons-material/Woman';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import moment from 'moment'
//Card 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

//Bar Chart
import { BarChart } from "../../components/BarChart";
import { LineBarChart } from "../../components/LineBarChart";
import { DrawerComponent } from "../../components/Drawer";


export const HomePage = () => {
  const [data, setData] = useState({
    customer:"",
    sales:"",
    products:""
  })

  const Label = [{ "label": moment().format("MMM Do YY"), "visits": data?.sales }, { "label": moment().subtract(1, 'days').format("MMM Do YY"), "visits": 3025 },
  { "label": moment().subtract(2, 'days').format("MMM Do YY"), "visits": 3025 }, { "label": moment().subtract(3, 'days').format("MMM Do YY"), "visits": 3025 },
  { "label": moment().subtract(4, 'days').format("MMM Do YY"), "visits": 3025 }, { "label": moment().subtract(5, 'days').format("MMM Do YY"), "visits": 3025 }, { "label": moment().subtract(6, 'days').format("MMM Do YY"), "visits": 3025 },
  ]

  
  const userDetails = JSON.parse(localStorage.getItem("user") || "")

  async function getData() {
    const id = userDetails?.userid || "sudev"

    const url = `http://localhost:5000/api/getDashboard?userid=${id}`

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
    const resdata = Object.assign({}, ...data)
    setData(resdata)
    console.log(resdata)
  }





  useEffect(() => {
    getData()
  }, [])









  return (
    <>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card sx={{ minWidth: 50 }}>
              <CardContent>
                <div style={{ display: "flex" }}>
                  <div>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <LocalGroceryStoreIcon style={{ fontSize: "80px", color: "#35188A" }} />
                    </Typography>
                  </div>
                  <div style={{ marginLeft: "100px" }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <h2>Purchase</h2>
                      <h3>10</h3>
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} >
            <Card sx={{ minWidth: 50 }}>
              <CardContent>
                <div style={{ display: "flex" }}>
                  <div>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <FaceIcon style={{ fontSize: "80px", color: "#35188A" }} />
                    </Typography>
                  </div>
                  <div style={{ marginLeft: "60px" }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <h2>Customers</h2>
                      <h3>{data?.customer||""}</h3>
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card sx={{ minWidth: 50 }}>
              <CardContent>
                <div style={{ display: "flex" }}>
                  <div>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <AttachMoneyIcon style={{ fontSize: "80px", color: "#35188A" }} />
                    </Typography>
                  </div>
                  <div style={{ marginLeft: "100px" }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <h2>Sales</h2>
                      <h3>{data?.sales || ""}</h3>
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card sx={{ minWidth: 50 }}>
              <CardContent>
                <div style={{ display: "flex" }}>
                  <div>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <WomanIcon style={{ fontSize: "80px", color: "#35188A" }} />
                    </Typography>
                  </div>
                  <div style={{ marginLeft: "100px" }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <h2>Products</h2>
                      <h3>{data?.products||""}</h3>
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Card sx={{ minWidth: 150, minHeight: 200 }} style={{ marginTop: "10px" }}>

        <CardContent>
          {/* <LineBarChart /> */}
          <h3>Weekly Sales Report</h3>
          <BarChart label={Label} />

        </CardContent>
      </Card>

    </>
  )
}
