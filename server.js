

const express = require('express')
const bodyParser = require('body-parser');
const next = require('next');
const socketIO = require('socket.io');
const http = require('http');
const { textToBraille } = require('./helpers/translate');




const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler();




app.prepare().then(() => {
    const server = express();
    const httpServer = http.createServer(server);
    const io = socketIO(httpServer);


    io.on('connection', (socket) => {
        console.log("new client connected");
        
        socket.on('translate', (data) => {
           //console.log(data);
            textToBraille(data,(brailleText)=>{
                console.log("callback");
                socket.emit('result',brailleText)  //callback
            })

        })

        socket.on('disconnect', () => {
            console.log("client disconnected");
        })
    })



    //server.use(bodyParser.json());

    // server.post('/api/translate', async (req, res) => {

    //     textToBraille(req.body).then((brailleText)=>{
    //         res.status(200).json({ result: brailleText });
    //     })


    // });


    server.all('*', (req, res) => {
        return handle(req, res);
    });

    httpServer.listen(3000, (err) => {
        if (err) throw err;
        console.log('Server is running on port 3000');
    });
});