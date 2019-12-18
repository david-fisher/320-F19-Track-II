import React from "react";
import { Container, Button, Jumbotron } from "react-bootstrap";
import "./Predict.css";

function openFileExplorer() {
  document.getElementById("fileInput").click();
}

export default function Predict() {
  return (
    <Container>
      <Container className="jumb">
        <Jumbotron>
          <h1>Predict</h1>
          <hr />
          <p className="lead">
            Upload an image and click the predict button to see if your apple
            may have applescab using the magic of machine learning
          </p>
        </Jumbotron>
      </Container>

      <Button block onClick={openFileExplorer}>
        Predict
      </Button>

      <input className="hiddenFile" id="fileInput" type="file" />
    </Container>
  );
}
