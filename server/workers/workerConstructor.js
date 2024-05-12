const { Worker, workerData } = require('worker_threads')


const runService1 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker1 = new Worker('./workers/worker.js', { workerData });
        worker1.on('message', resolve);
        worker1.on('error', reject);
        worker1.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker1 stopped with exit code ${code}`));
        })
    })
}

const runService2 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker2 = new Worker('./workers/worker.js', { workerData });
        worker2.on('message', resolve);
        worker2.on('error', reject);
        worker2.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker2 stopped with exit code ${code}`));
        })
    })
}

const runService3 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker3 = new Worker('./workers/worker.js', { workerData });
        worker3.on('message', resolve);
        worker3.on('error', reject);
        worker3.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker3 stopped with exit code ${code}`));
        })
    })
}

const runService4 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker4 = new Worker('./workers/worker.js', { workerData });
        worker4.on('message', resolve);
        worker4.on('error', reject);
        worker4.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker4 stopped with exit code ${code}`));
        })
    })
}

const runService5 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker5 = new Worker('./workers/worker.js', { workerData });
        worker5.on('message', resolve);
        worker5.on('error', reject);
        worker5.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker5 stopped with exit code ${code}`));
        })
    })
}

const runService6 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker6 = new Worker('./workers/worker.js', { workerData });
        worker6.on('message', resolve);
        worker6.on('error', reject);
        worker6.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker6 stopped with exit code ${code}`));
        })
    })
}

const runService7 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker7 = new Worker('./workers/worker.js', { workerData });
        worker7.on('message', resolve);
        worker7.on('error', reject);
        worker7.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker7 stopped with exit code ${code}`));
        })
    })
}

const runService8 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker8 = new Worker('./workers/worker.js', { workerData });
        worker8.on('message', resolve);
        worker8.on('error', reject);
        worker8.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker8 stopped with exit code ${code}`));
        })
    })
}

const runService9 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker9 = new Worker('./workers/worker.js', { workerData });
        worker9.on('message', resolve);
        worker9.on('error', reject);
        worker9.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker9 stopped with exit code ${code}`));
        })
    })
}

const runService10 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker10 = new Worker('./workers/worker.js', { workerData });
        worker10.on('message', resolve);
        worker10.on('error', reject);
        worker10.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker10 stopped with exit code ${code}`));
        })
    })
}

const runService11 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker11 = new Worker('./workers/worker.js', { workerData });
        worker11.on('message', resolve);
        worker11.on('error', reject);
        worker11.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker11 stopped with exit code ${code}`));
        })
    })
}

const runService12 = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker12 = new Worker('./workers/worker.js', { workerData });
        worker12.on('message', resolve);
        worker12.on('error', reject);
        worker12.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker12 stopped with exit code ${code}`));
        })
    })
}

module.exports = {
    runService1,
    runService2,
    runService3,
    runService4,
    runService5,
    runService6,
    runService7,
    runService8,
    runService9,
    runService10,
    runService11,
    runService12,
}