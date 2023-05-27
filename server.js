

const express = require('express')
const bodyParser = require('body-parser');
const next = require('next');
const socketIO = require('socket.io');
const http = require('http');
const { textToBraille } = require('./helpers/translate');
const { Node } = require('slate');
const path = require('path');
const fs = require('fs');

var fileUpload = require('express-fileupload');






const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler();




app.prepare().then(() => {
    const server = express();

   
    server.use(express.json({ limit: '50mb' }));
    server.use(fileUpload())
    const httpServer = http.createServer(server);
    const io = socketIO(httpServer);


    io.on('connection', (socket) => {
        console.log("new client connected");

        socket.on('translate', (data) => {
            //console.log(data);
            textToBraille(data, (brailleText) => {
                console.log("callback");
                socket.emit('result', brailleText)  //callback
            })

        })

        socket.on('disconnect', () => {
            console.log("client disconnected");
        })
    })



    //server.use(bodyParser.json());

    

    server.post('/api/upload', (req, res) => {
        console.log(req.files.file);
        if (!req.files || !req.files.file) {
            console.log("no file");
        }
        else {
            const file = req.files.file;
            const data=file.data.toString('utf8')
            res.json(data)
            
            
        }

    })


    server.all('*', (req, res) => {
        return handle(req, res);
    });

    httpServer.listen(3000, (err) => {
        if (err) throw err;

        console.log('Server is running on port 3000');
    });
});