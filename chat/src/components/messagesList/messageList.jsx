import React from 'react';

const MessageList = (props) => {
  const { messages, login } = props;
  return (
    <ul className="message-list">
      {messages.map((message) => (
        <li className={message.from === login ? 'message me' : 'message'} key={message.id}>
          <div>
            {`${message.from}, ${message.time}`}
          </div>
          <div>
            {message.message}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
