import React from 'react';
import './app.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import Home from './Home';
import VacancyList from './VacancyList';



const App = () => {
    return (
            <Routes>
                <Route path="/" element={<Main />}>
                <Route index element={<VacancyList />} />
                <Route path="page/:vacancyPage" element={<VacancyList />} />
                </Route>
            </Routes>
    );
};

export default App;
