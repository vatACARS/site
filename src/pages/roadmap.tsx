import { useState, useEffect } from 'react';
import { CircleDot, ExternalLink, AlertCircle, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';

const RoadmapPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRepos, setExpandedRepos] = useState(['site', 'gateway', 'plugin']);

  useEffect(() => {
    fetchProjectItems();
  }, []);

  const fetchProjectItems = async () => {
    try {
      const response = await fetch('/api/roadmap');
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setItems(data.items);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const getStatusStyle = (status) => {
    const styles = {
      'To Do': {
        dot: 'bg-zinc-500',
        badge: 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20',
        border: 'border-zinc-500/20'
      },
      'In Progress': {
        dot: 'bg-yellow-500',
        badge: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
        border: 'border-yellow-500/20'
      },
      'Testing': {
        dot: 'bg-purple-500',
        badge: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
        border: 'border-purple-500/20'
      },
      'Ready': {
        dot: 'bg-blue-500',
        badge: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        border: 'border-blue-500/20'
      },
      'Done': {
        dot: 'bg-green-500',
        badge: 'bg-green-500/10 text-green-400 border border-green-500/20',
        border: 'border-green-500/20'
      }
    };
    return styles[status] || styles['To Do'];
  };

  const toggleRepo = (repo) => {
    setExpandedRepos(prev => 
      prev.includes(repo) 
        ? prev.filter(r => r !== repo)
        : [...prev, repo]
    );
  };

  const getRepoFromUrl = (url) => {
    const match = url.match(/github\.com\/vatACARS\/([^/]+)/);
    return match ? match[1].toLowerCase() : 'other';
  };

  const groupItemsByRepo = () => {
    const groups = {
      site: [],
      gateway: [],
      plugin: [],
      other: []
    };

    items.forEach(item => {
      const repo = getRepoFromUrl(item.url);
      if (groups[repo]) {
        groups[repo].push(item);
      } else {
        groups.other.push(item);
      }
    });

    return Object.fromEntries(
      Object.entries(groups).filter(([_, items]) => items.length > 0)
    );
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-semibold text-white">Failed to load roadmap</h2>
        <p className="text-zinc-400">{error}</p>
      </div>
    );
  }

  const repoGroups = groupItemsByRepo();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">Project Roadmaps</h1>
        <p className="text-lg text-zinc-400">Follow our journey as we build and improve vatACARS!</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(repoGroups).map(([repo, repoItems]) => (
            <div key={repo} className="space-y-4 group">
              <button
                onClick={() => toggleRepo(repo)}
                className="w-full flex items-center justify-between p-5 bg-zinc-900/30 rounded-xl border border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-200 group-hover:shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-white capitalize flex items-center gap-3">
                  {repo}
                  <span className="text-sm text-zinc-500 font-normal px-2 py-0.5 rounded-md bg-zinc-800/50">
                    {repoItems.length} {repoItems.length === 1 ? 'item' : 'items'}
                  </span>
                </h2>
                <ChevronDown className={`w-6 h-6 text-zinc-400 transform transition-transform duration-300 ${
                  expandedRepos.includes(repo) ? 'rotate-180' : ''
                } group-hover:text-zinc-300`} />
              </button>

              {expandedRepos.includes(repo) && (
                <div className="space-y-8 ml-6">
                  {repoItems.map((item, index) => {
                    const styles = getStatusStyle(item.status);
                    return (
                      <div key={item.id} className="relative group">
                        <div className="flex items-start gap-6">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full ${styles.dot} flex items-center justify-center shadow-lg ring-4 ring-zinc-950 group-hover:scale-110 transition-transform duration-200`}>
                              <CircleDot className="w-5 h-5 text-white" />
                            </div>
                            {index !== repoItems.length - 1 && (
                              <div className="w-0.5 h-24 bg-zinc-800/50 group-hover:bg-zinc-700/50 transition-colors duration-200" />
                            )}
                          </div>
                          <div className={`flex-1 bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border ${styles.border} hover:border-opacity-40 transition-all duration-300 group-hover:shadow-xl group-hover:translate-x-1`}>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200">{item.title}</h3>
                                <p className="text-zinc-400 whitespace-pre-line leading-relaxed">{item.description}</p>
                              </div>
                              <div className="flex flex-col items-end gap-4">
                                <div className={`px-4 py-2 rounded-full text-sm font-medium ${styles.badge} transition-all duration-200 group-hover:scale-105`}>
                                  {item.status}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="hover:bg-zinc-800 transition-colors duration-200"
                                  asChild
                                >
                                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 group-hover:text-blue-400" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;