import { createRoot } from 'react-dom/client'
import './index.css'
import Form from './form';

createRoot(document.getElementById('root')!).render(
    <App />
)

function App() {
  return (
    <Form/>
  );
}