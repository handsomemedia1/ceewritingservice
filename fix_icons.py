import json

def fix_roadmaps():
    with open('src/features/research/components/ResearchRoadmaps.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace("icon: '??'", "icon: '🌱'", 1)
    content = content.replace("icon: '??'", "icon: '🎓'", 1)
    content = content.replace("icon: '??'", "icon: '🔬'", 1)
    content = content.replace("icon: '???'", "icon: '🧠'", 1)
    content = content.replace("icon: '??'", "icon: '📜'", 1)
    
    with open('src/features/research/components/ResearchRoadmaps.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

def fix_config():
    with open('src/config/roadmaps.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace("icon: '??'", "icon: '🎓'", 1)
    content = content.replace("icon: '??'", "icon: '🌱'", 1)
    # Also rename beginner-research-project to first-project
    content = content.replace("'beginner-research-project'", "'first-project'")
    content = content.replace("id: 'beginner-research-project'", "id: 'first-project'")
    
    with open('src/config/roadmaps.ts', 'w', encoding='utf-8') as f:
        f.write(content)

def fix_seed():
    with open('seed_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for item in data:
        if 'BEGINNER' in item.get('id', ''):
            item['content'] = item['content'].replace('/research/path/beginner-research-project', '/research/path/first-project')
            
    with open('seed_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

fix_roadmaps()
fix_config()
fix_seed()
print("Fixed icons and ID!")
