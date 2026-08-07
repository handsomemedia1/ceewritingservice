import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function ResearchRoadmaps() {
  const roadmaps = [
    {
      id: "first-project",
      title: "First Research Project",
      level: "Beginner",
      desc: "Master the basics: Formulating a question, basic literature review, and simple methodology.",
      icon: "🌱"
    },
    {
      id: "undergrad-dissertation",
      title: "Undergraduate Dissertation",
      level: "Intermediate",
      desc: "Structured guidance on proposals, ethical approval, data collection, and writing up.",
      icon: "🎓"
    },
    {
      id: "masters-thesis",
      title: "Master's Thesis",
      level: "Advanced",
      desc: "Deep dive into complex research designs, advanced statistical analysis, and critical synthesis.",
      icon: "📜"
    },
    {
      id: "phd-research",
      title: "PhD Research",
      level: "Expert",
      desc: "Original contribution frameworks, longitudinal studies, and defending your methodology.",
      icon: "🏛️"
    },
    {
      id: "publishing",
      title: "Publishing Your First Journal Article",
      level: "Professional",
      desc: "Navigating peer-review, formatting for high-impact journals, and handling revisions.",
      icon: "📝"
    }
  ];

  return (
    <section id="roadmaps" className="py-24 bg-sage/20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-green-dark/70 font-bold tracking-wider uppercase mb-3 block text-sm">Learning Journeys</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-dark mb-4">
            Structured Research Roadmaps
          </h2>
          <p className="text-muted text-lg">
            Don't get lost in isolated articles. Follow our curated paths designed for your specific academic stage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roadmaps.map((roadmap) => (
            <Link key={roadmap.id} href={`/research/path/${roadmap.id}`} className="group block">
              <Card variant="solid" className="p-8 h-full flex flex-col bg-transparent border border-green-dark/5 hover:border-green-dark/20/30 hover: transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-2xl border border-green-dark/5">
                    {roadmap.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-dark/5 text-[10px] font-bold uppercase tracking-widest text-green-dark/70">
                    {roadmap.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-green-dark mb-3 group-hover:text-green-dark/70 transition-colors">
                  {roadmap.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-8 flex-grow">
                  {roadmap.desc}
                </p>
                <div className="mt-auto text-sm font-bold text-green-dark flex items-center group-hover:text-green-dark/70 transition-colors">
                  View Roadmap <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Card>
            </Link>
          ))}
          
          {/* Custom Roadmap CTA */}
          <div className="p-8 rounded-[24px] bg-green-dark text-sage flex flex-col justify-center items-center text-center border border-green-dark-deep relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-dark/10/10 rounded-bl-full pointer-events-none" />
            <h3 className="text-xl font-bold mb-3 font-serif">Need a Custom Path?</h3>
            <p className="text-sm text-sage/70 mb-6 leading-relaxed">
              Speak with a research consultant to design a tailored execution plan for your specific project.
            </p>
            <Link href="/services#consultation" className="px-6 py-3 rounded-full bg-green-dark/10 text-green-dark font-bold text-sm hover:bg-green-dark/10-light transition-colors">
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
