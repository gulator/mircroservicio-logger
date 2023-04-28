import express from 'express';
import logManager from './modules/logManager.js';

let app = express()
let lm = new logManager()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/api/log', async (req, res) => {
    let type = req.query.type
    let logs = await lm.getLogs()
    if (type) {
        let newLogs = logs.filter((log) => log.type === type)
        res.send(newLogs)
    }
    res.send(logs)

})
app.get('/api/log/:lid', async (req, res) => {
    let id = req.params.lid
    let logs = await lm.getLogs()    
    let logIndex = logs.findIndex((file) => file.id == id)
    if (logIndex === -1) {
        res.status(404).send({ status: 404, error: `No existe elemento con id :${id}` })
    }
    res.send(logs[logIndex])

})

app.listen(8080, () => {
    console.log('listening to port 8080')
})

