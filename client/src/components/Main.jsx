import React, { useEffect, useState } from 'react';
import {Link, Outlet} from 'react-router-dom'
import './main.css';
import { useDispatch, useSelector } from 'react-redux';
import VacancyList from './VacancyList';
import {addVacancy} from '../reducers/hhReduser'
import axios from 'axios';
import Home from './Home';


const Main = () => {
  
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);
    const [vacancyPage, setVacancyPage] = useState(1);
    const [begin, setBegin] = useState(true)

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
            const response = await axios.get(`http://localhost:5000/`)
            if (response.status === 200)   setCount(count + 1)
            dispatch(addVacancy(response.data))
        }catch(e){
            console.log('SERVER ERROR')
            handler()
        }
    }

    const handleSubmit = (value) => {
        const reg = /.+?vacancy\/(?<id>\d+)/
         axios.get(`http://localhost:5000/?link=${value.match(reg).groups.id}`)
        setBegin(false)
    }

  useEffect(()=> {
        handler()
  }, [count])

    return (
        begin 
        ? (<Home handleSubmit={handleSubmit}/>)
        : <div>
            {length && !error && (
                <>
              <Outlet />
                <div className="page-count">
                {`${vacancyPage} / ${Math.floor( length / 20) + 1}`}
            </div>
            <div className="prev-page" onClick={handlePrev}>
            <Link to={`/page/${vacancyPage - 1}`} style={{ textDecoration: 'none',color:'white' }}>{'<'}</Link>
            </div>
            <div className="next-page" onClick={handleNext}>
            <Link to={`/page/${vacancyPage + 1}`} style={{ textDecoration: 'none', color:'white' }}>{'>'}</Link>
            </div>
            </>
            )}
            
            <h1 className={`${isError}`}>{error}</h1>
        </div>
    );
};

export default Main;


