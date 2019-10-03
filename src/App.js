import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Rank from './components/Rank/Rank'
import ImageInputForm from "./components/ImageInputForm/ImageInputForm"
import './App.css';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'


const initialState = {
      input: '',
      imageUrl : '',
      box : {},
      route: 'signin',
      isSignedIn : false,
      user : {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {

  constructor() {
    super();
    this.state = initialState
  }

  onInputChange = (event) => {
    this.setState({
      input : event.target.value
    })
  }

  onFaceDetectionResponse = (response) => {
    
    let boundingBox = response.outputs[0].data.regions[0].region_info.bounding_box
    console.log(boundingBox)

    let image = document.getElementById("face-image");

    let width = image.width;
    let height = image.height;

    let top = height * boundingBox.top_row
    let bottom = height - height * boundingBox.bottom_row
    let left = width * boundingBox.left_col
    let right = width - width * boundingBox.right_col
    
    this.setState({
      box : {top, bottom, right, left }
    })
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl : this.state.input
    })

    fetch('http://localhost:3000/facerec', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({input: this.state.input})
    })
    .then(response => response.json())
    .then(data => {
      fetch('http://localhost:3000/image',{
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({id: this.state.user.id})
      })
      .then(response => response.json())
      .then(data => { 
          let modifiedUser = Object.assign(this.state.user, { entries : data})
          this.setState({user : modifiedUser})
        })
      .catch(err => console.log(err))

      this.onFaceDetectionResponse(data)
    })
    .catch(err => console.log(err)) 
  }

  onRouteChange = (route) => {

    if(route === 'signin') {
      this.setState(initialState)
    } else if(route === 'home') {
      this.setState({isSignedIn : true})
    }

    this.setState({
      route : route
    });
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  render() {

    const particlesParams = {
      particles: {
        number : {
          value : 30,
          density : {
            enable: true,
            value_area : 100,
          }
        }
      }
    };

    const {isSignedIn, route, imageUrl, box} = this.state

    return (
      <div className="App">
        <Particles className="particles" params={particlesParams}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

        {route === 'home' 
          ?  <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageInputForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition 
                  imageUrl={imageUrl} 
                  box={box} 
                />
            </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }

      </div>
    );
  }
}

export default App;
