'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function RemediateArticles() {
  const supabase = createClient();
  const [status, setStatus] = useState<string>('Ready');

  const applyRemediation = async () => {
    setStatus('Fetching payload...');
    
    try {
      const res = await fetch('/remediation_payload.json');
      if (!res.ok) throw new Error('Failed to load payload');
      
      const payload = await res.json();
      setStatus(`Loaded ${payload.length} items. Updating Supabase...`);
      
      let successCount = 0;
      for (const item of payload) {
        const updateData: any = { content: item.content };
        if (item.featured_image) updateData.featured_image = item.featured_image;

        const { error } = await supabase
          .from('blog_posts')
          .update(updateData)
          .eq('slug', item.slug);
          
        if (error) {
          console.error(error);
        } else {
          successCount++;
        }
      }
      
      setStatus(`Success! Remediated ${successCount}/${payload.length} articles.`);
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '100px', backgroundColor: '#0A0A0A', minHeight: '100vh', color: '#FFF' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'monospace' }}>Targeted Production Remediation</h1>
      <p style={{ marginBottom: '20px', color: '#888', maxWidth: '600px', lineHeight: 1.6 }}>
        Click the button below to apply targeted database updates (fixing broken images and injecting the CeeWriting conversion layer) to the existing 23 articles.
        This uses your active admin session and does NOT duplicate or re-inject articles. It surgically updates the existing rows.
      </p>
      <button 
        onClick={applyRemediation}
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
        Apply Targeted Remediation
      </button>
      <p style={{ marginTop: '20px', fontFamily: 'monospace', color: '#C5A059' }}>Status: <strong>{status}</strong></p>
    </div>
  );
}
