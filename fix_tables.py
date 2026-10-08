import json
import re

with open('scholarships_seed_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for article in data:
    content = article['content']
    
    # Check if table is already wrapped in a div with overflow-x-auto
    # If not, we will wrap it. The AI was instructed to wrap it, so let's see.
    # Let's just do a clean pass:
    # 1. Remove existing wrapping divs that might just be generic
    content = re.sub(r'<div class="overflow-x-auto[^>]*>\s*<table', '<table', content, flags=re.IGNORECASE)
    content = re.sub(r'</table>\s*</div>', '</table>', content, flags=re.IGNORECASE)
    
    # 2. Add classes to table
    content = re.sub(r'<table[^>]*>', '<table class="w-full text-left border-collapse min-w-[800px] mb-0">', content, flags=re.IGNORECASE)
    
    # 3. Add classes to thead
    content = re.sub(r'<thead[^>]*>', '<thead class="bg-[#111111]">', content, flags=re.IGNORECASE)
    
    # 4. Add classes to th
    content = re.sub(r'<th[^>]*>', '<th class="p-4 font-semibold text-[#C5A059] border-b border-[#333] whitespace-nowrap text-sm tracking-wider uppercase">', content, flags=re.IGNORECASE)
    
    # 5. Add classes to td
    content = re.sub(r'<td[^>]*>', '<td class="p-4 border-b border-[#222] text-sm align-top">', content, flags=re.IGNORECASE)
    
    # 6. Wrap table back in a responsive div
    content = re.sub(r'(<table.*?</table>)', r'<div class="overflow-x-auto w-full my-8 rounded-lg border border-[#222]">\1</div>', content, flags=re.IGNORECASE | re.DOTALL)
    
    article['content'] = content

with open('scholarships_seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Tables neatly formatted.")
