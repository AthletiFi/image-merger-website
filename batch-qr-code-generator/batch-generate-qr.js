const { QRCodeCanvas } = require('@loskir/styled-qr-code-node');
const csv = require('csv-parser');
const fs = require('fs-extra');
const path = require('path');


const qrCodeOptions = {
  width: 300,
  height: 300,
  type: "png",
  data: "TBD",
  dotsOptions: {
    color: "#4267b2",
    type: "dots",
    gradient: {
      type: "linear",
      rotation: 0,
      colorStops: [
        { offset: 0, color: "blue" },
        { offset: 1, color: "pink" },
      ],
    },
  },
};
  
async function generateQR(url, index, options) {
    options.data = url;
    const qrCode = new QRCodeCanvas({...options, data: url });

    try {
        await qrCode.toFile(`./qr_codes/qr_${index}.png`, 'png');
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
}

function processCSV(csvFilePath) {
    const data = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => data.push(row.url))
        .on('end', () => {
            data.forEach((url, index) => generateQR(url, index, qrCodeOptions));
            console.log('QR Code generation completed.');
        });
}

const csvFilePath = path.join(__dirname, 'sample_urls.csv');
processCSV(csvFilePath);














// const puppeteer = require('puppeteer');
// const fs = require('fs-extra');

// async function generateQRWithPuppeteer(url, index) {
//     let browser;
//     try {
//         browser = await puppeteer.launch({ headless: "new" });
//         const page = await browser.newPage();

//         const qrCodeOptions = {
//             width: 300,
//             height: 300,
//             type: "png",
//             data: url,
//             dotsOptions: {
//                 color: "#4267b2",
//                 type: "dots",
//                 gradient: {
//                     type: "linear",
//                     rotation: 0,
//                     colorStops: [
//                         { offset: 0, color: "blue" },
//                         { offset: 1, color: "pink" },
//                     ],
//                 },
//             },
//         };

//         const qrCodeOptionsString = JSON.stringify(qrCodeOptions);

//         const content = `
//         <html>
//         <body>
//             <div id="qr-code"></div>
//             <script type="text/javascript">
//                 console.log('Script started for URL:', "${url}");
//                 const qrOptions = ${qrCodeOptionsString};
//                 qrOptions.data = "${url}";
//                 console.log('QR options set:', qrOptions);

//                 try {
//                     const qrCode = new QRCodeStyling(qrOptions);
//                     qrCode.append(document.getElementById('qr-code'));
//                     console.log('QR code appended');
//                 } catch (error) {
//                     console.error('Error in QR code generation:', error);
//                 }
//             </script>
//         </body>
//         </html>
//         `;

//         await page.setContent(content);
//         // await page.screenshot({ path: `debug_screenshot_${index}.png` });

//         // Capture console output from the page
//         page.on('console', consoleObj => console.log('Page log:', consoleObj.text()));


//     // Optionally, wait for a certain amount of time (if needed)
//     await new Promise(resolve => setTimeout(resolve, 5000));

//     // Log the entire HTML content of the page
//     const pageContent = await page.content();
//     console.log(`Page content for URL ${url}:`, pageContent);

//         // Wait for the canvas element to be rendered
//         await page.waitForSelector('#qr-code canvas', { timeout: 10000 });

//         // Capture and save the QR code image
//         const qrCodeImage = await page.$eval('#qr-code canvas', canvas => canvas.toDataURL());
//         const base64Data = qrCodeImage.replace(/^data:image\/png;base64,/, "");
//         await fs.writeFile(`./qr_codes/qr_${index}.png`, base64Data, 'base64');

//     } catch (error) {
//         console.error(`Error while generating QR code for URL: ${url}`, error);
//     } finally {
//         // Ensure the browser is closed in case of error or success
//         if (browser) {
//             await browser.close();
//         }
//     }
// }

// module.exports = generateQRWithPuppeteer;

// // Old 2:
// // const puppeteer = require('puppeteer');
// // const fs = require('fs-extra');

// // async function generateQRWithPuppeteer(url, index) {
// //     const browser = await puppeteer.launch({ headless: "new" });
// //     const page = await browser.newPage();

// //     const qrCodeOptions = {
// //         width: 300,
// //         height: 300,
// //         type: "png",
// //         data: url,
// //         dotsOptions: {
// //             color: "#4267b2",
// //             type: "dots",
// //             gradient: {
// //                 type: "linear",
// //                 rotation: 0,
// //                 colorStops: [
// //                     { offset: 0, color: "blue" },
// //                     { offset: 1, color: "pink" },
// //                 ],
// //             },
// //         },
// //     };

// //     const qrCodeOptionsString = JSON.stringify(qrCodeOptions);

// //     const content = `
// //     <html>
// //     <body>
// //         <div id="qr-code"></div>
// //         <script type="text/javascript">
// //             console.log('Script started');
// //             const qrOptions = ${qrCodeOptionsString};
// //             qrOptions.data = "${url}";
// //             console.log('QR options set:', qrOptions);

// //             try {
// //                 const qrCode = new QRCodeStyling(qrOptions);
// //                 qrCode.append(document.getElementById('qr-code'));
// //                 console.log('QR code appended');
// //             } catch (error) {
// //                 console.error('Error in QR code generation:', error);
// //             }
// //         </script>
// //     </body>
// //     </html>
// //     `;

