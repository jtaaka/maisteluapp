import React, {Component} from 'react';

import {Button, Collapse, Container, Form} from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Notification from '../../../components/Notification';

const MIN_RATING_VALUE = 0.00;
const MAX_RATING_VALUE = 5.00;
const MAX_RATING_COMMENT_LENGTH = 500;

class RatingComponent extends Component {
  constructor(props, context) {
    console.log(props)
    super(props, context);

    this.state = {
      open: false,
      user: this.props.user,
      userHasAlreadyRated: false,
      beerId: this.props.beerId,
      ratingValue: 0,
      ratingComment: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.postRating = this.postRating.bind(this);
  }

  componentWillMount() {
    this.state.user.getRating(this.state.beerId)
      .then((response) => {
        if(response.status === 200) {
          this.setState({
            userHasAlreadyRated: true,
            ratingValue: response.data.ratingValue,
            ratingComment: response.data.comment
          });
        }
    }).catch(error => console.log(error));
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSliderChange = event => {
    this.setState({ratingValue: event});
  };

  postRating() {
    Notification.addNotification();
    this.state.user.rateBeer(this.state.beerId, this.state.ratingValue, this.state.ratingComment)
    .then((response) => {

    })
    .catch((error) => console.log(error));
  }



  render() {
    const { open } = this.state;
    return (
      <div>
        <Button
          variant="info"
          onClick={() => this.setState({ open: !open })}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Rating
        </Button>
        <Collapse in={this.state.open} >
          <Form className="mt-3">
            <p>Value: {this.state.ratingValue}</p>
            <Slider
              value={this.state.ratingValue}
              min={MIN_RATING_VALUE}
              max={MAX_RATING_VALUE}
              step={0.25}
              onChange={this.handleSliderChange}
            />
            <p>Comment:</p>
            <Form.Group controlId="ratingComment">
              <Form.Control
                value={this.state.ratingComment}
                onChange={this.handleChange}
                as="textarea" 
                rows="3" 
                maxLength={MAX_RATING_COMMENT_LENGTH} 
                placeholder="Describe the drink in few words.." />
            </Form.Group>
            <Button onClick={this.postRating} className="mt-3" variant={this.state.userHasAlreadyRated ? "warning" : "success"}>
              {this.state.userHasAlreadyRated ? "Update rating" : "Submit rating"}
            </Button>
          </Form>
        </Collapse>
        </div>
    );
  }
}

export default RatingComponent;