

const express = require('express')
const bodyParser = require('body-parser');
const next = require('next');
const socketIO = require('socket.io');
const http = require('http');
const { textToBraille } = require('./helpers/translate');
const { Node } = require('slate');
const path = require('path');
const fs = require('fs');
const { downloadAction } = require('./helpers/download');





const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler();




app.prepare().then(() => {
    const server = express();

    if (fs.existsSync(__dirname + '/temp')) {
        //console.log("exit");
        fs.rmSync(__dirname + '/temp', { recursive: true });
    }
    fs.mkdirSync(path.join(__dirname, 'temp'), (err) => { if (err) throw err; })
    const temp = path.join(__dirname, 'temp');
    server.use(express.json({limit: '50mb'}));
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

    server.post('/api/download', (req, res) => {
        downloadAction(req.body, temp).then((filePath, fileName) => {
            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', 'text/plain');
            res.download(filePath, fileName, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log("here");
                fs.unlink(filePath, (err) => {
                    if (err)
                        console.log(err);
                })


            })
        })





    });


    server.all('*', (req, res) => {
        return handle(req, res);
    });

    httpServer.listen(3000, (err) => {
        if (err) throw err;

        console.log('Server is running on port 3000');
    });
});