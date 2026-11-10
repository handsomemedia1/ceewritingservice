/**
 * Articles carry free-form tags, some of them long SEO phrases. These are the reader-facing
 * topics: each one lists the stored tags that belong to it. The order decides which topic
 * an article displays when its tags fit more than one.
 */
const TOPIC_TAGS: Record<string, string[]> = {
  Scholarships: [
    'Scholarships', 'Study Abroad', 'scholarships for Nigerian students abroad', 'SOP vs personal statement Nigeria',
    'Motivationsschreiben Nigerian applicant', 'Ausbildung application letter Nigeria', 'convert Nigerian CGPA to German GPA',
  ],
  Career: ['Career Advice', 'NYSC', 'CV Revamp', 'Resume Writing', 'CV writing Nigeria', 'ASUU strike'],
  'Data Analysis': ['Data Analysis', 'SPSS', 'R', 'Python', 'Machine Learning', 'Mathematical Modelling', 'Computational Research'],
  Methodology: ['Research Methodology', 'Research Design', 'Sampling', 'Theoretical Framework', 'Data Collection'],
  'Academic Writing': ['Academic Writing', 'Literature Review', 'Proposal Writing', 'Academic Integrity', 'Turnitin plagiarism check Nigeria', 'Thesis Defense'],
  Research: ['Research', 'Beginner Research', 'Dissertation', "Master's Thesis", 'Undergraduate', 'Topic Selection', 'Research Problem', 'Research Fundamentals'],
};

/** The stored tags that a blog topic filter should match. */
export function tagsForTopic(topic: string): string[] {
  return TOPIC_TAGS[topic] ?? [topic];
}

/** The clean label shown for an article, derived from its tags. */
export function displayTopic(tags: string[] | null | undefined): string {
  const first = tags?.[0];
  for (const [topic, members] of Object.entries(TOPIC_TAGS)) {
    if (first && members.includes(first)) return topic;
  }
  for (const [topic, members] of Object.entries(TOPIC_TAGS)) {
    if (tags?.some((tag) => members.includes(tag))) return topic;
  }
  return first && first.length <= 24 ? first : 'Guide';
}
