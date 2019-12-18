import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import ReactSearchBox from "react-search-box";
import { Nav, Navbar, Dropdown, NavItem } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {
  VictoryLine,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
  VictoryTheme
} from "victory";

const data = [
  {
    Epochtime: 1576475402,
    HoboID: "454-788",
    Humidity: 7,
    LeafWetness: 9,
    Rainfall: 83,
    SoilMoisture: 43,
    SolarRadiation: 343413,
    Temperature: 92,
    Wind: 4
  },
  {
    Epochtime: 1576475403,
    HoboID: "454-788",
    Humidity: 7,
    LeafWetness: 9,
    Rainfall: 83,
    SoilMoisture: 43,
    SolarRadiation: 323444,
    Temperature: 12,
    Wind: 7
  },
  {
    Epochtime: 1576475404,
    HoboID: "454-788",
    Humidity: 4,
    LeafWetness: 5,
    Rainfall: 73,
    SoilMoisture: 43,
    SolarRadiation: 323413,
    Temperature: 92,
    Wind: 6
  },
  {
    Epochtime: 1576475405,
    HoboID: "454-788",
    Humidity: 3,
    LeafWetness: 2,
    Rainfall: 83,
    SoilMoisture: 13,
    SolarRadiation: 344415,
    Temperature: 92,
    Wind: 6
  },
  {
    Epochtime: 1576475402,
    HoboID: "454-789",
    Humidity: 1,
    LeafWetness: 9,
    Rainfall: 83,
    SoilMoisture: 43,
    SolarRadiation: 343413,
    Temperature: 92,
    Wind: 4
  },
  {
    Epochtime: 1576475403,
    HoboID: "454-789",
    Humidity: 3,
    LeafWetness: 9,
    Rainfall: 73,
    SoilMoisture: 73,
    SolarRadiation: 327444,
    Temperature: 12,
    Wind: 5
  },
  {
    Epochtime: 1576475404,
    HoboID: "454-789",
    Humidity: 4,
    LeafWetness: 5,
    Rainfall: 73,
    SoilMoisture: 43,
    SolarRadiation: 323413,
    Temperature: 32,
    Wind: 6
  },
  {
    Epochtime: 1576475405,
    HoboID: "454-789",
    Humidity: 3,
    LeafWetness: 2,
    Rainfall: 83,
    SoilMoisture: 13,
    SolarRadiation: 344415,
    Temperature: 92,
    Wind: 6
  }
];
class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: "Humidity",
      hobo: "454-788",
      sdata: this.sortData("454-788")
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectHobo = this.handleSelectHobo.bind(this);
    this.handleSelectHobo = this.handleSelectHobo.bind(this);

    // this.renderTableHeader = this.renderTableHeader.bind(this);
    // this.renderTableData = this.renderTableData.bind(this);
    // this.table = this.table.bind(this);

    this.sortData = this.sortData.bind(this);
  }

  // renderTableData(props) {
  //   let ret = [];
  //   let d = new Date(0);
  //   for (let i = 0; i < props.length; i++) {
  //     ret.push(
  //       <tr key={i}>
  //         <td key={props[i].Epochtime}>
  //           {new Date(props[i].Epochtime)
  //             .toString()
  //             .slice(0, 10)
  //             .replace(/-/g, "")}
  //         </td>
  //         <td key={props[i].HoboID}>{props[i].HoboID}</td>
  //         <td key={props[i].Humidity}>{props[i].Humidity}</td>
  //         <td key={props[i].LeafWetness}>{props[i].LeafWetness}</td>
  //         <td key={props[i].Rainfall}>{props[i].Rainfall}</td>
  //         <td key={props[i].SoilMoisture}>{props[i].SoilMoisture}</td>
  //         <td key={props[i].SolarRadiation}>{props[i].SolarRadiation}</td>
  //         <td key={props[i].Temperature}>{props[i].Temperature}</td>
  //         <td key={props[i].Wind}>{props[i].Wind}</td>
  //       </tr>
  //     );
  //   }
  //   console.log(ret);
  //   return ret;
  // }
  // renderTableHeader(props) {
  //   let ret = [];
  //   for (let i = 0; i < props.length; i++) {
  //     ret.push(<th id={props[i]}>{props[i]}</th>);
  //   }
  //
  //   return ret;
  // }
  // table(props) {
  //   const page = (
  //     <tbody>
  //       {this.renderTableHeader(Object.keys(props.sdata[0]))}
  //       {this.renderTableData(props.sdata)}
  //     </tbody>
  //   );
  //   console.log(page);
  //   return page;
  // }

  handleSelect(e) {
    this.setState({ y: e.target.value });
  }
  handleSelectHobo(e) {
    this.setState({ hobo: e.target.value });
    this.setState({ sdata: this.sortData(e.target.value) });
  }
  sortData(h) {
    let newdata = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].HoboID == h) {
        newdata.push(data[i]);
      }
    }
    return newdata;
  }
  render() {
    return (
      <div>
        <select onChange={this.handleSelectHobo}>
          <option value="454-788"> 454-788 </option>
          <option value="454-789"> 454-789 </option>
        </select>
        <select onChange={this.handleSelect}>
          <option value="Humidity"> Humidity </option>
          <option value="LeafWetness"> LeafWetness </option>
          <option value="Rainfall"> Rainfall </option>
          <option value="SoilMoisture"> SoilMoisture </option>
          <option value="SolarRadiation"> SolarRadiation </option>
          <option value="Temperature"> Temperature </option>
          <option value="Wind"> Wind </option>
        </select>
        <Graph y={this.state} />
        {/*{this.table(this.state)}*/}
      </div>
    );
  }
}

