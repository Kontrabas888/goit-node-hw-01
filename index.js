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

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts()
        .then(data => console.log("Список контактів:".yellow, data))
        .catch(err => console.log("Помилка при отриманні списку контактів:".red, err.message));
      break;

    case "get":
      contacts.getContactById(id)
        .then(contact => {
          if (contact) {
            console.log(`Контакт з таким id ${id}:`.yellow, contact);
          } else {
            console.log(`Контакт з таким ${id} не знайдено.`.red);
          }
        })
        .catch(err => console.log("Помилка при отриманні контактів:".red, err.message));
      break;

    case "add":
      contacts.addContact(name, email, phone)
        .then(() => console.log("Новий контакт успішно додано ==ˆ_ˆ==.".green))
        .catch(err => console.log("Помилка при додаванні контакту:".red, err.message));
      break;

    case "remove":
      contacts.removeContact(id)
        .then(() => console.log(`Контакт з таким id ${id} видалено успішно ==ˆ_ˆ==.`.green))
        .catch(err => console.log("Помилка при видаленні контакту:".red, err.message));
      break;

    default:
      console.warn("\x1B[31m Невідомий тип дії!".bgBlue);
  }
}

invokeAction(options);
