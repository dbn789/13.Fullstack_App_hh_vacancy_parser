import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    vacancies: [],
}


const hhSlice = createSlice({
    name: 'hhReducer',
    initialState,
    reducers: {
        changeStatus(state, action) {
            console.log('CHANGE STATUS', action.payload);
        },
        addVacancy(state, action) {
            state.vacancies.push(action.payload)
        },
    },
    /*extraReducers: (builder) => {
        builder
            .addCase(parseVacancySkills.pending, (state, action) => {
                //state.status = 'pending';
            })
            .addCase(parseVacancySkills.fulfilled, (state, action) => {
                const { index, skills } = action.payload;
                const el = state.vacancies[index]
                el.skills = skills
                state.vacancies.splice(index, 1, el)
            })
            .addCase(parseVacancySkills.rejected, (state, action) => {
                // state.status = 'error';
                console.log('SKILLS NOT PARSED!');
            });
    },*/
});


export const { changeStatus, addVacancy } = hhSlice.actions;
export default hhSlice.reducer;
