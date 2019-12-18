import React, { Component } from "react"
import {Container} from "react-bootstrap";
import ReactSearchBox from "react-search-box"
import { Nav, Navbar, Dropdown, NavItem } from "react-bootstrap";
import { VictoryLine, VictoryChart, VictoryLabel, VictoryAxis } from "victory";
import "./Data.css";

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
          "Humidity": 8,
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
          "Epochtime": 1576475406,
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
          "Epochtime": 1576475406,
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
    this.state = {
      y: "Humidity",
      hobo: "454-788",
      sdata: this.sortData("454-788")
    };

    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectHobo = this.handleSelectHobo.bind(this)
    this.handleSelectHobo = this.handleSelectHobo.bind(this)

    this.renderTableHeader = this.renderTableHeader.bind(this)
    this.renderTableData = this.renderTableData.bind(this)
    this.table = this.table.bind(this)

    this.sortData = this.sortData.bind(this)
  }

  renderTableData(props){
    let ret =[]
    let d = new Date(0);
    for(let i=0; i<props.length; i++){
      ret.push(
        <tr key={i}>
          <td key={props[i].Epochtime}>{new Date(props[i].Epochtime).toString().slice(0,10).replace(/-/g,"")}</td>
          <td key={props[i].HoboID}>{props[i].HoboID}</td>
          <td key={props[i].Humidity}>{props[i].Humidity}</td>
          <td key={props[i].LeafWetness}>{props[i].LeafWetness}</td>
          <td key={props[i].Rainfall}>{props[i].Rainfall}</td>
          <td key={props[i].SoilMoisture}>{props[i].SoilMoisture}</td>
          <td key={props[i].SolarRadiation}>{props[i].SolarRadiation}</td>
          <td key={props[i].Temperature}>{props[i].Temperature}</td>
          <td key={props[i].Wind}>{props[i].Wind}</td>
        </tr>
      )
    }
    console.log(ret)
    return ret
  }
  renderTableHeader(props){
    let ret = [];
    for(let i=0; i<props.length; i++){
      ret.push(<th id={props[i]}>{props[i]}</th>)
    }

    return ret
  }
  table(props) {
    const page = (
      <tbody>
        {this.renderTableHeader(Object.keys(props.sdata[0]))}
        {this.renderTableData(props.sdata)}
      </tbody>
    )
    console.log(page)
    return page
  }


  handleSelect(e) {
    this.setState({y: e.target.value})
  }
  handleSelectHobo(e) {
    this.setState({hobo: e.target.value})
    this.setState({sdata: this.sortData(e.target.value)})
  }
  sortData(h){
    let newdata = []
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
      {this.table(this.state)}
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
  const page = (<VictoryChart domainPadding={20}>
    <VictoryLabel text={props.y.y} x={50} y={30} textAnchor="middle"/>
    <VictoryLabel text="Time" x={410} y={270} textAnchor="middle"/>
    <VictoryLine
      data={props.y.sdata}
      x="Epochtime"
      y={props.y.y}
    />
    <VictoryAxis tickFormat={() => ""} />
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
