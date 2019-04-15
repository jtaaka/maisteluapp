import React, {Component} from 'react';

import { Container, Form, Dropdown, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import axios from 'axios';
import moment from 'moment';

import {CustomMenu} from '../../../components/CustomToggle';
import BeerCard from '../../../components/BeerCard'
import {notificationSuccess, notificationError} from '../../../components/Notification';

import 'react-datepicker/dist/react-datepicker.css';
import './CreateTastingSession.css';

class CreateTastingSession extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sessionName: "",
      startingDate: new Date(),
      additionalInfo: "",
      beerList: [],
      selectedBeers: [],
    }

    this.handleDateChange   = this.handleDateChange.bind(this);
    this.handleChange       = this.handleChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
    this.selectBeerFromList = this.selectBeerFromList.bind(this);
    this.removeSelectedBeer = this.removeSelectedBeer.bind(this);
  }

  componentWillMount() {

    axios.get(
      'beers/'
    )
    .then(response => {
      if(response.status === 200) {
        this.setState({beerList : response.data})
      }
    })
    .catch(function(response) {
      console.log(response);
    });

  }

  handleDateChange(date) {
    this.setState({startingDate: date});
  }

  selectBeerFromList(beerId) {
    let currentlySelectedBeers = this.state.selectedBeers.slice();

    let isAlreadySelected = false;

    for(let i = 0; i < currentlySelectedBeers.length; i++) {
      if(beerId === currentlySelectedBeers[i].id) {
        isAlreadySelected = true;
        break;
      }
    }

    if(!isAlreadySelected) {
      for(let i = 0; i < this.state.beerList.length; i++) {
        if(this.state.beerList[i].id === beerId) {

          currentlySelectedBeers.push(this.state.beerList[i]);

          this.setState({
            selectedBeers: currentlySelectedBeers
          });
        }
      }
    } else {
      notificationError("This drink is already selected.")
    }

  }

  removeSelectedBeer(beerId) {
    let currentlySelectedBeers = this.state.selectedBeers.slice();

    for(let i = 0; i < currentlySelectedBeers.length; i++) {
      if(beerId === currentlySelectedBeers[i].id) {
        currentlySelectedBeers.splice(i, 1);
        this.setState({selectedBeers:currentlySelectedBeers});
        break;
      }
    }
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  /**
   * TODO: Maybe create a seperate file for all the client -> server
   * calls. Using them like this is fucking messy. Will be done later..
   */
  handleSubmit(event) {
    event.preventDefault();
    
    let tastingSessionRequestBody = {
      name: this.state.sessionName,
      startingDate: moment(this.state.startingDate).format("DD-MM-YYYY HH:mm"),
      additionalInfo: this.state.additionalInfo
    };
  
    /* Creating the tasting session. */
    axios
      .put(
        'tastingsession/',
        JSON.stringify(tastingSessionRequestBody)
    )
    .then((response) => {
      if(response.status === 200) {
        let tastingSessionId = response.data.id;

        let beersArray = [];
    
        for(let i = 0; i < this.state.selectedBeers.length; i++) {
          let currentBeer = this.state.selectedBeers[i];
          beersArray.push({
            beerId: currentBeer.id,
            tastingSessionId: tastingSessionId
          });
        }

        /* Adding all the beers to the tasting session. */
        axios
          .put(
            'tastingsession/addbeers/',
            JSON.stringify(beersArray)
          )
          .then((response) => {
            if(response.status === 200)
              notificationSuccess("Tasting session created succesfully!");

          })
          .catch(e => {
            console.log(e);
            notificationError("Error while adding beers to tasting session!");
          });

      }
    })
    .catch(e => {
      console.log(e);
      notificationError("Error while creating tasting session!");
    });
  }

  render() {

    const selectableBeersElem = this.state.beerList.map((d) =>
        <Dropdown.Item beerid={d.id} onClick={() => this.selectBeerFromList(d.id)}>{d.beerName}</Dropdown.Item>
    );

    const selectedBeersElem = this.state.selectedBeers.map((d) =>
      <li key={d.id.toString()} className="beerItem">
        <Container>
          <Row>
            <BeerCard
                beerName={d.beerName}
                beerId={d.id}
                description={d.description}
                alcoholPercent={d.alcoholPercent}
            />
          </Row>
          <Row>
            <Col className="mt-3">
              <Button variant="danger" onClick={() => this.removeSelectedBeer(d.id)}>Remove</Button>
            </Col>
          </Row>
        </Container>
      </li>
    );

    return(
        <Container id="createTastingSession" className="rounded">
          <h1>Create tasting session</h1>
          <div id="tastingSessionForm">

            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="sessionName">
                <Form.Label>Tasting session name</Form.Label>
                <Form.Control 
                  type="text"
                  value={this.state.sessionName}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="startingDate">
                <Form.Label>Starting date and time</Form.Label>
                <Row className="justify-content-center">
                  <DatePicker 
                      id="startingDatePicker"
                      selected={this.state.startingDate}
                      onChange={this.handleDateChange}
                      showTimeSelect
                      dateFormat="d/MM/YYYY HH:mm"
                    />
                </Row>
              </Form.Group>

                <Form.Group controlId="additionalInfo">
                    <Form.Label>Additional info</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="5"
                      maxLength="2000"
                      value={this.state.additionalInfo}
                      onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Selected Beers</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle>Select beers</Dropdown.Toggle>
                      <Dropdown.Menu as={CustomMenu} id="selectBeersMenu">
                        {selectableBeersElem}
                      </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <div id="selectedBeers">
                  <ul id="selectedBeersList">
                    {selectedBeersElem}
                  </ul>
                </div>
                <div id="buttons">
                  <Button
                      variant="success"
                      type="submit"
                      disabled={!this.state.additionalInfo || (selectedBeersElem.length === 0) || !this.state.sessionName}
                  >Create tasting session</Button>
                </div>
              </Form>
          </div>
        </Container>
      );
  }
}

export default CreateTastingSession;