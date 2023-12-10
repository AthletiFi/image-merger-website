from PIL import Image
import os

def load_variations(folder):
    files = os.listdir(folder)
    images = [Image.open(os.path.join(folder, file)) for file in files]
    return images
baseImageInput = input("Enter the file path for the base image: ")
backgroundInput = input("Enter the path for the background image folder: ")
playerInput = input("Enter the path for the player image folder: ")
outputInput = input("Where do you want the images to output: ")
baseImage = Image.open(baseImageInput)  #Change to file path containing the base 
background_variations = load_variations(backgroundInput)  #Change to folder path containing backgrounds
#border_variations = load_variations('assets/mouths') ---- There is only one boarder
player_variations = load_variations('assets/Bronzeplayers/v1-v2 Bronze-Silver Players') #Change to folder path containing Players
#def generate_combinations(base, backgrounds, borders, players): ---- orginal code Which acounts for mulitple borders
   # count = 0
    #for background in backgrounds:
       # for border in borders:
            #for player in players:
               # new_image = base.copy()
               # new_image.paste(background, (0, 0), background)
                #new_image.paste(border, (0, 0), border)
                #new_image.paste(player, (0, 0), player)
                #new_image.save(f'output/image_{count}.png')
                #count += 1

def generate_combinations(base, backgrounds, players):
    output_dir = outputInput
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    count = 0
    for background in backgrounds:
            for player in players:
                new_image = base.copy()
                new_image.paste(background, (0, 0), background)
                new_image.paste(player, (0, 0), player)
                new_image.save(f'{output_dir}/image_{count}.png')
                count += 1

generate_combinations(baseImage, background_variations, player_variations)
