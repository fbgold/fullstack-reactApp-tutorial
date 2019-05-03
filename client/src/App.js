import React, { Component } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';

import Weather from './weather'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      weather: null,
      cityList: [],
      newCityName: ''
    };
  }
  
  getCityList = () =>{
    fetch('api/cities')
    .then(res => res.json())
    .then(res => {
      var cityList = res.map(r => r.city_name)
      this.setState({cityList});
    }).catch(err=>{

      
        console.log("**Error getCityList")
   

    })
  }

  componentDidMount () {
    this.getCityList();
  }

  handleInputChange =  (e)=> {
    this.setState({newCityName: e.target.value});
  }

  handleAddCity = (e) => {
    console.log("--handleAddCity: ",this.state.newCityName);
    let head = { 'Content-type' : 'application/json'}
    let body = JSON.stringify({city:this.state.newCityName})
    //let body = {'city':this.state.newCityName}

    //fetch('api/cities', {
    fetch('http://localhost:5000/api/cities', {
        method: 'post',
      headers: head,
      body: body
    })
    .then(res => {
      res.json()
    })
    .then(res => {
      this.getCityList();
      this.setState({newCityName:''});
    })

  }

  handleChangeCity = (e) => {
    this.getWeather(e.target.value);
  }

  getWeather = (city) => {
    console.log("getWeather - city: ",city)
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(weather =>{
      console.log(weather)
      this.setState({weather});
    })

  }

  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">My Weather</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">MyWeather</h1>
              <p className="lead">The current weather for your favorite cities</p>
              <InputGroup>
                <Input
                  placeholder = "New city name..."
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                </InputGroupAddon>
            </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current weather</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCity}>
                {this.state.cityList.length === 0 && <option>No cities add yet</option>}
                {this.state.cityList.length > 0 && <option>Select a city</option>}
                {this.state.cityList.map((city,i) => <option key={i}>{city}</option>)}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather data={this.state.weather}/>

      </Container>
    );
  }
}

export default App;
