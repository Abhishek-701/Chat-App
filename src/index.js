const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocation } = require('../src/utils/messages')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

 

io.on('connection', (socket) => {
    console.log('New Connection');

    io.emit('message', generateMessage('Welcome!'))

    socket.broadcast.emit('message', generateMessage('A new User has joined'))

    socket.on('sendMessage', (msg, callback) => {
        const filter = new Filter()

        if(filter.isProfane(msg)){
            return callback('Profanity is not allowed')
        }       

        io.emit('message', generateMessage(msg))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocation(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))

        callback()
    })

    socket.on('disconnet', () => {
        io.emit('message', generateMessage('A user has disconnected'))
    })
})




server.listen(port , () => {
    console.log(`Server connected on port ${port}`);
})