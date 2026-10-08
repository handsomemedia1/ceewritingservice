import os
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM

def convert_svg_to_png(svg_path):
    png_path = svg_path.replace('.svg', '.png')
    drawing = svg2rlg(svg_path)
    if drawing:
        renderPM.drawToFile(drawing, png_path, fmt="PNG", bg=0x111111)
        print(f"Converted {svg_path} to {png_path}")
    else:
        print(f"Failed to read {svg_path}")

# Test with one image
convert_svg_to_png('public/images/blog/scholarships/cambridge-phd-applications-2027-hero.svg')
