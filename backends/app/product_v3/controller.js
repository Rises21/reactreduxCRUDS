const db = require('../../config/mongodb');
const fs = require('fs');
const { ObjectId } = require('bson');
const path = require('path');

const notFound = {
        status: 200,
        success: true,
        message: "Not Found",
        dataLaptop: null,
        error: "404",
    }


const index =  (req, res) => {
    db.collection('products').find()
    .toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

const findName =  (req, res) => {
    const { laptopName } = req.params;
    db.collection('products').find({ name: { $regex: laptopName } })
    .toArray()
    .then(result => {
        if (!result) {
            res.send(notFound);
        }
        res.send(result);
    })
    .catch(error => res.send(error));
};


const store = (req, res) => {
    const { name, price, stock, status } = req.body; //destructuring coulmn from tables on db

    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../../uploads', image.originalname);
        fs.renameSync(image.path, target); 
        const image_url =  `http://localhost:3000/public/${image.originalname}`;
        db.collection('products').insertOne({ name, price, stock, status, image_url })
        .then(result => res.send(result))
        .catch(error => res.send(error));       
    } else {
        db.collection('products').insertOne({ name, price, stock, status })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
       
    
};

const updateProduct = (req, res) => {
    const { name, price, stock, status } = req.body; //destructuring coulmn from tables on db
    const {id} = req.params;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../../uploads', image.originalname);
        fs.renameSync(image.path, target);        
    }
        const image_url = image ? `http://localhost:3000/public/${image.originalname}` : 'Picture not available';
        db.collection('products').updateOne({ _id: new ObjectId(id)}, {$set: { name, price, stock, status, image_url }})
        .then(result => {
        if (!result.matchedCount) {
            res.send({
        status: 200,
        success: true,
        message: "Failed to update",
        dataLaptop: null,
        error: "404",
    });
        }
        res.send(result);
    })
        .catch(error => res.send(error));
    
};


const destroy =  (req, res) => {
    const {id} = req.params;
    db.collection('products').deleteOne({ _id: new ObjectId(id)})
    .then(result => {
        if (!result.deletedCount) {
            res.send(notFound);
        }
        res.send(result);
    })
    .catch(error => res.send(error));
};

module.exports = { index, findName, store, updateProduct, destroy};