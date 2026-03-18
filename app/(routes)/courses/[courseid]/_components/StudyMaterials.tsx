'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { BookOpenIcon, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type StudyMaterialsProps = {
    courseTitle?: string | undefined;
    /** When provided, used as the primary search term for more targeted results (e.g. exercise name) */
    searchTopic?: string | undefined;
};

export default function StudyMaterials({ courseTitle, searchTopic }: StudyMaterialsProps) {
    const [materials, setMaterials] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // Prefer specific topic (e.g. "Arrow Functions") over broad course title for better relevance
    const searchQuery = searchTopic?.trim() || courseTitle?.trim();

    const fetchMaterials = async () => {
        if (!searchQuery) return;
        setLoading(true);
        setSearched(false);   // reset so we can retry cleanly
        setMaterials([]);
        try {
            const response = await axios.get('/api/search-materials?q=' + encodeURIComponent(searchQuery));
            // Filter out any items missing a valid http link
            const valid = (response.data || []).filter(
                (m: any) => m?.link?.startsWith('http') && m?.title
            );
            setMaterials(valid);
        } catch (error: any) {
            console.error('Error fetching study materials:', error);
        } finally {
            setSearched(true);
            setLoading(false);
        }
    };

    const getSourceColor = (source?: string) => {
        if (source === 'MDN Web Docs') return 'bg-orange-900/60 text-orange-300 border-orange-700';
        if (source === 'W3Schools') return 'bg-blue-900/60 text-blue-300 border-blue-700';
        if (source === 'Wikipedia') return 'bg-purple-900/60 text-purple-300 border-purple-700';
        return 'bg-zinc-700 text-zinc-300 border-zinc-600';
    };

    return (
        <div className='bg-zinc-900 border-2 border-zinc-800 rounded-xl p-5 mt-5'>
            <h2 className='font-game text-3xl mb-3 flex items-center gap-2 text-white'>
                <BookOpenIcon className='text-primary w-5 h-5' /> Study Materials
            </h2>
            <p className='text-zinc-400 font-game text-xl mb-4 leading-relaxed'>
                Find curated tutorials from MDN, W3Schools, and Wikipedia for {searchQuery || 'this topic'}.
            </p>

            {(!searched || materials.length === 0) && !loading ? (
                <Button
                    variant='pixel'
                    onClick={fetchMaterials}
                    disabled={loading || !searchQuery}
                    className='w-full font-game p-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50'
                >
                    <BookOpenIcon className='w-5 h-5' />
                    {searched && materials.length === 0 ? 'Retry' : 'Get Materials'}
                </Button>
            ) : loading ? (
                <Button variant='pixel' disabled className='w-full font-game p-3 rounded-xl flex items-center justify-center gap-2 opacity-50'>
                    <Loader2 className="animate-spin w-5 h-5" /> Searching for articles...
                </Button>
            ) : null}

            {searched && materials.length > 0 && (
                <>
                    <div className='flex flex-col gap-3 mt-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar'>
                        {materials.map((m, idx) => (
                            <a
                                key={idx}
                                href={m.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='group block p-4 bg-zinc-800 hover:bg-zinc-700/80 rounded-lg transition-all border border-zinc-700 hover:border-zinc-500'
                            >
                                <div className='flex items-start justify-between gap-3'>
                                    <div className='flex-1 min-w-0'>
                                        <h3 className='font-game text-2xl text-yellow-400 mb-1 line-clamp-2 group-hover:text-yellow-300 transition-colors'>
                                            {m.title}
                                        </h3>
                                        {m.snippet && (
                                            <p className='text-xl font-game text-zinc-300 leading-relaxed line-clamp-2'>{m.snippet}</p>
                                        )}
                                        <div className='mt-2 flex items-center gap-2'>
                                            {m.source && (
                                                <span className={`text-md font-game px-2 py-0.5 rounded border ${getSourceColor(m.source)}`}>
                                                    {m.source}
                                                </span>
                                            )}
                                            <span className='text-md text-zinc-500 font-game truncate'>{m.link}</span>
                                        </div>
                                    </div>
                                    <ExternalLink className='w-4 h-4 text-zinc-500 group-hover:text-yellow-400 transition-colors flex-shrink-0 mt-1' />
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Refresh button below results */}
                    <Button
                        variant='pixel'
                        onClick={fetchMaterials}
                        disabled={loading}
                        className='w-full font-game p-2 mt-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm opacity-70 hover:opacity-100'
                    >
                        <RefreshCw className='w-4 h-4' /> Search Again
                    </Button>
                </>
            )}

            {
                searched && materials.length === 0 && !loading && (
                    <p className='text-zinc-500 font-game text-sm text-center py-4 mt-2'>No materials found. Try again.</p>
                )
            }
        </div >
    );
}