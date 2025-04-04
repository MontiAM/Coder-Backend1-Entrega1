import express from 'express'
import ProductManager from '../services/ProductManager.js';
import CartManager from '../services/CartManager.js';

const app = express();
const PORT = 8080;
const productManager = new ProductManager('./products.json')
const cartManager = new CartManager('./cart.json')

app.use(express.json())

// Rutas de Product
app.get('/api/products', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.status(200).json({msg: 'Listado de productos: ', data: products})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
app.post('/api/products/', async (req, res) => {
    try {
        const newProduct = req.body
        const product = await productManager.addProduct(newProduct)
        res.status(201).json({msg: 'Productos agregado exitosamente.', data: product})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
app.get('/api/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const product = await productManager.getProductById(productId)
        res.status(200).json({msg: 'Producto: ', data: product})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
app.put('/api/products/:pid', async (req, res) => {
    try {
        const prodID = parseInt(req.params.pid);
        const data  = req.body;
        const updatedProduct = await productManager.updateProduct(prodID, data)
        res.status(200).json({msg: 'Producto actualizado exitosamente.', data: updatedProduct})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
app.delete('/api/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const product = await productManager.deleteProduct(productId)
        res.status(200).json({msg: 'Productos eliminado exitosamente.', data: product})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
// Rutas de Cart
app.post('/api/carts/', async (req, res) => {
    try {
        const cart = await cartManager.createCart()
        res.status(201).json({msg: 'Carrito creado exitosamente.', data: cart})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
app.get('/api/carts/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const cart = await cartManager.getCartById(cartId)
        res.status(200).json({msg: 'Listado de productos: ', data: cart})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity;
        const cart = await cartManager.addProductToCart(cartId, productId, quantity);
        res.status(201).json({msg: 'Carrito creado exitosamente.', data: cart});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})
app.delete('/api/carts/:cid/product/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid;
        const cartId = req.params.cid;
        const removedProduct = await cartManager.removeProductFromCart(cartId, prodId)
        res.status(200).json({msg: 'Producto eliminado de carrito.', data: removedProduct})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    
})