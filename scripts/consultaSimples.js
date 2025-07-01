import { MongoClient } from "mongodb";
import { salvarResultado } from "./util.js";

const uri = "mongodb://localhost:27017";
const cliente = new MongoClient(uri);

export async function executar() {
  await cliente.connect();
  const banco = cliente.db("imdb");

  const inicio = Date.now();

  const resultado = await banco.collection("filmes").findOne(
    { IMDB_Rating: { $gt: 8.5 } },
    { projection: { Series_Title: 1, IMDB_Rating: 1, _id: 0 } }
  );

  const fim = Date.now();
  const tempo = ((fim - inicio) / 1000).toFixed(2);

  console.log(`🎬 Consulta Simples concluída em ${tempo} segundos`);
  salvarResultado("Consulta_Simples", tempo);
  console.log(resultado);

  await cliente.close();
  return tempo;
}

if (process.argv[1].includes("consultaSimples.js")) {
  executar();
}
