import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingScreen from '../components/LoadingScreen';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loadingProfile: false,
  };

  componentDidMount() {
    this.recoveryUser();
  }

  recoveryUser = () => {
    this.setState({
      loadingProfile: true,
    });
    getUser().then((r) => {
      this.setState({
        name: r.name,
        email: r.email,
        image: r.image,
        description: r.description,
        loadingProfile: false,
      });
    });
  };

  render() {
    const { loadingProfile, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loadingProfile && (<LoadingScreen />)}

        <p>
          {name }
        </p>
        <p>
          {name }
        </p>
        <p>

          {email}

        </p>
        <p>

          {description}

        </p>
        <img
          data-testid="profile-image"
          src={ image }
          alt={ name }
        />
        <Link to="/profile/edit"> Editar perfil </Link>
      </div>
    );
  }
}

//atualizando requisito 13