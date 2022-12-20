import admin from "firebase-admin";

const db = admin.firestore();

class cartContainerFirestore{
    constructor(collection){
        this.collection = db.collection(collection)
    }

    async getAll(){
        try{
            const snapshot = await this.collection.get();
            const docs = snapshot.docs;
            let cart = docs.map(doc=>{
                return{
                    id: doc.id,
                    timestamp: doc.data().timestamp,
                    productos: doc.data().productos,
                }
            });
            return cart;
        } catch(error){
            console.log(`Error al leer el archivo: ${error}`)
        }
    }

    async save(carrito){
        try{
            const doc = this.collection.doc();
            await doc.create(carrito);
            } catch(error){
            console.log(`Error al escribir el archivo: ${error}`)
        }
    }

    async saveProduct(id, product){
        try{
            const cart = this.getById(id)
            let newProducts = cart.productos
            newProducts.push(product)
            const doc = this.collection.doc(id);
            await doc.update({productos:newProducts});
            } catch(error){
            console.log(`Error al escribir el archivo: ${error}`)
        }
    }

    async updateByID(id, carrito){
        try{
            const doc = this.collection.doc(id);
            await doc.update(carrito);
            console.log("Carrito actualizado")
        }catch (error){
            console.log(`Error al actualizar Carrito ${error}`)
        }
    }

    async getById(id){
        try{
            const stock = await this.getAll();
            const cart = stock.find(element=>element.id === id)
            return cart
        }catch (error){
            console.log(`Error al obtener producto: ${error}`)
        }
    }

    async deleteById(id){
        try{
            const doc = this.collection.doc(id);
            await doc.delete();
            console.log("Carrito Eliminado")
        }catch (error){
            console.log(`Error al eliminar carrito: ${error}`)
        }
    }
};

export {cartContainerFirestore};