import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './main.css'
import App from './pages/App'
import {ViteVersionErrorHandler} from './lib';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViteVersionErrorHandler>
      <App/>
    </ViteVersionErrorHandler>
  </StrictMode>,
)
