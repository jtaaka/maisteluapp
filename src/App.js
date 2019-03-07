import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

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
      </div>
    );
  }
}

export default App;
