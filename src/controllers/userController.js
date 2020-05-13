var express = require('express');
var router = express.Router();
const fs= require('fs');


const userCont = {
    edit: function (req, res) {
        let idUser = req.params.idUser;
        
        res.send('idUser')
    }
}

