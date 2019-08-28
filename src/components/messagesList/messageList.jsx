import React from 'react';
import avatar from '../../avatar.png';

const MessageList = (props) => {
  const { messages, login } = props;
  return (
    <ul className="messages-list">
      {messages.map((message) => (
        <li className={message.from === login ? 'message me' : 'message'} key={message.id}>
          <img src={avatar} className={message.from === login ? 'avatar' : 'avatar-activ'} alt="" />
          <div className={message.from === login ? 'message-conteiner me' : 'message-conteiner'}>
            <div>
              {`${message.from}, ${message.time}`}
            </div>
            <div>
              {message.message}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
