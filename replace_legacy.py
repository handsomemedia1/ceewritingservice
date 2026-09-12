import os
import re

directories = ['src']
for directory in directories:
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Separate usages of green-dark and sage
                
                # Backgrounds
                new_content = re.sub(r'\bbg-green-dark\b', 'bg-bg-main', content)
                new_content = re.sub(r'\bbg-green-dark/(\d+)\b', r'bg-bg-main/\1', new_content)
                new_content = re.sub(r'\bbg-green-dark/(\d+)/(\d+)\b', r'bg-bg-main/\1', new_content) # handle bg-green-dark/10/10 which is weird tailwind syntax
                new_content = re.sub(r'\bbg-sage\b', 'bg-gold', new_content)
                new_content = re.sub(r'\bbg-sage/(\d+)\b', r'bg-gold/\1', new_content)
                
                # Text
                new_content = re.sub(r'\btext-green-dark\b', 'text-text-primary', new_content)
                new_content = re.sub(r'\btext-green-dark/(\d+)\b', r'text-text-muted', new_content) # text-green-dark/70 -> text-muted
                new_content = re.sub(r'\btext-sage\b', 'text-gold', new_content)
                new_content = re.sub(r'\btext-sage/(\d+)\b', r'text-gold/\1', new_content)
                new_content = re.sub(r'\btext-sage-light\b', 'text-gold-hover', new_content)

                # Borders
                new_content = re.sub(r'\bborder-green-dark\b', 'border-border', new_content)
                new_content = re.sub(r'\bborder-green-dark/(\d+)\b', r'border-border', new_content)
                new_content = re.sub(r'\bborder-green-dark/(\d+)/(\d+)\b', r'border-border', new_content)

                # Variables in inline styles
                new_content = re.sub(r'var\(--green-dark\)', 'var(--bg-main)', new_content)
                new_content = re.sub(r'var\(--sage\)', 'var(--gold)', new_content)
                new_content = re.sub(r'var\(--sage-light\)', 'var(--gold-hover)', new_content)

                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f'Updated {filepath}')
