import React from 'react';
import { Form, Button } from 'react-bootstrap';

class RegistrationForm extends React.Component {
  state = {
    login: '',
  };

  onHandleChange = ({ target: { value } }) => {
    this.setState({ login: value });
  };

  onSubmitForm = async (e) => {
    e.preventDefault();
    const { login } = this.state;
    const { setLogin } = this.props;
    setLogin(login);
    this.setState({ login: '' });
  };

  render() {
    const { login } = this.state;
    return (
      <Form id="registration-form" onSubmit={this.onSubmitForm}>
        <Form.Label htmlFor="login">Login:</Form.Label>
        <Form.Control
          id="login"
          type="text"
          placeholder="your login"
          value={login}
          required
          onChange={this.onHandleChange}
        />
        <br />
        <Button variant="primary" type="submit">Sign in</Button>
        <br />
      </Form>
    );
  }
}

export default RegistrationForm;
