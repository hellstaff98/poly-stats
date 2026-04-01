import React from 'react';
import AppRouter from "./router/AppRouter";
import './styles/index.scss';

const App = () => {
    return (
        <div className="app dark">
            <AppRouter/>
        </div>
    );
};

export default App;