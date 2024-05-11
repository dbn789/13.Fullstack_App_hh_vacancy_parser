import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*const parseVacancySkills = async (id) => {
    console.log('IN ACTION', id);
    const url = `https://api.hh.ru/vacancies/${id}`;

    let goodVacancy = false;
    try {
        const response = await axios.get(url);
        const skills = response.data.key_skills

        if (skills.includes('JavaScript') || skills.includes('Node.js'))
            goodVacancy = true;

        return skills.map(el => el.name)
    } catch (e) {
        return null
    }
}*/


const hhSlice = createSlice({
    name: 'hhReducer',
    initialState: {
        vacancies: [],
        status: null,
        error: null,
    },
    reducers: {
        changeStatus(state, action) {
            console.log('CHANGE STATUS', action.payload);
            state.status = action.payload;
        },
        addVacancy(state, action) {
            console.log('ADD VACANCY', action.payload);
            state.vacancies.push(action.payload);
            console.log(state.vacancies)
        },
    },
    /*extraReducers: (builder) => {
        builder.addCase(parseVacancy.pending, (state, action) => {
            state.status = 'pending';
        });
        builder.addCase(parseVacancy.fulfilled, (state, action) => {
            console.log('IN REDUCER', action.payload);
            state.vacancies.push(action.payload);
            state.status = 'resolved';
        });
        builder.addCase(parseVacancy.rejected, (state, action) => {
            state.status = 'error';
            console.log('VACANCY NOT PARSED!');
        });
    },*/
});

export const { changeStatus, addVacancy } = hhSlice.actions;
export default hhSlice.reducer;
