/**
 * Photoshop Script to Rectangularize AthletiFi Player Cards.
 *
 * rectangularizeBronzeV2 was tailored specifically for the Bronze V2 cards of the AthletiFi VSA collection, in order to create rectangular print versions of the square cards. 
 * 
 * The script generates a new version of the square Bronze V2 VSA Player Cards for rectangular dimensions. It extends the frame and the bronze background using a pre-designed overlay to match the existing bronze background.
 * 
 * This script performs the following actions:
 * 1. Crops the active photo using specified dimensions and resizes it.
 * 2. Adds a 'bronze overlay' layer from another PSD file.
 * 3. Adds a new layer with a solid fill of a specified color.
 * 4. Exports the resulting image as a PNG file.
 */

#target photoshop
app.bringToFront();


var overlayPath = '/Users/qisforq/Downloads/FINAL PRINT CARDS/Square split up/bronze v2 rectangle.psd';

var sourceFolder = '/Users/qisforq/Downloads/FINAL PRINT CARDS/Square split up/Bronze V2'; 
var destinationFolder = '/Users/qisforq/Downloads/FINAL PRINT CARDS/Rectangle split up/Bronze V2 rect';

var baseSuffix = '-rect.png';

var files = Folder(sourceFolder).getFiles();

for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // Check if the file is an image
    if (file instanceof File && file.name.match(/\.(jpg|jpeg|png|tif|tiff|psd)$/i)) {
        processFile(file);
    }
}

function processFile(file) {
    var doc = app.open(file);

    // Your processing steps here
    // Step 1: Crop and Resize
    cropAndResize(doc, -275.6, 231.7, 3275.6, 2768.3, 0, 3000, 4200, 300);
    
    // Step 2: Add Bronze Overlay Layer
    addBronzeOverlayLayer(doc, overlayPath);
    
    // Step 3: Add Solid Fill Layer
    addSolidFillLayer(doc, '667176');
    
    exportAsPNG(doc, destinationFolder); 

    // Close the original document without saving.
    doc.close(SaveOptions.DONOTSAVECHANGES);

}



/**
 * Function to crop and resize the document
 * @Param {Document} doc - The Photoshop document.
 * @Param {number} top, left, bottom, right - Crop dimensions.
 * @Param {number} angle - Angle for cropping.
 * @Param {number} width, height - New dimensions.
 * @Param {number} resolution - Resolution in pixels/inch.
 */
function cropAndResize(doc, top, left, bottom, right, angle, width, height, resolution) {
    var cropRect = [left, top, right, bottom];
    doc.crop(cropRect, angle);
    doc.resizeImage(UnitValue(width, 'px'), UnitValue(height, 'px'), resolution, ResampleMethod.AUTOMATIC);
}

/**
 * Function to add the 'bronze overlay' layer from another file
 * @Param {Document} doc - The Photoshop document.
 * @Param {string} filePath - Path to the PSD file containing the bronze overlay layer.
 */
function addBronzeOverlayLayer(doc, filePath) {
    var bronzeFile = new File(filePath);
    var bronzeDoc = app.open(bronzeFile);
    var bronzeLayer = bronzeDoc.layers["bronze overlay"];
    bronzeLayer.duplicate(doc, ElementPlacement.PLACEATBEGINNING);
    bronzeDoc.close(SaveOptions.DONOTSAVECHANGES);
}

/**
 * Function to add a new layer with a solid fill
 * @Param {Document} doc - The Photoshop document.
 * @Param {string} colorHex - Hex code of the fill color.
 */
function addSolidFillLayer(doc, colorHex) {
    var newLayer = doc.artLayers.add();
    newLayer.move(doc, ElementPlacement.PLACEATEND);
    newLayer.name = "Solid Fill";
    var fillColor = new SolidColor();
    fillColor.rgb.hexValue = colorHex;
    doc.selection.selectAll();
    doc.selection.fill(fillColor);
    doc.selection.deselect();
}

/**
 * Function to export the document as a PNG file
 * @Param {Document} doc - The Photoshop document.
 * @Param {string} filePath - File path to save the PNG file.
 */
function exportAsPNG(doc, filePath) {
  // Extract the base file name without the extension
  var baseName = doc.name.replace(/\.[^\.]+$/, '');
  // Append '-rect' to the file name
  var newFileName = baseName + baseSuffix;
  // Create a new file object with the updated file name
  var pngFile = new File(filePath + '/' + newFileName);

  var pngSaveOptions = new PNGSaveOptions();
  pngSaveOptions.compression = 9;
  pngSaveOptions.interlaced = false;
  doc.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE);
}
