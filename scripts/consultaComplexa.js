import { MongoClient } from "mongodb";
import { salvarResultado } from "./util.js";

const uri = "mongodb://localhost:27017";
const cliente = new MongoClient(uri);

export async function executar() {
  await cliente.connect();
  const banco = cliente.db("ecommerce");

  const inicio = Date.now();
  const resultado = await banco.collection("pedidos").aggregate([
    { $match: { order_status: "delivered" } },
    { $group: { _id: "$customer_id", totalPedidos: { $sum: 1 } } }
  ]).toArray();
  const fim = Date.now();
  const tempo = ((fim - inicio) / 1000).toFixed(2);

  console.log(`Consulta Complexa concluída em ${tempo} segundos`);
  salvarResultado("Consulta Complexa", tempo);
  console.log(resultado);

  await cliente.close();
  return tempo;
}

if (process.argv[1].includes("consultaComplexa.js")) {
  executar();
}
