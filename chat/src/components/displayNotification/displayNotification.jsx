import logo from '../../chat.png';

const displayNotification = (messages) => {
  const spawnNotification = (body, theIcon, title) => {
    const options = {
      body,
      icon: theIcon,
    };
    const n = new Notification(title, options);
    setTimeout(n.close.bind(n), 4000);
  };

  if (messages[0] !== undefined) {
    spawnNotification(messages[0].message, logo, `${messages[0].from}, ${messages[0].time}`);
  }
};

export default displayNotification;
