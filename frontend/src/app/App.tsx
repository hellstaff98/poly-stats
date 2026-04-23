import React, { useEffect } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import AppRouter from './router/AppRouter';
import './styles/index.scss';
import { useAuthStore } from '../stores/useAuthStore';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const App = () => {
    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('token')) {
                await checkAuth();
            }
        })();
    }, []);

    return (
        <div className="app dark">
            <ToastContainer
                position={'top-center'}
                hideProgressBar={true}
                theme={'dark'}
                autoClose={1000}
                transition={Flip}
            />
            <AppRouter />
        </div>
    );
};

export default App;
