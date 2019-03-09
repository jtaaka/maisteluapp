import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import Date from '../../components/date';
import Time from '../../components/time';

class Home extends Component {
  render() {
    return (
      <Container>
        <Button variant="primary" size="lg" block>
          Hello World
        </Button>
        <Button variant="secondary" size="lg" block>
          Pitäiskö tätä projektia alkaa vääntää? =)
        </Button>
        <Date/>
        <Time/>
      </Container>
    );
  }
}

export default Home;
