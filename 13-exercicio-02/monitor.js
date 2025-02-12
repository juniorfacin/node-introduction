const os = require("node:os");
const fs = require("node:fs");
const path = require("node:path");
const { log, error } = require("node:console");

const systemPlatformMap = {
    "win32": "Windows",
    "linux": "Linux",
    "darwin": "MacOS",
    "freebsd": "FreeBSD"
};

const filePath = path.join(__dirname, "system_log.txt");

function formatUptime(uptimeInSeconds) {
    const days = Math.floor(uptimeInSeconds / 60 / 60 / 24);
    const hours = Math.floor((uptimeInSeconds % (60 * 60 * 24)) / 60 / 60);
    const minutes = Math.floor((uptimeInSeconds % (60 * 60)) / 60);
    const seconds = uptimeInSeconds % 60;

    return `${days}:${hours}:${minutes}:${seconds}`;
}

function getSystemInfo() {
    const uptimeInSeconds = os.uptime();

    const systemInfo = {
        operationSystem: systemPlatformMap[os.platform()],
        architecture: os.arch(),
        cpuModel: os.cpus()[0].model,
        uptime: formatUptime(uptimeInSeconds),
        ramTotal: os.totalmem() / 1024 / 1024 / 1024,
        ramUsage: Math.floor((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024),
        get ramUsagePercent() {
            return (this.ramUsage / this.ramTotal) * 100;
        }
    };

    return systemInfo;
}

function printLog(systemInfo) {
    console.clear();
    const logContent = `
        ************************
        DETALHES DO SISTEMA
        Sistema Operacional: ${systemInfo.operationSystem}
        Arquitetura do SO: ${systemInfo.architecture}
        Modelo do Processador: ${systemInfo.cpuModel}
        Tempo de Execução: ${systemInfo.uptime}
        Uso de Memória RAM: ${systemInfo.ramUsage} GB | Total: ${systemInfo.ramTotal.toFixed(2)} GB | ${systemInfo.ramUsagePercent.toFixed(2)} %
        ************************`;

    writeLogToFile(logContent);
}

function writeLogToFile(content) {
    // const filePath = path.join(__dirname, "system_log.txt");
    fs.appendFile(filePath, content, (err) => {
        if (err) {
            console.log("Erro ao escrever o arquivo: ", err);
        } else {
            console.log("\nLog escrito no arquivo system_log.txt");
        }
    });
}

function clearLogFile() {

    fs.writeFile(filePath, '', (err) => {
        if (err) {
            console.log("Erro ao limpar o arquivo: ", err);
        } else {
            console.log("Arquivo de Log limpo com sucesso!")
        }
    })
}

process.on("SIGINT", () => {
    clearLogFile();
    process.exit();
})

function updateSystemInfo() {
    const systemInfo = getSystemInfo();
    printLog(systemInfo);
}

clearLogFile();

setInterval(updateSystemInfo, 5000);