function Graph(props) {
  const page = (
    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
      <VictoryLabel text={props.y.y} x={50} y={30} textAnchor="middle" />
      <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
      <VictoryLine data={props.y.sdata} x="Epochtime" y={props.y.y} />
      <VictoryAxis tickFormat={() => ""} />
      <VictoryAxis dependentAxis />
    </VictoryChart>
  );
  return page;
}

export default function Data() {
  function downloadData() {
    let csv =
      encodeURI("data:text/csv;charset=utf-8,") +
      'Epochtime, 1576475402, HoboID, "454-788", Humidity, 7, LeafWetness, 9, Rainfall, 23, SoilMoisture, 43, SolarRadiation, 343413, Temperature: 92, Wind, 4' +
      'Epochtime, 1576475403, HoboID, "454-788", Humidity, 9, LeafWetness, 4, Rainfall, 83, SoilMoisture, 63, SolarRadiation, 341233, Temperature: 12, Wind, 1' +
      'Epochtime, 1576475404, HoboID, "454-788", Humidity, 7, LeafWetness, 2, Rainfall, 53, SoilMoisture, 43, SolarRadiation, 343413, Temperature: 42, Wind, 4' +
      'Epochtime, 1576475405, HoboID, "454-788", Humidity, 6, LeafWetness, 9, Rainfall, 73, SoilMoisture, 13, SolarRadiation, 344412, Temperature: 52, Wind, 7' +
      'Epochtime, 1576475406, HoboID, "454-789", Humidity, 1, LeafWetness, 9, Rainfall, 73, SoilMoisture, 33, SolarRadiation, 351411, Temperature: 72, Wind, 6' +
      'Epochtime, 1576475407, HoboID, "454-789", Humidity, 2, LeafWetness, 5, Rainfall, 33, SoilMoisture, 63, SolarRadiation, 332133, Temperature: 92, Wind, 3';
    return csv;
  }
  return (
    <div>
      <Container className="Title">
        <h1>HoboNet Data</h1>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Time</th>
              <th>HoboID</th>
              <th>Humidity</th>
              <th>Leaf Wetness</th>
              <th>Rainfall</th>
              <th>Soil Moisture</th>
              <th>Solar Radiation</th>
              <th>Temperature</th>
              <th>Wind</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12-16-19 7:34AM</td>
              <td>454-788</td>
              <td>7</td>
              <td>9</td>
              <td>83</td>
              <td>43</td>
              <td>343413</td>
              <td>92</td>
              <td>4</td>
            </tr>
            <tr>
              <td>12-16-19 7:35AM</td>
              <td>454-788</td>
              <td>7</td>
              <td>9</td>
              <td>83</td>
              <td>43</td>
              <td>323444</td>
              <td>12</td>
              <td>7</td>
            </tr>
            <tr>
              <td>12-16-19 7:36AM</td>
              <td>454-788</td>
              <td>7</td>
              <td>9</td>
              <td>83</td>
              <td>43</td>
              <td>323444</td>
              <td>12</td>
              <td>7</td>
            </tr>
            <tr>
              <td>12-16-19 7:36AM</td>
              <td>454-788</td>
              <td>4</td>
              <td>5</td>
              <td>73</td>
              <td>43</td>
              <td>323413</td>
              <td>92</td>
              <td>6</td>
            </tr>
            <tr>
              <td>12-16-19 7:32AM</td>
              <td>454-789</td>
              <td>1</td>
              <td>9</td>
              <td>83</td>
              <td>43</td>
              <td>343413</td>
              <td>92</td>
              <td>4</td>
            </tr>
            <tr>
              <td>12-16-19 7:33AM</td>
              <td>454-789</td>
              <td>3</td>
              <td>9</td>
              <td>73</td>
              <td>73</td>
              <td>327444</td>
              <td>12</td>
              <td>5</td>
            </tr>
            <tr>
              <td>12-16-19 7:34AM</td>
              <td>454-789</td>
              <td>4</td>
              <td>5</td>
              <td>73</td>
              <td>43</td>
              <td>323413</td>
              <td>32</td>
              <td>6</td>
            </tr>
            <tr>
              <td>12-16-19 7:35AM</td>
              <td>454-789</td>
              <td>3</td>
              <td>2</td>
              <td>83</td>
              <td>13</td>
              <td>344415</td>
              <td>92</td>
              <td>6</td>
            </tr>
          </tbody>
        </Table>
        <Button block href={downloadData()} download="data.csv">
          Download
        </Button>
      </Container>
      <Container>
        <hr />
        <h1>Visualize</h1>
        <hr />
        <Select />
      </Container>
    </div>
  );
}
