import React, { useState } from "react";
import { TwoDimensionalImage } from "react-annotation-tool";
import { Container } from "react-bootstrap";
import "./Annotate.css";

export default function Annotate() {
  const [defaultAnnotation, setDefaultAnnotation] = useState([
    {
      id: "jlvnw6az",
      name: "jlvnw6az",
      color: "rgba(227,0,255,1)",
      isClosed: true,
      vertices: [
        { id: "jlvnw6az", name: "jlvnw6az", x: 139.5625, y: 101 },
        { id: "jlvnw8qs", name: "jlvnw8qs", x: 239.25, y: 100 },
        { id: "jlvnwfhm", name: "jlvnwfhm", x: 230.25, y: 194 },
        { id: "jlvnwgoe", name: "jlvnwgoe", x: 155.25, y: 190 },
        { id: "jlvnwidd", name: "jlvnwidd", x: 133.25, y: 125 }
      ],
      selectedOptions: [{ id: "1-1-1", value: "Apple Scab" }]
    }
  ]);

  const [url, setUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Holding_Apple_with_scab.jpg/1280px-Holding_Apple_with_scab.jpg"
  );

  function handleNext() {
    console.log(defaultAnnotation);
    setDefaultAnnotation({});
    setUrl(
      "https://ohioline.osu.edu/sites/ohioline/files/imce/Plant_Pathology/PLPATH-FRU-23-Apple-scab-2.jpg"
    );
  }

  function handlePrevious() {
    console.log(defaultAnnotation);
    setDefaultAnnotation({});
    setUrl(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Holding_Apple_with_scab.jpg/1280px-Holding_Apple_with_scab.jpg"
    );
  }

  return (
    <div>
      <Container className="Title">
        <h1>Annotate</h1>
        <hr />
      </Container>
      <TwoDimensionalImage
        url={url}
        isDynamicOptionsEnable={true}
        isLabelOn={true}
        hasNextButton={true}
        hasPreviousButton={true}
        defaultAnnotations={defaultAnnotation}
        onNextClick={handleNext}
        onPreviousClick={handlePrevious}
      />
    </div>
  );
}
