const reportarConsulta = async (req, res, next) => {
    const parametro = req.params
    const url = req.url
    console.log(`El día "${new Date()}" hubo una consulta a la ruta "${url}" que nos entregó el parametro: `, parametro)
    next()
}

module.exports = { reportarConsulta }