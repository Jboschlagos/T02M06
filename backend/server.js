const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "productos.txt");
const PUBLIC_DIR = path.join(__dirname, "public");

// Configuración CORS permisiva para desarrollo
app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

// Función para procesar texto a productos
function productsFromText(text) {
    if (!text.trim()) return [];
    
    let arrayProductsRaw = text.split("\n");
    let newArrayProducts = arrayProductsRaw
        .filter(line => line.trim() !== "")
        .map((line, index) => {
            const [nombre, precio] = line.split(",");
            return {
                id: index + 1,
                nombre: nombre.trim(),
                precio: Number(precio.trim())
            };
        });
    return newArrayProducts;
}

// Leer productos desde archivo
async function readProducts() {
    try {
        const text = await fs.readFile(DATA_FILE, "utf-8");
        return productsFromText(text);
    } catch (err) {
        if (err.code === "ENOENT") {
            // Si el archivo no existe, crearlo con datos iniciales
            const productosIniciales = [
                "Audífonos Bluetooth, 29990",
                "Mouse Gamer, 15990",
                "Teclado Mecánico, 45990"
            ].join("\n");
            await fs.writeFile(DATA_FILE, productosIniciales, 'utf-8');
            return productsFromText(productosIniciales);
        }
        throw err;
    }
}

// Agregar producto al archivo
async function appendProduct({ nombre, precio }) {
    const line = `\n${nombre},${precio}`;
    await fs.appendFile(DATA_FILE, line, 'utf-8');
}

// GET /api/productos
app.get("/api/productos", async (req, res, next) => {
    try {
        const productos = await readProducts();
        res.status(200).json({ ok: true, productos });
    } catch (err) {
        next(err);
    }
});

// POST /api/productos
app.post("/api/productos", async (req, res, next) => {
    try {
        const nombre = String(req.body?.nombre ?? "").trim();
        const precio = Number(req.body?.precio);

        if (!nombre) {
            return res.status(400).json({ ok: false, error: "Falta nombre" });
        }
        
        // CORRECCIÓN: Separar las condiciones correctamente
        if (!Number.isFinite(precio) || precio <= 0) {
            return res.status(400).json({ ok: false, error: "Precio inválido" });
        }

        await appendProduct({ nombre, precio });
        const productos = await readProducts();

        res.status(201).json({ 
            ok: true, 
            mensaje: "Producto agregado", 
            productos 
        });
    } catch (err) {
        console.error("Error en POST:", err);
        next(err);
    }
});

// Métodos no permitidos para /api/productos
app.all("/api/productos", (req, res) => {
    res.set("Allow", "GET, POST");
    res.status(405).json({ ok: false, error: "Method not Allowed" });
});

// 404 para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ ok: false, error: "Not Found" });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error("Error del servidor:", err);
    res.status(500).json({ ok: false, error: "Error interno del servidor" });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor Node.js ejecutándose en http://localhost:${PORT}`);
    console.log(`📡 API REST disponible en http://localhost:${PORT}/api/productos`);
});