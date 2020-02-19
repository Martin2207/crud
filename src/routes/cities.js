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
router.get('/lenguageByCountry/:continent',(req,res)=>{
    const {continent} = req.params;
    mysqlConnection.query("select countrylanguage.*,country.Continent FROM countrylanguage JOIN country on countrylanguage.CountryCode = country.Code WHERE country.Continent = ?",[continent],(err,rows,fields)=>{
        if(err){
            console.log("Error: ",err);
        }else{
            res.json(rows);
        }
    })
});
//AGRERGAR 
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
const {id} = req.params;
mysqlConnection.query("DELETE FROM city WHERE id = ?",[id],(err,rows,field)=>{
    if(err){
        console.log(err);
    }else{
        res.json({"status":"city deleted"});
    }
        })
});

//ACTUALIZAR 
router.put('/:id', function (req,res){
    const {id} = req.params;
    const {Name,CountryCode,District,Population} = req.body;

    mysqlConnection.query("UPDATE city SET  Name =?,CountryCode=?,District=?,Population=? WHERE id =?",[Name,CountryCode,District,Population,id],(err,rows,field)=>{
        if(err){
            console.log(err);
        }else{
            res.json({"status":"city update"});
        }
            })
});

module.exports=router;