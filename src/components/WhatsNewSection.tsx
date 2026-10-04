import React from 'react';
import { Film } from '../types';
import { Newspaper, Calendar, Sparkles, Award, ArrowUpRight, Film as FilmIcon, ShieldCheck } from 'lucide-react';

interface WhatsNewSectionProps {
  onSelectFilmById: (filmId: string) => void;
  onOpenCreatorPortal: () => void;
}

export const WhatsNewSection: React.FC<WhatsNewSectionProps> = ({
  onSelectFilmById,
  onOpenCreatorPortal,
}) => {
  const newsArticles = [
    {
      id: 'news-1',
      date: 'FEBRUARY 2025',
      category: 'THEATRICAL RELEASE',
      title: 'Paddington In Peru Debuts Worldwide to Record Box Office Opening',
      description: 'Stage Films and StudioCanal announce the expansive North American and international theatrical run for Dougal Wilson\'s acclaimed third installment.',
      filmId: 'paddington-in-peru',
      badge: 'Box Office Hit',
      imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'news-2',
      date: 'JANUARY 2025',
      category: 'ACQUISITIONS UPDATE',
      title: 'Stage Films Greenlights Deep-Sea Horror "Obsidian Drift" from Sundance Midnight',
      description: 'Elena Rostova\'s high-tension underwater creature feature secured by Hulu Production. New York following standing-room-only festival screenings.',
      filmId: 'creator-film-obsidian-drift',
      badge: 'Sundance Acquisition',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'news-3',
      date: 'DECEMBER 2024',
      category: 'HOME ENTERTAINMENT',
      title: 'Collector\'s 4K Ultra HD Editions: The Definitive Stage Films Thriller & Sci-Fi Wave',
      description: 'New 4K UHD Dolby Atmos steelbooks for Duncan Jones\' Moon, Fede Álvarez\'s Don\'t Breathe, and Jalmari Helander\'s Sisu now available.',
      filmId: 'sisu',
      badge: '4K Steelbooks',
      imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-red-500 text-xs font-mono-tech uppercase tracking-widest mb-1.5">
            <Newspaper className="w-4 h-4" />
            <span>Studio Bulletins & Press</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinematic font-black text-white">
            What's New at Stage Films
          </h2>
          <p className="text-sm text-white/60 mt-1 max-w-xl">
            Latest announcements, festival world premieres, box office milestones, and acquisitions from Hulu Production. New York.
          </p>
        </div>

        <button
          onClick={onOpenCreatorPortal}
          className="flex items-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(229,9,20,0.35)] transition-all cursor-pointer transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          <span>Pitch Your Film Project</span>
        </button>
      </div>

      {/* Featured News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {newsArticles.map((article) => (
          <div
            key={article.id}
            className="group bg-[#0e0e12] border border-white/10 hover:border-red-600/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,9,20,0.2)]"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-[0_0_10px_rgba(229,9,20,0.5)]">
                  {article.badge}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-xs text-white/40 font-mono-tech">
                  <Calendar className="w-3.5 h-3.5 text-white/50" />
                  <span>{article.date}</span>
                  <span>•</span>
                  <span className="text-red-400 font-bold">{article.category}</span>
                </div>

                <h3 className="text-lg font-cinematic font-bold text-white group-hover:text-red-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onSelectFilmById(article.filmId)}
                className="w-full py-2.5 bg-white/[0.05] hover:bg-white/10 border border-white/10 hover:border-red-600/30 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Related Title</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Creator Pipeline Callout Banner */}
      <div className="bg-[radial-gradient(ellipse_at_top,_#260808_0%,_#0e0e12_65%)] border border-red-600/30 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_35px_rgba(229,9,20,0.2)]">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-widest font-mono-tech">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>Hulu Production. New York Call for Entries</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-cinematic font-black text-white">
            Are You an Independent Filmmaker or Producer?
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            Registered film creators can upload lookbooks, screener links with passcode security, and technical specs directly to our Stage Films creative executive pipeline.
          </p>
        </div>

        <button
          onClick={onOpenCreatorPortal}
          className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(229,9,20,0.45)] flex-shrink-0 transition-all transform hover:scale-105 cursor-pointer"
        >
          Open Creator Dashboard
        </button>
      </div>
    </div>
  );
};
