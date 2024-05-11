const express = require('express')
const fs = require('fs')
const axios = require('axios')

/*const mongoose = require('mongoose')
const db = 'mongodb+srv://cifropodarki:Gfhjkm206789@cluster0.0o6wwnj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose
    .connect(db)
    .then(res => console.log('Connected to Mongo', res))
    .catch(error => console.log('Error', error))*/

const EventEmitter = require('events')

const { runService1, runService2, runService3, runService4, runService5, runService6, runService7, runService8 } = require('./workers/workerConstructor')

const emitter = new EventEmitter()
const app = express()
const PORT = process.env.port || 5000
const vacancyArray = []
let count = 0, num = 0;



app.use(express.json())

const delay = async (vac) => {
    fs.appendFile(__dirname + '/workers/data/data.txt', `${vac.number}\n${vac.name}\n${vac.id}\n${vac.exp}\n${vac.remote}\n${vac.city}\n${vac.price_from}-${vac.price_to}\n-----------------------------\n`, () => { })
    vacancyArray.push(vac)
    count++
    return new Promise(resolve => setTimeout(() => {
        emitter.emit('new-vacancy');
        resolve()
    }, 1000));
}

const parse = async (array) => {

    for await (let vac of array) {
        let remote;
        switch (vac.workSchedule) {
            case 'REMOTE': { remote = 'УДАЛЁННАЯ РАБОТА'; break }
            case 'FULL_DAY': { remote = 'ОФИС'; break }
            case 'FLEXIBLE': { remote = 'ГИБРИДНЫЙ ГРАФИК'; break }
            default: { }
        }
        const vacancy = {
            number: count + 1,
            id: vac.vacancyId,
            name: vac.name,
            price_from: vac.compensation?.from,
            price_to: vac.compensation?.to,
            city: vac.area.name,
            remote: remote,
            exp: vac.workExperience,
        }
        await delay(vacancy)
    }
}

const run = async (firm, page) => {
    const url = `https://krasnoyarsk.hh.ru/shards/employerview/vacancies_list?page=${page}&profRole=96&currentEmployerId=${firm}&json=true`
    try {
        const response = await axios.get(url)
        if (response.data.count) {
            //  console.log(`FIRM ${firm}`, response.data.vacancies[0].company.name, 'PAGE ', page, ' COUNT', response.data.count)
            fs.appendFile(__dirname + '/workers/data/data.txt', `---------------${response.data.vacancies[0].company.name}---------------\n`, () => { })
            await parse(response.data.vacancies)
            if (response.data.hasNextPage) await run(firm, ++page)
        } else {
            console.log(`NO VACANCYES IN FIRM ${firm}`)
            if (count > num) setTimeout(() => emitter.emit('new-vacancy'), 1000)
        }

    } catch (e) {
        console.log('NO DATA')
        if (count > num) setTimeout(() => emitter.emit('new-vacancy'), 1000)
    }
}

const parsingVacancies = async (numArray) => {

    for await (let numPage of numArray) {
        await run(numPage, 0)
    }
}



const begin = async (num) => {
    const promiseArray = [runService1(num), runService2(num + 125000), runService3(num + 250000), runService4(num + 375000), runService5(num + 500000), runService6(num + 625000), runService7(num + 750000), runService8(num + 875000)]
    Promise.allSettled(promiseArray).then(res => console.log(res))
}


fs.readFile(__dirname + '/workers/data/firm-parsed.txt', (err, data) => {
    const numbers = data.toString().trim().split('\n').map(Number)
    console.log(numbers)
    //begin(numbers.at(-1)).catch(e => console.log(e))

    parsingVacancies(numbers.reverse());
})

//app.use('/', (req, res) => res.setHeader('Access-Control-Allow-Origin', '*'))

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    emitter.once('new-vacancy', () => {
        res.send(vacancyArray[num])
        num++
    })

})



app.listen(PORT, (req, res) => {
    console.log(`Server run to ${PORT} port`)
})