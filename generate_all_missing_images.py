import os
import json
import re
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/images/blog/headers', exist_ok=True)
os.makedirs('public/images/blog/beginner-roadmap', exist_ok=True)
os.makedirs('public/images/research/path/masters-thesis', exist_ok=True)

try:
    font_xl = ImageFont.truetype("arialbd.ttf", 64)
    font_lg = ImageFont.truetype("arialbd.ttf", 48)
    font_md = ImageFont.truetype("arial.ttf", 36)
except:
    font_xl = ImageFont.load_default()
    font_lg = ImageFont.load_default()
    font_md = ImageFont.load_default()

def draw_text_wrapped(draw, text, x, y, max_width, font, fill):
    words = text.split()
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        # Using string length as a proxy for width (very rough if no true font metrics, but good enough)
        if len(" ".join(current_line)) * (font.size * 0.5) > max_width:
            current_line.pop()
            lines.append(" ".join(current_line))
            current_line = [word]
    lines.append(" ".join(current_line))
    
    current_y = y
    for line in lines:
        draw.text((x, current_y), line, font=font, fill=fill)
        current_y += font.size * 1.5

def generate_hero(title, slug):
    img = Image.new('RGB', (1200, 630), color='#111111')
    draw = ImageDraw.Draw(img)
    
    # Gold border
    draw.rectangle([20, 20, 1180, 610], outline='#C5A059', width=4)
    
    # Text
    draw.text((80, 100), "RESEARCH GUIDE", font=font_md, fill='#C5A059')
    draw_text_wrapped(draw, title, 80, 180, 1000, font_xl, '#FFFFFF')
    
    # Brand
    draw.text((80, 520), "CEE WRITING SERVICES", font=font_md, fill='#666666')
    
    filepath = f"/images/blog/headers/{slug}-hero.png"
    img.save(f"public{filepath}")
    return filepath

def generate_internal(filepath):
    # Filename to title
    filename = os.path.basename(filepath)
    title = filename.replace('.png', '').replace('.webp', '').replace('.svg', '').replace('-', ' ').title()
    
    # Replace extension with .png
    new_filepath = filepath.rsplit('.', 1)[0] + '.png'
    
    img = Image.new('RGB', (1200, 800), color='#0A0A0A')
    draw = ImageDraw.Draw(img)
    
    # Background pattern (abstract shapes)
    draw.rectangle([100, 200, 1100, 600], fill='#111111', outline='#333333', width=2)
    draw.rectangle([150, 250, 1050, 550], outline='#C5A059', width=4)
    
    # Text
    draw.text((80, 80), "INSTRUCTIONAL GRAPHIC", font=font_md, fill='#C5A059')
    draw_text_wrapped(draw, title, 80, 140, 1000, font_lg, '#FFFFFF')
    
    draw.text((500, 400), "[ Detailed Graphic Placeholder ]", font=font_md, fill='#666666')
    
    os.makedirs(os.path.dirname(f"public{new_filepath}"), exist_ok=True)
    img.save(f"public{new_filepath}")
    
    return new_filepath

def process_file(json_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for article in data:
        # Check if it lacks a featured image OR it's one of the master/beginner articles
        if not article.get('featured_image'):
            article['featured_image'] = generate_hero(article['title'], article['slug'])
            
        # Process internal images
        content = article['content']
        images = re.findall(r'<img src="([^"]+)"', content)
        for img_path in images:
            # We skip external or already good ones
            if 'scholarships' in img_path:
                continue
            
            new_path = generate_internal(img_path)
            content = content.replace(img_path, new_path)
            
        article['content'] = content
        
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    print(f"Processed {json_file}")

process_file('masters_seed_data.json')
process_file('seed_data.json')
