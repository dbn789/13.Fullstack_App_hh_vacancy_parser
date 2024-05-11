import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Vacancy from './Vacancy';
import '../main.css';

const VacancyList = ({ vacancyPage }) => {

    const start = (vacancyPage - 1) * 20;
    const end = start + 20;

    const state = useSelector((state) => state.hhReducer);
   
    const allVacancies = state.vacancies;
    const vacancies = allVacancies.slice(start, end);

    //console.log(vacancies)
    return (
        <div className="container">
            {vacancies.map((vacancy) => (
                <Vacancy 
                key={`${vacancy.id}${Date.now()}`} 
                vacancy={vacancy} 
                />
            ))}
        </div>
    );
};

export default VacancyList;
