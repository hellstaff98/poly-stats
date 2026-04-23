import { createRoot, Root } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

const rootElement: HTMLElement = document.getElementById('root');
const root: Root = createRoot(rootElement);

root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {})
            .catch((error) => {});
    });
}
