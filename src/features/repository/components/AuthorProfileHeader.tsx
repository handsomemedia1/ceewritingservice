import React from 'react';
import Image from 'next/image';
import { RepositoryAuthor } from '../types';

interface AuthorProfileHeaderProps {
  author: RepositoryAuthor;
}

export default function AuthorProfileHeader({ author }: AuthorProfileHeaderProps) {
  return (
    <div className="bg-green-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden border border-green-dark/20/20 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-dark/10/10 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-white/10 border-4 border-green-dark/20/30 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
          {author.avatar_url ? (
            <Image src={author.avatar_url} alt={author.name} fill className="object-cover" />
          ) : (
            <span className="text-4xl font-serif text-green-dark/70">{author.name.charAt(0)}</span>
          )}
        </div>
        
        {/* Info */}
        <div className="flex-grow">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">{author.name}</h1>
          
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 mb-6 text-sm">
            {author.institution && (
              <span className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <span>🏛️</span> {author.institution}
              </span>
            )}
            
            {author.orcid && (
              <a href={`https://orcid.org/${author.orcid}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-green-dark/20/50 transition-colors">
                <span className="text-[#A6CE39] font-bold">iD</span> {author.orcid}
              </a>
            )}
          </div>
          
          {author.bio && (
            <p className="text-white/70 leading-relaxed max-w-2xl">
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
