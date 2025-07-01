import { MongoClient } from "mongodb";
import fs from "fs";
import csv from "csv-parser";
import { salvarResultado } from "./util.js";

const uri = "mongodb://localhost:27017";
const cliente = new MongoClient(uri);

function lerCSV(caminho) {
  return new Promise((resolve) => {
    const dados = [];
    fs.createReadStream(caminho)
      .pipe(csv())
      .on("data", (linha) => {
        if (linha.IMDB_Rating) linha.IMDB_Rating = parseFloat(linha.IMDB_Rating);
        if (linha.No_of_Votes) linha.No_of_Votes = parseInt(linha.No_of_Votes.replace(/,/g, ""), 10);
        dados.push(linha);
      })
      .on("end", () => resolve(dados));
  });
}

export async function executar() {
  await cliente.connect();
  console.log("✅ Conectado ao MongoDB");

  const banco = cliente.db("imdb");

  const inicio = Date.now();

  const filmes = await lerCSV("../dataset/imdb_top_1000.csv");
  console.log(`🎬 Filmes lidos: ${filmes.length}`);

  await banco.collection("filmes").insertMany(filmes);

  const fim = Date.now();
  const tempo = ((fim - inicio) / 1000).toFixed(2);

  console.log(`📌 Inserção em massa concluída em ${tempo} segundos`);
  salvarResultado("Inserção em Massa", tempo);

  await cliente.close();
  return tempo;
}

if (process.argv[1].includes("insercaoMassa.js")) {
  executar();
}
