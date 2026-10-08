import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/images/blog/scholarships', exist_ok=True)

data_map = {
    "cambridge-phd-applications-2027": {
        "title": "University of Cambridge",
        "subtitle": "PhD Applications 2027/28",
        "timeline_steps": [
            ("14 Oct 2026", "Gates US Deadline", "US residents applying for Gates Cambridge"),
            ("8 Dec 2026", "Main Funding Deadline", "Most international applicants & Cambridge Trust"),
            ("5 Jan 2027", "Final Funding Round", "Course-specific deadline for remaining funding")
        ],
        "checklist_items": [
            "Identify and contact a potential PhD supervisor",
            "Secure 2 strong academic references",
            "Prepare a competitive Research Proposal",
            "Select college preferences (optional)",
            "Apply via Applicant Portal before Dec 8"
        ],
        "theme": "#0072CE"
    },
    "imperial-college-london-phd-applications-2027": {
        "title": "Imperial College London",
        "subtitle": "President's PhD Scholarships 2027",
        "timeline_steps": [
            ("2 Nov 2026", "Round 1 Deadline", "Decisions released by 31 January 2027"),
            ("11 Jan 2027", "Round 2 Deadline", "Decisions released by 15 April 2027"),
            ("1 Mar 2027", "Round 3 Deadline", "Decisions released by 31 May 2027")
        ],
        "checklist_items": [
            "Check the 'unavailable supervisors' list online",
            "Contact an eligible Imperial supervisor and gain agreement",
            "Achieve First Class/Distinction in previous degrees",
            "Submit the main Imperial postgraduate application",
            "Select 'President's PhD Scholarship' in funding section"
        ],
        "theme": "#003E74"
    },
    "carleton-university-phd-applications-2027": {
        "title": "Carleton University",
        "subtitle": "PhD Applications 2027",
        "timeline_steps": [
            ("Fall 2026", "Preparation", "Draft Statement of Intent & contact supervisors"),
            ("1 Feb 2027", "Priority Funding", "Main deadline for domestic & international funding"),
            ("1 Mar 2027", "Final Deadline", "Final cutoff for remaining 2027 applications")
        ],
        "checklist_items": [
            "Secure agreement from a Carleton faculty member",
            "Draft a compelling Statement of Intent",
            "Gather official transcripts and 2-3 references",
            "Verify English Language Proficiency (IELTS/TOEFL)",
            "Review specific departmental requirements"
        ],
        "theme": "#E81C24"
    },
    "nvidia-graduate-fellowship-2027": {
        "title": "NVIDIA Graduate Fellowship",
        "subtitle": "2027-28 Application Cycle",
        "timeline_steps": [
            ("Sept 2026", "Applications Open", "Portal opens for global PhD candidates"),
            ("30 Oct 2026", "Application Deadline", "Final submission cutoff for all materials"),
            ("April 2027", "Decisions Announced", "Selected Fellows are notified")
        ],
        "checklist_items": [
            "Complete your first year of PhD program",
            "Draft a 1-2 page Research Summary",
            "Update your academic CV/Resume",
            "Secure 3 Letters of Recommendation",
            "Confirm availability for the 2027 Summer Internship"
        ],
        "theme": "#76B900"
    },
    "pierre-elliott-trudeau-foundation-doctoral-scholarship-2027": {
        "title": "Trudeau Foundation",
        "subtitle": "Doctoral Scholarship 2027",
        "timeline_steps": [
            ("2 Oct 2026", "Eligibility Deadline", "Complete initial screening & eligibility check"),
            ("30 Oct 2026", "Reference Deadline", "All references must be submitted"),
            ("6 Nov 2026", "Application Close", "Final submission of the full application")
        ],
        "checklist_items": [
            "Confirm alignment with Social Sciences/Humanities",
            "Demonstrate a strong track record of Leadership",
            "Complete the mandatory eligibility check early",
            "Prepare your Leadership & Research essays",
            "Ensure referees submit letters before October 30"
        ],
        "theme": "#D8281C"
    },
    "commonwealth-phd-scholarship-2027": {
        "title": "Commonwealth Scholarship",
        "subtitle": "PhD Scholarships 2027/28",
        "timeline_steps": [
            ("Sept 2026", "Portal Opens", "CSC Application system goes live"),
            ("20 Oct 2026", "CSC Deadline", "Final deadline to submit on the CSC portal"),
            ("Nov-Dec", "Nominating Agency", "National agencies submit final nominations")
        ],
        "checklist_items": [
            "Secure a Supporting Statement from UK supervisor",
            "Apply through your national Nominating Agency",
            "Provide proof of citizenship",
            "Submit 2 strong academic references",
            "Draft a Development Impact statement"
        ],
        "theme": "#00205B"
    },
    "africalics-phd-visiting-fellowship-2027": {
        "title": "AfricaLics",
        "subtitle": "PhD Visiting Fellowship 2027",
        "timeline_steps": [
            ("Aug 2026", "Call for Applications", "Official call opens for African PhD students"),
            ("2 Oct 2026", "Submission Deadline", "Submit full proposal and support letters"),
            ("Early 2027", "Fellowship Begins", "Selected scholars begin their study visit")
        ],
        "checklist_items": [
            "Be enrolled in a PhD program at an African university",
            "Ensure research focuses on Innovation & Development",
            "Submit a 10-page PhD proposal",
            "Provide a detailed Study Plan for the visit",
            "Obtain written approval from home supervisor"
        ],
        "theme": "#F2A900"
    }
}

