import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (

        <Container>
          <Form id="signup-form" onSubmit={e => this.props.handle_signup(e, this.state)}>
            <h4>Sign Up</h4>

            <Form.Group controlId="fromBasicUsername">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control type="text"name="username" 
                    value={this.state.username} 
                    onChange={this.handle_change}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password"
                    value={this.state.password}
                    onChange={this.handle_change}/>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>

          </Form>
        </Container>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
