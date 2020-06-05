const server = require('../server.js')
const app = server.app;
const stopWebserver = server.stopWebserver;
const request = require('supertest')

test('Jest Pre-Test', () => {
    expect(2).toBe(2)
})

test('Register Without Parameters', done => {
    request(app).post("/register").then(response => {
        expect(response.statusCode).toBe(500)
        stopWebserver();
        console.log("Done")
        done();
    })
})


test('Register With Existing Parameters', done => {
    request(app).post("/register").send({ "username": "Niclas", "password": "Niclas", "email": "info@schmuck-media.com" }).then(response => {
        expect(response.statusCode).toBe(400)
        stopWebserver();
        console.log("Done")
        done();
    })
})

test('Register With Parameters', done => {
    request(app).post("/register").send({ "username": "tester", "password": "abc12345", "email": "niclas@thisisatest.de" }).then(response => {
        expect(response.statusCode).toBe(200)
        stopWebserver();
        console.log("Done")
        done();
    })
})


test('Unregister With Parameters', done => {
    request(app).post("/removeUser").send({ "username": "tester", "password": "abc12345", "email": "niclas@thisisatest.de" }).then(response => {
        expect(response.statusCode).toBe(200)
        stopWebserver();
        console.log("Done")
        done();
    })
})