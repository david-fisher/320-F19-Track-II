import React from "react";
import { Container, Button } from "react-bootstrap";
import "./Predict.css";

function openFileExplorer(){
  document.getElementById("fileInput").click();
}

export default function Predict() {
  return (
    <Container>
      <h1>Predict</h1>
      <hr />
      <Button onClick={openFileExplorer}>
        Predict
      </Button>
      <p>
        Upload an image and click the predict button to see if your apple may have applescab
      </p>
      <input className="hiddenFile" id="fileInput" type="file" />
    </Container>
  );
}
