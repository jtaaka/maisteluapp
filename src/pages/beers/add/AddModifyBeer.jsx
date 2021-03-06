import React, {Component} from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';

import {notificationSuccess, notificationError} from '../../../components/Notification'

import axios from 'axios';

import './AddModifyBeer.css';

/**
 * TODO: Implement a better way getting the alcoholPercent. Currently using a text field with no validation.
 */
class AddModifyBeer extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isModify: this.props.isModify !== undefined ? this.props.isModify : false,
          beerName: "",
          description: "",
          alcoholPercent: 0.0,
          imageFile: '',
          imageFileSrc: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      event.preventDefault();
      this.setState({[event.target.id] : event.target.value});    
    }

    componentWillMount(){
      if(this.state.isModify){
        axios.get("beers/" + this.props.match.params.id)
          .then((response) => {
            let beer = response.data[0];
            this.setState({beerName: beer.beerName,
              description: beer.description,
              alcoholPercent: beer.alcoholPercent
          })
          })
          .catch((error) => console.log(error))
      }
      
    }

    handleImageChange(event) {
      event.preventDefault();

      if(event.target.value.length > 0) {

        let fileReader = new FileReader();
        let file = event.target.files[0];

        fileReader.onloadend = () => {
          if(file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
            this.setState({
              imageFile: file,
              imageFileSrc: fileReader.result
            });
          } else {
            this.setState({
              imageFile: '',
              imageFileSrc: ''
            });
            notificationError('The file selected was not recognized as an image file!')
          }
        }
        fileReader.readAsDataURL(file);
      }
    }

    handleSubmit(event) {
      event.preventDefault();

      let requestBody = {
        beerName: this.state.beerName,
        description: this.state.description,
        alcoholPercent: this.state.alcoholPercent
      };
      /* BEER */
      if(!(this.state.isModify)){
        axios
        .put(
          'beers/add',
          JSON.stringify(requestBody)
        )
        .then((response) => {
          if(response.status === 200) {
            notificationSuccess("Succesfully added beer " + this.state.beerName + "!")

            /* After succesful PUT of a beer we POST the image to the backend server*/
            if(this.state.imageFile !== '') {
              var formData = new FormData();
              formData.append("file", this.state.imageFile);
              formData.append("beerId", response.data.id);
              axios.post('images/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then((response) => {
                notificationSuccess("Image uploaded succesfully!");
              }).catch((error) => {
                console.log(error);
                notificationError("Error while uploading an image!");
              });
            }

          }
        })
        .catch((error) => {
          notificationError("Error adding beer!");
        });
      } else {
        axios.post("beers/modify/" + this.props.match.params.id, JSON.stringify(requestBody))
          .then((response) => {
            if(response.status === 200){
              notificationSuccess("Succesfully modified beer " + this.state.beerName + "!")
              this.props.history.push("/tastingapp/beers/" + this.props.match.params.id);
            }
          }).catch((error) => notificationError("Error modifying beer"));
      }
      
      
    }

    render() {
        return(
            <Container id="add-beer-container" className="rounded">
            <Row className="justify-content-center">
                <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                  <h1 id="header1">{this.state.isModify ? "Modify beer" : "Add beer"}</h1>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="beerName">
                      <Form.Label>Beer name</Form.Label>
                      <Form.Control 
                        type="text"
                        value={this.state.beerName}
                        onChange={this.handleChange}
                      />
                  </Form.Group>
                  <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        maxLength="1000"
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                  </Form.Group>
                  <Form.Group controlId="alcoholPercent">
                      <Form.Label>Alcohol Percent</Form.Label>
                      <Form.Control 
                        type="number"
                        value={this.state.alcoholPercent}
                        onChange={this.handleChange}
                      />
                  </Form.Group>
                  <Form.Group className>
                  <Form.Label>Image</Form.Label>
                    <div className="custom-file">
                      <input
                        onChange={this.handleImageChange}
                        id="beer-img-upload"
                        type="file"
                        accept="image/x-png, image/jpg, image/jpeg, image/gif"
                        className="custom-file-input"
                        aria-describedby="beer-img-upload"
                        disabled={this.state.isModify}
                      />
                      <label className="custom-file-label" htmlFor="beer-img-upload">
                        {this.state.imageFile === '' ? 'Choose name' : this.state.imageFile.name}
                      </label>
                    </div>
                    {this.state.imageFileSrc !== '' ? <img alt="Preview" className="mt-3" id="previewimage" src={this.state.imageFileSrc}/> : ''}
                  </Form.Group>
                  <div id="buttons">
                    <Button 
                      disabled={!this.state.beerName || !this.state.description || !this.state.alcoholPercent}
                      variant="success" type="submit">
                      {this.state.isModify ? "Modify beer" : "Add beer"}
                    </Button>
                  </div>
                </Form>
                </Col>
              </Row>
            </Container>
        );
    }

}

export default AddModifyBeer;