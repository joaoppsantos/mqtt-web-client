# MQTT WebClient

This application makes use of MQTT in order to establish a messaging service between a MQTT platform and a device.

It allows the connection to a broker instance of choice, subscription to a topic in order to receive messages on that topic and also to publish a message to a certain topic.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Using the application

In order to interact with a broker instance you require to have the hostname/URL for that broker, as well as the same websocket port as the one that's specified on configs. If the port is different from "port: 8884", you need to change it to the correct value in order to establish a messaging connection.

To receive and publish messages, you also need to have a hostname, username, and password set. It is recommended to store these values in a .env file, with the following variables: REACT_APP_HOSTNAME, REACT_APP_USERNAME, and REACT_APP_PASSWORD.

Once these values are set, you can publish a message (with a topic and message) and receive it on the broker if the topic is subscribed to it. Alternatively, you can subscribe to topics to receive updates when the broker sends a message on a subscribed topic.
