// Vamos a jugar con la conexion de mono aca
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer(); // Estoy en un mini mongo server

const connect = async () => {
  const uri = await mongod.getUri();
  const mongoosOptions = {
    useNewUrlParser: true,
    // autoReconnect: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 1000
  }

  await mongoose.connect(uri,mongoosOptions);
}

const closeDatabase = async () =>{
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
} // Esto se v a ejecutar cuando acabe todos los test

const clearDatabase = async () =>{
  const collections = mongoose.connection.collections;
  for(const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}// Esto se va a ejecutar cada vez que se ejecuta un test(Cada test esta aislado uno de otro)

module.exports = {
  connect,
  closeDatabase,
  clearDatabase
}