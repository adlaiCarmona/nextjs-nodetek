// code from https://www.youtube.com/watch?v=kmrJkrW-ha0

const express = require('express');
const next = require('next');

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('/a', (req, res) => {
            return app.render(req, res, '/b', req.query)
        })

        server.get('/b', (req, res) => {
            return app.render(req, res, '/a', req.query)
        })

        server.get('/posts/:id', (req, res) => {
            return app.render(req, res, '/posts', { id: req.params.id })
        })

        server.get('*', (req, res) => {
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