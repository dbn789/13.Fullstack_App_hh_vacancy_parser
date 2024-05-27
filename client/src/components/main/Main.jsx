import React, { useEffect, useState } from 'react';
import './main.css';
import { useDispatch, useSelector } from 'react-redux';

import VacancyList from './vacancy/VacancyList';
import { addVacancy} from '../../reducers/hhReduser';

import axios from 'axios';

const Main = () => {
  
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);
    const [vacancyPage, setVacancyPage] = useState(1);
 
    let isError = 'hidden';
    const dispatch = useDispatch();
    const length = useSelector((state) => state.hhReducer.vacancies.length);


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

            dispatch(addVacancy(response.data))
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
            {length && !error && (
                <VacancyList vacancyPage={vacancyPage} />
            )}
            <div className="page-count">
                {`${vacancyPage} / ${Math.floor( length / 20) + 1}`}
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
