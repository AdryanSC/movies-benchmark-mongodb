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
      .on("data", (linha) => dados.push(linha))
      .on("end", () => resolve(dados));
  });
}

export async function executar() {
  await cliente.connect();
  console.log("Conectado ao MongoDB");

  const banco = cliente.db("ecommerce");

  const inicio = Date.now();

  const clientes = await lerCSV("../dataset/olist_customers_dataset.csv");
  console.log(`Clientes lidos: ${clientes.length}`);

  const pedidos = await lerCSV("../dataset/olist_orders_dataset.csv");
  console.log(`Pedidos lidos: ${pedidos.length}`);

  const itensPedido = await lerCSV("../dataset/olist_order_items_dataset.csv");
  console.log(`Itens de pedido lidos: ${itensPedido.length}`);

  await banco.collection("clientes").insertMany(clientes);
  await banco.collection("pedidos").insertMany(pedidos);
  await banco.collection("itens_pedido").insertMany(itensPedido);

  const fim = Date.now();
  const tempo = ((fim - inicio) / 1000).toFixed(2);

  console.log(`Inserção em massa concluída em ${tempo} segundos`);
  salvarResultado("Inserção em Massa", tempo);

  await cliente.close();
  return tempo;
}

if (process.argv[1].includes("insercaoMassa.js")) {
  executar();
}
