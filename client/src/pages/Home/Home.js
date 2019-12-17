import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import GoogleMapReact from 'google-map-react'


const center =  {
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 11
}
const heatmapPoints =  [
  {lat: 59.95, lng: 30.33},
  {lat: 59.96, lng: 30.32}
]
const apiKey = {key: ''} //my guess is we will not have a paid api key by demo time
const heatMapData = {
  positions: heatmapPoints,
  options: {
    radius: 20,
    opacity: 0.6
  }
}


export default function Home() {
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to OrchardWatch!</h1>
          <p>We watch the Orchards and do cool data stuff.</p>
        </Container>
      </Jumbotron>
      <Container>
      <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
          // ref={(el) => this._googleMap = el}
          bootstrapURLKeys={apiKey}
          defaultCenter={center.center}
          defaultZoom={center.zoom}
          heatmapLibrary={true}
          heatmap={heatMapData}
        >
        </GoogleMapReact>

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
