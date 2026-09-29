import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Automatically register service worker with immediate execution
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[VidyaSaathi SW] New content available, reloading...');
  },
  onOfflineReady() {
    console.log('[VidyaSaathi SW] App ready to work offline.');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
