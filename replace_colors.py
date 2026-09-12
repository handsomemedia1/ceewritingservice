import os
import re

directories = ['src']
for directory in directories:
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js', '.css')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Tailwind classes
                new_content = re.sub(r'\bbg-white\b', 'bg-bg-card', content)
                new_content = re.sub(r'\bbg-gray-100\b', 'bg-bg-card', new_content)
                new_content = re.sub(r'\bbg-gray-50\b', 'bg-bg-main', new_content)
                new_content = re.sub(r'\bbg-slate-50\b', 'bg-bg-main', new_content)
                new_content = re.sub(r'\bbg-slate-100\b', 'bg-bg-card', new_content)
                
                new_content = re.sub(r'\btext-gray-800\b', 'text-text-primary', new_content)
                new_content = re.sub(r'\btext-gray-900\b', 'text-text-primary', new_content)
                new_content = re.sub(r'\btext-gray-600\b', 'text-text-muted', new_content)
                new_content = re.sub(r'\btext-gray-500\b', 'text-text-muted', new_content)
                new_content = re.sub(r'\btext-slate-800\b', 'text-text-primary', new_content)
                new_content = re.sub(r'\btext-slate-900\b', 'text-text-primary', new_content)
                
                # Inline styles (handling both single and double quotes just in case, but usually single in JSX objects)
                new_content = re.sub(r"background:\s*'white'", "background: 'var(--bg-card)'", new_content)
                new_content = re.sub(r"background:\s*'#f8fafc'", "background: 'var(--bg-main)'", new_content)
                new_content = re.sub(r"background:\s*'#ffffff'", "background: 'var(--bg-card)'", new_content)
                new_content = re.sub(r"color:\s*'#64748b'", "color: 'var(--text-muted)'", new_content)
                new_content = re.sub(r"color:\s*'#cbd5e1'", "color: 'var(--border)'", new_content)
                new_content = re.sub(r"border:\s*'1px solid #cbd5e1'", "border: '1px solid var(--border)'", new_content)
                new_content = re.sub(r"border:\s*'1px dashed #cbd5e1'", "border: '1px dashed var(--border)'", new_content)
                new_content = re.sub(r"borderBottom:\s*'1px solid #e2e8f0'", "borderBottom: '1px solid var(--border)'", new_content)
                new_content = re.sub(r"border:\s*'1px solid #e2e8f0'", "border: '1px solid var(--border)'", new_content)

                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f'Updated {filepath}')
