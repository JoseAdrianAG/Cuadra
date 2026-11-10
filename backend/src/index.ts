import { env } from "./config/env.js";
import { createApp } from "./app.js";

const app = createApp();

app.listen(env.PORT, (error?: Error) => {
    if (error) {
        console.error(`No se puedo inciar el servidor en el puerto ${env.PORT}: ${error.message}`);
        process.exit(1);
    }
    console.log(`Cuadra backend arrancado en modo ${env.NODE_ENV}, puerto ${env.PORT}`);
})

