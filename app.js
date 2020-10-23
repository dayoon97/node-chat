const fs = require('fs')

const express = require('express')

const app = express()

const http = require('http')

const server = http.createServer(app)

const socket = require('socket.io')

const io = socket(server)



app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/', function(request, response){
    fs.readFile('index.html', function(err, data){
        if(err) {
            response.send('에러')
        } else {
            response.writeHead(200, {'Content-Type':'text/html'})
            response.write(data)
            response.end()
        }
    })
})

io.sockets.on('connection', function(socket){
    console.log('유저 접속 됨')

    socket.on('send', function(data){
        console.log('전달된 메시지 : ', data.msg)
    })

    socket.on('disconnect', function(){
        console.log('접속 종료')
    })
})


server.listen(8003, function(){
    console.log('서버 실행 중...')
})