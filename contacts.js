const { readFile, writeFile } = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

// читаємо масив котактів, та повртаемо пустий масив при помилці
function listContacts() {
  return readFile(contactsPath, 'utf8')
    .then(data => JSON.parse(data))
    .catch(err => {
      console.log(err.message);
      return [];
    });
}

// Шукаємо контакт по іd, якщо id не знайдено повертаеться null
function getContactById(contactId) {
  return listContacts()
    .then(contacts => contacts.find(contact => contact.id === contactId))
    .catch(err => {
      console.log(err.message);
      return null;
    });
}

// Видаляє контакт по id, якщо під час перезапису файлу чи пошуку виникає помилка, виводиться сповіщення
function removeContact(contactId) {
  return listContacts()
    .then(contacts => {
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      return writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    })
    .then(() => console.log('Contact removed successfully'))
    .catch(err => console.log(err.message));
}

// Додаємо контакт з новим id та перезаписуємо файл, при помилці виводимо повідомлення
function addContact(name, email, phone) {
  return listContacts()
    .then(contacts => {
      const newContact = { id: Date.now(), name, email, phone };
      const updatedContacts = [...contacts, newContact];
      return writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    })
    .then(() => console.log('Contact added successfully'))
    .catch(err => console.log(err.message));
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};

