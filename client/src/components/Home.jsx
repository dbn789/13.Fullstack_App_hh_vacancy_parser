import React, { useState } from 'react';
import './home.css'

const Home = ({handleSubmit}) => {
     const [value, setValue] = useState('')

    return (
        <div className='home'>
           <header>
           <p><strong>Добро пожаловать в приложение по подбору вакансий!</strong> </p>
           <p>Введите ссылку на подходящую вакансию на hh.ru</p>
           </header>
             
            <input type="text" name="link" value={value} onChange={(e)=> setValue(e.target.value)}/>
          
            <button onClick={(e)=>{e.preventDefault(); handleSubmit(value)}}>Подобрать</button>
           
        </div>
    );
};

export default Home;