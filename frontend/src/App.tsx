import React, {Suspense} from 'react';
import {Counter} from "./components/Counter";
import './styles/index.scss';
import {Link, Route, Routes} from "react-router-dom";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import {CounterPageAsync} from "./pages/CounterPage/CounterPage.async";

const App = () => {
    return (
        <div className="app dark">
            <Link to={'/'}>Main Page</Link>
            <Link to={'/counter'}>Counter Page</Link>
            <Suspense fallback={<div>Loading...</div>}>
                 <Routes>
                     <Route path={'/'} element={<MainPageAsync/>} />
                     <Route path={'/counter'} element={<CounterPageAsync/>} />
                 </Routes>
            </Suspense>
        </div>
    );
};

export default App;