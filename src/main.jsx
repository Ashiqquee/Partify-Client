import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { store, persistor } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId='33771015672-i4v0jjhqktt8g8fel7rjvl7mtllpa1ak.apps.googleusercontent.com'>
  {/* <React.StrictMode> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer autoClose={2000} />
      </PersistGate>
    </Provider>
 {/* </React.StrictMode> */}
  </GoogleOAuthProvider>,

  
)
