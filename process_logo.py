import sys
from PIL import Image

def process_logo():
    img = Image.open('src/assets/logo.png').convert('RGBA')
    img = img.crop((0, 0, 105, 93))
    
    data = img.getdata()
    new_data = []
    
    orange = None
    blue = None
    
    for r, g, b, a in data:
        dist = ((255 - r)**2 + (255 - g)**2 + (255 - b)**2) ** 0.5
        if dist < 15:
            new_data.append((255, 255, 255, 0))
        else:
            # anti-aliasing curve
            alpha = min(255, int((dist / 200.0) * 255 * 1.5))
            alpha = max(0, min(255, alpha))
            
            if alpha > 200:
                if r > 200 and g < 150:
                    if orange is None: orange = (r, g, b)
                if b > 150 and r < 100:
                    if blue is None: blue = (r, g, b)
            
            # Un-premultiply alpha effect since it was on white background
            # If C_result = C_orig * alpha + 255 * (1 - alpha)
            # Then C_orig = (C_result - 255 * (1 - alpha)) / alpha
            if alpha > 0 and alpha < 255:
                alpha_f = alpha / 255.0
                nr = max(0, min(255, int((r - 255 * (1 - alpha_f)) / alpha_f)))
                ng = max(0, min(255, int((g - 255 * (1 - alpha_f)) / alpha_f)))
                nb = max(0, min(255, int((b - 255 * (1 - alpha_f)) / alpha_f)))
                new_data.append((nr, ng, nb, alpha))
            else:
                new_data.append((r, g, b, alpha))
            
    img.putdata(new_data)
    img.save('src/assets/logo-icon.png')
    
    # Save a second one checking the crop
    print(f"Orange: {orange}")
    print(f"Blue: {blue}")

process_logo()
