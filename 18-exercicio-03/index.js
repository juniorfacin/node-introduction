const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const notesDirectory = path.join(__dirname, "notes");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function initializeNotesDirectory() {
  if (!fs.existsSync(notesDirectory)) {
    fs.mkdirSync(notesDirectory);
  }
}

function listNotes() {
  const notes = fs.readdirSync(notesDirectory);

  if (notes.length === 0) {
    console.log("Nenhuma nota encontrada.");
  } else {
    console.log("\nNotas salvas:");
    notes.forEach((note, index) => {
      console.log(`${index + 1}. ${note}`);
    });
  }

  askForNextAction();
}

function readNote() {
  const notes = listNotes();
  if (notes.length === 0) {
    askForNextAction();
    return;
  }

  rl.question("\nDigite o número da nota que deseja ler: ", (index) => {
    const selectedIndex = parseInt(index) - 1;

    if (
      isNaN(selectedIndex) ||
      selectedIndex < 0 ||
      selectedIndex >= notes.length
    ) {
      console.log("Número da nota inválido.");
    } else {
      const notePath = path.join(notesDirectory, notes[selectedIndex]);
      const content = fs.readFileSync(notePath, "utf-8");
      console.log(`\nConteúdo da Nota "${notes[selectedIndex]}":\n`);
      console.log(content);
    }
    askForNextAction();
  });
}

function createNote() {
  rl.question("Digite o nome da nota: ", (noteName) => {
    const notePath = path.join(notesDirectory, noteName);

    rl.question("Digite o conteúdo da nota:\n", (content) => {
      fs.writeFileSync(notePath + ".txt", content, "utf-8");
      console.log(`\nNota '${noteName}' foi criada com sucesso.`);

      askForNextAction();
    });
  });
}

function deleteNote() {
  const notes = listNotes();
  if (notes.length === 0) {
    askForNextAction();
    return;
  }

  rl.question("\nDigite o número da nota que deseja excluir: ", (index) => {
    const selectedIndex = parseInt(index) - 1;
    if (
      isNaN(selectedIndex || selectedIndex < 0 || selectedIndex >= notes.length)
    ) {
      console.log("Número da nota inválido.");
      askForNextAction();
      return;
    }
    const notePath = path.join(notesDirectory, notes[selectedIndex]);

    fs.unlinkSync(notePath);

    console.log(`Nota: '${notes[selectedIndex]}' - foi excluída com sucesso.`);
    askForNextAction();
  });
}

function askForNextAction() {
  rl.question("\nDeseja realizar outra ação? (s/n) ", (answer) => {
    if (answer.toLocaleLowerCase() === "s") {
      main();
    } else {
      console.log("\nEncerrando a aplicação...");
      rl.close();
      process.exit(0);
    }
  });
}

function main() {
  initializeNotesDirectory();

  console.clear();
  console.log("------------------------------");
  console.log("Notas Rápidas no Terminal v1.0");
  console.log("------------------------------\n");

  console.log("Escolha uma opção:");
  console.log("1. Listar notas");
  console.log("2. Ler uma nota");
  console.log("3. Criar uma nova nota");
  console.log("4. Excluir uma nota");
  console.log("5. Sair");

  rl.question("Digita o número da opção desejada: ", (options) => {
    switch (options) {
      case "1":
        listNotes();
        break;
      case "2":
        readNote();
        break;
      case "3":
        createNote();
        break;
      case "4":
        deleteNote();
        break;
      case "5":
        console.log("Saindo...");
        rl.close();
        process.exit(0);
      default:
        console.log("Opção inválida.");
        break;
    }
  });
}

main();
