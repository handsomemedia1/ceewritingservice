import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { createClient } from '@/utils/supabase/server';

const apiKey = process.env.GROQ_API_KEY;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API Key is not configured' }, { status: 500 });
    }

    const groq = new Groq({ apiKey });
    const { title, content, focusKeyword, metaDescription } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and Content are required for analysis.' }, { status: 400 });
    }

    const prompt = `
      You are an expert SEO Analyst. Please review the following blog post draft and provide a harsh, accurate SEO score and optimization advice based on modern Google algorithms (Helpful Content Update).
      
      TITLE: ${title}
      FOCUS KEYWORD: ${focusKeyword || 'None provided'}
      META DESCRIPTION: ${metaDescription || 'None provided'}
      
      CONTENT (First 2000 chars):
      ${content.substring(0, 2000)}...
      
      Return ONLY a valid JSON object matching exactly this structure (no markdown formatting, no additional text outide the JSON map):
      {
        "score": <number between 0 and 100>,
        "color": "<red, yellow, or green>",
        "recommendations": [
          "<actionable tip 1>",
          "<actionable tip 2>",
          "<actionable tip 3>"
        ]
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response from Groq");
    }

    const analysis = JSON.parse(responseContent);

    return NextResponse.json(analysis);

  } catch (error: any) {
    console.error("SEO Analysis Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to analyze' }, { status: 500 });
  }
}
