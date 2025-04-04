import express from 'express'
import productsRouter from '../routes/products.routes.js'
import cartsRouter from '../routes/carts.routes.js'

const app = express();
const PORT = 8080;

app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use( (req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'})
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})