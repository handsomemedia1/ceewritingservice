import json
from bs4 import BeautifulSoup

with open('scholarships_seed_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for article in data:
    soup = BeautifulSoup(article['content'], 'html.parser')
    
    # Process all tables
    for table in soup.find_all('table'):
        # Add classes to table
        table['class'] = 'w-full text-left border-collapse min-w-[1000px] mb-0'
        
        # Add classes to thead
        for thead in table.find_all('thead'):
            thead['class'] = 'bg-[#111111]'
            
        # Add classes to th
        for th in table.find_all('th'):
            th['class'] = 'p-4 font-semibold text-[#C5A059] border-b border-[#333] whitespace-nowrap text-sm tracking-wider uppercase'
            
        # Add classes to td
        for td in table.find_all('td'):
            # Some columns might be long (like deadlines). Adding min-w-[150px] or whitespace-normal
            td['class'] = 'p-4 border-b border-[#222] text-sm align-top text-gray-300 min-w-[120px]'

        # Check if table is already wrapped in our specific div
        parent = table.parent
        if parent and parent.name == 'div' and 'overflow-x-auto' in parent.get('class', []):
            # Already wrapped, just ensure the classes are correct
            parent['class'] = 'overflow-x-auto w-full my-8 rounded-lg border border-[#333] bg-[#0A0A0A]'
        else:
            # Wrap the table
            wrapper = soup.new_tag('div', **{'class': 'overflow-x-auto w-full my-8 rounded-lg border border-[#333] bg-[#0A0A0A]'})
            table.wrap(wrapper)

    article['content'] = str(soup)

with open('scholarships_seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Tables neatly formatted with BeautifulSoup.")
