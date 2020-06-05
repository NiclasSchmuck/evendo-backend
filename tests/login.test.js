const server = require('../server.js')
const app = server.app;
const stopWebserver = server.stopWebserver;
const request = require('supertest')

test('Jest Pre-Test', () => {
    expect(2).toBe(2)
})

test('Login Without Parameters', done => {
    request(app).post("/login").then(response => {
        expect(response.statusCode).toBe(400)
        stopWebserver();
        console.log("Done")
        done();
    })
})


test('Login With Existing Parameters', done => {
    request(app).post("/login").send({ "username": "Niclas", "password": "Niclas" }).then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe("logged_in");
        stopWebserver();
        console.log("Done")
        done();
    })
})

test('Login With Not existing Parameters', done => {
    request(app).post("/login").send({ "username": "Niclas2", "password": "Niclas" }).then(response => {
        expect(response.statusCode).toBe(400)
        stopWebserver();
        console.log("Done")
        done();
    })
})