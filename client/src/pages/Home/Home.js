import React from "react";
import { Jumbotron, Container, Dropdown, NavItem, Row } from "react-bootstrap";
import GoogleMapReact from "google-map-react";
import "./Home.css";

//some random points from the map for data sim
const center = {
  center: {
    lat: 42.254009,
    lng: -72.360191
  },
  zoom: 15
};
const heatmapPoints = [
  { lat: 42.255224, lng: -72.36165, weight: 6 },
  { lat: 42.253517, lng: -72.358807, weight: 0.3 },
  { lat: 42.255434, lng: -72.36145, weight: 3 },
  { lat: 42.253317, lng: -72.356707, weight: 1 }
];
const heatmapPoints2 = [
  { lat: 42.255224, lng: -72.36165, weight: 4 }
  // {lat: 42.253517, lng: -72.358807, weight: 1},
  // {lat: 42.255434, lng: -72.361450, weight: 1},
  // {lat: 42.253317, lng: -72.356707, weight: 3}
];

const apiKey = { key: "" }; //my guess is we will not have a paid api key by demo time
var heatMapData = {
  positions: heatmapPoints,
  options: {
    radius: 20,
    opacity: 0.6
  }
};
const options = { mapTypeId: "satellite" };

var thisDataset = heatmapPoints;

function datasetOne() {
  heatMapData.positions = {};
}

function datasetTwo() {
  heatMapData.positions = heatmapPoints2;
}

export default function Home() {
  return (
    <div>
      <div className = "jumbotron">
        <Container class = "container">
          <h1>Welcome to Orchard Watch!</h1>
          <p>For the future of farming</p>
        </Container>
      </div>
      
      <Container>
        <h1>Interactive Heatmap</h1>
        <div style={{ height: "50vh", width: "100%" }}>
          <Dropdown as={NavItem}>
            <Dropdown.Toggle id="toggle">Measure to Display</Dropdown.Toggle>
            <Dropdown.Menu alignRight={true}>
              <Dropdown.Item onClick={datasetOne}>Temprature</Dropdown.Item>
              <Dropdown.Item onClick={datasetTwo}>Humidity</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <GoogleMapReact
            // ref={(el) => this._googleMap = el}
            bootstrapURLKeys={apiKey}
            defaultCenter={center.center}
            defaultZoom={center.zoom}
            heatmapLibrary={true}
            heatmap={heatMapData}
            options={options}
          ></GoogleMapReact>

          {/* <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          /> */}
        </div>
      </Container>
      <Container className="textPadding">
        <h1 className="header">How to Use</h1>
        <p className="lead paragraph">
        You can use the heatmap above to visual the data we collect and 
        analyze here at Orchard Watch. You can zoom in and scroll around 
        to look closely at where our sensors are placed within the orchard. 
        To change which type of data is being displayed, use the drop down 
        menu above the map. Our sensors collect data on temperature, humidity, 
        solar radiation, soil moisture, leaf wetness, rainfall, and wind speed. 
        Areas with high values or intensity red or orange, with values decreasing 
        as the colors change to yellow, green, and eventually to a clear overlay.
        </p>
      </Container>
    </div>
  );
}
