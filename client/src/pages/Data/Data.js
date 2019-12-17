import React from "react";
import {Container} from "react-bootstrap";
import ReactSearchBox from 'react-search-box'
import { Nav, Navbar, Dropdown, NavItem } from "react-bootstrap";

import { VictoryLine, VictoryChart, VictoryLabel, VictoryAxis } from 'victory';

const data = [
{date: 1, apple: 10},
{date: 2, apple: 11},
{date: 3, apple: 20},
{date: 4, apple: 50},
{date: 5, apple: 22},
{date: 6, apple: 10},
{date: 7, apple: 40},
{date: 8, apple: 22},
]
class App extends React.Component {
  render() {
    return (
      <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
      >
        <VictoryLabel text="Apple" x={30} y={30} textAnchor="middle"/>
        <VictoryLabel text="Day" x={410} y={270} textAnchor="middle"/>
        <VictoryLine
          data={data}
          x="date"
          y="apple"
      />
      </VictoryChart>
    )
  }
}

var selected = "Order By"
function onSelectOldest(){
  var x = document.getElementById("toggle");
  x.innerHTML = "Oldest";
}
function onSelectRecent(){
  var x = document.getElementById("toggle");
  x.innerHTML = "Recent";
}
export default function Data(){
  return (
    <div>
      <Container className="Title">
        <h1>Data page</h1>
        <hr />
      </Container>
      <div class = "container">
        <div class = "row">
          <div class = "col">
            <ReactSearchBox
              class = "col"
              placeholder="Search"
              data={data}
              callback={record => console.log(record)}
            />
          </div>
          <div>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle id = "toggle">{selected}</Dropdown.Toggle>
              <Dropdown.Menu alignRight={true}>
                <Dropdown.Item onClick = {onSelectOldest}>Oldest</Dropdown.Item>
                <Dropdown.Item onClick = {onSelectRecent}>Recent</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div class = "container">
          <App/>
        </div>
      </div>
    </div>
  );
}
