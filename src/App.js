import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Calendar from './components/calendar';

class App extends Component {
  render() {
    return (
      <div>
        <Button variant="primary" size="lg" block>
          Hello World
        </Button>
        <Button variant="secondary" size="lg" block>
          Pitäiskö tätä projektia alkaa vääntää? =)
        </Button>
        <Calendar/>
      </div>
    );
  }
}

export default App;