// //     await page.setContent(content);
// //     await page.screenshot({ path: `debug_screenshot_${index}.png` });
// //     // await new Promise(resolve => setTimeout(resolve, 5000));
// //     page.waitForSelector('#qr-code canvas', { timeout: 10000 });

// //     page.on('console', consoleObj => console.log(consoleObj.text()));

// //     const elementExists = await page.$('#qr-code canvas');
// //     if (!elementExists) {
// //         console.error(`Canvas element not found for URL: ${url}`);
// //         await browser.close();
// //         return;
// //     }

// //     const qrCodeImage = await page.$eval('#qr-code canvas', canvas => canvas.toDataURL());
// //     const base64Data = qrCodeImage.replace(/^data:image\/png;base64,/, "");
// //     await fs.writeFile(`./qr_codes/qr_${index}.png`, base64Data, 'base64');

// //     await browser.close();
// // }

// // module.exports = generateQRWithPuppeteer;



// // Old 1:
// // const puppeteer = require('puppeteer');
// // const fs = require('fs-extra');
// // const csv = require('csv-parser');
// // const path = require('path');


// // async function generateQRWithPuppeteer(url, index) {
// //     // const browser = await puppeteer.launch();
// //     const browser = await puppeteer.launch({ headless: "new" });

// //     const page = await browser.newPage();

// //     const qrCodeOptions = {
// //       width: 300,
// //       height: 300,
// //       type: "png",
// //       data: url,
// //       dotsOptions: {
// //         color: "#4267b2",
// //         type: "dots",
// //         gradient: {
// //           type: "linear",
// //           rotation: 0,
// //           colorStops: [
// //             { offset: 0, color: "blue" },
// //             { offset: 1, color: "pink" },
// //           ],
// //         },
// //       },
// //     //   imageOptions: {
// //     //     // Example image options
// //     //     hideBackgroundDots: true,
// //     //     imageSize: 0.4,
// //     //     // Add other image-related options here
// //     // }
// //     }

// //     const qrCodeOptionsString = JSON.stringify(qrCodeOptions);

// //     // Set up HTML content with the QR code library
// // //     const content = `
// // //     <html>
// // //     <body>
// // //         <div id="qr-code"></div>
// // //         <script type="module">
// // //             import QRCodeStyling from 'qr-code-styling';
// // //             const qrOptions = ${qrCodeOptionsString};
// // //             qrOptions.data = "${url}";
// // //             const qrCode = new QRCodeStyling(qrOptions);
// // //             qrCode.append(document.getElementById('qr-code'));
// // //         </script>
// // //     </body>
// // //     </html>
// // // `;
// //     const content = `
// //     <html>
// //     <body>
// //         <div id="qr-code"></div>
// //         <script type="text/javascript">
// //             console.log('Script started');
// //             // Try using a require or different way to import QRCodeStyling
// //             // const QRCodeStyling = require('qr-code-styling'); // Or similar approach

// //             const qrOptions = ${qrCodeOptionsString};
// //             qrOptions.data = "${url}";
// //             console.log('QR options set:', qrOptions);

// //             try {
// //                 // If require doesn't work, you might need to include the library script directly
// //                 // <script src="path_to_qr_code_styling_library"></script>
// //                 const qrCode = new QRCodeStyling(qrOptions);
// //                 qrCode.append(document.getElementById('qr-code'));
// //                 console.log('QR code appended');
// //             } catch (error) {
// //                 console.error('Error in QR code generation:', error);
// //             }
// //         </script>
// //     </body>
// //     </html>
// //     `;

// //     await page.setContent(content);

// //     // Save a screenshot for debugging
// //     await page.screenshot({ path: `debug_screenshot_${index}.png` });

// //     //  Wait for a bit to ensure QR code renders (adjust time as needed)
// //     await new Promise(resolve => setTimeout(resolve, 5000));


// //     page.on('console', consoleObj => console.log(consoleObj.text()));

// //     // Check if the canvas element exists
// //     const elementExists = await page.$('#qr-code canvas');
// //     if (!elementExists) {
// //         console.error(`Canvas element not found for URL: ${url}`);
// //         await browser.close();
// //         return;
// //     }
// //     // Adjust selector to capture the canvas element (used by 'png' type)
// //     const qrCodeImage = await page.$eval('#qr-code canvas', canvas => canvas.toDataURL());

// //     // Save the captured image as a file
// //     const base64Data = qrCodeImage.replace(/^data:image\/png;base64,/, "");
// //     await fs.writeFile(`./qr_codes/qr_${index}.png`, base64Data, 'base64');

// //     await browser.close();
// // }

// // // Function to process CSV and generate QR codes
// // async function processCSV(csvFilePath) {
// //     const data = [];

// //     fs.createReadStream(csvFilePath)
// //         .pipe(csv())
// //         .on('data', (row) => data.push(row.url))
// //         .on('end', async () => {
// //             for (let i = 0; i < data.length; i++) {
// //                 await generateQRWithPuppeteer(data[i], i);
// //             }
// //             console.log('QR Code generation completed.');
// //         });
// // }

// // async function main() {
// //     const csvFilePath = path.join(__dirname, 'sample_urls.csv'); // Replace with your CSV file path
// //     await fs.ensureDir('./qr_codes');
// //     await processCSV(csvFilePath);
// // }

// // main().catch(console.error);
