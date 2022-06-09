import express from 'express'
import { routes } from './routes';
import cors from 'cors';

const app = express();

app.use(cors()); // -> Controle de segurança de backend, com ele conseguimos falar quais endereços de frontend podem consumir o backend
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log("HTTP server listening on");
})

// Banco de dados Opensource -> Produção PostGree
// Em desenvolvimento SQLite