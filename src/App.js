import React, { useState } from 'react';
import './App.css';
import {
  ConnectionSection,
  ReceivedMessage,
  MessagesSection,
  TopicSection,
} from './components';
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
      <ConnectionSection
        setHostname={setHostname}
        setUsername={setUsername}
        setPassword={setPassword}
        hostname={hostname}
        username={username}
        password={password}
      />
      <MessagesSection
        setTopic={setTopic}
        setMessage={setMessage}
        handlePublish={handlePublish}
        topic={topic}
        message={message}
        client={client}
      />
      <TopicSection
        topicCandidate={topicCandidate}
        setTopicCandidate={setTopicCandidate}
        handleSubscribe={handleSubscribe}
        subscribedTopic={subscribedTopic}
      />
      <ReceivedMessage message={receivedMessage} topic={receivedTopic} />
    </div>
  );
}

export default MqttClient;
