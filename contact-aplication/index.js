const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 5000;

// ======== dari file contact 
const {
    loadContact,
    findContact,
    addContact,
    cekDuplikat,
    deleteContact,
    updateContact
} = require('./utils/contact');

// gunakan ejs
app.set('view engine', 'ejs');

// ------ Third-party Middleware
// layout ejs
app.use(expressLayouts);

// validator
const {
    body,
    validationResult,
    check
} = require('express-validator'); // untuk validasi

// untuk mengambil data json
const {
    json
} = require('express/lib/response');
const req = require('express/lib/request');



// Build-in Middleware
// buat mempublic folser, jd bisa dipake
// cth folder img

app.use(express.static('public'));

// menangani method post tambah data kontak
// buit-in express
app.use(express.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        layout: 'layouts/main-layout'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        layout: 'layouts/main-layout'
    });
});


app.get('/contact', (req, res) => {

    // ------------- AMBIL FILE JSON
    const contacts = loadContact();

    res.render('contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        contacts,
    });
});

// halamam form tambah data
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah data',
        layout: 'layouts/main-layout',

    });
});

// post tambah  data kontak
app.post('/contact',
    // validasi
    [
        body('nama').custom((value) => { // custom validasi
            const duplikat = cekDuplikat(value); // cek data apakah data nama udh ada blm

            if (duplikat) {
                throw new Error('Nama contact sudah terdaftar!');
            }
            return true;
        }),
        check('email', 'Email Tidak valid!').isEmail(), //email validasi
        check('nohp', 'No HP Tidak valid!').isMobilePhone('id-ID'), //no hp validasi
    ],
    (req, res) => {

        //data dari form ada di request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // kalo error tamopilkan alert
            res.render('add-contact', {
                title: 'Form Tambah Data',
                layout: 'layouts/main-layout',
                errors: errors.array(),
            })
        } else {
            addContact(req.body);
            res.redirect('/contact')

        }

    });

// Delete contact

app.get('/contact/delete/:nama', (req, res) => {

    const contact = findContact(req.params.nama);

    if (!contact) {
        res.status(404).send('Contact not found');
    } else {
        deleteContact(req.params.nama);
        res.redirect('/contact');
    }
});

// ubah contact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('edit-contact', {
        title: 'Form Tambah data',
        layout: 'layouts/main-layout',
        contact,
    });
});

// post tambah  data kontak
app.post('/contact/update',
    // validasi
    [
        body('nama').custom((value, {
            req
        }) => { // custom validasi
            const duplikat = cekDuplikat(value); // cek data apakah data nama udh ada blm

            if (value !== req.body.nama && duplikat) {
                throw new Error('Nama contact sudah terdaftar!');
            }
            return true;
        }),
        check('email', 'Email Tidak valid!').isEmail(), //email validasi
        check('nohp', 'No HP Tidak valid!').isMobilePhone('id-ID'), //no hp validasi
    ],
    (req, res) => {

        //data dari form ada di request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // kalo error tamopilkan alert
            res.render('edit-contact', {
                title: 'Form Ubah Data',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: req.body, // untuk mengambil data yg di edit lalu di tampilkan kembali di form
            });
        } else {
            updateContact(req.body);
            res.redirect('/contact');

        }

    });


// Halaman detail kontak
app.get('/contact/:nama', (req, res) => {

    // ------------- fine contact from nama url
    const contact = findContact(req.params.nama);

    res.render('detail', {
        title: 'detail',
        layout: 'layouts/main-layout',
        contact,
    });
});

app.use('/', (req, res) => {
    res.status(404);
    res.sendFile('./notFound.html', {
        root: __dirname
    });
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})