const os = require("node:os");

const operationSystem = os.platform();
console.log("Plataforma do SO: ", operationSystem);

const architecture = os.arch();
console.log("Arquitetura do SO: ", architecture);

const cpus = os.cpus();
console.log("Quantidade de processamento: ", cpus[0]);

const totalMemory = os.totalmem();
console.log("Arquitetura do SO: ", totalMemory / 1024 / 1024 / 1024, "GB");

