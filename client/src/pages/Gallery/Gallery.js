import React from "react";
import Gallery from 'react-grid-gallery';
import "./Gallery.css";
import {Container, Button} from "react-bootstrap";

let imgs = getImageList();/*
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
]*/
function getImageList(){
  fetch(
    "https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/get-image",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        StartTime: "1576627936",
        EndTime: "1577027936"
      })
    }
  )
  .then(response => {
    /*if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      throw new Error("Server can't be reached!");
    }*/

    return response.body.images;

  });/*
  .then(json => {
    window.location.reload();
  })
  .catch(error => {
    alert("Invalid credentials");
  });*/
}
/*
  function handleSubmit(event) {
    event.preventDefault();

    if (password !== "password") {
      alert("Invalid password");
    } else {
      fetch(
        "https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/user-login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Email: "test@test.com",
            Password: "password"
          })
        }
      )
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw new Error("Server can't be reached!");
          }
        })
        .then(json => {
          console.log("hooray! we have json!");
          console.log(json);
          const cookies = new Cookies();
          cookies.set("name", "David", { path: "/" });
          cookies.set("token", "test_token_value", { path: "/" });
          alert("Logged in");
          window.location.reload();
        })
        .catch(error => {
          alert("Invalid credentials");
        });
    }
  }
*/

function onSelectImage (index, image) {
  let images = this.state.images.slice();
  let img = images[index];
  if(img.hasOwnProperty("isSelected"))
      img.isSelected = !img.isSelected;
  else
      img.isSelected = true;

  this.setState({
      images: images
  });
}

function getSelected(){
  let selectedArr = [];
  for(let i = 0; i < imgs.length; i++){
    if(imgs[i].isSelected){
      selectedArr.push(imgs[i]);
    }
  } 
  return selectedArr;
}

function getNonSelected(){
  let nonSelected = [];
  for (let i = 0; i < imgs.length; i++){
    let img = imgs[i];
    if(!img.isSelected){
      nonSelected.push(img);
    }
  }
  return nonSelected;
}

function deleteSelected(){
  console.log(imgs)
  imgs = getNonSelected();
}

function getImages(){
  return imgs;
}

export default function Galler() {
  return (
    <div>
      <Container className="Title">
        <h1>Gallery</h1>
        <hr />
      </Container>
      <Container>
        <Button onClick={deleteSelected} >
          Delete selected images
        </Button>
        <Gallery images={getImages()} onSelectImage = {onSelectImage} />
      </Container>
    </div>
  );
}
