const express = require('express')
const fs = require('fs')
const axios = require('axios')

const EventEmitter = require('events')

const { runService1, runService2, runService3, runService4, runService5, runService6, runService7, runService8, runService9, runService10, runService11, runService12 } = require('./workers/workerConstructor')

const emitter = new EventEmitter()
const app = express()
const PORT = process.env.port || 5000
const vacancyArray = []
let unuqueIdsSet;
let counter = 0;



app.use(express.json())

const parseVacancySkills = async (data) => {
    const userSkills = [
        'html',
        'css',
        'javascript',
        'node.js',
        'js',
        'react',
        'redux',
        'reactjs'
    ]
    const url = `https://api.hh.ru/vacancies/${data.id}`;
    let flag = false
    try {
        const response = await axios.get(url);
        const skills = response.data.key_skills.map(el => el.name)
        //console.log(skills)
        skills.forEach(skill => {
            if (userSkills.includes(skill.toLowerCase())) flag = true
        })
        return [flag, skills]
    } catch (e) {
        console.log(`NO PARSING THIS VACANCY ${data.id}`)
        return [flag, []]
    }
}


const delay = async (vac) => {
    const isGoodVacancy = true
    // const [isGoodVacancy, skills] = await parseVacancySkills(vac)
    // console.log(vac)
    if (isGoodVacancy) {
        fs.appendFile(__dirname + '/workers/data/vacancies.txt', `${vac.id}\n`, () => { })
        // vac.skills = skills
        vacancyArray.push(vac)
        counter++
        return new Promise(resolve => setTimeout(() => {
            emitter.emit('new-vacancy');
            resolve()
        }, 100));
    }
    return new Promise(resolve => setTimeout(() => {
        resolve()
    }, 100));
}

const parse = async (array) => {

    for await (let vac of array) {
        if (!unuqueIdsSet.has(+vac.vacancyId)) {
            unuqueIdsSet.add(vac.vacancyId)

            let remote, skills = []
            switch (vac['@workSchedule']) {
                case 'remote': { remote = 'УДАЛЁННАЯ РАБОТА'; break }
                case 'full_day': { remote = 'ОФИС'; break }
                case 'flexible': { remote = 'ГИБРИДНЫЙ ГРАФИК'; break }
                default: { }
            }
            if (vac.snippet.skill) {
                const temp = vac.snippet.skill
                skills = temp.split(', ')
                //console.log(skills)
            }
            const vacancy = {
                number: counter + 1,
                id: vac.vacancyId,
                name: vac.name,
                price_from: vac.compensation?.from,
                price_to: vac.compensation?.to,
                city: vac.area.name,
                remote: remote,
                exp: vac.workExperience,
                responsesCount: vac.responsesCount,
                totalResponsesCount: vac.totalResponsesCount,
                skills: skills,
            }
            console.log(vacancy.number, vacancy.id)
            await delay(vacancy)
        }
    }
}

const run = async (firm, page) => {
    const url = `https://krasnoyarsk.hh.ru/shards/employerview/vacancies_list?page=${page}&profRole=96&currentEmployerId=${firm}&json=true`
    try {
        const response = await axios.get(url)
        if (response.data.count) {
            fs.appendFile(__dirname + '/workers/data/data.txt', `---------------${response.data.vacancies[0].company.name}---------------\n`, () => { })
            await parse(response.data.vacancies)
            if (response.data.hasNextPage) await run(firm, ++page)
            return page * 30 + response.data.count
        } else {
            return 0
        }

    } catch (e) {
        return 0
    }
}

const parsingVacancies = async (numArray) => {

    for await (let numPage of numArray) {
        // const result = await run(numPage, 0)
        const result = await parsingRelatedVacancies(numPage)
        result
            ? console.log(`Finded ${result} related vacancies in ${numPage}`)
            : console.log(`No related vacancies in ${numPage}`)
    }
    infinityLoop(numArray.length)
}



const begin = async (num) => {
    const promiseArray = [runService1(num), runService2(num + 125000), runService3(num + 250000), runService4(num + 375000), runService5(num + 500000), runService6(num + 625000), runService7(num + 750000), runService8(num + 875000), runService9(num + 1000000), runService10(num + 1125000), runService11(num + 1250000), runService12(num + 1375000)]
    Promise.allSettled(promiseArray).then(res => console.log(res))
}

const getData = async (vacancyId, page = 0) => {
    try {
        const response = await axios.get(`https://krasnoyarsk.hh.ru/shards/vacancy/related_vacancies?vacancyId=${vacancyId}&page=${page}&type=similar&searchSessionId=7a8bca14-57a3-4a7f-b22f-2556e6b2ca58`)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

const parsingRelatedVacancies = async (vacancyId) => {
    const res = await getData(vacancyId)
    const totalPages = res.totalPages
    console.log(totalPages)
    let i = 0;
    while (i < totalPages) {
        const result = await getData(vacancyId, i)
        const vacArray = result.vacancies || []
        await parse(vacArray)
        i++
    }
    return res.resultsFound
}


const infinityLoop = (start) => {
    fs.readFile(__dirname + '/workers/data/vacancies.txt', (err, data) => {
        const numbers = data.toString().trim().split('\n').map(Number)
        unuqueIdsSet = new Set(numbers)
        console.log(numbers)
        // begin(numbers.at(-1)).catch(e => console.log(e))
        // const resumeId = 'f80c29ee000cb7201b0087cb9a38386a30577a';
        parsingVacancies(numbers.slice(start));

    })
}

infinityLoop(0)



app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    emitter.once('new-vacancy', () => {
        res.send(vacancyArray[counter - 1])
    })

})



app.listen(PORT, (req, res) => {
    console.log(`Server run to ${PORT} port`)
})