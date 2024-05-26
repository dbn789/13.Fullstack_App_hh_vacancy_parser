import { configureStore } from '@reduxjs/toolkit';
import hhReducer from './hhReduser';




const store = configureStore({
    reducer: {
        hhReducer,
    },
});

export default store
