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

const delay = async (vac) => {

    fs.appendFile(__dirname + '/workers/data/vacancies.txt', `${vac.id}\n`, () => { })
    vacancyArray.push(vac)
    counter++
    return new Promise(resolve => setTimeout(() => {
        emitter.emit('new-vacancy');
        resolve()
    }, 100));
}

const parse = async (array) => {
    const userSkills = [
        'html',
        'html5',
        'css',
        'css3',
        'javascript',
        'node.js',
        'js',
        'react',
        'redux',
        'reactjs'
    ]

    for await (let vac of array) {
        let remote, exp;

        const skills = vac['snippet']['skill']?.split(', ') ?? []
        const isGoodVacancy = skills.some(skill => {
            return (userSkills.includes(skill.toLowerCase())) ? true : false
        })

        if (!unuqueIdsSet.has(+vac.vacancyId) && isGoodVacancy) {

            unuqueIdsSet.add(vac.vacancyId)

            switch (vac['@workSchedule']) {
                case 'remote': { remote = 'УДАЛЁННАЯ РАБОТА'; break }
                case 'fullDay': { remote = 'ОФИС'; break }
                case 'flexible': { remote = 'ГИБРИДНЫЙ ГРАФИК'; break }
                default: { }
            }

            switch (vac['workExperience']) {
                case 'noExperience': { exp = 'нет опыта'; break }
                case 'between1And3': { exp = 'от 1 года до 3 лет'; break }
                case 'between3And6': { exp = 'от 3 до 6 лет'; break }
                case 'moreThan6': { exp = 'более 6 лет'; break }
                default: { }
            }

            const vacancy = {
                number: counter + 1,
                id: vac.vacancyId,
                name: vac.name,
                price_from: vac.compensation?.from,
                price_to: vac.compensation?.to,
                city: vac.area.name,
                remote: remote,
                exp: exp,
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
    let finded = 0
    for await (let numPage of numArray) {
        // const result = await run(numPage, 0)
        const result = await parsingRelatedVacancies(numPage)
        finded += result
        result
            ? console.log(`Finded ${result} related vacancies in ${numPage}`)
            : console.log(`No related vacancies in ${numPage}`)
    }
    infinityLoop(numArray.length, finded)
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
    const startCount = vacancyArray.length
    console.log(totalPages)
    let i = 0;
    while (i < totalPages) {
        const result = await getData(vacancyId, i)
        const vacArray = result?.vacancies || []
        await parse(vacArray)
        i++
    }
    return vacancyArray.length - startCount
}


const infinityLoop = (start, findVacancies) => {
    fs.readFile(__dirname + '/workers/data/vacancies.txt', (err, data) => {
        const numbers = data.toString().trim().split('\n').map(Number)
        console.log('FINDED', findVacancies, 'START', start)
        if (start && !findVacancies) return
        unuqueIdsSet = new Set(numbers)

        // begin(numbers.at(-1)).catch(e => console.log(e))
        // const resumeId = 'f80c29ee000cb7201b0087cb9a38386a30577a';
        parsingVacancies(numbers.slice(start));

    })
}


app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (req.query.link) {
        console.log(req.query.link)
        fs.writeFile(__dirname + '/workers/data/vacancies.txt', req.query.link + '\n', 'utf-8', (err) => {
            vacancyArray.length = 0;
            counter = 0
            !err ? infinityLoop(0, 0) : {}
        })
    } else {
        emitter.once('new-vacancy', () => {
            res.send(vacancyArray[counter - 1])
        })
    }
})


app.listen(PORT, (req, res) => {
    console.log(`Server run to ${PORT} port`)
})