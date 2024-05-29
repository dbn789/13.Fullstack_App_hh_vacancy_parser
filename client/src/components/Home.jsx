import React, { useState } from 'react';
import './home.css'

const Home = ({handleSubmit}) => {
     const [value, setValue] = useState('')

    return (
        <div className='home'>
           
            <h2>Введите ссылку на подходящую вакансию на hh.ru</h2> 
            <input type="text" name="link" value={value} onChange={(e)=> setValue(e.target.value)}/>
          
            <button onClick={(e)=>{e.preventDefault(); handleSubmit(value)}}>Подобрать</button>
           
        </div>
    );
};

export default Home;