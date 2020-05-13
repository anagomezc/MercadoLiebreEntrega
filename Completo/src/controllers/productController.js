


const controller = {
    index : (req,res) =>{
        res.render('index', {
            colores: [{valor:"rojo"},{valor:"verde"},{valor:"azul"}]
        
        })
    } 
}
module.exports = controller