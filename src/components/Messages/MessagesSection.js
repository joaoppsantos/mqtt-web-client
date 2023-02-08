export const MessagesSection = ({
  setTopic,
  setMessage,
  handlePublish,
  topic,
  message,
  client,
}) => (
  <>
    <h3>Messages</h3>
    <form>
      <label>
        TOPIC:
        <input
          className="label"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </label>
      <br />
      <label>
        MESSAGE:
        <input
          className="label"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <br />
      <div className="button">
        <button onClick={(e) => handlePublish(e, client)}>
          Publish Message
        </button>
      </div>
    </form>
  </>
);
