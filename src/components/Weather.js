import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Autocomplete ,usePlacesWidget} from "react-google-autocomplete";
import { GoogleComponent } from 'react-google-location' 
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
function Weather(props) {
  const API_KEY = "AIzaSyC5CH7Ypgc651lwcdrYq_tkce3XssHTk4A"  
  const [latLog, setlatLog] = useState(null);
  const [weather, setWeather] = useState("");
  const [latU, setlatU] = useState(null);
  const [logU, setlogU] = useState(null);
  const [url, setUrl] = useState(`http://api.weatherapi.com/v1/forecast.json?key=a5a9f26784c14ea9b3922905222901&q=${latU},${logU}&aqi=no`);

 

  useEffect(() => {
    console.log(latLog)
    axios.get(url).then(
     
      (response) => {
        if(latLog != null){
        geocodeByAddress(latLog.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>
        setUrl(`http://api.weatherapi.com/v1/forecast.json?key=a5a9f26784c14ea9b3922905222901&q=${lat},${lng}&aqi=no`)
     
        );
        console.log(response.data)
        setWeather(response.data);
        }
    });
 
  } , [latLog]);


  return (

    
    <div >
      <div >
      <GooglePlacesAutocomplete
      apiKey={API_KEY}
      selectProps={{
        latLog,
        onChange: setlatLog,
 
    
      }}
 
      autocompletionRequest={{

        componentRestrictions: {
        country: ['sg'],
  
        }
        
      }}
  
     />


      </div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center' }}>
        <table style={{textAlign:"center"}}>
          <tr>
            <td>
            {latLog ? <h1>{latLog.label}</h1> : null}
            </td>
          </tr>
          <tr>
            <td>
            {weather.forecast ? <h2 style={{textTransform: 'capitalize'}} >{new Date(weather.forecast.forecastday[0].date ).toLocaleDateString('en-GB',{ day: 'numeric', month: 'short', year: 'numeric' })}</h2> : null}
        {weather.forecast ? <span style={{textTransform: 'capitalize' , fontWeight:'bold' ,fontSize:"25px"}} >{weather.forecast.forecastday[0].hour[12].condition.text}</span> : null}
        {weather.forecast ? <span style={{textTransform: 'capitalize', fontWeight:'bold',fontSize:"25px"}} >, {weather.forecast.forecastday[0].hour[12].temp_c}°C</span> : null}
            </td>
          </tr>
        </table>
      

        </div>
    </div>
  );
}

export default Weather