try:
    font_lg = ImageFont.truetype("arialbd.ttf", 48)
    font_md = ImageFont.truetype("arialbd.ttf", 32)
    font_sm_bold = ImageFont.truetype("arialbd.ttf", 26)
    font_sm = ImageFont.truetype("arial.ttf", 22)
    font_xs = ImageFont.truetype("arial.ttf", 18)
except:
    font_lg = ImageFont.load_default()
    font_md = ImageFont.load_default()
    font_sm_bold = ImageFont.load_default()
    font_sm = ImageFont.load_default()
    font_xs = ImageFont.load_default()

def create_timeline_png(slug, data):
    img = Image.new('RGB', (1200, 630), color='#111111')
    draw = ImageDraw.Draw(img)
    
    # Gold accent line
    draw.rectangle([0, 0, 1200, 12], fill='#C5A059')
    
    # Header
    draw.text((80, 80), f"Application Timeline: {data['subtitle']}", font=font_lg, fill='#FFFFFF')
    draw.text((80, 140), data['title'], font=font_md, fill=data['theme'])
    
    y = 240
    for step in data['timeline_steps']:
        date, title, desc = step
        # Circle
        draw.ellipse([100, y+5, 130, y+35], fill='#C5A059')
        # Line connecting
        if y < 480:
            draw.rectangle([113, y+35, 117, y+125], fill='#333333')
            
        draw.text((160, y+5), date, font=font_sm_bold, fill=data['theme'])
        draw.text((400, y+5), title, font=font_sm_bold, fill='#FFFFFF')
        draw.text((400, y+45), desc, font=font_sm, fill='#AAAAAA')
        y += 120
        
    draw.text((80, 580), "CEE WRITING SERVICES - OFFICIAL 2027 CYCLE GUIDE", font=font_xs, fill='#666666')
    
    img.save(f"public/images/blog/scholarships/{slug}-timeline.png")

def create_checklist_png(slug, data):
    img = Image.new('RGB', (1200, 800), color='#111111')
    draw = ImageDraw.Draw(img)
    
    # Gold accent line
    draw.rectangle([0, 0, 1200, 12], fill='#C5A059')
    
    # Header
    draw.text((80, 100), "Application Checklist", font=font_lg, fill='#FFFFFF')
    draw.text((80, 160), f"{data['title']} - {data['subtitle']}", font=font_md, fill=data['theme'])
    
    y = 280
    for item in data['checklist_items']:
        # Box
        draw.rectangle([80, y-10, 115, y+25], outline='#C5A059', width=3)
        # Checkmark
        draw.line([85, y+10, 95, y+20, 110, y-5], fill='#C5A059', width=4)
        
        draw.text((150, y), item, font=font_sm_bold, fill='#EAEAEA')
        y += 80
        
    draw.text((80, 740), "CEE WRITING SERVICES - DO NOT SUBMIT WITHOUT THESE", font=font_xs, fill='#666666')
    
    img.save(f"public/images/blog/scholarships/{slug}-checklist.png")

print("Generating PNGs...")
for slug, data in data_map.items():
    create_timeline_png(slug, data)
    create_checklist_png(slug, data)
print("Done!")
