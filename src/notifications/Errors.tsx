import * as React from 'react';

// Iterate over each message object and print them
// in an unordered list
const Errors = (props: { errors: Message[], message: string }) => {
  const { errors, message } = props;
  return (<div>
    <h4>{message}</h4>
    <ul>
      {errors.map(({ time, body }) => (<li key={time}>{body}</li>))}
    </ul>
  </div>
  );
};

export default Errors;
