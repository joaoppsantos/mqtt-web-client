export const TopicSection = ({
  topicCandidate,
  setTopicCandidate,
  handleSubscribe,
  subscribedTopic,
}) => (
  <>
    <h3>Topics</h3>
    <form>
      <label>
        SUBSCRIBE TO:
        <input
          className="label"
          type="text"
          value={topicCandidate}
          onChange={(e) => setTopicCandidate(e.target.value)}
        />
      </label>
      <br />
      <div className="button">
        <button onClick={(e) => handleSubscribe(e)}>Subscribe</button>
      </div>
    </form>
    <ul>
      {subscribedTopic.map((candidate, index) => (
        <li key={index}>{candidate}</li>
      ))}
    </ul>
  </>
);
