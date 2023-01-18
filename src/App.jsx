import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <p>TrybeTunes</p>
          <Login />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
