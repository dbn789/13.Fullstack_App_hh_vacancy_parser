import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    vacancies: [],
}

export const parseVacancySkills = createAsyncThunk('hhReducer/parseVacancySkills',
    async (data) => {

        const url = `https://api.hh.ru/vacancies/${data.id}`;

        const response = await axios.get(url);
        const skills = response.data.key_skills.map(el => el.name)
        return { index: +data.number - 1, skills: skills }
    })


const hhSlice = createSlice({
    name: 'hhReducer',
    initialState,
    reducers: {
        changeStatus(state, action) {
            console.log('CHANGE STATUS', action.payload);
            // state.status = action.payload;
        },
        addVacancy(state, action) {
            //console.log('ADD VACANCY', action.payload);
            state.vacancies.push(action.payload)
        },
    },
    extraReducers: (builder) => {
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
    },
});


export const { changeStatus, addVacancy } = hhSlice.actions;
export default hhSlice.reducer;
