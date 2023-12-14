from PIL import Image
import os
import itertools
import functools

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

    # Remove any single or double quotes from the start and end of the path
    path = sanitize_path(path)  # Sanitize the input path

    # Check if the path is a file and load it directly as an image
    if os.path.isfile(path):
        print("Path is a file. Loading image...")

        try:
            with Image.open(path) as image:
                image_copy = image.copy()
                # return [image_copy] * replicate_to_match if replicate_to_match else [image_copy]
                return [image_copy] * (replicate_to_match if replicate_to_match else 1)
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
        images = []
        for i, file in enumerate(image_files):
            try:
                with Image.open(os.path.join(path, file)) as img:
                    images.append(img.copy())
                    print(f"Loaded image {i + 1} of {len(image_files)} for path: {file}")
            except IOError as e:
                print(f"Error opening image file: {e}")
        return images

    else:
        print("Path is not valid.")
        # Raise an error if the path is neither a file nor a directory
        raise FileNotFoundError(f"Path is not a valid file or directory: {path}")

def enhance_opacity(image, factor=1.2):
    """ Enhance the opacity of an image. """
    if image.mode == 'RGBA':
        r, g, b, alpha = image.split()
        alpha = alpha.point(lambda p: p * factor)
        return Image.merge('RGBA', (r, g, b, alpha))
    return image

def merge_layers(layer1, layer2, output_dir):
    """ Merge two layers of images in a 1-for-1 fashion. """
    for i, (image1, image2) in enumerate(zip(layer1, layer2)):
        merged_image = image1.copy()
        merged_image.paste(image2, (0, 0), image2)
        merged_image.save(f'{output_dir}/merged_image_{i + 1}.png')
        print(f'Merged image {i + 1} saved.')

# Prompt the user for the number of layers
numLayers = input("Enter the number of layers: ") 

# Prompt the user for the output directory and strip any quotes
outputInput = sanitize_path(input("Where do you want the images to output: "))  # Sanitize the output directory path

# Initialize a list to store the paths for each layer
# layerPaths = []
layerPaths = [sanitize_path(input(f'Enter the folder path for layer {i + 1}: ')) for i in range(int(numLayers))]
# Determine the number of images in each layer to handle single image case
num_images_in_layers = [len(os.listdir(path)) if os.path.isdir(path) else 1 for path in layerPaths]

# Initialize a list to store images for each layer
layersPath = []

# # Collect all the paths first
# for i in range(int(numLayers)):
#     layerPath = sanitize_path(input(f'Enter the folder path for layer {i + 1}: '))
#     layerPaths.append(layerPath)

# Now load images for each layer
for i, path in enumerate(layerPaths):
    print(f"Working on Layer {i + 1}...")
    replicate_count = None
    if os.path.isfile(path) and i < len(num_images_in_layers) - 1:
        replicate_count = num_images_in_layers[i + 1]
    images = load_variations(path, replicate_to_match=replicate_count)
    if i == 1:
        enhance_layer = input("Do you want to enhance the opacity of images in Layer 2? (yes/no): ").lower()
        if enhance_layer == 'yes':
            images = [enhance_opacity(img, factor=1.5) for img in images]
    layersPath.append(images)

# Function to generate all combinations of images from the different layers
def generate_combinations(layers, output_dir):
    # Create the output directory if it doesn't exist
    output_dir = outputInput
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    count = 1  # Initialize a counter for the output image filenames
    base_images = layers[0]  # The first layer serves as the base images
    overlay_layers = layers[1:]  # Remaining layers are overlays
    
    print("Number of images in each layer:")
    for i, layer in enumerate(layers, start=1):
        print(f"Layer {i}: {len(layer)} images")

    # Calculate total combinations and print
    layer_lengths = [len(layer) for layer in layers]
    total_combinations = functools.reduce(lambda x, y: x * y, layer_lengths)
    print("\nCalculating total combinations...")
    print("Total combinations = " + ' x '.join([str(length) for length in layer_lengths]))
    print(f"Total combinations to generate: {total_combinations}")

    # Loop through each base image
    for base in base_images:
        # Create all possible combinations of the overlay layers
        for layer_combination in itertools.product(*overlay_layers):
            new_image = base.copy()  # Create a copy of the base image
            # Overlay each image in the combination onto the base image
            for overlay in layer_combination:
                new_image.paste(overlay, (0, 0), overlay)
            # Save the combined image
            new_image.save(f'{output_dir}/image_{count}.png')
            print(f"Generating image {count} of {total_combinations}")
            
            count = 1  # Increment the count for the next filename

# Ask the user for the merging method
merge_method = input("Enter 'MERGE' for a 1-for-1 merge of corresponding images or 'COMBINE' to generate all combinations: ").lower()
if merge_method == 'merge' and len(layersPath) == 2 and len(layersPath[0]) == len(layersPath[1]):
    merge_layers(layersPath[0], layersPath[1], outputInput)
elif merge_method == 'combine':    
    generate_combinations(layersPath, outputInput)
else:
    print("Invalid option or mismatched layers for merging.")

