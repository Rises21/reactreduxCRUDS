const mongoose = require('mongoose');


try {
 mongoose.connect('mongodb://lvl5:qweqweqwe@127.0.0.1:27017/eduwork-mongoose?authSource=admin'); 
} catch (error) {
    console.log(error.message);
}


const db = mongoose.connection;
//db.on('error', err => console.log(err,"<darimongoose koneksi err"));
db.on('error', console.error.bind(console, 'koneksi error: '));
db.once('open', () => console.log('server database terhubung'));

