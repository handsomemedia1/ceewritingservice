import React from 'react';
import Link from 'next/link';

export default function GoalSelection() {
  const goals = [
    {
      title: "I need a scholarship",
      description: "Assess your profile, find global opportunities, and craft winning essays.",
      icon: "🎓",
      href: "/scholarship-check"
    },
    {
      title: "I need data analyzed",
      description: "Quantitative and qualitative analysis using SPSS, R, Python, and more.",
      icon: "📊",
      href: "/services"
    },
    {
      title: "I need research consulting",
      description: "End-to-end guidance for your thesis, dissertation, or academic paper.",
      icon: "📚",
      href: "/services"
    },
    {
      title: "I need professional writing",
      description: "CVs, SOPs, and business proposals crafted to international standards.",
      icon: "✍️",
      href: "/services"
    }
  ];

  return (
    <section className="py-24 bg-[var(--white)] relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--green-dark)] mb-4 font-['Space_Grotesk']">
            What brings you here today?
          </h2>
          <p className="text-muted text-lg">
            Select your primary goal and we will guide you to the right resources, tools, and experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal, idx) => (
            <Link key={idx} href={goal.href} className="group block h-full border-t border-[var(--sage)] pt-8 transition-colors hover:border-[var(--green-dark)]">
              <div className="h-full flex flex-col">
                <div className="text-4xl mb-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                  {goal.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--green-dark)] mb-3 font-['Space_Grotesk']">
                  {goal.title}
                </h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed flex-grow font-['Inter']">
                  {goal.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-semibold text-[var(--green-dark)] opacity-50 group-hover:opacity-100 transition-opacity">
                  Get Started <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
