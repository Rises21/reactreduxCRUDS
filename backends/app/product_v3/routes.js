const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'public/uploads'});
const productControllerV3 = require('./controller');


router.get('/product', productControllerV3.index);
router.get('/product/:laptopName', productControllerV3.findName);
router.post('/product', upload.single('image'), productControllerV3.store);
router.put('/product/:id', upload.single('image'), productControllerV3.updateProduct);
router.delete('/product/:id', productControllerV3.destroy);

module.exports = router;
