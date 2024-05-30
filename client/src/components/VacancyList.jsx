import React from 'react';
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Vacancy from './Vacancy';
import { v4 as uuidv4 } from 'uuid';
import './main.css';


const VacancyList = () => {
const {vacancyPage = 1} = useParams()

    const state = useSelector((state) => state.hhReducer);

    const start = (vacancyPage - 1) * 20;
    const end = start + 20;

   
    const allVacancies = state.vacancies;
    const vacancies = allVacancies.slice(start, end);
    

    return (
        <div className="container">
            {vacancies.map((vacancy) => (
                <Vacancy 
                key={uuidv4()} 
                vacancy={vacancy} 
                />
            ))}
        </div>
    );
};

export default VacancyList;
