const fs = require('fs');

// --------- Buat foder data Kalau fodernya ga ada
const dirPath = './data';

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// -------- Buat file json kalau ga ada
const dataPath = './data/contacts.json';

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// ------------ get all contacts di contact.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8'); // msh string
    const contacts = JSON.parse(fileBuffer); //ubah jd json file
    return contacts;
}

// ------------ find contact before nama
const findContact = (nama) => {
    const contacts = loadContact(); // get all contacts
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase()); // kalo namadari json sama dgn parameter
    return contact;
}

// --------------- menulis / menimpa file json yg baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); //ubah array jd string
}

const addContact = (contact) => {
    const contacts = loadContact(); //ambil data asal json
    contacts.push(contact);
    saveContacts(contacts); // timpa / tambah difile json
}

// cek nama Duplikat

const cekDuplikat = (nama) => {
    const contacts = loadContact(); //ambil data asal json
    return contacts.find((contact) => contact.nama === nama); // kalo data json ada nama yg sama bakal nilai true
}

// hapus contact

const deleteContact = (nama) => {
    const contact = loadContact(nama); //ambil data asal json
    const filterContact = contact.filter((contact) => contact.nama !== nama); // kalo data json ada nama yg sama bakal nilai true
    saveContacts(filterContact); // tambahkan file json yg sdh difilter json, yg ga keda filter nnt ilang
}

// update / ubah contact
const updateContact = (contactBaru) => {
    const contacts = loadContact(); //ambil data asal json
    const filterContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama); // kalo data json ada nama yg sama bakal nilai true
    delete contactBaru.oldNama; // hapus oldNama dlm json
    filterContacts.push(contactBaru); // tambahkan file json yg sdh difilter json, yg ga keda filter nnt ilang
    saveContacts(filterContacts); // tambahkan file json yg sdh difilter json, yg ga keda filter nnt ilang
}


module.exports = {
    loadContact,
    findContact,
    addContact,
    cekDuplikat,
    deleteContact,
    updateContact
}