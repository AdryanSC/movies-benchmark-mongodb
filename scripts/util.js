import fs from "fs";

export function salvarResultado(nomeOperacao, tempo) {
  const linha = `${nomeOperacao},${tempo} segundos\n`;
  fs.appendFileSync("../resultados.csv", linha, "utf8");
}
