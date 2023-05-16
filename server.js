

const express = require('express')
const bodyParser = require('body-parser');
const next = require('next');
const { textToBraille } = require('./helpers/translate');




const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.json());

    server.post('/api/translate', async (req, res) => {

        textToBraille(req.body).then((brailleText)=>{
            res.status(200).json({ result: brailleText });
        })

        
    });


    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('Server is running on port 3000');
    });
});