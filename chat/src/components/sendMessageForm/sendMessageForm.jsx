import React from 'react';

export default class SendMessageForm extends React.Component {
  state = {
    textMessage: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ textMessage: value });
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { textMessage } = this.state;
    const { writeMessage } = this.props;
    writeMessage(textMessage);
    this.setState({ textMessage: '' });
  }

  render() {
    const { textMessage } = this.state;
    // const { login } = this.props;
    return (
      <form className="send-message-form" onSubmit={this.handleSubmitForm}>
        <input
          type="text"
          value={textMessage}
          required
          onChange={this.handleChange}
          placeholder="Type your message and hit ENTER"
        />
      </form>
    );
  }
}
