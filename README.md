# card-factory

## Overview

Thee `card-factory` serves as the central hub for the development and maintenance of tools and scripts that are used in the creation process of AthletiFi digital player cards. 

### Contents

The repository currently contains the following tools:

- **Image Merger**: A Python script for crafting AthletiFi digital player cards unique artwork by combining the image layers for background, border, player images, player info and other graphical elements into the final visual layout. For more specific details, refer to the [Image Merger README](image-merger/README.md).

- **Batch QR Code Generator**: A Node.js script for batch generating QR codes for the print versions of AthletiFi Digital Player Cards. These QR codes are used on each physical player card, providing a link to the digital counterpart. For more information, refer to the [Batch QR Code Generator README](batch-qr-code-generator/README.md).

## Getting Started

To get started with these scripts, you'll need to clone the repository and set up the environments for both the Python and Node.js components.

### Prerequisites

- Python 3.x
- Node.js

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/AthletiFi/card-factory.git
   ```

2. Navigate to the script directory of your choice and follow the setup instructions in the respective README file.

## Usage

Each script within this repository plays a unique role in the AthletiFi digital player card generation process. Navigate to the respective directories and consult their README files for detailed usage instructions.

## Contributing

If you wish to contribute to the development of these tools, please submit a pull request or open an issue to discuss the changes.

## License

This software is licensed under the BSD 3-Clause License. For full license details, see the [LICENSE](LICENSE) file in this repository.