const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'public/uploads'});
const productControllerV4 = require('./conroller');
const cors = require('cors');

router.get('/product', productControllerV4.index);
router.get('/product/:laptopName', productControllerV4.findName);
router.post('/product', upload.single('image'), productControllerV4.store);
router.put('/product/:id', upload.single('image'), productControllerV4.updateProduct);
router.delete('/product/:id', productControllerV4.destroy);

module.exports = router;
