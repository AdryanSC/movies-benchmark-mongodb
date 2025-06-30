import { executar as insercao } from "./insercaoMassa.js";
import { executar as simples } from "./consultaSimples.js";
import { executar as complexa } from "./consultaComplexa.js";
import { executar as atualizar } from "./atualizar.js";
import { executar as deletar } from "./deletar.js";

async function main() {
  const tempoInsercao = await insercao();
  const tempoSimples = await simples();
  const tempoComplexa = await complexa();
  const tempoAtualizar = await atualizar();
  const tempoDeletar = await deletar();

  console.log("\n📊 📌 Resultado Final:");
  console.log(`➡️ Inserção em Massa: ${tempoInsercao} segundos`);
  console.log(`➡️ Consulta Simples: ${tempoSimples} segundos`);
  console.log(`➡️ Consulta Complexa: ${tempoComplexa} segundos`);
  console.log(`➡️ Atualizar: ${tempoAtualizar} segundos`);
  console.log(`➡️ Deletar: ${tempoDeletar} segundos`);
}

main();
