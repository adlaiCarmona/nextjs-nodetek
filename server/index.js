// code from https://www.youtube.com/watch?v=kmrJkrW-ha0

const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
require('dotenv/config');

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected!')
})
.catch( err => {
    console.log(err)
})

app.prepare()
    .then(() => {
        const server = express()

        // changed from server.get to server.all
        server.all('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(PORT, (err) => {
            if(err) throw err
            console.log(`> Ready on http://localhost:${PORT}`);
        })
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });