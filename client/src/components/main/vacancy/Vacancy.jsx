import React, { useEffect, useState } from 'react';
import './vacancy.css';

const Vacancy = ({ vacancy}) => {
    const { number, id, name, price_from, price_to, city, exp, remote, skills} = vacancy;
   
    const [skillsArray, setSkillsArray] = useState([])
    const [skillsFlag, setSkillsFlag] = useState(false)
   
    let jobFound = (exp === 'NO_EXPERIENCE' || (remote === 'REMOTE' && exp !== 'MORE_THAN_6' && exp !== 'BETWEEN_3_AND_6')) ? 'job-found' : '';
    let notGood = (exp === 'MORE_THAN_6' || exp === 'BETWEEN_3_AND_6') ? 'job-not-good' : ''
    let title = (name.length > 50) ? name.slice(0, 50) + '...' : name
    let price = `${price_from}-${price_to}`

   if (price_from === null && price_to === null) price = 'З/п не указана'
   else {
    if (price_from === null) price = `до ${price_to}`
    if (price_to === null) price = `от ${price_from}`
   }


useEffect(()=> {
    setSkillsArray(skills)
}, [])

useEffect(()=> {
setTimeout(()=> setSkillsArray([]), 3000)
}, [skillsArray])

    return (
        <div
            className={`job ${jobFound} ${notGood}`}
            onClick={() =>
                window.open(`https://krasnoyarsk.hh.ru/vacancy/${id}`, '_blank')
            }
            onMouseEnter={()=> setSkillsFlag(true)}
           // onMouseLeave={()=> setSkillsFlag(false)}
        >
            <div className="job__header">{title}</div>
            <div className="job__price">{price}</div>
            <div className="job__city">{city}</div>
            <div className="job__exp">{exp}</div>
            <div className="job__remote">{remote}</div>
            {skillsFlag &&
            <div className={skillsArray.length > 6 ? 'job__skills-table' : 'job__skills'}>{skillsArray.map(el => <div className="table-row" key={el}>{el}</div>)}</div>
            }
        </div>
    );
};

export default Vacancy;
