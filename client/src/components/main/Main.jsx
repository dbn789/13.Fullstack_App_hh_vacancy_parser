import React, { useEffect, useState } from 'react';
import './main.css';
import { useDispatch, useSelector } from 'react-redux';

import VacancyList from './vacancy/VacancyList';
import { addVacancy } from '../../reducers/hhReduser';

import axios from 'axios';

const Main = () => {
   // const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);
    const [vacancyPage, setVacancyPage] = useState(1);
   // const [vacancyArray, setVacancyArray] = useState([]);
    let isError = 'hidden';
    const dispatch = useDispatch();
    const state = useSelector((state) => state.hhReducer);
    console.log('COUNT= ', count)

    const handleNext = () => {
        setVacancyPage(vacancyPage + 1);
    };
    const handlePrev = () => {
        setVacancyPage(vacancyPage - 1);
    };

    const handler = async()=> {
        try{
            const response = await axios.get('http://localhost:5000/')
            if (response.status === 200)   setCount(count + 1)
            //setVacancyArray(prev => [...prev, ...response.data])
            dispatch(addVacancy(response.data))
           // handler()
        }catch(e){
            console.log('SERVER ERROR')
           handler()
        }
    }


  useEffect(()=> {
        handler()
  }, [count])

    return (
        <div>
            {state.vacancies.length && !error && (
                <VacancyList vacancyPage={vacancyPage} />
            )}
            <div className="page-count">
                {`${vacancyPage} / ${Math.round( state.vacancies.length / 20) + 1}`}
            </div>
            <div className="prev-page" onClick={handlePrev}>
                {'<'}
            </div>
            <div className="next-page" onClick={handleNext}>
                {'>'}
            </div>
            <h1 className={`${isError}`}>{error}</h1>
        </div>
    );
};

export default Main;
