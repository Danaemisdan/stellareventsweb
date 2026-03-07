import xml.etree.ElementTree as ET
import base64
from PIL import Image
import io
import numpy as np

# Parse the SVG to extract the base64 image
tree = ET.parse('public/Professional.svg')
root = tree.getroot()
namespaces = {'xlink': 'http://www.w3.org/1999/xlink', 'svg': 'http://www.w3.org/2000/svg'}

img_elem = root.find('.//svg:image', namespaces)
if img_elem is not None:
    href = img_elem.attrib.get('{http://www.w3.org/1999/xlink}href', '')
    if href.startswith('data:image/png;base64,'):
        b64_data = href.split(',')[1]
        img_data = base64.b64decode(b64_data)
        img = Image.open(io.BytesIO(img_data)).convert('RGBA')
        
        arr = np.array(img)
        # We want the logo area to be transparent, and the background to be solid black
        # The logo in Professional.svg is black on white/transparent? 
        # Let's check the alpha/color. Logo is usually dark strokes.
        # We will make a new array: same shape.
        alpha_channel = arr[:, :, 3]
        rgb = arr[:, :, :3]
        
        # If the image is black lines on transparent bg:
        # For a stencil, we want the lines to be transparent (alpha=0) and the bg to be opaque (alpha=255).
        # Let's invert the alpha
        new_arr = np.zeros_like(arr)
        new_arr[:, :, :3] = 0 # Solid black background for the CSS mask 
        # new alpha: where original is opaque (logo), make transparent. Where original is transparent, make opaque.
        new_arr[:, :, 3] = 255 - alpha_channel
        
        out_img = Image.fromarray(new_arr, 'RGBA')
        out_img.save('public/Professional-inverted.png')
        print("Successfully created public/Professional-inverted.png")
    else:
        print("Image is not base64 PNG")
else:
    print("Could not find image element")

