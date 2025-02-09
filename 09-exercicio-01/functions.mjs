import fs from "node:fs";

export function createFile(text) {
    fs.writeFile("./meuarquivo.txt", text, (error) => {
        if (error) {
            console.log("Erro ao escrever os arquivos: ", error.message);
        }
    })
}

export function showFile() {
    fs.readFile("./meuarquivo.txt", "utf-8", (error, text) => {
        if (error) {
            console.log("Erro ao ler o arquivo: ", error.message);
        } else {
            console.log(text);
        }
    })
}

export function updateFile(newText) {
    fs.readFile("meuarquivo.txt", (error) => {
        if (error) {
            console.log("Erro ao modificar o arquivo: ", error.message);
        } else {
            console.log(newText)
        }
    })
}

export function deleteFile() {
    fs.unlink("meuarquivo.txt", (error) => {
        if (error) {
            console.log("Erro ao deletar o arquivo: ", error.message);
        } else {
            console.log("Arquivo deletado com sucesso.")
        }
    })
}