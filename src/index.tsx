import ReactDOM from 'react-dom/client';
import './assets/sass/theme.scss';
import App from './App';
import { AccountProvider } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<AccountProvider><App /></AccountProvider>);
