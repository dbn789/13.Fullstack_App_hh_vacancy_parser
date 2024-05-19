import { configureStore } from '@reduxjs/toolkit';
import hhReducer from './hhReduser';


/*const preloadedState = {
    vacancies: [],
    status: null,
    error: null,
}*/

const store = configureStore({
    reducer: {
        hhReducer,
    },
    // preloadedState,
});

export default store
