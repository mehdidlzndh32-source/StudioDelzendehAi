import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { validateFirestoreConnection } from './firebase.ts';

// Test connection to Firestore on initial boot
validateFirestoreConnection().catch(() => {});

createRoot(document.getElementById('root')!).render(<App />);
