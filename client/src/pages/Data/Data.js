import React, { Component } from 'react'
import {Container} from "react-bootstrap";
import ReactSearchBox from 'react-search-box'
import { Nav, Navbar, Dropdown, NavItem } from "react-bootstrap";

import { VictoryLine, VictoryChart, VictoryLabel, VictoryAxis } from 'victory';

const data = [
        {
          "Epochtime": 1576475402,
          "HoboID": "454-788",
          "Humidity": 7,
          "LeafWetness": 9,
          "Rainfall": 83,
          "SoilMoisture": 43,
          "SolarRadiation": 343413,
          "Temperature": 92,
          "Wind": 4
        },
        {
          "Epochtime": 1576475403,
          "HoboID": "454-788",
          "Humidity": 7,
          "LeafWetness": 9,
          "Rainfall": 83,
          "SoilMoisture": 43,
          "SolarRadiation": 323444,
          "Temperature": 12,
          "Wind": 7
        },
        {
          "Epochtime": 1576475404,
          "HoboID": "454-788",
          "Humidity": 4,
          "LeafWetness": 5,
          "Rainfall": 73,
          "SoilMoisture": 43,
          "SolarRadiation": 323413,
          "Temperature": 92,
          "Wind": 6
        },
        {
          "Epochtime": 1576475405,
          "HoboID": "454-788",
          "Humidity": 3,
          "LeafWetness": 2,
          "Rainfall": 83,
          "SoilMoisture": 13,
          "SolarRadiation": 344415,
          "Temperature": 92,
          "Wind": 6
        },
        {
          "Epochtime": 1576475402,
          "HoboID": "454-789",
          "Humidity": 1,
          "LeafWetness": 9,
          "Rainfall": 83,
          "SoilMoisture": 43,
          "SolarRadiation": 343413,
          "Temperature": 92,
          "Wind": 4
        },
        {
          "Epochtime": 1576475403,
          "HoboID": "454-789",
          "Humidity": 3,
          "LeafWetness": 9,
          "Rainfall": 73,
          "SoilMoisture": 73,
          "SolarRadiation": 327444,
          "Temperature": 12,
          "Wind": 5
        },
        {
          "Epochtime": 1576475404,
          "HoboID": "454-789",
          "Humidity": 4,
          "LeafWetness": 5,
          "Rainfall": 73,
          "SoilMoisture": 43,
          "SolarRadiation": 323413,
          "Temperature": 32,
          "Wind": 6
        },
        {
          "Epochtime": 1576475405,
          "HoboID": "454-789",
          "Humidity": 3,
          "LeafWetness": 2,
          "Rainfall": 83,
          "SoilMoisture": 13,
          "SolarRadiation": 344415,
          "Temperature": 92,
          "Wind": 6
        }

]
class Select extends React.Component {
  constructor(props){
    super(props)
    this.state = {y: "Humidity", hobo: "454-788", sdata: this.sortData("454-788")}
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectHobo = this.handleSelectHobo.bind(this)
    this.handleSelectHobo = this.handleSelectHobo.bind(this)
    this.sortData = this.sortData.bind(this)
  }
  handleSelect(e) {
    this.setState({y: e.target.value})
  }
  handleSelectHobo(e) {
    this.setState({hobo: e.target.value})
    this.setState({sdata: this.sortData(e.target.value)})
    console.log(this.state.hobo)
  }
  sortData(h){
    let newdata = []
    console.log("sort")
    console.log(h)
    for (let i=0; i<data.length; i++)
    {
      if(data[i].HoboID == h){
        newdata.push(data[i])
      }
    }
    return newdata
  }
  render () {
    return (
      <div>
      <select  onChange={this.handleSelectHobo}>
        <option value="454-788"> 454-788 </option>
        <option value="454-789"> 454-789 </option>
      </select>

      <select  onChange={this.handleSelect}>
        <option value="Humidity"> Humidity </option>
        <option value="LeafWetness"> LeafWetness </option>
        <option value="Rainfall"> Rainfall </option>
        <option value="SoilMoisture"> SoilMoisture </option>
        <option value="SolarRadiation"> SolarRadiation </option>
        <option value="Temperature"> Temperature </option>
        <option value="Wind"> Wind </option>
      </select>
      <Graph y={this.state}/>
      </div>
    )
  }
}
function Graph(props) {
  console.log(props)
  const page = (<VictoryChart domainPadding={20}>
    <VictoryLabel text={props.y.y} x={50} y={30} textAnchor="middle"/>
    <VictoryLabel text="Time" x={410} y={270} textAnchor="middle"/>
    <VictoryLine
      data={props.y.sdata}
      x="Epochtime"
      y={props.y.y}
    />
    <VictoryAxis tickFormat={() => ''} />
    <VictoryAxis dependentAxis />
  </VictoryChart>)
  return(page)

}
export default function Data(){
  return (
    <div>
      <Container className="Title">
        <h1>Data page</h1>
        <hr />
      </Container>
      <div className = "container">
        <Select/>
      </div>
    </div>
  );
}
