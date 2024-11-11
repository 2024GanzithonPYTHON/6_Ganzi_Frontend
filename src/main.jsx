import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
      <h3>여기부터는 main에 적어둔 글입니다. index와 css파일들은 default니 후에 정리하고 사용해야할 것 같습니다</h3>
      <p>혹시 index.css나 app.css를 별도로 사용하시는 방법이 있나용? 저는 import해서 넣는데에 주로 쓰는 것 같긴합니다.</p>
      <p>styled-components도 깔아둘테니 npm install해주세용~</p>
  </StrictMode>,
)