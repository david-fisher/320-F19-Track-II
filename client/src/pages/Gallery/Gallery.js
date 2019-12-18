import React from "react";
import Gallery from "react-grid-gallery";
import "./Gallery.css";
import { Container, Button , Row} from "react-bootstrap";

/*let imgs = getImageList();*/

const images = [
  {
    src: "https://images.unsplash.com/photo-1537811465496-6c38a51d2d81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    thumbnail: "https://images.unsplash.com/photo-1537811465496-6c38a51d2d81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  },
  {
    src:"https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    thumbnail: "https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  },
  {
    src:"https://images.unsplash.com/photo-1507678386002-4529612b8413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    thumbnail: "https://images.unsplash.com/photo-1507678386002-4529612b8413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  },
  {
    src:"https://images.unsplash.com/photo-1508004649180-945547684c22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    thumbnail:"https://images.unsplash.com/photo-1508004649180-945547684c22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  },
  {
    src:"https://images.unsplash.com/photo-1507821455154-622e65d8ed08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    thumbnail:"https://images.unsplash.com/photo-1507821455154-622e65d8ed08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  },
  {
    src:"https://images.unsplash.com/photo-1475474369946-72bb667aae19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    thumbnail:"https://images.unsplash.com/photo-1475474369946-72bb667aae19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  },
  {
    src:"https://images.unsplash.com/photo-1510901409257-d6edc17ef120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    thumbnail:"https://images.unsplash.com/photo-1510901409257-d6edc17ef120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  },
  {
    src:"https://images.unsplash.com/photo-1507185649114-66cb498c55c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    thumbnail:"https://images.unsplash.com/photo-1507185649114-66cb498c55c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    src:"https://images.unsplash.com/photo-1452443191217-08a4f1f238e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    thumbnail:"https://images.unsplash.com/photo-1452443191217-08a4f1f238e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  },
  {
    src:"https://media.gettyimages.com/photos/fruit-orchard-growing-apples-grand-valley-western-colorado-picture-id1066035274?s=2048x2048",
    thumbnail:"https://media.gettyimages.com/photos/fruit-orchard-growing-apples-grand-valley-western-colorado-picture-id1066035274?s=2048x2048"
  },
  {
    src:"https://media.gettyimages.com/photos/rose-hip-and-portland-head-lighthouse-picture-id845293478?k=6&m=845293478&s=612x612&w=0&h=jV_TukCwtqJm9LDb51KkUwsiqxQEpHbgv_j47rePIgo=",
    thumbnail:"https://media.gettyimages.com/photos/rose-hip-and-portland-head-lighthouse-picture-id845293478?k=6&m=845293478&s=612x612&w=0&h=jV_TukCwtqJm9LDb51KkUwsiqxQEpHbgv_j47rePIgo="
  },
  {
    src:"https://media.gettyimages.com/photos/closeup-of-wet-apples-growing-on-fruit-tree-picture-id1094049164?k=6&m=1094049164&s=612x612&w=0&h=izXwn39ssu62E3BNR0Gh-5wkbTdrp4nJ5RpPyqYQG24=",
    thumbnail:"https://media.gettyimages.com/photos/closeup-of-wet-apples-growing-on-fruit-tree-picture-id1094049164?k=6&m=1094049164&s=612x612&w=0&h=izXwn39ssu62E3BNR0Gh-5wkbTdrp4nJ5RpPyqYQG24="
  },
  {
    src:"https://media.gettyimages.com/photos/closeup-of-apple-growing-on-branch-of-tree-picture-id691133169?k=6&m=691133169&s=612x612&w=0&h=E6-jqZsHT0seOL1gq61OVjLq_1F-rFS2a2F6dTgEvH8=",
    thumbnail:"https://media.gettyimages.com/photos/closeup-of-apple-growing-on-branch-of-tree-picture-id691133169?k=6&m=691133169&s=612x612&w=0&h=E6-jqZsHT0seOL1gq61OVjLq_1F-rFS2a2F6dTgEvH8="
  },
  {
    src:"https://media.gettyimages.com/photos/apple-orchards-picture-id172324482?k=6&m=172324482&s=612x612&w=0&h=EI05j5TNKbWg94pLT_a7DMXBeAUjpbiYabfbK5cajDc=",
    thumbnail:"https://media.gettyimages.com/photos/apple-orchards-picture-id172324482?k=6&m=172324482&s=612x612&w=0&h=EI05j5TNKbWg94pLT_a7DMXBeAUjpbiYabfbK5cajDc="
  }


  
]
/*
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
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      throw new Error("Server can't be reached!");
    }

    return response.body.images;

  });

 
  .then(json => {
    window.location.reload();
  })
  .catch(error => {
    alert("Invalid credentials");
  });
}
*/
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
/*
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
*/
export default function Galler() {
  return (
    
    <div>
      <Container className="Title">
        <h1>Gallery</h1>
        <hr />
      </Container>
      <Container>
        <Row>
          <Button>
            Delete selected images
          </Button>
          <Button>
            Upload Images
          </Button>
        </Row>
        <Gallery images={images} onSelectImage = {onSelectImage} />
      </Container>
    </div>
    
    
  );
}
