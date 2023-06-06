const { Command } = require("commander");
const contacts = require("./contacts");
require('colors');

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const list = await contacts.listContacts();
        console.log("Список контактів:".yellow, list);
        break;

      case "get":
        const contact = await contacts.getContactById(id);
        if (contact) {
          console.log(`Контакт з таким id ${id}:`.yellow, contact);
        } else {
          console.log(`Контакт з таким ${id} не знайдено.`.red);
        }
        break;

      case "add":
        await contacts.addContact(name, email, phone);
        console.log("Новий контакт успішно додано ==ˆ_ˆ==.".green);
        break;

      case "remove":
        await contacts.removeContact(id);
        console.log(`Контакт з таким id ${id} видалено успішно ==ˆ_ˆ==.`.green);
        break;

      default:
        console.warn("\x1B[31m Невідомий тип дії!".bgBlue);
    }
  } catch (err) {
    console.error("\x1B[31m Помилка:".red, err.message);
  }
}

invokeAction(options);
