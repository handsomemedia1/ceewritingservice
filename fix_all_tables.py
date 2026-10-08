import json
from bs4 import BeautifulSoup

def format_tables(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        for article in data:
            if 'content' not in article: continue
            soup = BeautifulSoup(article['content'], 'html.parser')
            changed = False
            for table in soup.find_all('table'):
                changed = True
                table['class'] = 'w-full text-left border-collapse min-w-[1000px] mb-0'
                for thead in table.find_all('thead'):
                    thead['class'] = 'bg-[#111111]'
                for th in table.find_all('th'):
                    th['class'] = 'p-4 font-semibold text-[#C5A059] border-b border-[#333] whitespace-nowrap text-sm tracking-wider uppercase'
                for td in table.find_all('td'):
                    td['class'] = 'p-4 border-b border-[#222] text-sm align-top text-gray-300 min-w-[120px]'

                parent = table.parent
                if parent and parent.name == 'div' and 'overflow-x-auto' in parent.get('class', []):
                    parent['class'] = 'overflow-x-auto w-full my-8 rounded-lg border border-[#333] bg-[#0A0A0A]'
                else:
                    wrapper = soup.new_tag('div', **{'class': 'overflow-x-auto w-full my-8 rounded-lg border border-[#333] bg-[#0A0A0A]'})
                    table.wrap(wrapper)
            
            if changed:
                article['content'] = str(soup)
                
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Tables formatted in {filename}")
    except Exception as e:
        print(f"Skipping {filename}: {e}")

format_tables('scholarships_seed_data.json')
format_tables('masters_seed_data.json')
format_tables('seed_data.json')
