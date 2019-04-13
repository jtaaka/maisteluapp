import React, {Component} from 'react';
import { Form, Container, Button, Alert, Row, Col } from 'react-bootstrap';

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
          alcoholPercent: 0.0,
          alert: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showAlert    = this.showAlert.bind(this);
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
      .then(r => {
        this.setState({alert: true});
      })
      .catch(e => console.log(e));
    }

    showAlert() {
      if (this.state.alert) {
        setTimeout(() => {
          this.setState({alert: false})
        }, 3000)
  
        return (
          <Alert variant="success">
            Successfully added beer {this.state.beerName}. 
          </Alert>
        );
      } 
    }

    render() {
        return(
            <Container id="addModifyBeer" className="rounded">
              <h1>Add Beer</h1>
                <div id="beerForm">

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
                        type="text"
                        value={this.state.alcoholPercent}
                        onChange={this.handleChange}
                      />
                  </Form.Group>
                  <div id="buttons">
                    <Button 
                      disabled={!this.state.beerName || !this.state.description || !this.state.alcoholPercent}
                      variant="success" type="submit">
                      Add beer
                    </Button>
                    <Row className="justify-content-center">
                      <Col xs={11} sm={11} md={8} lg={6} xl={5}>
                        {this.showAlert()}
                      </Col>
                    </Row>
                  </div>
                </Form>
              </div>
            </Container>
        );
    }

}

export default AddModifyBeer;