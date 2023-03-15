import axios from "axios";
import { ContenedorDaoProductos } from "./dbOperations/daos/fabric.js";
const productosService = ContenedorDaoProductos;

const url = "http://localhost:8080/productos"


const testGetUsers = async()=>{
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.log(error)
    };
};
const testPostUsers = async()=>{
    try {
        let result = await axios.post(url, {
            code: 1111,
            title: 'Test',
            price: 1111,
            thumbnail: 'test',
            timestamp: 'xx-xx-xxx',
            description: 'Test New Product',
            stock: 11,
        });
        console.log(result.data);
    } catch (error) {
        console.log(error)
    };
};

const testUpdateUsers = async()=>{
    try {
        let result = await axios.put(`${url}/1111`, {
            code: 1111,
            title: 'Test Update',
            price: 2222,
            thumbnail: 'test Update',
            timestamp: 'xx-xx-xxx',
            description: 'Test New Product Update',
            stock: 22,
        });
        console.log(result.data);
    } catch (error) {
        console.log(error)
    };
};

const testDeleteUsers = async()=>{
    try {
        let result = await axios.delete(`${url}/1111`);
        console.log(result.data);
    } catch (error) {
        console.log(error)
    };
};


//testGetUsers();
//testPostUsers();
testUpdateUsers();
//testDeleteUsers();
