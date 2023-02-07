import React, { useState } from 'react';
import './App.css';
const mqtt = require('precompiled-mqtt');

function MqttClient() {
  const [hostname, setHostname] = useState(process.env.REACT_APP_HOSTNAME);
  const [username, setUsername] = useState(process.env.REACT_APP_USERNAME);
  const [password, setPassword] = useState(process.env.REACT_APP_PASSWORD);
  const [receivedMessage, setReceivedMessage] = useState('');
  const [receivedTopic, setReceivedTopic] = useState('');
  let client;

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
      <p>
        RECEIVED MESSAGE: {receivedMessage}{' '}
        {receivedTopic && <span>FROM {receivedTopic}</span>}
      </p>
    </div>
  );
}

export default MqttClient;
