# Rectangularizer Photoshop Scripts

## Overview

The Rectangularizer Photoshop Scripts are a collection of JavaScript tools for Adobe Photoshop, designed specifically for transforming square AthletiFi VSA player cards into rectangular dimensions. These scripts automate the process of extending the card's frame and background to fit rectangular dimensions, ensuring consistency in appearance and style.

### Contents

The directory contains one script:

1. **RectangularizeBronzeV1.jsx**: Tailored for Bronze V1 VSA Player Cards, this script extends the frame and bronze background to rectangular dimensions.

The following scripts may be added later:

2. **RectangularizeSilverV1.jsx**: Designed for Silver V1 VSA Player Cards, it modifies the frame and silver background for a rectangular layout.
3. **RectangularizeBronzeV2.jsx**: Adjusts the Bronze V2 VSA Player Cards from square to rectangular dimensions, maintaining the integrity of the bronze background.
4. **RectangularizeSilverV2.jsx**: Transforms Silver V2 VSA Player Cards to a rectangular format, extending the silver background appropriately.

## Requirements

- Adobe Photoshop (The scripts are compatible with recent versions of Photoshop)

## Installation

1. Ensure Adobe Photoshop is installed on your system.
2. Place the script files in a convenient location on your computer.

## Usage

To use these scripts:

1. Open Adobe Photoshop and the PSD file containing the square player card images.
2. Navigate to `File > Scripts > Browse` in Photoshop and select the desired script file (e.g., `rectangularizeBronzeV1.jsx`).
3. The script will automatically process the active Photoshop document, adjusting the dimensions and adding necessary overlays.
4. The resulting image is exported as a PNG file in the specified destination folder.

## Customization

These scripts are pre-configured for specific card types in the AthletiFi VSA collection. If needed, parameters such as overlay paths and dimensions can be adjusted in the script files to accommodate different styles or layouts.

## Troubleshooting

- Ensure the correct script is selected for the card type you are processing.
- Verify that the file paths within the script (for overlays and destination folders) are correctly set up for your system.

For further assistance or to report an issue, please refer to the main repository's contact information.

## Contributing

Contributions to improve or enhance these scripts are welcome. Please submit a pull request or open an issue in the `card-factory` repository to discuss potential changes or enhancements.

## License

These scripts are part of the `card-factory` repository and are licensed under the BSD 3-Clause License. For full license details, see the [LICENSE](LICENSE) file in the main repository.
