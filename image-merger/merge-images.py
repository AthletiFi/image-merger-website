from PIL import Image
import os
import itertools

# Function to load images from a given directory or a single image file
def load_variations(path):
    # Remove any single or double quotes from the start and end of the path
    path = path.strip("'\"")

    # Check if the path is a file and load it directly as an image
    if os.path.isfile(path):
        try:
            # Open the image file and return it in a list
            image = Image.open(path)
            return [image]
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
        images = [Image.open(os.path.join(path, file)) for file in image_files]
        return images
    else:
        # Raise an error if the path is neither a file nor a directory
        raise FileNotFoundError(f"Path is not a valid file or directory: {path}")

# Prompt the user for the number of layers
numLayers = input("Enter the number of layers: ") 

# Prompt the user for the output directory and strip any quotes
outputInput = input("Where do you want the images to output: ").strip("'\"")

# Initialize a list to store the paths for each layer
layersPath = []             
for i in range(int(numLayers)):
    # Prompt for the path of each layer and load the images
    layerPath = input(f'Enter the folder path for layer {i + 1}: ') 
    layersPath.append(load_variations(layerPath))

# Function to generate all combinations of images from the different layers
def generate_combinations(layers):
    # Create the output directory if it doesn't exist
    output_dir = outputInput
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    count = 1  # Initialize a counter for the output image filenames
    base_images = layers[0]  # The first layer serves as the base images
    overlay_layers = layers[1:]  # Remaining layers are overlays

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
            count += 1  # Increment the count for the next filename
       
# Generate the combinations of images
generate_combinations(layersPath)
