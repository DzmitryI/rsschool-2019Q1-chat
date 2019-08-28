import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';

class Title extends React.Component {
  onClick = () => {
    const { setLogin } = this.props;
    setLogin('');
  }

  render() {
    const { status } = this.props;
    return (
      <header className="header">
        <Nav variant="pills" activeKey="1">
          <NavDropdown variant="primary" title="&#9776;" id="nav-dropdown">
            <NavDropdown.Item eventKey="2" onClick={this.onClick}>Sign out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <span className="title">Chat app</span>
        <div className="connect-status" style={{ background: status === true ? 'green' : 'red' }} />
      </header>
    );
  }
}

export default Title;
