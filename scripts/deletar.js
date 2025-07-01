import { MongoClient } from "mongodb";
import { salvarResultado } from "./util.js";

const uri = "mongodb://localhost:27017";
const cliente = new MongoClient(uri);

const FILME_TITULO = "The Shawshank Redemption";

export async function executar() {
  await cliente.connect();
  const banco = cliente.db("imdb");

  const inicio = Date.now();

  const resultado = await banco.collection("filmes").deleteOne({
    Series_Title: FILME_TITULO
  });

  const fim = Date.now();
  const tempo = ((fim - inicio) / 1000).toFixed(2);

  console.log(`🗑️ Exclusão concluída em ${tempo} segundos`);
  salvarResultado("Deletar", tempo);
  console.log(resultado);

  await cliente.close();
  return tempo;
}

if (process.argv[1].includes("deletar.js")) {
  executar();
}
