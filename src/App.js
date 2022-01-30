import Weather from './components/Weather'


import React from 'react'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      change: true,
      place: null};


  }

  
  
  
  render() {
    return (
      <div
        style={{
          backgroundImage: 
          "url('https://images.alphacoders.com/887/887559.jpg')",
                 height:'100vh',
               
      
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat',
             
        }}
      >

        <Weather></Weather>



      </div>
    );
  }
}
  
export default App;
