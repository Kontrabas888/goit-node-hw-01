const { readFile, writeFile } = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const data = await readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

function getContactById(contactId) {
  return listContacts()
    .then(contacts => contacts.find(contact => contact.id === contactId))
    .catch(err => {
      console.log(err.message);
      return null;
    });
}

function removeContact(contactId) {
  return listContacts()
    .then(contacts => {
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      return writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    })
    .then(() => console.log('Contact removed successfully'))
    .catch(err => console.log(err.message));
}

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

