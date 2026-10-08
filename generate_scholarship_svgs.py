import os
import textwrap

os.makedirs('public/images/blog/scholarships', exist_ok=True)

slugs = [
    "cambridge-phd-applications-2027",
    "imperial-college-london-phd-applications-2027",
    "carleton-university-phd-applications-2027",
    "nvidia-graduate-fellowship-2027",
    "pierre-elliott-trudeau-foundation-doctoral-scholarship-2027",
    "commonwealth-phd-scholarship-2027",
    "africalics-phd-visiting-fellowship-2027"
]

def generate_svg(slug):
    title = slug.replace('-', ' ').title()
    svg = f"""<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="100%" height="100%" fill="#111111" />
  
  <!-- Grid Pattern -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(197, 160, 89, 0.1)" stroke-width="1"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#grid)" />
  
  <!-- Accent Line -->
  <rect x="0" y="0" width="1200" height="8" fill="#C5A059" />
  
  <!-- Title -->
  <text x="80" y="280" font-family="-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="bold" fill="#EAEAEA">
    2027 Scholarship Guide
  </text>
  
  <!-- Subtitle (Dynamic based on slug) -->
  <text x="80" y="380" font-family="-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="normal" fill="#C5A059">
    {title[:60]}...
  </text>
  
  <!-- CEE Branding -->
  <text x="80" y="520" font-family="-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="bold" fill="#888888" letter-spacing="2">
    CEE WRITING HUB
  </text>
</svg>"""
    with open(f"public/images/blog/scholarships/{slug}.svg", 'w', encoding='utf-8') as f:
        f.write(svg)

for slug in slugs:
    generate_svg(slug)

print("Generated all 7 SVGs.")
