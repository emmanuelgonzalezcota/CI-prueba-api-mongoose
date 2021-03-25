const request = require('supertest');
const app = require('../../server');
const UserServices = require('../../services/UserServices');
const dbHandler = require('../db-handler');

const agent = request.agent(app);

beforeAll(async () => await dbHandler.connect());
// Antes de los test ejecuta esto

afterEach(async () => await dbHandler.clearDatabase());
// Despues de cada test ejecuta esto 

afterAll(async () => await dbHandler.closeDatabase());
// Despues de todos los test ejecuta esto

describe('UserController', () => {
  
  it('Esto debe devolver usuarios', async() => {

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

    await UserServices.createUser(mockUser1);
    await UserServices.createUser(mockUser2);

    const response = await agent.get('/users').expect(200)

    expect(response.body).toHaveLength(2);
    expect(response.body[0]._id).toBeTruthy();
    
  })

  it('Esto debe crear un usuario', async() => {
    
    const response = await agent.post('/users')
      .send({
        email:'testuser@gmail.com',
        name:'test user',
        password:'testpassword'
      })
      // .field('email','testuser@gmail.com')
      // .field('name','test user')
      // .field('password','testpassword')
      .expect(201)
    expect(response.body.email).toBe('testuser@gmail.com');
    expect(response.body._id).toBeTruthy();
  })

})