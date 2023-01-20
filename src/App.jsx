import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    inputName: '',
    disableLogin: true,
    loadindScreen: false,
    logged: undefined,
  };

  handleLogin = ({ target }) => {
    const { value } = target;
    const minInput = 3;
    this.setState({
      inputName: value,
      disableLogin: value.length < minInput,
    });
  };

  clickLogin = () => {
    const { inputName } = this.state;
    this.setState({ loadindScreen: true });
    createUser({ name: inputName })
      .then((r) => this.setState({ logged: r,
        loadindScreen: false }));
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <p>TrybeTunes</p>

          <Login
            { ...this.state }
            handleLogin={ this.handleLogin }
            clickLogin={ this.clickLogin }
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
