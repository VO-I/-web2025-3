    const fs = require("fs");
    const { Command } = require("commander");

    const program = new Command();

    // Налаштування командного рядка
    program
    .option("-i, --input <path>", "шлях до файлу JSON (обов'язково)")
    .option("-o, --output <path>", "шлях до файлу результату (необов'язково)")
    .option("-d, --display", "вивести результат у консоль")
    .parse(process.argv);

    const options = program.opts();

    // Перевіряємо наявність обов'язкового параметра
    if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
    }

    // Читаємо JSON-файл
    if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(options.input, "utf-8"));

    console.log("Зчитані дані:", data);  // Перевіримо, що зчиталось
    const filteredValues = data
        .filter(item => {
            console.log(`Перевіряємо: ku=${item.ku}, value=${item.value}`);
            return item.ku === "13" && item.value > 5;
        })
        .map(item => item.value);
    console.log("Фільтровані значення:", filteredValues);
    
    // Вивід у консоль
    if (options.display) {
    console.log(filteredValues.join("\n"));
    }

    // Запис у файл
    if (options.output) {
    fs.writeFileSync(options.output, filteredValues.join("\n"), "utf-8");
    }

    if (!options.display && !options.output) {
    process.exit(0);
    }
