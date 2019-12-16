import React from "react";
import Gallery from 'react-grid-gallery';
import "./Gallery.css";
import {Container} from "react-bootstrap";

const IMAGES =
[
{
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},
{
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212
},
{
  src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
  thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 212,
  tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
  caption: "Boats (Jeshu John - designerspics.com)"
},
{
  src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
  thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 212,
  tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
  caption: "Boats (Jeshu John - designerspics.com)"
}
]
function onSelectImage (index, image) {
  var images = this.state.images.slice();
  var img = images[index];
  if(img.hasOwnProperty("isSelected"))
      img.isSelected = !img.isSelected;
  else
      img.isSelected = true;

  this.setState({
      images: images
  });
}
function getSelected(){
  var selectedArr = [];
  for(let i = 0; i < IMAGES.length; i++){
    if(IMAGES[i].isSelected){
      selectedArr.append(IMAGES[i]);
    }
  } 
  return selectedArr;
}
export default function Galler() {
  return (
    <div>
      <Container className="Title">
        <h1>Gallery</h1>
        <hr />
      </Container>
      <Container>
        <Gallery images={IMAGES} onSelectImage = {onSelectImage} />
      </Container>
    </div>
  );
}
