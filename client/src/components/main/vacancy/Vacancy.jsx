import React, { useEffect, useState } from 'react';
import './vacancy.css';

const Vacancy = ({ vacancy}) => {

    const { number, id, name, price_from, price_to, city, exp, remote,responsesCount, totalResponsesCount, skills} = vacancy;
    const [skillsFlag, setSkillsFlag] = useState(false)
   
    let jobFound = (exp === 'noExperience' || (remote === 'remote' && exp !== 'moreThan6' && exp !== 'between3And6')) ? 'job-found' : '';
    let notGood = (exp === 'moreThan6' || exp === 'between3And6') ? 'job-not-good' : ''
    let title = (name.length > 52) ? name.slice(0, 52) + '...' : name
    let price = `${price_from}-${price_to}`

   if (!price_from && !price_to) price = 'З/п не указана'
   else {
    if (!price_from) price = `до ${price_to}`
    if (!price_to) price = `от ${price_from}`
   }

    return (
        <div
            className={`job ${jobFound} ${notGood}`}
            onClick={() =>
                window.open(`https://krasnoyarsk.hh.ru/vacancy/${id}`, '_blank')
            }
            onMouseEnter={()=> setSkillsFlag(true)}
            onMouseLeave={()=> setSkillsFlag(false)}
        >
            <div className="job__header">{title}</div>
            <div className="job__price">{price}</div>
            <div className="job__resp"><div>Откликов: {responsesCount}</div><div>Всего: {totalResponsesCount}</div></div>
            <div className="job__exp">{exp}</div>
            <div className="job__remote">{remote}</div>
            {skillsFlag &&
            <div className={skills.length > 6 ? 'job__skills-table' : 'job__skills'}>{skills.map(el => <div className="table-row" key={el}>{el}</div>)}</div>
            }
        </div>
    );
};

export default React.memo(Vacancy);
