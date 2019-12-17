import React from "react";
import { Container } from "react-bootstrap";
import ReactSearchBox from "react-search-box";
import { Nav, Navbar, Dropdown, NavItem } from "react-bootstrap";

import { VictoryLine, VictoryChart, VictoryLabel, VictoryAxis } from "victory";

const data = [
  {
    Epochtime: 1576475402,
    HoboID: "454-788",
    Humidity: 7,
    LeafWetness: 9,
    Rainfall: 83,
    SoilMoisture: 43,
    SolarRadiation: 323413,
    Temperature: 92,
    Wind: 6
  },
  {
    Epochtime: 1576475403,
    HoboID: "454-788",
    Humidity: 7,
    LeafWetness: 9,
    Rainfall: 83,
    SoilMoisture: 43,
    SolarRadiation: 323413,
    Temperature: 92,
    Wind: 6
  },
  {
    Epochtime: 1576475404,
    HoboID: "454-788",
    Humidity: 4,
    LeafWetness: 9,
    Rainfall: 83,
    SoilMoisture: 43,
    SolarRadiation: 323413,
    Temperature: 92,
    Wind: 6
  },
  {
    Epochtime: 1576475405,
    HoboID: "454-788",
    Humidity: 3,
    LeafWetness: 9,
    Rainfall: 83,
    SoilMoisture: 43,
    SolarRadiation: 323415,
    Temperature: 92,
    Wind: 6
  }
];
class Select extends React.Component {
  render() {
    let keys = Object.keys(data[0]);
    keys.shift();
    keys.shift();
    let optionItems = keys.map(k => (
      <option value={k} key={k}>
        {k}
      </option>
    ));
    return (
      <div>
        <select id="select">{optionItems}</select>
        <VictoryChart domainPadding={20}>
          <VictoryLabel text="Humidity" x={30} y={30} textAnchor="middle" />
          <VictoryLabel text="Epochtime" x={410} y={270} textAnchor="middle" />
          <VictoryLine data={data} x="Epochtime" y="Humidity" />
        </VictoryChart>
      </div>
    );
  }
}

var selected = "Order By";
function onSelectOldest() {
  var x = document.getElementById("toggle");
  x.innerHTML = "Oldest";
}
function onSelectRecent() {
  var x = document.getElementById("toggle");
  x.innerHTML = "Recent";
}

export default function Data() {
  return (
    <div>
      <Container className="Title">
        <h1>Data page</h1>
        <hr />
      </Container>
      <div className="container">
        <div className="row">
          <div className="col">
            <ReactSearchBox
              className="col"
              placeholder="Search"
              data={data}
              callback={record => console.log(record)}
            />
          </div>
          <div>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle id="toggle">{selected}</Dropdown.Toggle>
              <Dropdown.Menu alignRight={true}>
                <Dropdown.Item onClick={onSelectOldest}>Oldest</Dropdown.Item>
                <Dropdown.Item onClick={onSelectRecent}>Recent</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
