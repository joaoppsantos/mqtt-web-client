const MessageDisplay = ({ messages }) => (
  <div>
    {messages.map((message, index) => (
      <div key={index}>{message}</div>
    ))}
  </div>
);

export default MessageDisplay;
