/**
 * Photoshop Script to Process Smart Object Layers
 * 
 * This script is designed to process player photos for AthletiFi player cards so that all players are sized and positioned in the correct frame.
 * It processes a selected Smart Object layer by performing the following actions:
 * 
 * 1. Duplicates the selected Smart Object layer.
 * 2. Creates a new blank layer and places it directly above the duplicated layer.
 * 3. Merges the blank layer with the duplicated layer, which rasterizes any layer styles (like Drop Shadows)
 *    applied to the Smart Object. This step is crucial for ensuring that effects like Drop Shadows are
 *    included in the resizing process.
 * 4. Resizes the merged layer to a specified target height (1780px) while maintaining its aspect ratio.
 *    The resizing is centered, ensuring the layer scales proportionally from its center.
 * 5. Repositions the resized layer so that its top edge aligns with a specified vertical position (520px)
 *    and is horizontally centered on a specified canvas width (3000px).
 * 6. Renames the processed layer for identification and hides the original Smart Object layer, preserving it
 *    for future reference or use.
 * 
 * This script is useful for batch processing PSD files where Smart Object layers with layer styles need to
 * be resized and repositioned consistently across multiple files.
 */




#target photoshop
// This directive sets the target application for the script to Adobe Photoshop.

// var targetHeight = 1780; // Sets the desired height (in pixels) for the layer after processing.
var targetHeight = 2060; // Sets the desired height (in pixels) for the layer after processing.

// var topPosition = 520; // Sets the desired vertical position (in pixels) for the top edge of the layer.
var topPosition = 360; // Sets the desired vertical position (in pixels) for the top edge of the layer.

var canvasWidth = 3000; // Specifies the width of the canvas, used for centering the layer horizontally.

processLayer(app.activeDocument.activeLayer, targetHeight, topPosition);

/**
 * Processes a layer by rasterizing its layer styles, then resizing and repositioning it.
 * @Param {ArtLayer} layer - The layer to be processed.
 * @Param {number} targetHeight - The target pixel height for the layer.
 * @Param {number} topPosition - The target top position for the layer after processing.
 */
function processLayer(layer, targetHeight, topPosition){
    // Sets the ruler units in Photoshop to pixels for precise measurement.
    app.preferences.rulerUnits = Units.PIXELS;

    // Duplicate the Smart Object layer.
    var duplicatedLayer = layer.duplicate();

    // Create a new blank layer directly above the duplicated layer.
    // This blank layer is used to merge with the duplicated layer, ensuring that any layer styles are rasterized.
    var blankLayer = duplicatedLayer.parent.artLayers.add();
    // The move method positions the blank layer relative to the duplicated layer.
    // ElementPlacement.PLACEAFTER places the blank layer just after (above in layers panel) the duplicated layer.
    blankLayer.move(duplicatedLayer, ElementPlacement.PLACEAFTER);

    // Ensure both the duplicated layer and the blank layer are visible.
    duplicatedLayer.visible = true;
    blankLayer.visible = true;

    // Select both the duplicated layer and the blank layer.
    duplicatedLayer.selected = true;
    blankLayer.selected = true;

    // Merge the selected layers.
    // Merging rasterizes any layer styles (like Drop Shadows) applied to the Smart Object.
    var mergedLayer = duplicatedLayer.merge();

    // Calculate the current height of the merged layer.
    // The bounds property gives the coordinates of the layer's bounding box: [left, top, right, bottom].
    var bounds = mergedLayer.bounds;
    var currentHeight = bounds[3].as('px') - bounds[1].as('px'); // Subtract top (bounds[1]) from bottom (bounds[3]) to get the height.

    // Calculate the scale factor needed to resize the merged layer to the desired height.
    var scale = (targetHeight / currentHeight) * 100;

    // Apply the resize transformation.
    // The resize method scales the layer, with scale calculated to achieve the target height.
    // AnchorPosition.MIDDLECENTER ensures the layer scales from its center.
    mergedLayer.resize(scale, scale, AnchorPosition.MIDDLECENTER);

    // Reposition the merged layer.
    // Recalculate bounds after resizing to determine new size and position.
    bounds = mergedLayer.bounds;
    var deltaY = topPosition - bounds[1].as('px'); // Calculate the Y offset to align the top edge to topPosition.
    var centerX = (bounds[0].as('px') + bounds[2].as('px')) / 2; // Calculate the horizontal center of the layer.
    // centerX is the average of left (bounds[0]) and right (bounds[2]) X coordinates.

    var deltaX = (canvasWidth / 2) - centerX; // Calculate the X offset to center the layer on the canvas.

    // Move the layer to the new position based on calculated deltaX and deltaY.
    mergedLayer.translate(deltaX, deltaY);

    // Rename the merged layer and hide the original layer.
    // This maintains a reference to the original layer while using the processed layer.
    mergedLayer.name = "Processed - " + layer.name;
    layer.visible = false; // Hide the original layer without deleting it.
}
