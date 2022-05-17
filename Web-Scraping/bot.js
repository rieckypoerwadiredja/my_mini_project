const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');



const csvWriter = createCsvWriter({
    path: './dataWeb/CSV_File/booksStore.csv',
    fieldDelimiter: ';', // default is , for CSV and ; for TSV 
    header: [

        {
            id: 'bookTitle',
            title: 'Title'
        },
        {
            id: 'bookUrlValidUrl',
            title: 'Book Url'
        },
        {
            id: 'bookPrice',
            title: 'Book Price'
        },
        {
            id: 'bookStarNumberInt',
            title: 'Book Rating'
        },

    ]

});


const bot = {
    browser: null,
    page: null,
    // Initialize the bot and launch a browser
    init: async () => {
        bot.browser = await puppeteer.launch({
            headless: true, // false to see the browser
        });
        bot.page = await bot.browser.newPage(); // Create a new tab in the browser
        bot.page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        ); // Set the user agent to a fake one to avoid detection by websites (like google)

    },

    start: async () => {
        // process :
        // 1. go to the website
        // 2. wait until all the elements are loaded
        // 3. change page until the end (50 pages)
        for (let i = 1; i <= 50; i++) { // web pages have 50 pages
            let urlWeb = `https://books.toscrape.com/catalogue/page-${i}.html`; // The url of the website
            await bot.page.goto(urlWeb, {
                waitUntil: 'networkidle2' // Wait until the page is loaded and all resources are loaded
            }); // Go to the website

            await bot.scrape(); // Scrape the website
        }
    },

    scrape: async () => {
        const targets = await bot.page.$$('li.col-xs-6.col-sm-4.col-md-3.col-lg-3'); // Get all the elements with the class "col-xs-6 col-sm-4 col-md-3 col-lg-3"
        for (const target of targets) {
            try {
                // Get Book Url
                const bookUrl = await target.$eval('div.image_container a', el => el.getAttribute('href')); // Get the url of the book
                const bookUrlValidUrl = `https://books.toscrape.com/catalogue/${bookUrl}`; // Get the url of the book VALID
                // console.log(bookUrlValidUrl);

                // Get Book Title
                const bookTitle = await target.$eval('h3 a', el => el.getAttribute('title')); // Get the title of the book
                // console.log(bookTitle);

                // Get Book Price
                const bookPrice = await target.$eval('div.product_price p.price_color', el => el.innerText); // Get the price of the book
                // console.log(bookPrice);

                // book star
                const bookStar = await target.$eval('article.product_pod p.star-rating', el => el.getAttribute('class')); // Get the star of the book
                const bookStarNumber = bookStar.split(' ')[1]; // Get the star number of the book
                const bookStarNumberInt = bot.fixStar(bookStarNumber); // Get the star number of the book
                // console.log(bookStarNumberInt);

                console.log('-------------------------------');

                let book = {
                    bookTitle,
                    bookUrlValidUrl,
                    bookPrice,
                    bookStarNumberInt
                };

                // await bot.writeSVC(bookTitle, bookUrlValidUrl, bookPrice, bookStarNumberInt)
                await bot.writeJSON(book)
            } catch (err) {
                console.error(`Error at scrape : ${err}`);
            }
        }
    },

    close: async () => {
        await bot.browser.close();
        console.log("BERES")
    },

    fixStar: (value) => {
        let starValue = 0;
        switch (value) {
            case 'One':
                starValue = 1;
                break;
            case 'Two':
                starValue = 2;
                break;
            case 'Three':
                starValue = 3;
                break;
            case 'Four':
                starValue = 4;
                break;
            case 'Five':
                starValue = 5;
                break;
            default:
                starValue = 'Error Star'; // Error
        }
        return starValue;
    },

    writeSVC: async (bookTitle, bookUrlValidUrl, bookPrice, bookStarNumberInt) => {

        let books = [{
            bookTitle,
            bookUrlValidUrl,
            bookPrice,
            bookStarNumberInt
        }];

        await csvWriter.writeRecords(books)
            .then(() => {
                console.log(`${bookTitle} added to the file`);
            })
            .catch(err => {
                console.log('Some error occured' + err);
            });
    },

    writeJSON: async (book) => {

        const dirPath = './dataWeb/JSON_File';
        // see if the directory exists already
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        const dataPath = './dataWeb/JSON_File/booksStore.json';
        // see if the file exists already and if it does, delete it
        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, '[]', 'utf-8');
        }

        const loadJsonData = () => {
            const fileBuffer = fs.readFileSync(dataPath, 'utf-8'); // msh string
            const validBookLoad = JSON.parse(fileBuffer); //ubah jd json file
            console.log(validBookLoad);
            return validBookLoad;
        }

        const saveBooks = (validBook) => {
            fs.writeFileSync(dataPath, JSON.stringify(validBook), 'utf-8');
        }

        const addBook = (book) => {
            const validBook = loadJsonData();
            validBook.push(book);
            saveBooks(validBook);
        }

        addBook(book);


    }
}

module.exports = bot;