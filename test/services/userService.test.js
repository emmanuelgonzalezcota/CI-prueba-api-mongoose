const mongoose = require('mongoose');
const dbHandler = require('../db-handler');
const userService = require('../../services/UserServices');
const userModel = require('../../models/Users');

beforeAll(async () => await dbHandler.connect());
// Antes de los test ejecuta esto

afterEach(async () => await dbHandler.clearDatabase());
// Despues de cada test ejecuta esto 

afterAll(async () => await dbHandler.closeDatabase());
// Despues de todos los test ejecuta esto

describe('User services', () => {
  // Aqui se pone todo lo que estare testeando
  // Quiero probar todo user services
    it('Debo poder crear un usuario', async() => {
      
      // // Vamos a probar
      // expect(true).toBe(true);

      const mockUser = {
        name:"test user",
        email:"testuser@gmail.com",
        password:"test"
      }
      const userDB = await userService.createUser(mockUser);

      expect(mockUser.email).toBe(userDB.email)
      expect(userDB).toHaveProperty('_id');
      
    })

    it('Esto no debe generar un usuario', async() => {

      expect(async() => await userService.createUser()).rejects.toThrow();

    })

    it('Esto debe devolver un arreglo de usuarios', async() => {

      const mockUser1 = {
        name:"test user",
        email:"testuser@gmail.com",
        password:"test"
      }

      const mockUser2 = {
        name:"test user 2",
        email:"testuser2@gmail.com",
        password:"test2"
      }

      await userService.createUser(mockUser1);
      await userService.createUser(mockUser2);

      const users = await userService.findUsers();

      expect(users).toHaveLength(2);
      expect(users[0]).toHaveProperty('_id');
      
    })


})