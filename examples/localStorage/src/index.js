import WellCache from 'WellCache';

const wcache = new WellCache();

wcache.save('123', {id: 123, data: '1231'}, (result) => {
    console.log('save:', result);
});

wcache.get('123', {id: 123},  (result) => {
    console.log('get:', result);
});

wcache.has('123', {id: 123}, (result) => {
    console.log('haveData:', result);
});

setTimeout(() => {
    wcache.remove('123', (result) => {
        console.log('remove:', result);
    });
},500)

