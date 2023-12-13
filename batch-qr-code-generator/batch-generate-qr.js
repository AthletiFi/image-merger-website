const readline = require('readline');
const fs = require('fs');
const { generateQRFromCSV } = require('./src/index');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to check if the input is a valid path
const isValidPath = (path) => {
  // Simple regex to check for a valid path format
  const pathRegex = /^\.?\.?\/?([a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.csv$/;
  return pathRegex.test(path);
};

// Prompt for the CSV file path
rl.question('Please enter the path to your CSV file: ', (csvFilePath) => {

  // Check if the input is a valid path
  if (!isValidPath(csvFilePath)) {
    console.error(`Error: The input '${csvFilePath}' is not a valid path for a csv file.`);
    rl.close();
    return;
  }

  // Check if the provided path exists
  if (!fs.existsSync(csvFilePath)) {
    console.error(`Error: ${csvFilePath} does not exist.`);
    rl.close();
    return;
  }

  // Call the function to generate QR codes
  try {
    generateQRFromCSV(csvFilePath);
  } catch (error) {
    console.error(`An error occurred while generating QR codes: ${error.message}`);
  }

  rl.close();
});


// Version without prompting:
// const csvFilePath = './sample_urls.csv';
// generateQRFromCSV(csvFilePath);


