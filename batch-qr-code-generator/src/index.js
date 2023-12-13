const generateQR = require('./batch-generate-qr');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Function to process CSV and generate QR codes
function processCSV(csvFilePath) {
    const data = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => data.push(row.url))
        .on('end', () => {
            for (let i = 0; i < data.length; i++) {
                generateQR(data[i], i);
            }
            console.log('QR Code generation completed.');
        });
}

// Replace 'sample_urls.csv' with the path to your actual CSV file
const csvFilePath = path.join(__dirname, '../sample_urls.csv');
processCSV(csvFilePath);
