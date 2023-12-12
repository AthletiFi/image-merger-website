from PIL import Image
import os
import itertools

def load_variations(folder):
    files = os.listdir(folder)
    images = [Image.open(os.path.join(folder, file)) for file in files]
    return images

numLayers = input("Enter the number of layers: ") 
outputInput = input("Where do you want the images to output: ")
layersPath = []             
for i in range(int(numLayers)):
    layerPath = input(f'Enter the folder path for layer {i + 1}: ') 
    layersPath.append(load_variations(layerPath))



def generate_combinations(layers):
    output_dir = outputInput
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    count = 0
    base_images = layers[0]
    overlay_layers = layers[1:]
    for base in base_images:
        for layer_combination in itertools.product(*overlay_layers):
            new_image = base.copy()
            for overlay in layer_combination:
                new_image.paste(overlay, (0, 0), overlay)
            new_image.save(f'{output_dir}/image_{count}.png')
            count += 1
       

generate_combinations(layersPath)
