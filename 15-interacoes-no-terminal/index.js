// // Ele modo não é muito utilizado.
// process.stdout.write("Hello world!");

// process.stdin.on("data", (data) => {
//     process.stdout.write(`Você digitou: ${data}`);
// })

const readline = require("node:readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// rl.on("line", (input) => {
//     rl.write(`Você digitou: ${input}`);
// });

// rl.question("Qual é o seu nome? ", (answer) => {
//     rl.write(`Olá, ${answer}!\n`);
//     rl.close();
// });

// rl.once("close", () => {
//     rl.write("Saindo...");
//     process.exit(0); // Para encerrar a interface - 0 e 1 são tratamento de erros.
// })

// Evento SIGINT - ctrl + C para encerrar a aplicação
rl.on('SIGINT', () => {
    rl.question('Deseja realmente sair? (s/n) ', (answer) => {
        if (answer.trim().toLowerCase() === 's') {
            rl.close()
        } else {
            rl.write("Você escolheu continuar.")
        }
    })
})