import React from "react";
import { Jumbotron, Container, Dropdown, NavItem } from "react-bootstrap";
import GoogleMapReact from 'google-map-react'

//some random points from the map for data sim
const center =  {
  center: {
    lat: 42.254009,
    lng: -72.360191
  },
  zoom: 15
}
const heatmapPoints =  [
  {lat: 42.255224, lng: -72.361650, weight: 6},
  {lat: 42.253517, lng: -72.358807, weight: .3},
  {lat: 42.255434, lng: -72.361450, weight: 3},
  {lat: 42.253317, lng: -72.356707, weight: 1}
]
const heatmapPoints2 =  [
  {lat: 42.255224, lng: -72.361650, weight: 4},
  // {lat: 42.253517, lng: -72.358807, weight: 1},
  // {lat: 42.255434, lng: -72.361450, weight: 1},
  // {lat: 42.253317, lng: -72.356707, weight: 3}
]


const apiKey = {key: ''} //my guess is we will not have a paid api key by demo time
var heatMapData = {
  positions: heatmapPoints,
  options: {
    radius: 20,
    opacity: 0.6
  }
}
const options = {mapTypeId: 'satellite'}

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
      <Jumbotron>
        <Container>
          <h1>Welcome to OrchardWatch!</h1>
          <p>We watch the Orchards and do cool data stuff.</p>
        </Container>
      </Jumbotron>
      <Container>
<<<<<<< HEAD
        <h1>
          Our Interative Heatmap
        </h1>
        <div style={{ height: "50vh", width: "100%" }}>
          <GoogleMapReact
            // ref={(el) => this._googleMap = el}
            bootstrapURLKeys={apiKey}
            defaultCenter={center.center}
            defaultZoom={center.zoom}
            heatmapLibrary={true}
            heatmap={heatMapData}
            options={options}
          ></GoogleMapReact>
=======
      <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
          // ref={(el) => this._googleMap = el}
          bootstrapURLKeys={apiKey}
          defaultCenter={center.center}
          defaultZoom={center.zoom}
          heatmapLibrary={true}
          heatmap={heatMapData}
          options={options}
        >
        </GoogleMapReact>
        <Dropdown as={NavItem}>
          <Dropdown.Toggle id="toggle">Measure to Display</Dropdown.Toggle>
          <Dropdown.Menu alignRight={true}>
            <Dropdown.Item onClick={datasetOne}>Temprature</Dropdown.Item>
            <Dropdown.Item onClick={datasetTwo}>Humidity</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
>>>>>>> 7926de8e7e2ca7dc444501822bb28adb9c838111

      {/* <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      /> */}
      </div>
      </Container>
      <Container>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar
          pharetra felis, id faucibus magna. Donec iaculis sagittis leo, at
          dictum metus volutpat eget. Praesent iaculis sit amet mauris ut
          euismod. Aliquam pulvinar consequat facilisis. Cras quis laoreet leo.
          Cras porttitor iaculis posuere. Maecenas pulvinar, risus non eleifend
          congue, mauris urna euismod nibh, at venenatis dolor diam id lectus.
          Ut ut congue mauris. Sed rhoncus commodo velit, a consectetur metus.
          Morbi justo tortor, aliquet non mi nec, tincidunt condimentum augue.
          Suspendisse elementum feugiat scelerisque. Integer cursus eros in eros
          facilisis, id pharetra eros ultrices. Donec aliquet risus eu aliquam
          elementum.
        </p>
      </Container>
    </div>
  );
}
