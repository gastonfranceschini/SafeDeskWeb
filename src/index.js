import React from 'react';
import ReactDOM from 'react-dom';
import './utils/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}

<<<<<<< HEAD

=======
>>>>>>> e7a68fbd513032bc5c655b8f108da59be2ae168a
ReactDOM.render(
  
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
