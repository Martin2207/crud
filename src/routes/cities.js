const {Router}=require('express');
const router=new Router();
const _=require('underscore');
const mysqlConnection = require("../database");

//MOSTRAR 
router.get('/',(req,res)=>{
    mysqlConnection.query("SELECT * FROM city",(err,rows,fields)=>{
        if(err){
            console.log("Error: ",err);
        }else{
            res.json(rows);
        }
    })
});

//AGERGAR 
router.post('/',function (req,res){
    const {Name,CountryCode,District,Population} = req.body;
    mysqlConnection.query("INSERT INTO city VALUES(NULL,?,?,?,?)",[Name,CountryCode,District,Population],(err,rows,fields)=>{
if(err){
    console.log(err);
}else{
    res.json({"status":"city inserted"});
}
    })
});

//ELIMINAR 
router.delete('/:id', function (req,res){

});

//ACTUALIZAR 
router.put('/:id', function(rep,res){
    
});

module.exports=router;