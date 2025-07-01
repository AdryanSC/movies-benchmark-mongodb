import { MongoClient } from "mongodb";
import { salvarResultado } from "./util.js";

const uri = "mongodb://localhost:27017";
const cliente = new MongoClient(uri);

export async function executar() {
  await cliente.connect();
  const banco = cliente.db("imdb");

  const inicio = Date.now();

  const resultado = await banco.collection("filmes")
    .find({
      No_of_Votes: { $gt: 1000000 },
      IMDB_Rating: { $gt: 8.5 }
    })
    .project({
      Series_Title: 1,
      Director: 1,
      IMDB_Rating: 1,
      No_of_Votes: 1,
      _id: 0
    })
    .sort({ IMDB_Rating: -1 })
    .toArray();

  const fim = Date.now();
  const tempo = ((fim - inicio) / 1000).toFixed(2);

  console.log(`🎬 Consulta Complexa concluída em ${tempo} segundos`);
  salvarResultado("Consulta_Complexa", tempo);
  console.log(resultado);

  await cliente.close();
  return tempo;
}

if (process.argv[1].includes("consultaComplexa.js")) {
  executar();
}
