# AthletiFi Image Merger Tool

## Overview

The Image Combiner tool is a Python script used for creating composite images by layering multiple images on top of each other. It's designed to work with a set of images separated into different layers, combining them into a single image.

## Requirements

- Python 3.x
- Pillow library

## Usage

1. **Set Up**: Ensure you have Python installed on your system. Place the script in a directory and create a `requirements.txt` file with the content `Pillow`.

2. Clone the repository

   ```sh
   git clone https://github.com/AthletiFi/card-factory.git
   ```

3. Navigate to the `image-merger` directory and install dependencies

   ```sh
   cd card-factory/image-merger
   pip install -r requirements.txt
   ```

This will install the Pillow library needed for the script to run.

4. **Prepare Image Layers**: Organize your images into separate folders, each representing one layer. For example, one folder can contain background images, and another can contain character images.

5. **Run the Script**: Execute the script by running:'

   ```sh
   python merge-images.py
   ```

Follow the prompts to input the number of layers, output directory, and paths for each layer.

6. **Output**: The script will generate combinations of the provided images and save them in the specified output directory.

## Customization

You can modify the script to change how images are combined, such as altering the position where images are overlaid, or changing the output format of the images.

## Troubleshooting

- Ensure all folders contain only image files.
- Verify that the Pillow library is correctly installed.

For any other issues or questions, please open an [issue](https://github.com/AthletiFi/card-factory/issues).

## License

This script is part of the `card-factory` repository and is licensed under the BSD 3-Clause License. For full license details, see the [LICENSE](LICENSE) file in the main repository.