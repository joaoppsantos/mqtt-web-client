import React, { useState } from 'react';
import './App.css';
const mqtt = require('precompiled-mqtt');

function MqttClient() {
  const [hostname, setHostname] = useState(process.env.REACT_APP_HOSTNAME);
  const [username, setUsername] = useState(process.env.REACT_APP_USERNAME);
  const [password, setPassword] = useState(process.env.REACT_APP_PASSWORD);
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [receivedTopic, setReceivedTopic] = useState('');
  const [topicCandidate, setTopicCandidate] = useState('');
  const [subscribedTopic, setSubscribedTopic] = useState([]);
  const [clientId] = useState(`${Math.random().toString(16).substr(2, 8)}`);
  let client;

  const shouldSubscribe = (topic) => {
    if (subscribedTopic.indexOf(topic) === -1) {
      setSubscribedTopic([...subscribedTopic, topic]);
    }
  };
  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!client || !client.connected) {
      client = mqtt.connect({
        clientId: clientId,
        protocol: 'wss',
        hostname: hostname,
        protocolVersion: 4,
        port: 8884,
        path: '/mqtt',
        clean: true,
        resubscribe: true,
        keepalive: 60,
        reconnectPeriod: 0,
        username: username,
        password: password,
      });
      client.on('connect', () => {
        client.subscribe(topicCandidate, (error) => {
          if (!error) {
            console.log('Connected');
          }
        });
        client.on('message', (topicCandidate, clientMessage) => {
          if (message !== clientMessage.toString()) {
            setReceivedMessage(clientMessage.toString());
            setReceivedTopic(topicCandidate);
          }
        });
      });
    }
    shouldSubscribe(topicCandidate);
  };
  const handlePublish = (event) => {
    event.preventDefault();
    if (!client || !client.connected) {
      client = mqtt.connect({
        clientId: clientId,
        protocol: 'wss',
        hostname: hostname,
        protocolVersion: 4,
        port: 8884,
        path: '/mqtt',
        clean: true,
        resubscribe: true,
        keepalive: 60,
        reconnectPeriod: 0,
        username: username,
        password: password,
      });
      client.on('connect', () => {
        client.subscribe(topic, (error) => {
          if (!error) {
            console.log('Connected');
          }
        });
        client.on('message', (topic, clientMessage) => {
          if (message !== clientMessage.toString()) {
            setReceivedMessage(clientMessage.toString());
            setReceivedTopic(topic);
          }
        });
      });
    }
    client.publish(topic, message, { qos: 0 });
  };

  return (
    <div className="container">
      <h3>Connection</h3>
      <form>
        <label>
          HOSTNAME:
          <input
            className="label"
            type="text"
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
          />
        </label>
        <br />
        <label>
          USERNAME:
          <input
            className="label"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          PASSWORD:
          <input
            className="label"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>
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
      <p>
        RECEIVED MESSAGE: {receivedMessage}{' '}
        {receivedTopic && <span>FROM {receivedTopic}</span>}
      </p>
    </div>
  );
}

export default MqttClient;
