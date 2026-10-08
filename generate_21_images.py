import json
import os

os.makedirs('public/images/blog/scholarships', exist_ok=True)

data_map = {
    "cambridge-phd-applications-2027": {
        "title": "University of Cambridge",
        "subtitle": "PhD Applications 2027/28",
        "hero_desc": "Cambridge Trust & Gates Cambridge Funding",
        "timeline_steps": [
            ("14 Oct 2026", "Gates US Deadline", "For US residents applying for Gates Cambridge"),
            ("8 Dec 2026", "Main Funding Deadline", "Most international applicants & Cambridge Trust"),
            ("5 Jan 2027", "Final Funding Round", "Course-specific deadline for remaining funding")
        ],
        "checklist_items": [
            "Identify and contact a potential PhD supervisor",
            "Secure 2 strong academic references",
            "Prepare a highly competitive Research Proposal",
            "Select your college preferences (optional)",
            "Apply via the Applicant Portal before December 8"
        ],
        "theme": "#0072CE", # Cambridge Blueish
        "alt_timeline": "University of Cambridge PhD Applications 2027 timeline showing Gates US deadline in October, main funding in December, and final funding in January.",
        "alt_checklist": "Application checklist for the Cambridge PhD 2027 intake including supervisor contact, references, and research proposal."
    },
    "imperial-college-london-phd-applications-2027": {
        "title": "Imperial College London",
        "subtitle": "President's PhD Scholarships 2027",
        "hero_desc": "Full Tuition + £27,036 Stipend",
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
            "Select 'President's PhD Scholarship' in the funding section"
        ],
        "theme": "#003E74", # Imperial Blue
        "alt_timeline": "Imperial College London President's PhD Scholarships 2027 application timeline detailing Round 1 in November, Round 2 in January, and Round 3 in March.",
        "alt_checklist": "Checklist for Imperial College PhD applications including checking supervisor availability and selecting the specific scholarship."
    },
    "carleton-university-phd-applications-2027": {
        "title": "Carleton University",
        "subtitle": "PhD Applications 2027",
        "hero_desc": "Graduate Research & Funding Guide",
        "timeline_steps": [
            ("Fall 2026", "Preparation", "Draft Statement of Intent & contact supervisors"),
            ("1 Feb 2027", "Priority Funding", "Main deadline for domestic & international funding"),
            ("1 Mar 2027", "Final Deadline", "Final cutoff for remaining 2027 applications")
        ],
        "checklist_items": [
            "Secure agreement from a Carleton faculty member",
            "Draft a compelling Statement of Intent",
            "Gather official transcripts and 2-3 academic references",
            "Verify English Language Proficiency (IELTS/TOEFL)",
            "Review specific departmental requirements"
        ],
        "theme": "#E81C24", # Carleton Red
        "alt_timeline": "Carleton University PhD 2027 application timeline with preparation in Fall, priority funding deadline in February, and final deadline in March.",
        "alt_checklist": "Carleton University PhD application checklist covering Statement of Intent, references, and supervisor agreement."
    },
    "nvidia-graduate-fellowship-2027": {
        "title": "NVIDIA Graduate Fellowship",
        "subtitle": "2027-28 Application Cycle",
        "hero_desc": "Up to $60,000 + Mandatory Summer Internship",
        "timeline_steps": [
            ("Early Sept 2026", "Applications Open", "Portal opens for global PhD candidates"),
            ("30 Oct 2026", "Application Deadline", "Final submission cutoff for all materials"),
            ("April 2027", "Decisions Announced", "Selected Fellows are notified")
        ],
        "checklist_items": [
            "Ensure you have completed your first year of PhD",
            "Draft a 1-2 page Research Summary (AI/Computing focus)",
            "Update your academic CV/Resume",
            "Secure 3 Letters of Recommendation (1 from advisor)",
            "Confirm availability for the 2027 Summer Internship"
        ],
        "theme": "#76B900", # NVIDIA Green
        "alt_timeline": "NVIDIA Graduate Fellowship 2027 timeline: portal opens in September, deadline on October 30, and decisions in April.",
        "alt_checklist": "NVIDIA Fellowship application checklist including research summary, CV, three references, and internship availability."
    },
    "pierre-elliott-trudeau-foundation-doctoral-scholarship-2027": {
        "title": "Trudeau Foundation",
        "subtitle": "Doctoral Scholarship 2027",
        "hero_desc": "Leadership, Social Sciences & Humanities",
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
        "theme": "#D8281C", # Trudeau/Canada Red
        "alt_timeline": "Pierre Elliott Trudeau Foundation Doctoral Scholarship 2027 timeline detailing eligibility in October, references deadline, and final application in November.",
        "alt_checklist": "Trudeau Foundation Doctoral Scholarship checklist covering leadership alignment, essays, and reference submission."
    },
    "commonwealth-phd-scholarship-2027": {
        "title": "Commonwealth Scholarship",
        "subtitle": "PhD Scholarships 2027/28",
        "hero_desc": "Fully Funded UK Doctoral Study",
        "timeline_steps": [
            ("Sept 2026", "Portal Opens", "CSC Application system goes live"),
            ("20 Oct 2026", "CSC Deadline", "Final deadline to submit on the CSC portal (16:00 BST)"),
            ("Nov-Dec 2026", "Nominating Agency", "National agencies submit their final nominations")
        ],
        "checklist_items": [
            "Secure a Supporting Statement from a UK supervisor",
            "Apply through your national Nominating Agency",
            "Provide proof of citizenship (Eligible Commonwealth country)",
            "Submit 2 strong academic references",
            "Draft a Development Impact statement"
        ],
        "theme": "#00205B", # CSC Blue
        "alt_timeline": "Commonwealth PhD Scholarship 2027 timeline with portal opening in September, CSC deadline in October, and agency nominations in November/December.",
        "alt_checklist": "Commonwealth PhD Scholarship checklist including UK supervisor support, development impact statement, and nominating agency application."
    },
    "africalics-phd-visiting-fellowship-2027": {
        "title": "AfricaLics",
        "subtitle": "PhD Visiting Fellowship 2027",
        "hero_desc": "Research Visit to South Africa (Innovation Studies)",
        "timeline_steps": [
            ("August 2026", "Call for Applications", "Official call opens for African PhD students"),
            ("2 Oct 2026", "Submission Deadline", "Submit full proposal and support letters"),
            ("Early 2027", "Fellowship Begins", "Selected scholars begin their study visit")
        ],
        "checklist_items": [
            "Be enrolled in a PhD program at an African university",
            "Ensure research focuses on Innovation & Development",
            "Submit a 10-page PhD proposal",
            "Provide a detailed Study Plan for the visiting period",
            "Obtain written approval from your current home supervisor"
        ],
        "theme": "#F2A900", # Yellow/Gold African theme
        "alt_timeline": "AfricaLics PhD Visiting Fellowship 2027 timeline showing call opening in August, deadline on October 2, and start in early 2027.",
        "alt_checklist": "AfricaLics Fellowship application checklist detailing PhD proposal, study plan, and home supervisor approval."
    }
}

