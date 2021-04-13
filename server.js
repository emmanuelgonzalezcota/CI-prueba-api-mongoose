const express = require('express');
const mongoose = require('mongoose');
//const Users = require('./models/Users');
const UserController = require('./controllers/UserController');
const app = express();
const MONGO_URI = "mongodb+srv://Emma:1234567890@cluster0.drjyh.mongodb.net/prueba?retryWrites=true&w=majority";

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Esta es la conexion a mongo
if(process.env.NODE_ENV !== 'test'){
  mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }) // Inicia la conexion
}

const db = mongoose.connection; // Aqui esta guardado el status de la conexion

db.on('error', function(err){ // Se va ejecutar varias veces si encuentra un error en la conexion
  console.log('Connection error', err);
})

db.once('open', function(){ // Esto se va a ejecutar una vez, y esa vez es solo cuando se haya completado la conexion
  console.log('Connected to database');
})

app.get('/',(req,res) =>{
  return res.send('Bienvenidos a la api de mongoose');
})

// app.get('/users',(req,res) => {
//   Users.find({}).then((result) => {
//     res.status(200).send(result)
//   })
// })
app.get('/users',UserController.fetch);

app.post('/users',UserController.create);
//app.post('/users',[mult.single('photo'),manageFiles],UserController.create);

app.get('/users/:id',UserController.findOne);

// app.post('/users',(req,res) => {
//   Users.create(req.body).then((user) => {
//     res.status(201).send(user)
//   }).catch((error) => {
//     res.status(400).send(error)
//   })
// })
app.patch('/users/:id',UserController.update);
// app.patch('/users/:id',[mult.single('photo'),manageFiles],UserController.update);

app.delete('/users/:id',UserController.remove);

const port = process.env.PORT || 3000; // aqui habilitamos lo que heroku nos de para el puerto, default sera nuestro 3000
app.listen(port,() =>{ 
  console.log("Server ready !!!");
})

module.exports = app;