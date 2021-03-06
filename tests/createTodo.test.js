const server = require('../server.js')
const app = server.app;
const stopWebserver = server.stopWebserver;
const request = require('supertest')

test('Jest Pre-Test', () => {
    expect(2).toBe(2)
})

test('Create TODO Without Parameters', done => {
    request(app).post("/todo/create").then(response => {
        expect(response.statusCode).toBe(400)
        stopWebserver();
        console.log("Done")
        done();
    })
})


test('Create TODO With Parameters', done => {
    request(app).post("/todo/create").send({ "username": "info@schmuck-media.com", "title": "Test", "description": "Test application", "time": { "from": "2019-12-11 12:30:00", "to": "2019-12-13 12:30:00.000000" } }).then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe("created")
        stopWebserver();
        console.log("Done")
        done();
    })
})

test('Remove TODO With Parameters', done => {
    request(app).post("/todo/list").send({ "username": "info@schmuck-media.com" }).then(response2 => {
        expect(response2.status).toBe(200)
        request(app).post("/todo/remove").send({ "username": "info@schmuck-media.com", "id": response2.body[response2.body.length - 1].ID }).then(response => {
            console.log(response.body)
            expect(response.statusCode).toBe(200)
            stopWebserver();
            console.log("Done")
            done();
        })
    })
})