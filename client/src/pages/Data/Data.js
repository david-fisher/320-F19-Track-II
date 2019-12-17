import React from "react";
import { Container } from "react-bootstrap";
import ReactSearchBox from "react-search-box";
import { Dropdown, NavItem } from "react-bootstrap";

const data = [
  {
    key: "john",
    value: "John Doe"
  },
  {
    key: "jane",
    value: "Jane Doe"
  },
  {
    key: "mary",
    value: "Mary Phillips"
  },
  {
    key: "robert",
    value: "Robert"
  },
  {
    key: "karius",
    value: "Karius"
  }
];

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
