import React from 'react';
import cn from 'classnames';
import EmojiPicker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';

const jsemoji = new JSEMOJI();
jsemoji.img_set = 'emojione';
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
jsemoji.supports_css = false;
jsemoji.allow_native = true;
jsemoji.replace_mode = 'unified';

export default class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textMessage: '',
      emojiShown: true,
    };
  }

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

  addEmoji = (n, e) => {
    const { textMessage } = this.state;
    const emoji = jsemoji.replace_colons(`:${e.name}:`);
    this.setState({
      textMessage: textMessage + emoji,
    });
  }

  toogleEmojiState = () => {
    const { emojiShown } = this.state;
    this.setState({ emojiShown: !emojiShown });
  }

  render() {
    const { textMessage, emojiShown } = this.state;

    const emojiPickerWrap = {
      'emoji-table': true,
      'emoji-table-none': emojiShown,
    };

    return (
      <>
        <form className="send-message-form" onSubmit={this.handleSubmitForm}>
          <input
            type="text"
            value={textMessage}
            required
            onChange={this.handleChange}
            placeholder="Type your message and hit ENTER"
          />
        </form>
        <span id="show-emoji" role="img" aria-label="Snowman" onClick={this.toogleEmojiState}>😎</span>
        <div className={cn(emojiPickerWrap)}>
          <EmojiPicker onEmojiClick={this.addEmoji} />
        </div>
      </>
    );
  }
}
