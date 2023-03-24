import axios from "axios";
import { ContenedorDaoProductos } from "./dbOperations/daos/fabric.js";
const productosService = ContenedorDaoProductos;

const url = "http://localhost:8080/productos"


export const testGetProducts = async()=>{
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.log(error)
    };
};
export const testPostProducts = async(newProduct)=>{
    try {
        let result = await axios.post(url, newProduct );
        console.log(result.data);
    } catch (error) {
        console.log(error)
    };
};

export const testUpdateUProducts = async(id, updatedProduct)=>{
    try {
        let result = await axios.put(`${url}/${id}`, updatedProduct );
        console.log(result.data);
    } catch (error) {
        console.log(error)
    };
};

export const testDeleteProducts = async(id)=>{
    try {
        let result = await axios.delete(`${url}/${id}`);
        console.log(result.data);
    } catch (error) {
        console.log(error)
    };
};


const newProduct = {
    code: 1111,
    title: 'Test',
    price: 1111,
    thumbnail: 'test',
    timestamp: 'xx-xx-xxx',
    description: 'Test New Product',
    stock: 11,
}

const updatedProduct = {
    code: 1111,
    title: 'Test Update',
    price: 2222,
    thumbnail: 'test Update',
    timestamp: 'xx-xx-xxx',
    description: 'Test New Product Update',
    stock: 22,
}

//testGetUsers();
//testPostUsers(newProduct);
//testUpdateUsers(1111, updatedProduct);
//testDeleteUsers(1111);
