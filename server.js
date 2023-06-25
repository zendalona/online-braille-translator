/*  Braille-Translator

    Copyright (C) 2022-2023 Jithesh M <jitheshmjithooz@gmail.com>
    
    V T Bhattathiripad College, Sreekrishnapuram, Kerala, India

    This project supervised by Zendalona(2022-2023) 

    Project Home Page : www.zendalona.com/braille-translator

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.*/


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
    const io = socketIO(httpServer, {
        maxHttpBufferSize: 1e8
    });


    io.on('connection', (socket) => {
        console.log("new client connected");

        socket.on('translate', (data, ack) => {
            ack()
            console.log(data);
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
            const data = file.data.toString('utf8')
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