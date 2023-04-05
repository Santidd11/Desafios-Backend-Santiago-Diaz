import { Application, config } from "../depts.ts";
import { productRouter } from "./routes/productos.routes.ts";

const {PORT} = config();
const port = parseInt(PORT);


const app = new Application();


app.use(productRouter.routes());

app.listen({port});
console.log(`Server listening on port ${PORT}`);