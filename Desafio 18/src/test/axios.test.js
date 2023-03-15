import axios from "axios";

const API_URL = 'http://localhost:8080/products';

describe('API de productos', () => {
  let productId;

  it('debe devolver todos los productos', async () => {
    const response = await axios.get(API_URL);
    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(3); // Aquí se asume que hay 3 productos en la API
  });

  it('debe agregar un nuevo producto', async () => {
    const newProduct = { name: 'Nuevo producto', price: 10 };
    const response = await axios.post(API_URL, newProduct);
    expect(response.status).toBe(201);
    expect(response.data.name).toBe(newProduct.name);
    expect(response.data.price).toBe(newProduct.price);
    productId = response.data.id; // Se guarda el id del nuevo producto para su uso en otros tests
  });

  it('debe devolver un producto existente', async () => {
    const response = await axios.get(`${API_URL}/${productId}`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe('Nuevo producto');
    expect(response.data.price).toBe(10);
  });

  it('debe actualizar un producto existente', async () => {
    const updatedProduct = { name: 'Producto actualizado', price: 20 };
    const response = await axios.put(`${API_URL}/${productId}`, updatedProduct);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe(updatedProduct.name);
    expect(response.data.price).toBe(updatedProduct.price);
  });

  it('debe eliminar un producto existente', async () => {
    const response = await axios.delete(`${API_URL}/${productId}`);
    expect(response.status).toBe(204);
  });
});
