import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client in React 18+
import './styles/index.css';
import RouterComponent from './router'; // Import your RouterComponent
import reportWebVitals from './utils/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
    <React.StrictMode>
        <RouterComponent />
    </React.StrictMode>
);

reportWebVitals();
