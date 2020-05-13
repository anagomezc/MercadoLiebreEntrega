var express = require('express');
var router = express.Router();
const fs= require('fs');
const bcrypt = require('bcryptjs')


/* Para parsear el JSON */
const path = require('path');
let rutaJson = path.join(__dirname, '../../data/productsDataBase.json');
let productos = fs.readFileSync( rutaJson, 'utf-8');
let datosDetalle = JSON.parse(productos)



var numberWithCommas = x => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}


const controller = {


    home: function(req, res) {

         
        res.render('index', {datosDetalle, numberWithCommas})
         
    
    
}, 

    detalle: function(req, res){
        let idUsuario = req.params.id;
        let productoEncontrado = datosDetalle.find(function(producto) {
            if (idUsuario == producto.id ) {
                return producto
            } 
    
        })  
        
        res.render('detalle', {datosDetalle, productoEncontrado, numberWithCommas})
    },


     listado: function(req, res){
        
         res.render('listado', {datosDetalle, numberWithCommas})
     },


     borrar: function(req, res){
        let idProducto = req.params.id;
        let productoEncontrado = datosDetalle.find(function(producto) {
            idProducto == producto.id
        });
        datosDetalle.map((producto) => {
            if(producto.id == idProducto){
                let numeroBorrar = datosDetalle.indexOf(producto);
                datosDetalle.splice(numeroBorrar,1);

            }
        })
        let prodEditar = req.params.id;
        

         let productoAEditar = datosDetalle[prodEditar];
         let datosDetalleNueva = JSON.stringify(datosDetalle);
         fs.writeFileSync('/Users/anagomezcrovetto/Desktop/MLv3/MercadoLiebre/data/productsDataBase.json'/* o rutaJSON */, datosDetalleNueva);
         
        res.render('index', {datosDetalle, productoAEditar, numberWithCommas})
     },

     vistaEditar: function(req, res){
        let idProducto = req.params.id;
        let productoAEditar = datosDetalle[idProducto]

        res.render('editar', {productoAEditar})
     },

     editar: function (req, res) {

        let idProducto = req.params.id

         let editando = datosDetalle.find(function(producto){
            idProducto == producto.id
        }); 
         editando = {
            id: req.params.id,
             name: req.body.name,
             price: req.body.price,
             discount: req.body.discount,
             description: req.body.description,
             image: req.body.image,
             category: req.body.category
             
         };

         datosDetalle.map(function(producto){
            if (producto.id == idProducto){
                let positionEdit = idProducto;
                datosDetalle.splice(positionEdit -1, 1,editando);
            }
         });

         let editarJSON = JSON.stringify(datosDetalle);
         fs.writeFileSync(rutaJson, editarJSON)    
         
          res.redirect('/products/detail/' + idProducto); 
     },

     vistaCrear: function(req, res){

        res.render('crear');
     },

      crear: function (req, res) {
      
          let prodNuevo = {
            id: datosDetalle.length + 1,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image 

        };

        let idProducto = prodNuevo.id 
        
        datosDetalle.push(prodNuevo);

        fs.writeFileSync('/Users/anagomezcrovetto/Desktop/MLv3/MercadoLiebre/data/productsDataBase.json', JSON.stringify(datosDetalle));

       res.redirect('/products/detail/' + idProducto)
    }



  

}

module.exports = controller;
    
