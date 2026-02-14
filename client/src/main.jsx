import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer} from 'react-toastify';
import {Provider} from "react-redux"
import store from './store/store.js';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
        <ToastContainer
          bodyClassName="toastBody"
        />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
