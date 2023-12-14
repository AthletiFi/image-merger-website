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
def load_variations(path):
    # Remove any single or double quotes from the start and end of the path
    path = sanitize_path(path)  # Sanitize the input path

    # Check if the path is a file and load it directly as an image
    if os.path.isfile(path):
        try:
            with Image.open(path) as image:
                return [image.copy()]

        except IOError:
            # Raise an error if the file cannot be opened as an image
            raise IOError(f"Could not open image file: {path}")

    # Check if the path is a directory and load all images from it
    elif os.path.isdir(path):
        # List all files in the directory
        files = os.listdir(path)
        # Filter the files to include only common image formats
        image_files = [file for file in files if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif'))]
        # Load and return all the image files found in the directory
        images = []
        for file in image_files:
            with Image.open(os.path.join(path, file)) as img:
                images.append(img.copy())
        

        return images
    else:
        # Raise an error if the path is neither a file nor a directory
        raise FileNotFoundError(f"Path is not a valid file or directory: {path}")

def enhance_opacity(image, factor=1.0):
    """ Enhance the opacity of an image. """
    if image.mode == 'RGBA':
        r, g, b, alpha = image.split()
        alpha = alpha.point(lambda p: p * factor)
        return Image.merge('RGBA', (r, g, b, alpha))
    return image

# Prompt the user for the number of layers
numLayers = input("Enter the number of layers: ") 

# Prompt the user for the output directory and strip any quotes
outputInput = sanitize_path(input("Where do you want the images to output: "))  # Sanitize the output directory path
# Initialize lists to store the paths and images for each layer
layerPaths = []
layersPath = []

 # Collect all paths first
for i in range(int(numLayers)):
    
    layerPath = sanitize_path(input(f'Enter the folder path for layer {i + 1}: '))
    layerPaths.append(layerPath)
    # Now load images for each layer
    for i, path in enumerate(layerPaths):
        images = load_variations(path)

    # Check if opacity enhancement is required for the second layer
    if i == 1:  # Layer 2
        enhance_layer = input("Do you want to enhance the opacity of images in Layer 2? (yes/no): ").lower()
        if enhance_layer == 'yes':
            print("Enhancing the opacity of images in layer 2")
            images = [enhance_opacity(img, factor=1.5) for img in images]    
    layersPath.append(images)

# Function to generate all combinations of images from the different layers
def generate_combinations(layers):
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

    total_combinations = functools.reduce(lambda x, y: x * y, [len(layer) for layer in layers])
    print("\nCalculating total combinations...")
    print("Total combinations = "  ' x '.join([str(len(layer)) for layer in layers]))

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
       
# Generate the combinations of images
generate_combinations(layersPath)
