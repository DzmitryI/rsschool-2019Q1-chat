import React from 'react';
import ReactModal from 'react-modal';
import RegistrationForm from './components/registrationForm';
import Title from './components/title';
import MessageList from './components/messagesList';
import SendMessageForm from './components/sendMessageForm';
import DisplayNotification from './components/displayNotification';
import './App.css';

let focusPage = true;
window.onfocus = () => {
  focusPage = true;
};
window.onblur = () => {
  focusPage = false;
};

export default class App extends React.Component {
  client = null;

  writeMessage = this.writeMessage.bind(this);

  setLogin = this.setLogin.bind(this);

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      messages: [],
      sendMessages: [],
      status: false,
      showModal: true,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('login') !== '') {
      const loginPrew = localStorage.getItem('login');
      this.setState({ login: loginPrew, showModal: false });
      this.start();
    }
  }

  componentDidUpdate() {
    const { messages } = this.state;
    if (this.client !== null) {
      this.sendMessage();
    }
    if (!focusPage) {
      DisplayNotification(messages);
    }
  }

  setLogin(text) {
    this.setState({ login: text, showModal: text === '' });
    localStorage.setItem('login', text);
    if (text !== '') {
      this.start();
    } else {
      this.client.close();
      this.setState({ status: true, messages: [] });
    }
  }

  changeDate = (milliseconds) => {
    let hours = `${new Date(milliseconds).getHours()}`.slice(-2);
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = `${new Date(milliseconds).getMinutes()}`.slice(-2);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    const time = `${hours}:${minutes}`;
    return time;
  }

  start() {
    this.client = new WebSocket('wss://wssproxy.herokuapp.com/');
    this.client.onopen = () => this.setState({ status: true, messages: [] });
    this.client.onclose = () => {
      this.setState({ status: false });
      this.reconnect();
    };
    this.client.onmessage = ({ data }) => {
      const { messages } = this.state;
      const newData = JSON.parse(data);
      newData.map((item) => { item.time = this.changeDate(item.time); });
      if (this.client.readyState !== 3 && this.client.readyState !== 0) {
        this.setState({ messages: [...newData, ...messages] });
      }
    };
  }

  reconnect() {
    const { login } = this.state;
    if (login !== '') {
      if (!this.client || this.client.readyState === 3) this.start();
    }
  }

  writeMessage(text) {
    const { login, sendMessages } = this.state;
    const newMessage = { login, text, send: false };
    this.setState({ sendMessages: [newMessage, ...sendMessages] });
  }

  sendMessage() {
    const { sendMessages } = this.state;
    if (this.client.readyState !== 3 && this.client.readyState !== 0) {
      sendMessages.filter((sendMessage) => sendMessage.send === false).map((value) => {
        this.client.send(JSON.stringify({ from: `${value.login}`, message: `${value.text}` }));
        value.send = true;
      });
    }
  }

  render() {
    const {
      messages,
      login,
      status,
      showModal,
    } = this.state;
    return (
      <section className="app">
        <Title setLogin={this.setLogin} status={status} />
        <MessageList messages={messages} login={login} />
        <SendMessageForm login={login} writeMessage={this.writeMessage} />
        <ReactModal isOpen={showModal}>
          <section className="fegistration-form-wrap">
            <RegistrationForm setLogin={this.setLogin} />
          </section>
        </ReactModal>
      </section>
    );
  }
}
