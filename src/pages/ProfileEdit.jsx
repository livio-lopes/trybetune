import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import LoadingScreen from '../components/LoadingScreen';

export default class ProfileEdit extends Component {
  state = {
    loaddingEdit: false,
    name: '',
    email: '',
    image: '',
    description: '',
    btnDisable: true,
    redirectToProfile: false,
  };

  componentDidMount() {
    this.initialState();
  }

  initialState = () => {
    this.setState({ loaddingEdit: true });
    getUser().then((r) => {
      this.setState({
        loaddingEdit: false,
        name: r.name,
        email: r.email,
        image: r.image,
        description: r.description,
        btnDisable: false,

      });
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validationForm();
  };

  validationForm = () => {
    const { name, email, image, description } = this.state;
    this.setState({
      btnDisable: !((name.length !== 0)
       && email.includes('@test.com')
       && (image.length !== 0)
       && (description.length !== 0)),
    });
  };

  handleClick = () => {
    const { name, email, image, description } = this.state;
    this.setState({ loaddingEdit: true });
    updateUser({ name, email, image, description })
      .then(() => {
        this.setState({
          loaddingEdit: false,
          redirectToProfile: true,
        });
      });
  };

  render() {
    const { loaddingEdit,
      redirectToProfile,
      name, email, image,
      description, btnDisable } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loaddingEdit && (<LoadingScreen />)}
        {redirectToProfile && (<Redirect to="/profile" />)}
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="edit-input-name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              type="text"
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              data-testid="edit-input-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              type="text"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <textarea
              name="description"
              cols="30"
              rows="10"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="image">
            Imagem:
            <input
              data-testid="edit-input-image"
              name="image"
              value={ image }
              onChange={ this.handleChange }
              type="text"
            />
          </label>
          <button
            data-testid="edit-button-save"
            type="button"
            disabled={ btnDisable }
            onClick={ this.handleClick }
          >
            Salvar

          </button>
        </form>
      </div>
    );
  }
}
