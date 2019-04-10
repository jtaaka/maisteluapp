import React, {Component} from 'react';
import {Form, Container, Button} from 'react-bootstrap';

import {notificationSuccess, notificationError} from '../../../components/Notification'

import axios from 'axios';

import './AddModifyBeer.css';


/**
 * TODO: Add image uploading possibility.
 * TODO: Implement a better way getting the alcoholPercent. Currently using a text field with no validation.
 */
class AddModifyBeer extends Component {

    constructor(props) {
        super(props);
        this.state = {
          beerName: "",
          description: "",
          alcoholPercent: 0.0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      event.preventDefault();
      this.setState({[event.target.id] : event.target.value});    
    }

    handleSubmit(event) {
      event.preventDefault();

      let requestBody = {
        beerName: this.state.beerName,
        description: this.state.description,
        alcoholPercent: this.state.alcoholPercent
      };

      console.log(JSON.stringify(requestBody));

      axios
        .put(
          'beers/add',
          JSON.stringify(requestBody)
        )
      .then((response) => {
        if(response.status === 200) {
          notificationSuccess("Succesfully added beer " + this.state.beerName + "!");
        }
      })
      .catch(e => console.log(e));
    }

    render() {
        return(
            <div id="addModifyBeer">
            <Container>
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
                      <Form.Label>Alchohol Percent</Form.Label>
                      <Form.Control 
                        type="text"
                        value={this.state.alcoholPercent}
                        onChange={this.handleChange}
                      />
                  </Form.Group>
                  <div id="buttons">
                    <Button variant="success" type="submit">Add beer</Button>
                  </div>
                </Form>
              </Container>
            </div>
        );
    }

}

export default AddModifyBeer;