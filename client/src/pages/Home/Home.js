import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
));

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
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
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
