import { MongoClient } from "mongodb";
import { salvarResultado } from "./util.js";

const uri = "mongodb://localhost:27017";
const cliente = new MongoClient(uri);

export async function executar() {
  await cliente.connect();
  const banco = cliente.db("ecommerce");

  const inicio = Date.now();
  const resultado = await banco.collection("clientes").findOne();
  const fim = Date.now();
  const tempo = ((fim - inicio) / 1000).toFixed(2);

  console.log(`Consulta Simples concluída em ${tempo} segundos`);
  salvarResultado("Consulta Simples", tempo);
  console.log(resultado);

  await cliente.close();
  return tempo;
}

if (process.argv[1].includes("consultaSimples.js")) {
  executar();
}
