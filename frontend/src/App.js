import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';

const API_URL = 'http://192.168.1.64:8000'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: 'login',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch(API_URL + '/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ displayed_form: '', username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch(API_URL + '/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch(API_URL + 'api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, displayed_form: 'login', username: ''});
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : null}
        </h3>
      </div>
    );
  }
}

export default App;



/*
import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/card';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


const api = axios.create({
    baseURL: `http://192.168.1.64:8000/api`
})


export default class App extends React.Component {

    state = {
        posts: []
    }

    constructor() {
        super();
        api.get('/posts').then(res => {
            console.log(res.data.results);
            this.setState({ posts: res.data.results });
        })
    }
    
    render() {
        return (
            <div>

                <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Fakebook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav> 
                            <Nav.Link href="">Login</Nav.Link>
                            <Nav.Link href="">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container>
                {this.state.posts.map(post => 
                        <Card className="m-3">
                            <Card.Body> 
                                <Card.Title>{post.owner}</Card.Title>
                                <Card.Subtitle>{post.created}</Card.Subtitle>
                                <Card.Text>{post.content}</Card.Text>
                                <a href="#" class="card-link">Comments</a>
                            </Card.Body>
                        </Card>
                )}
                </Container>
            </div>
        )
    }
}
*/
