const {Router}=require('express');
const router=new Router();
const movies=require('../movies.json');
const _=require('underscore');

//MOSTRAR LOS ARREGLOS
router.get('/',(req,res)=>{
    res.json(movies);
});

//AGERGAR UN NUEVO ARREGLO
router.post('/',function (req,res){
    console.log(req.body);
    const id=movies.length + 1;
    const {title,year,director}=req.body;
    const newMovie={id, ...req.body};
    if(title && year && director){
        movies.push(newMovie);
        res.json({"message":"Movie Added"});
    }else{
        res.json({"message":"Error"});
    }
});

//ELIMINAR UN ARREGLO
router.delete('/:id', function (req,res){
const {id} = req.params;
if(id){
_.each(movies, (movie,i)=>{
    if (movie.id == id){
        movies.splice(i,1); //El splice elimina los elementos que tu desees, en este caso 1
    } 
})
}
});

//ACTUALIZAR Elemento
router.put('/:id', function(rep,res){
    const {id} = req.params;
    const {title,year,director}=req.body;
    if(id && title && director && year){
      _.each(movies,(movie,i)=>{
          if (movie.id == id){
              movie.title = title;
              movie.director = director;
              movie.year = year;
          }
      })
    }else{
        res.json({'Error': "Error en la actualizacion"})
    }
})

module.exports=router;