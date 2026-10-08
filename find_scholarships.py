import json, glob
for fname in glob.glob('*.json'):
    try:
        with open(fname, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if isinstance(data, list):
                for item in data:
                    title = item.get('title', '').lower()
                    if 'cambridge' in title or 'trudeau' in title or 'africalics' in title:
                        print(f"Found in {fname}: {item.get('title')}")
    except Exception as e:
        pass
