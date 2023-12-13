# Player Resizer Photoshop Script

## Overview

The Player Resizer Photoshop Script is a script designed to be used in Adobe Photoshop to automate the resizing and repositioning of player images specifically for AthletiFi digital player cards. This script ensures consistent sizing and alignment of player photos across the entire collection, maintaining a uniform look and feel for each card.

## Requirements

- Adobe Photoshop (The script is compatible with recent versions of Photoshop)

## Installation

   ```sh
   git clone https://github.com/AthletiFi/card-factory.git
   ```



## Usage

To use the Player Resizer Photoshop Script:

1. Open Adobe Photoshop and the PSD file containing the player image to be modified.
2. Navigate to  **File** > **Scripts** > **Browse...** in Photoshop and select the `resizePlayersPhotoshop.jsx` file inside the `player-resizer-photoshop`.
3. Once the script is running, it will automatically process the active layer (selected Smart Object) in your open Photoshop document, resizing and repositioning it according to the specifications in the script.

**Note**: This script is tailored specifically to the player photos for the VSA collection, which were stored as smart objects with various Smart Filters applied. For different collections of images, the layer duplication process may not be necessary. Please adjust the script as needed for future collections.


## Customization

The script comes pre-configured with specific dimensions and positions suited for AthletiFi player cards. If necessary, these values can be adjusted directly in the script file to cater to different sizes or layouts. You can also include the script as part of a batch action in Photoshop, to add further functionality, such as exporting to PNG.

## Troubleshooting

- Ensure the active layer in Photoshop is the one you intend to resize and reposition.
- If the script does not run as expected, verify that the version of Photoshop you are using is compatible with JavaScript scripts.

For further assistance or to report an issue, please open an [issue](https://github.com/AthletiFi/card-factory/issues).


## Contributing

Contributions to improve or enhance the Player Resizer Photoshop Script are welcome. Please submit a pull request or open an issue in the `card-factory` repository to discuss potential changes or enhancements.

## License

This script is part of the `card-factory` repository and is licensed under the BSD 3-Clause License. For full license details, see the [LICENSE](LICENSE) file in the main repository.
