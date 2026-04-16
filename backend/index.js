const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    app: 'min store',
    message: 'API do e-commerce minimalista está ativa',
  });
});

app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { name, description, price, stock = 0, imageUrl, categoryId } = req.body;

    if (!name || price == null) {
      return res.status(400).json({
        error: 'Os campos name e price são obrigatórios.',
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: Number(stock),
        imageUrl,
        categoryId: categoryId ? Number(categoryId) : null,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor min store executando em http://localhost:${PORT}`);
});
