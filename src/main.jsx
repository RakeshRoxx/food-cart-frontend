import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import AppStore from './utils/ReduxStore/AppStore.js'
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={AppStore}>
    <App />
  </Provider>
  // </StrictMode>,
)
