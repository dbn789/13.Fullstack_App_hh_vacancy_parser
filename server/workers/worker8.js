const { workerData, parentPort } = require('worker_threads')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
let counter = 0

console.log(path.join(__dirname, 'data', 'firm-parsed.txt'))

const parsingFirmNumber = async (num) => {
    try {
        const response = await axios.get(`https://krasnoyarsk.hh.ru/shards/employerview/vacancies_list?page=0&profRole=156&profRole=160&profRole=10&profRole=12&profRole=150&profRole=25&profRole=165&profRole=34&profRole=36&profRole=73&profRole=155&profRole=96&profRole=164&profRole=104&profRole=157&profRole=107&profRole=112&profRole=113&profRole=148&profRole=114&profRole=116&profRole=121&profRole=124&profRole=125&profRole=126&currentEmployerId=${num}&json=true`)
        console.log('FIRM ', num, 'STATUS', response.status, 'LENGTH', response.headers['content-length'])
        if (+response.headers['content-length'] > 46) {
            counter++
            fs.appendFileSync(path.join(__dirname, 'data', 'firm-parsed.txt'), `${num}\n`, (err) => {
                console.log(err)
                //if (num % 100 === 0) parentPort.postMessage(`Finded ${counter} firms`)
                // return ++num
            })
        }
    } catch (e) {
        console.log('REQUEST ERROR ' + num)
    }
}

const run = async (number) => {
    while (number < +workerData + 125000) {
        await parsingFirmNumber(number)
        number++;
    }
    parentPort.postMessage(`Finded ${counter} firms`)
}

run(+workerData)