import React, { useCallback, useState } from 'react';
import { parseVacancySkills } from '../../../reducers/hhReduser';
import { useDispatch, useSelector } from 'react-redux';
import Vacancy from './Vacancy';
import '../main.css';

const VacancyList = ({ vacancyPage }) => {

    const start = (vacancyPage - 1) * 20;
    const end = start + 20;
    const dispatch = useDispatch()
    const state = useSelector((state) => state.hhReducer);
   
    const allVacancies = state.vacancies;
    const vacancies = allVacancies.slice(start, end);

    const addSkillsArray = (id, number) => {
        dispatch(parseVacancySkills({id, number})) 
       }


    return (
        <div className="container">
            {vacancies.map((vacancy) => (
                <Vacancy 
                key={`${vacancy.id}${Date.now()}`} 
                vacancy={vacancy} 
                showSkills={addSkillsArray}
                />
            ))}
        </div>
    );
};

export default React.memo(VacancyList);
