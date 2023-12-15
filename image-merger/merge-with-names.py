from PIL import Image
import os
# import itertools
# import functools
import re


def sanitize_path(input_path):
    """ Sanitize the file path by replacing backslashes with spaces and stripping trailing spaces. """
    sanitized = input_path.replace("\\ ", " ").strip()
    if os.path.exists(sanitized):
        return sanitized
    else:
        raise FileNotFoundError(f"Sanitized path is not a valid file or directory: {sanitized}")


# Function to load images from a given directory or a single image file
def load_variations(path, replicate_to_match=None):
    """ Load images from a given directory or a single image file.
        If replicate_to_match is provided, replicate the image to match the number of images in another layer. """
    print(f"Processing path: {path}")

    images = []
    filenames = []

    path = sanitize_path(path)  # Sanitize the input path

    # Check if the path is a file and load it directly as an image
    if os.path.isfile(path):
        print("Path is a file. Loading image...")

        try:
            with Image.open(path) as image:

                image_copy = image.copy()
                images = [image_copy] * (replicate_to_match if replicate_to_match else 1)
                filenames = [os.path.basename(path)] * len(images)
                
                # Replicate the border image to match the number of player images
                if replicate_to_match is not None:
                    images = [image_copy] * replicate_to_match
                    filenames = [os.path.basename(path)] * replicate_to_match
                # return [image_copy] * replicate_to_match if replicate_to_match else [image_copy]
                # return [image_copy] * (replicate_to_match if replicate_to_match else 1)
        except IOError as e:
            print(f"Error opening image file: {e}")
            # Raise an error if the file cannot be opened as an image
            raise IOError(f"Could not open image file: {path}")

    # Check if the path is a directory and load all images from it
    elif os.path.isdir(path):
        print("Path is a directory. Loading images from directory...")

        # List all files in the directory
        files = os.listdir(path)
        print(f"Found {len(files)} files. Filtering image files...")
        
        # Filter the files to include only common image formats
        image_files = [file for file in files if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif'))]
        print(f"Found {len(image_files)} image files.")

        # images = [Image.open(os.path.join(path, file)).copy() for file in image_files]
# # Version 1:
#         for i, file in enumerate(image_files):
#             try:
#                 with Image.open(os.path.join(path, file)) as img:
#                     images.append(img.copy())
#                     filenames.append(file)  # Store filename
#                     print(f"Loaded image {i + 1} of {len(image_files)} for path: {file}")
#             except IOError as e:
#                 print(f"Error opening image file: {file}, Error: {e}")
# Version 2:
        for file in image_files:
            try:
                with Image.open(os.path.join(path, file)) as img:
                    images.append(img.copy())
                    filenames.append(file)  # Store filename
                    print(f"Loaded image: {file}")
            except IOError as e:
                print(f"Error opening image file: {file}, Error: {e}")

        return images, filenames  # Return both images and filenames

    else:
        print("Path is not valid.")
        # Raise an error if the path is neither a file nor a directory
        raise FileNotFoundError(f"Path is not a valid file or directory: {path}")

    return images, filenames  # Return both images and filenames

def enhance_opacity(image, factor=1.2):
    """ Enhance the opacity of an image. """
    if image.mode == 'RGBA':
        r, g, b, alpha = image.split()
        alpha = alpha.point(lambda p: p * factor)
        return Image.merge('RGBA', (r, g, b, alpha))
    return image

def merge_layers(backgrounds, players, player_filenames, borders, output_dir):
    for i, bg in enumerate(backgrounds):
        for j, player in enumerate(players):
            merged_image = bg.copy()
            merged_image.paste(player, (0, 0), player)

            # Apply border to each merged image
            border = borders[j % len(borders)]  # Use modulo for safety
            merged_image.paste(border, (0, 0), border)

            # Update the regex pattern if necessary to match your filenames
            match = re.search(r'(\w+)-\w+-pose-print-with-text-layer', player_filenames[j])
            player_name = match.group(1) if match else f"non-player-{i}-{j}"

            count = 1
            output_filename = f"{output_dir}/{player_name}-{count}.png"
            while os.path.exists(output_filename):
                count += 1
                output_filename = f"{output_dir}/{player_name}-{count}.png"

            merged_image.save(output_filename)
            print(f"Merged image saved as {output_filename}")

# User inputs
print("""
This is an Image Merge tool specifically designed for AthletiFi collections that consist of a Background layer, a Player Photo and Text layer, and a final Border layer.
This script is designed to extract the player names from the Player Photo and Text layer in order to name the final images with those players' names.
This script ONLY works if the Player Photo and Text Layer images follow this specific naming format:
      
- version 1: [PLAYER_NAME]-running-pose-print-with-text-layer.png
- version 2: [PLAYER_NAME]-shooting-pose-print-with-text-layer.png
- version 3: [PLAYER_NAME]-standing-pose-print-with-text-layer.png

If the images do not follow this format, the script will need to be modified in order to work.

_______________________________________________
""")

numLayers = int(input("Enter the number of layers (should be 3 for this setup): "))
outputInput = sanitize_path(input("Where do you want the images to output: "))

# Layer paths
background_path = sanitize_path(input("Enter the folder (or file) path for Background layer: "))
player_path = sanitize_path(input("Enter the folder (or file) path for Player Photo and Text layer: "))
border_path = sanitize_path(input("Enter the folder (or file) path for Border layer: "))

# # Load layers
# backgrounds = load_variations(background_path)
# players = load_variations(player_path)
# borders = load_variations(border_path)

# Initialize lists to store images and filenames for each layer
layersPath = []
layerFilenames = []

# Paths for each layer
layerPaths = [background_path, player_path, border_path]

# Determine the number of images in each layer to handle single image case
num_images_in_layers = [len(os.listdir(path)) if os.path.isdir(path) else 1 for path in layerPaths]

# Now load images for each layer
for i, path in enumerate(layerPaths):
    print(f"Working on Layer {i + 1}...")
    replicate_count = None
    if os.path.isfile(path) and i < len(num_images_in_layers) - 1:
        replicate_count = num_images_in_layers[i + 1]

    images, filenames = load_variations(path, replicate_to_match=replicate_count)  # Unpack both images and filenames
    layersPath.append(images)
    layerFilenames.append(filenames)  # Store filenames

    if i == 1:
        enhance_layer = input("Do you want to enhance the opacity of images in Layer 2? (yes/no): ").lower()
        if enhance_layer == 'yes':
            images = [enhance_opacity(img, factor=1.2) for img in images]

    layersPath.append(images)
    layerFilenames.append(filenames)

# Ensure directories exist
if not os.path.exists(outputInput):
    os.makedirs(outputInput)

# Merge layers
# merge_layers(backgrounds, players, borders, outputInput)
merge_layers(layersPath[0], layersPath[1], layerFilenames[1], layersPath[2], outputInput)
