import WellCache from 'WellCache';

const wcache = new WellCache({mode: 'ls'});

function sendData(string) {
    document.getElementById('result').innerHTML = string;
}

document.getElementById('save').onclick = async function() {
    // wcache.save('123', {id: 123, data: '1231'}, (result) => {
    //     sendData(`save: ${JSON.stringify(result)}`);
    // });
    const result = await wcache.saveSync('123', {id: 123, data: '1231'});
    sendData(`saveSync: ${JSON.stringify(result)}`);
}

document.getElementById('get').onclick = async function() {
    // wcache.get('123', {id: 123},  (result) => {
    //     sendData(`get: ${JSON.stringify(result)}`);
    // });
    const result = await wcache.getSync('123', {id: 123});
    sendData(`getSync: ${JSON.stringify(result)}`);
}

document.getElementById('has').onclick = async function() {
    // wcache.has('123', {id: 123},  (result) => {
    //     sendData(`haveData: ${JSON.stringify(result)}`);
    // });

    const result = await wcache.hasSync('123', {id: 123});
    sendData(`hasSync: ${JSON.stringify(result)}`);
}

document.getElementById('remove').onclick = async function() {
    // wcache.remove('123', (result) => {
    //     sendData(`remove: ${JSON.stringify(result)}`);
    // });

    const result = await wcache.removeSync('123');
    sendData(`removeSync: ${JSON.stringify(result)}`);
}

