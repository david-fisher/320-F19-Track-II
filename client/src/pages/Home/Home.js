import React from "react";
import { Jumbotron, Container, Dropdown, NavItem, Row } from "react-bootstrap";
import GoogleMapReact from "google-map-react";
import "./Home.css";

const data = [
        {
          "Epochtime": 1576475402,
          "HoboID": "454-788",
          "Humidity": 7,
          "LeafWetness": 9,
          "Rainfall": 83,
          "SoilMoisture": 43,
          "SolarRadiation": 343413,
          "Temperature": 92,
          "Wind": 4
        },
        {
          "Epochtime": 1576475403,
          "HoboID": "454-788",
          "Humidity": 8,
          "LeafWetness": 9,
          "Rainfall": 83,
          "SoilMoisture": 43,
          "SolarRadiation": 323444,
          "Temperature": 12,
          "Wind": 7
        },
        {
          "Epochtime": 1576475404,
          "HoboID": "454-788",
          "Humidity": 4,
          "LeafWetness": 5,
          "Rainfall": 73,
          "SoilMoisture": 43,
          "SolarRadiation": 323413,
          "Temperature": 92,
          "Wind": 6
        },
        {
          "Epochtime": 1576475405,
          "HoboID": "454-788",
          "Humidity": 3,
          "LeafWetness": 2,
          "Rainfall": 83,
          "SoilMoisture": 13,
          "SolarRadiation": 344415,
          "Temperature": 92,
          "Wind": 6
        },
        {
          "Epochtime": 1576475402,
          "HoboID": "454-789",
          "Humidity": 1,
          "LeafWetness": 9,
          "Rainfall": 83,
          "SoilMoisture": 43,
          "SolarRadiation": 343413,
          "Temperature": 92,
          "Wind": 4
        },
        {
          "Epochtime": 1576475406,
          "HoboID": "454-789",
          "Humidity": 1,
          "LeafWetness": 9,
          "Rainfall": 83,
          "SoilMoisture": 43,
          "SolarRadiation": 343413,
          "Temperature": 92,
          "Wind": 4
        },
        {
          "Epochtime": 1576475404,
          "HoboID": "454-789",
          "Humidity": 4,
          "LeafWetness": 5,
          "Rainfall": 73,
          "SoilMoisture": 43,
          "SolarRadiation": 323413,
          "Temperature": 32,
          "Wind": 6
        },
        {
          "Epochtime": 1576475402,
          "HoboID": "454-789",
          "Humidity": 3,
          "LeafWetness": 2,
          "Rainfall": 83,
          "SoilMoisture": 13,
          "SolarRadiation": 344415,
          "Temperature": 92,
          "Wind": 6
        }

]
//some random points from the map for data sim
const center = {
  center: {
    lat: 42.254009,
    lng: -72.360191
  },
  zoom: 15
};

const apiKey = { key: "" }; //my guess is we will not have a paid api key by demo time
const options = { mapTypeId: "satellite" };
class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      heatMapData: {
        positions: [
          { lat: 42.255224, lng: -72.36165, weight: 7 },
          { lat: 42.253517, lng: -72.35880, weight: 1 }
        ],
        options: {
          radius: 20,
          opacity: 0.6
        }
      }
    };
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(e) {
      this.setState({
        heatMapData: {
          positions: [
            { lat: 42.255224, lng: -72.36165,
              weight: this.setHoboData([e.target.value, "454-788"]) },
            { lat: 42.253517, lng: -72.35880,
              weight: this.setHoboData([e.target.value, "454-789"]) }
          ],
          options: {
            radius: 20,
            opacity: 0.6
          }
        }
      })
      console.log(this.state.heatMapData)
    }
  setHoboData(param){
    for(let i=0; i<data.length; i++){
      if(data[i].HoboID==param[1] && data[i].Epochtime==1576475402){
        switch (param[0]) {
          case "Humidity":
            return data[i].Humidity;
          case "LeafWetness":
            return data[i].LeafWetness;
          case "Rainfall":
            return data[i].Rainfall;
          case "SoilMoisture":
            return data[i].SoilMoisture;
          case "SolarRadiation":
            return data[i].SolarRadiation;
          case "Temperature":
            return data[i].Temperature;
          case "Wind":
            return data[i].Wind;
        }
      }

    }
  }


<<<<<<< HEAD
  render() {
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
            <select  onChange={this.handleSelect}>
              <option value="Humidity"> Humidity </option>
              <option value="LeafWetness"> LeafWetness </option>
              <option value="Rainfall"> Rainfall </option>
              <option value="SoilMoisture"> SoilMoisture </option>
              <option value="SolarRadiation"> SolarRadiation </option>
              <option value="Temperature"> Temperature </option>
              <option value="Wind"> Wind </option>
            </select>
            <GoogleMapReact
              // ref={(el) => this._googleMap = el}
              bootstrapURLKeys={apiKey}
              defaultCenter={center.center}
              defaultZoom={center.zoom}
              heatmapLibrary={true}
              heatmap={this.state.heatMapData}
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
}
export default function Data(){
  return (
    <div>
      <Container className="Title">
        <h1>Data page</h1>
        <hr />
=======
export default function Home() {
  return (
    <div>
      <div className="jumb">
        <Container class="container">
          <Jumbotron>
            <h1>Welcome to Orchard Watch!</h1>
            <p>For the future of farming</p>
          </Jumbotron>
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
          You can use the heatmap above to visual the data we collect and analyze 
          here at Orchard Watch. You can zoom in and scroll around to look 
          closely at where our sensors are placed within the orchard. To change 
          which type of data is being displayed, use the drop down menu above the 
          map. Our sensors collect data on temperature, humidity, solar radiation, 
          soil moisture, leaf wetness, rainfall, and wind speed. Areas with high 
          values or intensity red or orange, with values decreasing as the colors 
          change to yellow, green, and eventually to a clear overlay.
        </p>
>>>>>>> 61c7375d40bde932986fec9d26a024e59b7fe43b
      </Container>
      <div className = "container">
        <Map/>
      </div>
    </div>
  );
}
