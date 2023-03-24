import {expect} from "chai";
import { app } from "../server.js";
import supertest from "supertest";

const request = supertest(app);

describe("api productos andpoints", ()=>{
  let responseCreate;
  it("Obtener todos los productos", async()=>{
    const responseProduct = await request.get("/productos");
    const productos = responseProduct.body.productos;
    expect(Array.isArray(productos)).to.be.true;
  })

  it("Cargar un producto", async () => {
    const newProduct = {
      code: 1111,
      title: 'Test',
      price: 1111,
      thumbnail: 'test',
      timestamp: 'xx-xx-xxx',
      description: 'Test New Product',
      stock: 11,
    }
  
    const response = await request.post("/productos").send(newProduct);
    expect(response.status).to.equal(200);
  
    const responseProduct = await request.get("/productos");
    expect(responseProduct.status).to.equal(200);
  
    const productos = responseProduct.body.productos;
    const ultimoProducto = productos[productos.length - 1];
  
    expect(ultimoProducto.code).to.equal(1111);
  });

  it("Actualizar un producto", async() => {

    const responseProduct = await request.get("/productos");
    const productos = responseProduct.body.productos;
    const ultimoProducto = productos[productos.length - 1];
    // Actualizamos el producto agregado
    const updatedProduct = {
      ...ultimoProducto,
      title: "Producto actualizado",
      price: 2222,
    }

    const responseUpdate = await request.put(`/productos/${ultimoProducto.code}`).send(updatedProduct);
    const productoActualizado = responseUpdate.body.producto_nuevo;
  

    expect(responseUpdate.status).to.equal(200);
    expect(productoActualizado.title).to.equal("Producto actualizado");
    expect(productoActualizado.price).to.equal(2222);
  });

  it("Eliminar un producto", async() => {
    const responseProduct = await request.get("/productos");
    const productos = responseProduct.body.productos;
    const ultimoProducto = productos[productos.length - 1];
  
    const responseDelete = await request.delete(`/productos/${ultimoProducto.code}`);
    const productoEliminado = responseDelete.body.producto_eliminado;

  
    expect(responseDelete.status).to.equal(200);
    expect(productoEliminado[0].code).to.equal(ultimoProducto.code);
  

    const responseGet = await request.get(`/productos/1111`);
    expect(responseGet.body.length).to.equal(undefined);
  });

})