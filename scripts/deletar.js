import { MongoClient } from "mongodb";
import { salvarResultado } from "./util.js";

const uri = "mongodb://localhost:27017";
const cliente = new MongoClient(uri);

const ORDER_ID_REAL = "82566a660a982b15fb86e904c8d32918";

export async function executar() {
  await cliente.connect();
  const banco = cliente.db("ecommerce");

  const inicio = Date.now();

  const resultado = await banco.collection("pedidos").deleteOne({
    order_id: ORDER_ID_REAL
  });

  const fim = Date.now();
  const tempo = ((fim - inicio) / 1000).toFixed(2);

  console.log(`Exclusão concluída em ${tempo} segundos`);
  salvarResultado("Deletar", tempo);
  console.log(resultado);

  await cliente.close();
  return tempo;
}

if (process.argv[1].includes("deletar.js")) {
  executar();
}
