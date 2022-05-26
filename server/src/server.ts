import express from "express";
import cors from "cors";
import { routes } from "./routes";

const app = express();

//tipos de requisições

//GET => Buscar informações
//POST => Cadastrar informações
//PUT => Atualizar informações de uma entidade
//PATCH => Atualizar uma informação única de uma entidade
//DELETE => Deletar uma informação

//responsável pelo controle de segurança no nosso backend, impedindo que frontends indesejados acessem nosso backend
app.use(cors());

//middleware (uma espécie de plugin) verifica se tem algum corpo da requisição no formato JSON, possibilitando a leitura
app.use(express.json());

//arquivo routes
app.use(routes);

app.listen(3333, () => {
  console.log("HTTP Server is running");
});
