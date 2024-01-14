const { obtenerJoyas, obtenerJoya, obtenerJoyasPorFiltros, prepararHATEOAS } = require('./consultas')
const { reportarConsulta } = require('./middleware')
const express = require('express')
const app = express()
const cors = require('cors')

app.listen(3001, console.log('Server ON'))

app.use(express.json())
app.use(cors())

app.get("/joyas", reportarConsulta, async (req, res) => {
    const queryStrings = req.query;
    const joyas = await obtenerJoyas(queryStrings);
    const HATEOAS = await prepararHATEOAS(joyas)
    res.json(HATEOAS);
});

app.get("/joyas/joya/:id", reportarConsulta, async (req, res) => {
    try {
        const { id } = req.params
        const joya = await obtenerJoya(id)
        res.json(joya)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/joyas/filtros", reportarConsulta, async (req, res) => {
    const queryStrings = req.query
    const joyas = await obtenerJoyasPorFiltros(queryStrings)
    res.json(joyas)
})

app.get("*", (req, res) => {
    res.status(404).send("Esta ruta no existe")
})