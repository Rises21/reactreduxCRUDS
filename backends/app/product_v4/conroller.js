//const db = require('../../config/mongoose');
const fs = require('fs');
const { ObjectId } = require('bson');
const path = require('path');
const Product = require('./model/Product');

const index = (req, res) => {

    Product.find()
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

const findName =  (req, res) => {
    const { laptopName } = req.params;
    Product.find({name: { $regex: laptopName } })
    .then(result => {
        if (!result) {
            res.send(notFound);
        }
        res.send(result);
    })
    .catch(error => res.send(error));
};

const store = (req, res) => {
        const { name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../../public/uploads', image.originalname);
        fs.renameSync(image.path, target); 
        
        Product.create({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));      
    } else {
        Product.create({ name, price, stock, status})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }

};

const updateProduct = (req, res) => {
     const { name, price, stock, status } = req.body; //destructuring column from tables on db
    const { id } = req.params;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../../public/uploads', image.originalname);
        fs.renameSync(image.path, target); 
        
        Product.updateOne({ _id: new ObjectId(id)}, {$set: { name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` }})
        .then(result => res.send(result))
        .catch(error => res.send(error));      
    } else {
        Product.updateOne({ _id: new ObjectId(id)}, {$set: { name, price, stock, status } })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }

};

const destroy =  (req, res) => {
    const {id} = req.params;
    Product.findOneAndDelete({ _id: new ObjectId(id)})
    .then(result => {
        if (!result) {
            res.send(notFound);
        }
        res.send(result);
    })
    .catch(error => res.send(error));
};

module.exports = { index, findName, store, updateProduct, destroy }; 
