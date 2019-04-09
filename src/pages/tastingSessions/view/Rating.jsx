import React, {Component} from 'react';

import {Button, Collapse, Container, Form} from 'react-bootstrap';
import Slider from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

const MIN_RATING_VALUE = 0.00;
const MAX_RATING_VALUE = 5.00;
const MAX_RATING_COMMENT_LENGTH = 500;

class RatingComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      user: this.props.user,
      beerId: this.props.beerId,
      ratingValue: 0,
      ratingComment: ''
    };

    this.postRating = this.postRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  postRating() {
    this.state.user.rateBeer(this.state.beerId, this.state.ratingValue, this.state.ratingComment)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
  }

  handleChange(event) {
    console.log('asdas')
    this.setState({[event.target.id]: event.target.value});
  }

  handleSliderChange = event => {
    this.setState({ratingValue: event});
  };

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
            <Form.Control
              as="textarea" 
              rows="3" 
              maxLength={MAX_RATING_COMMENT_LENGTH} 
              value={this.state.ratingComment}
              onChange={this.handleChange}
              placeholder="Describe the drink in few words.." />
            <Button onClick={this.postRating} className="mt-3" variant="success">
              Submit rating
            </Button>
          </Form>
        </Collapse>
        </div>
    );
  }
}

export default RatingComponent;