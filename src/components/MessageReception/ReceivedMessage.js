export const ReceivedMessage = ({ message, topic }) => (
  <p>
    RECEIVED MESSAGE: {message} {topic && <span>FROM {topic}</span>}
  </p>
);
