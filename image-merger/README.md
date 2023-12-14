# AthletiFi Image Merger Tool

## Overview

The AthletiFi Image Merger Tool includes two Python scripts:

1. `merge-images.py`: A script for creating composite images by layering multiple images on top of each other. It is designed to work with a set of images separated into different layers, combining them into a single image.

2. `merge-text-layers-with-player-photos.py`: A script specifically tailored for overlaying text layers behind player photos. It enhances the text layer's opacity, ensures the text is visible behind the player, and names the output file based on the player's name and pose.

## Requirements

- Python 3.x
- Pillow library

## Installation

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

This will install the Pillow library needed for the scripts to run.

## Usage

### For `merge-images.py`:

1. **Prepare Image Layers**: Organize your images into separate folders, each representing one layer. For example, one folder can contain background images, and another can contain character images.

2. **Run the Script**: Execute the script by running:

   ```sh
   python merge-images.py
   ```

Follow the prompts to input the number of layers, output directory, and paths for each layer.

3. **Output**: The script will generate combinations of the provided images and save them in the specified output directory.

### For `merge-text-layers-with-player-photos.py`:

1. **Prepare Player Photos and Text Layers**: Ensure player photos are in one folder and corresponding text layers in another. Text layers should be named in a way that matches them with the player photos.

2. **Run the Script**: Execute the script by running:

   ```sh
   python merge-text-layers-with-player-photos.py
   ```

Follow the prompts to input the directories for player photos, text layers, and the output directory.

3. **Output**: The script will combine each player photo with its corresponding text layer, enhancing the text layer's opacity and saving the output in the specified directory.

## Customization

The scripts offer various customization options to tailor the image merging process to your specific needs:

### Customizing `merge-images.py`:

- **Layer Positioning**: The script places each layer on top of the previous one at the (0, 0) coordinate (top-left corner) by default. To change the position of each layer, modify the coordinates in the `new_image.paste(overlay, (0, 0), overlay)` line. For example, to center a layer, calculate the center coordinates based on the image sizes.

- **Output Format and Naming**: By default, the script saves images as PNGs and names them sequentially (`image_1.png`, `image_2.png`, etc.). To change the format or naming convention, adjust the `new_image.save(f'{output_dir}/image_{count}.png')` line. For example, you can use a different file format like JPEG or include more descriptive names based on layer properties.

- **Combination Logic**: The script uses `itertools.product` to create all possible combinations of layers. You can modify this logic to create specific combinations, limit the number of combinations, or change the order in which layers are combined.

- **Filtering Image Formats**: The `load_variations` function filters for common image formats (PNG, JPG, etc.). If you need to include or exclude specific formats, adjust the line `image_files = [file for file in files if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif'))]`.

- **Handling Transparency**: If your images have transparency and you want to handle it in a specific way (e.g., always use a certain background), you can modify how the `paste` method is used to accommodate these needs.

- **Error Handling**: The script currently raises exceptions if it encounters issues (like file not found). You can add more sophisticated error handling to skip over problematic files, log errors, or provide more user feedback.

### Customizing `merge-text-layers-with-player-photos.py`:

- **Opacity Enhancement**: To adjust the transparency of the text layers, modify the `enhance_opacity` function. The `factor` parameter controls the level of opacity enhancement. Increasing this value will make the text layer more opaque, while decreasing it will make it more transparent. For example, setting `factor=2.0` will double the opacity, whereas `factor=0.5` will halve it.
  
  ```python
  def enhance_opacity(image, factor=1.0):
      if image.mode == 'RGBA':
          r, g, b, alpha = image.split()
          alpha = alpha.point(lambda p: p * factor)
          return Image.merge('RGBA', (r, g, b, alpha))
      return image
  ```
  
- **Layer Order Adjustment**: By default, the script places the text layer behind the player photo. This can be altered by changing the order in which the `paste` method is called. To place the text layer on top, paste the player photo first and then the text layer.

- **Positioning of Layers**: Similar to `merge-images.py`, the `paste` method in this script can be adjusted to change where the text layer or player photo is placed. Adjusting the coordinates in the `paste` method will reposition the layers.


## Troubleshooting

- Verify that the Pillow library is correctly installed.
- Ensure all folders contain only image files and are named correctly.
- Check that the image paths and output directory are correctly specified.
- For issues with image combinations or formatting, review the customizations made to the script.
- For `merge-text-layers-with-player-photos.py`, if text layers appear too faint or too bold, adjust the `factor` in the `enhance_opacity` function to fine-tune their opacity.

For any other issues or questions, please open an [issue](https://github.com/AthletiFi/card-factory/issues).

## License

This script is part of the `card-factory` repository and is licensed under the BSD 3-Clause License. For full license details, see the [LICENSE](LICENSE) file in the main repository.