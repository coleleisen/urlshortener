import './App.css';
import React, {useEffect} from "react";
import { TextField, FormGroup, Box, Snackbar, Alert, FormControlLabel, Switch, Grid, Button, Table, TableRow, TableBody, TableHead, TableCell } from "@mui/material";
import {
    useParams
 } from "react-router-dom";
 import Axios from 'axios';

 /*
 # urlshortener
url shortener 

Local Setup:

Prerequisites: Must have docker installed and running on your machine

Go to project directory and run the commands:

docker-compose build

docker-compose up


Frontend use

Go to localhost:3000 to access react application

Type into URL text field what website you would like to link to

If Custom is not selected it will auto generate the short url or if you check the switch you can make a custom url

Add /redirect/{shorturl} and it will redirect to the backends redirect using react router

Or you can simply type localhost:3001/{shorturl} into the browser



Backend Only use

Use an HTTP Client (eg. Postman) and make a post request to localhost:3001/shorten with a json request body of 

{ "url" : "https://urlofyourchoice.com" }  

You will be returned a response body with the value "shortened". Copy the shortened url and enter it in your browser url at localhost:3001/{shortened} 

 */



function Home() {


  const [longUrl, setLongUrl] = React.useState("");
  const [shortUrl, setShortUrl] = React.useState("");
  const [error, setError] = React.useState("");
  const [openError, setOpenError] = React.useState(false);
  const [custom, setCustom] = React.useState(false);
  const [urls, setUrls] = React.useState([])

  let { url } = useParams();

  useEffect( () => {

    fetchUrls();

    if(url){
        window.location.replace(`http://host.docker.internal:3001/${url}`)
    }
    
  }, [])

  useEffect( () => {
    if(error !== ""){
      setOpenError(true)
    }
  }, [error])

  const handleLongUrlChange = (event) =>{
    setLongUrl(event.target.value)
  }
  const handleShortUrlChange = (event) =>{
    setShortUrl(event.target.value)
  }
  const handleAutoGenerateChange = (event) =>{
    setCustom(event.target.checked)
  }
  const handleClose = () =>{
    setError("")
    setOpenError(false)
  }
  
  const fetchUrls = async () =>{
    Axios.post(`http://host.docker.internal:3001/fetch`)
    .then(function (response) {
      setUrls(response.data)
    })
    .catch(function (error) {
      setError(error.response.data)
      console.log(error.response.data) 
    })
   
  }

  const submitUrl = async () =>{
    let obj={
        url : longUrl,
        custom : custom,
        shortened : shortUrl
    }
    Axios.post(`http://host.docker.internal:3001/shorten`, obj)
    .then(function (response) {
      console.log(response)
      fetchUrls()
    })
    .catch(function (error) {
      setError(error.response.data)
      console.log(error) 
    })
   
  }

  return (
    <Box>
        <Snackbar sx={{width: '40%'}} anchorOrigin={{ vertical : "top", horizontal : "center" }} open={openError} autoHideDuration={6000} onClose={handleClose}>
            <Alert sx={{width: '100%'}} severity="error">{error.toString()}</Alert>
        </Snackbar>
        <h1>CloudRaker URL Shortener</h1>
        <br></br>
        <Grid container spacing={2}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
                <TextField sx={{ margin:'auto', width:'75%' }} onChange={handleLongUrlChange} value={longUrl} label="long url"/>           
            </Grid>
            <Grid item xs={3}>
            </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={2}>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={2}>
                <FormGroup>
                    <FormControlLabel sx={{ margin:'auto' }}  required control={<Switch value={custom} onChange={handleAutoGenerateChange} />} label="Custom Short URL" labelPlacement='start' />
                </FormGroup>
            </Grid>
            <Grid item xs={2}>
            {custom ?         
                    <TextField sx={{ width:'100%' }} onChange={handleShortUrlChange} value={shortUrl} label="short url"/> 
                    :
                    <div></div>
                }
            </Grid>
            <Grid item xs={4}>
            </Grid>
        </Grid>
        <br></br>
        <Button onClick={()=>submitUrl()} style={{width:'30%',fontSize:'1rem',  margin:'auto', textAlign : 'center'}}  variant="contained">Submit Url</Button>

        <br></br>
        <br></br>
        <br></br>

        <Table>
            <TableHead>
                <TableRow>
                    <Grid container spacing={2} >
                        <Grid item xs ={3.5}></Grid>
                        <Grid item xs ={2.5}><TableCell sx={{margin : 'auto', textAlign : 'center'}}>Url</TableCell></Grid>
                        <Grid item xs ={1}></Grid>    
                        <Grid item xs ={2.5}><TableCell sx={{margin : 'auto', textAlign : 'center'}}>Short Url</TableCell></Grid>    
                        <Grid item xs ={2.5}></Grid>             
                    </Grid>
                </TableRow>

            </TableHead>
            <TableBody>
                {urls.map((url,i)=>
                <TableRow key={i}>
                    <Grid container spacing={2} >
                        <Grid item xs ={3.5}></Grid>
                        <Grid item xs ={2.5}><TableCell sx={{margin : 'auto', textAlign : 'center'}}>{url.url}</TableCell></Grid>
                        <Grid item xs ={1}></Grid>    
                        <Grid item xs ={2.5}><TableCell sx={{margin : 'auto', textAlign : 'center'}}>{url.shortened}</TableCell></Grid>
                        <Grid item xs ={2.5}></Grid>                 
                    </Grid>
                </TableRow>
                )}
            </TableBody>
            
        </Table>

        
    </Box>
  );
}

export default Home;