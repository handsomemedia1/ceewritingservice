"use client";
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function SeedArticles() {
  const [status, setStatus] = useState('Idle');
  
  const insertArticles = async () => {
    setStatus('Inserting...');
    const supabase = createClient();
    
    // Get current user id
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      setStatus('Error: Not logged in. Please log in as admin.');
      return;
    }
    
    const authorId = session.user.id;
    const now = new Date().toISOString();
    
    const articles = [
      {
        author_id: authorId,
        title: 'Machine Learning in Social Science Research: A Practical Guide',
        slug: 'machine-learning-social-science-research',
        content: `<p>When you hear "Machine Learning," you probably picture self-driving cars or chatbots. But if you are a PhD researcher in psychology, sociology, or economics, you might be wondering: <em>Does machine learning actually have a place in the social sciences?</em></p><p>The short answer is an absolute <strong>yes</strong>. While traditional statistical inference (like linear regressions and ANOVAs) has been the backbone of social science research for decades, machine learning (ML) is rapidly becoming an essential tool for handling complex, high-dimensional data.</p><img src="https://images.unsplash.com/photo-1518932945647-7a3c969f4144?auto=format&fit=crop&w=1280&q=80" alt="Abstract visualization of a neural network" /><h2>Why Are Social Scientists Turning to Machine Learning?</h2><p>Traditional statistics is built around <strong>inference</strong>—understanding the causal relationship between a few carefully selected variables. Machine learning, on the other hand, is built around <strong>prediction and pattern recognition</strong>. Here is why that matters for your research:</p><h3>1. Handling Messy, Unstructured Data</h3><p>Not all research data comes in neat survey spreadsheets. What if your data consists of 100,000 tweets regarding a political election? Or 50 hours of transcribed interview audio? Traditional statistics struggles here. Using Natural Language Processing (NLP)—a subset of machine learning—you can automatically extract sentiment, topics, and thematic shifts from massive bodies of text.</p><h3>2. Overcoming the Limits of Linear Regression</h3><p>Linear regressions assume that relationships between variables are a straight line. But human behavior rarely follows a straight line. Algorithms like <em>Random Forests</em> or <em>Support Vector Machines (SVM)</em> can detect highly complex, non-linear interactions between variables without you having to manually specify them in your model.</p><h3>3. Better Predictive Accuracy</h3><p>If your research goal is to predict an outcome—for example, predicting which students are most likely to drop out of a university based on their behavioral data—machine learning models will almost always outperform traditional logistic regressions.</p><h2>How to Get Started</h2><p>You don't need a degree in computer science to start using ML. The vast majority of social science ML is done in <strong>Python</strong> or <strong>R</strong>. (If you aren't sure which to use, read our guide on <a href="/blog/spss-vs-r-vs-python-for-phd-research">SPSS vs. R vs. Python</a>).</p><ul><li><strong>For Text Analysis:</strong> Look into Python's Natural Language Toolkit (NLTK) or the \`stm\` (Structural Topic Model) package in R.</li><li><strong>For Classification:</strong> Look into Scikit-learn in Python. It has built-in, easy-to-use functions for Random Forests and Decision Trees.</li></ul><h2>When NOT to Use Machine Learning</h2><p>Machine learning is a powerful tool, but it is not a magic wand. If your primary goal is to prove a specific, causal hypothesis (e.g., "Does intervention A cause outcome B?"), traditional statistics is still the gold standard. ML models are often "black boxes," making it incredibly difficult to explain <em>why</em> a prediction was made—something that your PhD committee will definitely ask you during your defense!</p><p>If you are considering integrating machine learning into your methodology chapter but aren't sure where to start, you are in the right place. Dive into our <a href="/research/machine-learning">Machine Learning Hub</a> for more tutorials, or <a href="/services">consult with our data analysis experts</a> at Cee Writing Hub to design a robust, defensible computational methodology.</p>`,
        status: 'published',
        featured_image: 'https://images.unsplash.com/photo-1518932945647-7a3c969f4144?auto=format&fit=crop&w=1280&q=80',
        meta_title: 'Machine Learning in Social Sciences: A Practical PhD Guide',
        meta_description: 'Discover how PhD researchers in the social sciences are using Machine Learning (ML) and NLP to handle unstructured data, analyze text, and improve predictions.',
        focus_keyword: 'machine learning social science',
        tags: ["Machine Learning", "Data Analysis", "Computational Research"],
        seo_score: 'green',
        created_at: now,
        published_at: now,
        reads: 0
      },
      {
        author_id: authorId,
        title: 'Mathematical Modelling vs. Statistical Analysis: Which Do You Need?',
        slug: 'mathematical-modelling-vs-statistical-analysis',
        content: `<p>When designing a methodology, researchers often throw around the terms "statistical analysis" and "mathematical modelling" as if they are interchangeable. <strong>They are not.</strong></p><p>While both involve numbers, equations, and software, they represent two fundamentally different philosophies of approaching research. Choosing the wrong one can derail your entire PhD thesis. In this guide, we are going to break down the core differences, provide real-world examples, and help you decide which approach is required for your study.</p><img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1280&q=80" alt="Mathematical graphs and data charts overlay" /><h2>The Core Difference: Patterns vs. Mechanisms</h2><p>The easiest way to understand the difference is this:</p><ul><li><strong>Statistical Analysis</strong> looks for <em>patterns in data that already exists</em>.</li><li><strong>Mathematical Modelling</strong> simulates the <em>underlying mechanism</em> of a system to see how it behaves, even if you don't have all the historical data.</li></ul><h2>A Closer Look at Statistical Analysis</h2><p>Statistical analysis is entirely data-driven. You collect a dataset (via surveys, experiments, or historical records), and you apply tests to find correlations, differences, or predictive trends.</p><p><strong>Example:</strong> You want to know if smoking causes lung cancer. You collect data from 10,000 patients—some who smoke and some who do not. You run a logistic regression. The statistics reveal a strong, significant correlation between smoking and lung cancer. </p><p>Statistics told you <em>what</em> happened based on the data, but it doesn't simulate the biological mechanism of <em>how</em> the smoke mutated the lung cells.</p><p><strong>Tools Used:</strong> <a href="/research/data-analysis?software=spss">SPSS</a>, R, Python, Stata.</p><h2>A Closer Look at Mathematical Modelling</h2><p>Mathematical modelling is theory-driven. Instead of just looking at raw data, you write a series of mathematical equations (often differential equations) that describe the "rules" of how a system works. You then run simulations to see what happens when you tweak the rules.</p><p><strong>Example (Epidemiology):</strong> You want to predict how a new virus will spread through a city. You don't have historical data because the virus is new! So, you build a <em>Compartmental Model (SIR Model)</em>. You write equations for how people move from "Susceptible" to "Infected" to "Recovered." You simulate the model in software to predict the peak of the outbreak.</p><p>The model simulated the mechanism of the disease, allowing you to run "what-if" scenarios (e.g., "What if we introduce a lockdown?") without needing prior data on a lockdown for this specific virus.</p><p><strong>Tools Used:</strong> MATLAB, Simulink, specialized Python libraries (SciPy), Systems Dynamics software.</p><h2>Which Should You Use?</h2><h3>Choose Statistical Analysis if:</h3><ul><li>You have a large, existing dataset.</li><li>You want to prove a hypothesis about relationships between variables (e.g., <a href="/blog/how-to-choose-the-right-statistical-test">running an ANOVA or Regression</a>).</li><li>Your research is in psychology, business, sociology, or clinical trials.</li></ul><h3>Choose Mathematical Modelling if:</h3><ul><li>You are researching a dynamic system that changes over time.</li><li>You need to run simulations or "what-if" scenarios where real-world experiments are impossible or unethical.</li><li>Your research is in epidemiology, physics, engineering, or complex financial forecasting.</li></ul><h2>Bridging the Gap</h2><p>In many advanced PhD theses, these two fields merge. You might build a mathematical model to simulate a system, and then use statistical analysis to compare your simulation's output against real-world data to see how accurate your model is.</p><p>If you are stepping into the world of simulations, differential equations, and system dynamics, explore our new <a href="/research/mathematical-modelling">Mathematical Modelling Hub</a>. If you need hands-on help formulating your equations or writing your MATLAB scripts, our consultants at Cee Writing Hub are ready to assist.</p>`,
        status: 'published',
        featured_image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1280&q=80',
        meta_title: 'Mathematical Modelling vs Statistical Analysis: Core Differences',
        meta_description: 'Confused between statistical analysis and mathematical modelling? Learn the difference between data-driven statistics and theory-driven system simulations.',
        focus_keyword: 'mathematical modelling vs statistical analysis',
        tags: ["Mathematical Modelling", "Research Methodology", "Data Analysis"],
        seo_score: 'green',
        created_at: now,
        published_at: now,
        reads: 0
      },
      {
        author_id: authorId,
        title: 'Defending Your Methodology: How to Justify Your Research Design',
        slug: 'how-to-defend-research-methodology-chapter',
        content: `<p>The methodology chapter is the engine of your thesis. It is also the first place examiners look when they want to tear your research apart during a defense. A common mistake graduate students make is simply <em>describing</em> what they did (e.g., "I used a survey and ran a regression").</p><p>At the PhD and Master's level, describing is not enough. You must <strong>justify</strong> your choices. Every decision you made—from your overarching philosophy to your sampling technique—must be defended against the alternatives you didn't choose.</p><img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1280&q=80" alt="Student presenting research to a panel" /><h2>1. The Philosophical Foundation (Ontology & Epistemology)</h2><p>Before you even talk about surveys or interviews, you need to establish your research philosophy. Are you a positivist or an interpretivist?</p><ul><li><strong>Positivism (Usually Quantitative):</strong> You believe there is a single, objective reality that can be measured with numbers and statistics. You justify this by arguing that your research requires highly generalizable, unbiased facts (e.g., measuring the economic impact of a policy).</li><li><strong>Interpretivism (Usually Qualitative):</strong> You believe reality is subjective and constructed by human experiences. You justify this by arguing that your research aims to understand deep, nuanced human behavior that numbers cannot capture (e.g., exploring the emotional toll of a policy on a community).</li></ul><p>By establishing this early, you protect yourself from examiners who might say, "Why didn't you just use a survey?" Your answer is grounded in your philosophy: "Because my interpretivist stance requires understanding the <em>how</em> and <em>why</em>, not just the <em>how many</em>."</p><h2>2. Justifying the Approach: Qualitative vs. Quantitative vs. Mixed</h2><p>Once your philosophy is set, you must justify your overarching approach.</p><ul><li><strong>Quantitative Justification:</strong> Defend it by emphasizing the need for statistical power, generalizability, and the testing of clear hypotheses. (If you took this route, make sure you know <a href="/blog/how-to-choose-the-right-statistical-test">how to choose your statistical tests</a>).</li><li><strong>Qualitative Justification:</strong> Defend it by highlighting the exploratory nature of your study. You are generating new theories, not testing old ones.</li><li><strong>Mixed Methods Justification:</strong> This is powerful but requires double the justification. You must explain <em>how</em> the qualitative data explains the quantitative data, or vice versa (e.g., "The survey provided the trends, while the interviews explained the reasons behind the trends").</li></ul><h2>3. Defending the Data Collection and Sampling</h2><p>Why did you choose your specific sample? Why did you interview 20 people instead of 200?</p><ul><li><strong>For Quantitative:</strong> You must justify your sample size using power analysis (e.g., G*Power). You defend your method by proving your sample is large enough to avoid statistical errors.</li><li><strong>For Qualitative:</strong> You defend your sample size using the concept of <strong>Data Saturation</strong>. You argue that you stopped at 20 interviews because the 20th interview yielded no new themes; therefore, more interviews were unnecessary.</li></ul><h2>4. Acknowledging Limitations</h2><p>The strongest defense is a proactive one. Do not try to hide the flaws in your methodology. No research design is perfect. If you used a convenience sample instead of a random sample, admit it. Explain <em>why</em> it was necessary (e.g., budget, access to vulnerable populations), explain how it limits your findings, and discuss how future research could improve upon it.</p><p>By acknowledging your limitations before the examiner points them out, you demonstrate academic maturity and critical thinking.</p><h2>Final Thoughts</h2><p>Your methodology chapter is an argument, not a diary. If you are struggling to structure your justification, or if you feel like your methodology has holes that an examiner might exploit, <a href="/services">reach out to us at Cee Writing Hub</a>. Our PhD-level consultants specialize in auditing methodology chapters, ensuring your design is bulletproof and your defense is flawless.</p>`,
        status: 'published',
        featured_image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1280&q=80',
        meta_title: 'Defending Your Methodology: Justifying Your Research Design',
        meta_description: 'Learn how to defend your methodology chapter. Master the art of justifying your research philosophy, quantitative vs qualitative choices, and sampling methods.',
        focus_keyword: 'defend methodology chapter',
        tags: ["Research Methodology", "PhD Guide", "Academic Writing"],
        seo_score: 'green',
        created_at: now,
        published_at: now,
        reads: 0
      }
    ];

    const { data, error } = await supabase.from('blog_posts').upsert(articles, { onConflict: 'slug' }).select();
    
    if (error) {
      setStatus(`Error: ${error.message}`);
    } else {
      setStatus(`Success! Inserted ${data.length} articles.`);
    }
  };

  return (
    <div style={{ padding: '100px', backgroundColor: '#0A0A0A', minHeight: '100vh', color: '#FFF' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'monospace' }}>Seed Advanced Research Articles</h1>
      <p style={{ marginBottom: '20px', color: '#888', maxWidth: '600px', lineHeight: 1.6 }}>
        Click the button below to inject the 3 new Computational & Advanced Research articles into the live Supabase database.
        This uses your active admin session to bypass Row-Level Security. Once clicked, wait for the success message.
      </p>
      <button 
        onClick={insertArticles}
        style={{
          padding: '12px 24px',
          backgroundColor: '#C5A059',
          color: '#0A0A0A',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        Inject New Cluster
      </button>
      <p style={{ marginTop: '20px', fontFamily: 'monospace', color: '#C5A059' }}>Status: <strong>{status}</strong></p>
    </div>
  );
}
