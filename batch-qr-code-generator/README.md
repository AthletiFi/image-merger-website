# AthletiFi Batch QR Code Generator

## Overview

The Batch QR Code Generator tool is a a Node.js application that generates QR codes in bulk from a list of URLs provided in a CSV file. This tool is intended to be used to generate QR codes for the print version of AthletiFi Player Cards, to link them to their digital counterparts.

## Requirements

- Node.js: The runtime environment required to execute the script.
- npm: To manage the project's dependencies.
- CSV File: A CSV file containing URLs for which QR codes need to be generated. The file should have a column named 'url'.

## Installation

1. Clone the repository

   ```sh
   git clone https://github.com/AthletiFi/card-factory.git
   ```

2. Navigate to the `batch-qr-code-generator` directory and install dependencies

   ```sh
   cd card-factory/batch-qr-code-generator
   npm install
   ```

## Usage

1. **Set Up**: Prepare a CSV file with a list of URLs. Ensure each URL is in a new line under the column header 'url'.

2. Place the CSV file in the `batch-qr-code-generator` directory.

3. **Run the Script**: Execute the script by running:'

   ```sh
   node src/batch-generate-qr.js
   ```

4. **Enter the CSV file path**: After running the script, you will be prompted to enter the file path for your CSV file. Enter the path, including the filename and '.csv' at the end. If you placed the CSV file inside the `batch-qr-code-generator` directory, you can just enter the name of the file (e.g. `sample_urls.csv`)

5. Check the QR codes. You will find them in the `qr_codes` directory.

## Customization

You can customize the appearance and properties of the QR codes by editing the `options.json` file located in the src directory. You can also generate your own `options.json` file by going to [https://qr-code-styling.com/](qr-code-styling.com) 

## Troubleshooting

- CSV Format Issues: Double-check the CSV format. The first row should be the header with 'url' as the column title, followed by rows containing URLs.
- Module Not Found Errors: If you encounter module-related errors, try reinstalling the dependencies with npm install.
- Output Directory Issues: Ensure the output directory for the generated QR codes exists. If it doesn't, create it or modify the script to point to an existing directory.

For any other issues or questions, please open an [issue](https://github.com/AthletiFi/card-factory/issues).
