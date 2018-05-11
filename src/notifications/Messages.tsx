import * as React from 'react';

// Iterate over each message object and print them
// in an unordered list
const Messages = (props: { messages: Message[] }) => {
  const { messages } = props;
  return (<div>
    <ul>
      {messages.map(({ time, body }) => (<li key={time}>{body}</li>))}
    </ul>
  </div>
  );
};

export default Messages;
