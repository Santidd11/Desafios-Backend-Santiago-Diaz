import admin from "firebase-admin";


const db = admin.firestore();

class productsContainerFirestore{
    constructor(collection){
        this.collection = db.collection(collection)
    }

    async getAll(){
        try{
            const snapshot = await this.collection.get();
            const docs = snapshot.docs;
            let products = docs.map(doc=>{
                return{
                    id: doc.id,
                    code: doc.data().code,
                    title: doc.data().title,
                    price: doc.data().price,
                    thumbnail: doc.data().thumbnail,
                    timestamp: doc.data().timestamp,
                    description: doc.data().description,
                    stock: doc.data().stock

                }
            });
            return products;
        } catch(error){
            console.log(`Error al leer el archivo: ${error}`)
        }
    }

    async save(product){
        try{
            const doc = this.collection.doc();
            await doc.create(product);
            } catch(error){
            console.log(`Error al escribir el archivo: ${error}`)
        }
    }

    async updateByID(id, producto){
        try{
            const doc = this.collection.doc(id);
            await doc.update(producto);
            console.log("Producto actualizado")
        }catch (error){
            console.log(`Error al actualizar producto ${error}`)
        }
    }

    async getById(id){
        try{
            const stock = await this.getAll();
            const product = stock.find(element=>element.id === id)
            return product
        }catch (error){
            console.log(`Error al obtener producto: ${error}`)
        }
    }

    async deleteById(id){
        try{
            const doc = this.collection.doc(id);
            await doc.delete();
            console.log("Producto Eliminado")
        }catch (error){
            console.log(`Error al eliminar producto: ${error}`)
        }
    }
};

export {productsContainerFirestore};