def create_hero_svg(slug, data):
    svg = f"""<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#111111" />
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="{data['theme']}" stroke-width="1" stroke-opacity="0.2"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#grid)" />
  <rect x="0" y="0" width="1200" height="12" fill="{data['theme']}" />
  <text x="80" y="240" font-family="-apple-system, sans-serif" font-size="48" font-weight="600" fill="{data['theme']}">{data['title']}</text>
  <text x="80" y="320" font-family="-apple-system, sans-serif" font-size="72" font-weight="bold" fill="#FFFFFF">{data['subtitle']}</text>
  <text x="80" y="420" font-family="-apple-system, sans-serif" font-size="36" font-weight="normal" fill="#AAAAAA">{data['hero_desc']}</text>
  <rect x="80" y="520" width="260" height="40" fill="{data['theme']}" rx="4" />
  <text x="100" y="548" font-family="-apple-system, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="2">CEE WRITING HUB</text>
</svg>"""
    with open(f"public/images/blog/scholarships/{slug}-hero.svg", 'w', encoding='utf-8') as f:
        f.write(svg)

def create_timeline_svg(slug, data):
    svg = f"""<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#111111" />
  <rect x="0" y="0" width="1200" height="8" fill="#C5A059" />
  <text x="80" y="100" font-family="-apple-system, sans-serif" font-size="42" font-weight="bold" fill="#FFFFFF">Application Timeline: {data['subtitle']}</text>
"""
    y_offset = 200
    for i, step in enumerate(data['timeline_steps']):
        date, title, desc = step
        svg += f"""
  <circle cx="120" cy="{y_offset}" r="16" fill="#C5A059" />
  <rect x="118" y="{y_offset+16}" width="4" height="90" fill="#333333" />
  <text x="180" y="{y_offset+10}" font-family="-apple-system, sans-serif" font-size="28" font-weight="bold" fill="{data['theme']}">{date}</text>
  <text x="450" y="{y_offset+10}" font-family="-apple-system, sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF">{title}</text>
  <text x="450" y="{y_offset+45}" font-family="-apple-system, sans-serif" font-size="22" font-weight="normal" fill="#AAAAAA">{desc}</text>
"""
        y_offset += 120
    
    svg += f"""
  <text x="80" y="580" font-family="-apple-system, sans-serif" font-size="20" font-weight="bold" fill="#666666" letter-spacing="2">CEE WRITING SERVICES - OFFICIAL 2027 CYCLE GUIDE</text>
</svg>"""
    with open(f"public/images/blog/scholarships/{slug}-timeline.svg", 'w', encoding='utf-8') as f:
        f.write(svg)

def create_checklist_svg(slug, data):
    svg = f"""<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#111111" />
  <rect x="0" y="0" width="1200" height="8" fill="#C5A059" />
  <text x="80" y="120" font-family="-apple-system, sans-serif" font-size="48" font-weight="bold" fill="#FFFFFF">Application Checklist</text>
  <text x="80" y="180" font-family="-apple-system, sans-serif" font-size="32" font-weight="normal" fill="{data['theme']}">{data['title']}</text>
"""
    y_offset = 280
    for item in data['checklist_items']:
        svg += f"""
  <rect x="80" y="{y_offset-25}" width="32" height="32" rx="6" fill="none" stroke="#C5A059" stroke-width="3" />
  <path d="M 88 {y_offset-10} L 94 {y_offset-2} L 105 {y_offset-20}" fill="none" stroke="#C5A059" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  <text x="150" y="{y_offset}" font-family="-apple-system, sans-serif" font-size="28" font-weight="normal" fill="#EAEAEA">{item}</text>
"""
        y_offset += 80
        
    svg += f"""
  <text x="80" y="740" font-family="-apple-system, sans-serif" font-size="20" font-weight="bold" fill="#666666" letter-spacing="2">CEE WRITING SERVICES - DO NOT SUBMIT WITHOUT THESE</text>
</svg>"""
    with open(f"public/images/blog/scholarships/{slug}-checklist.svg", 'w', encoding='utf-8') as f:
        f.write(svg)

print("Generating 21 SVG images...")
for slug, data in data_map.items():
    create_hero_svg(slug, data)
    create_timeline_svg(slug, data)
    create_checklist_svg(slug, data)
print("Done generating SVGs.")
