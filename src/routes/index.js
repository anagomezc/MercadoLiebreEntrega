var express = require('express');
var router = express.Router();
const controller = require('../controllers/productController')

/* GET home page. */
router.get('/', controller.home );


/* GET detalle */
router.get('/detail/:id', controller.detalle);

/* GET listar productos */
router.get('/products', controller.listado);

/* Boton borrar */


router.delete('/delete/:id', controller.borrar);



/* para modificar */
router.get('/edit/:id', controller.vistaEditar);
router.put('/edit/:id', controller.editar);

/* Para crear producto, vender */
router.get('/create', controller.vistaCrear);
router.post('/products/create', controller.crear);




module.exports = router;
