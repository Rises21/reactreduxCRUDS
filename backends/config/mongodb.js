const { MongoClient } = require('mongodb');

const url = 'mongodb://lvl5:qweqweqwe@localhost:27017?authSource=admin';
const client = new MongoClient(url, {
    useUnifiedTopology: true
});

(async () => {

    try {
         await client.connect();
        console.log('koneksi ke mongodb berhasil');
    } catch (error) {
        console.log(error);
    }
})();

const db = client.db('eduwork-native');

module.exports = db;