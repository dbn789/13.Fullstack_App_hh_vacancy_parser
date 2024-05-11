import React from 'react';
import './app.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Main from './main/Main';
import VacancyList from './main/vacancy/VacancyList';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={Main} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
