import React, { useEffect, useState } from 'react';
import './vacancy.css';
//import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Vacancy = ({ vacancy}) => {
    const { id, name, price_from, price_to, city, exp, remote} = vacancy;
    const [skillsArray, setSkillsArray] = useState([])
   // const state = useSelector((state) => state.hhReducer.vacancies);
   // const dispatch = useDispatch();

    let jobFound = (exp === 'NO_EXPERIENCE' || (remote === 'REMOTE' && exp !== 'MORE_THAN_6' && exp !== 'BETWEEN_3_AND_6')) ? 'job-found' : '';
    let title = name
    let price = `${price_from}-${price_to}`

    if (name.length > 50)
        title = name.slice(0, 50) + '...';
   if (price_from === null && price_to === null) price = 'З/п не указана'
   else {
    if (price_from === null) price = `до ${price_to}`
    if (price_to === null) price = `от ${price_from}`
   }

useEffect(()=> {
setTimeout(()=> setSkillsArray([]), 3000)
}, [skillsArray])

const parseVacancySkills = async () => {
    
    const url = `https://api.hh.ru/vacancies/${id}`;

    try {
        const response = await axios.get(url);
        const skills = response.data.key_skills.map(el => el.name+'\n')
        setSkillsArray(skills)
    } catch (e) {
        console.log('ERROR PARSING VACANCY', e)
    }
}


    return (
        <div
            className={`job ${jobFound}`}
            onClick={() =>
                window.open(`https://krasnoyarsk.hh.ru/vacancy/${id}`, '_blank')
            }
            onMouseEnter={parseVacancySkills}
        >
            <div className="job__header">{title}</div>
            <div className="job__price">{price}</div>
            <div className="job__city">{city}</div>
            <div className="job__exp">{exp}</div>
            <div className="job__remote">{remote}</div>
            <div className="job__skills">{skillsArray.map(el => <div className="table-row" key={el}>{el}</div>)}</div>
        </div>
    );
};

export default Vacancy;
