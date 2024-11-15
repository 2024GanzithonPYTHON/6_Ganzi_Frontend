import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // 이 두개 지우지 말 것. 지우면 렌더링 문제생김
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
      {/*되도록 App.jsx에 렌더링하고 main은 엔트리포인트로 씁시다*/}
  </StrictMode>,
)