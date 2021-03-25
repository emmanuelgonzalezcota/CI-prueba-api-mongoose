const Users = require('../models/Users');
// En service van a estar todo lo que tenga que ver con la DB

const createUser = async(user) => {
  if(!user) throw new Error("No hay un usuario");
  const dbUser = await Users.create(user);
  return dbUser; 
}

const findUsers = async() =>{
  return await Users.find({});
}

const findUserById = async(id) => {
  // return new Promise((resolve,reject) => {
  //   Users.findById(id).then((user) => {
  //     if(!user) reject(new Error("Usuario no encontrado"))
  //     resolve(user)
  //   }).catch ((error) =>{
  //     reject(error)
  //   })
  // })
  // Lo de arriba por concepto de clean code(empezamos con async-await y se continua) y sugar syntax se resume con lo de abajo
  const user = await Users.findById(id);
  if(user) throw new Error("Usuario no encontrado");
  return user;
}

const updateUser = async (id,user) => {
  if(!user) throw newError('Se necesita un objeto usuario')
  const userDB = Users.updateOne({_id:id},{$set:{...user}},{new:true}); // los 3 puntos sirve para utilizar una copia y no el original, si queremos el original se pone {$set:user}
  if(!userDB) throw new Error("Usuario no encontrado");
  return userDB;
}

const deleteUser = async (id) => {
  return await Users.deleteOne({_id:id});
}

module.exports = {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser
}