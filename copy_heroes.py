import os
import shutil
import json

# The paths of the generated hero images
hero_images = {
    "cambridge-phd-applications-2027": r"C:\Users\lenovo\.gemini\antigravity\brain\835b679b-c057-40d6-9a5d-d878e9eed0b1\cambridge_phd_applications_2027_hero_1790962621170.jpg",
    "imperial-college-london-phd-applications-2027": r"C:\Users\lenovo\.gemini\antigravity\brain\835b679b-c057-40d6-9a5d-d878e9eed0b1\imperial_college_london_phd_applications_2027_hero_1790962633436.jpg",
    "carleton-university-phd-applications-2027": r"C:\Users\lenovo\.gemini\antigravity\brain\835b679b-c057-40d6-9a5d-d878e9eed0b1\carleton_university_phd_applications_2027_hero_1790962644990.jpg",
    "nvidia-graduate-fellowship-2027": r"C:\Users\lenovo\.gemini\antigravity\brain\835b679b-c057-40d6-9a5d-d878e9eed0b1\nvidia_graduate_fellowship_2027_hero_1790962655275.jpg",
    "pierre-elliott-trudeau-foundation-doctoral-scholarship-2027": r"C:\Users\lenovo\.gemini\antigravity\brain\835b679b-c057-40d6-9a5d-d878e9eed0b1\trudeau_foundation_doctoral_scholarship_2027_hero_1790962668180.jpg",
    "commonwealth-phd-scholarship-2027": r"C:\Users\lenovo\.gemini\antigravity\brain\835b679b-c057-40d6-9a5d-d878e9eed0b1\commonwealth_phd_scholarship_2027_hero_1790962678146.jpg",
    "africalics-phd-visiting-fellowship-2027": r"C:\Users\lenovo\.gemini\antigravity\brain\835b679b-c057-40d6-9a5d-d878e9eed0b1\africalics_phd_visiting_fellowship_2027_hero_1790962690576.jpg"
}

dest_dir = "public/images/blog/scholarships"
os.makedirs(dest_dir, exist_ok=True)

for slug, src_path in hero_images.items():
    if os.path.exists(src_path):
        dest_path = os.path.join(dest_dir, f"{slug}-hero.jpg")
        shutil.copy2(src_path, dest_path)
        print(f"Copied {slug} hero.")
    else:
        print(f"Missing {src_path}")
