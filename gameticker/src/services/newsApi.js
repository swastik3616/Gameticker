// Using NewsAPI.org - free tier for sports news
// const API_KEY = 'YOUR_NEWS_API_KEY'; // You'll need to get a free key from newsapi.org
// const BASE_URL = 'https://newsapi.org/v2';

export const getSportsNews = async () => {
  try {
    // For now, using a mock API response since we need an API key
    // You can replace this with real API call when you get a key
    
    console.log('Fetching sports news...');
    
    // Mock sports news data
    const mockNews = [
      {
        title: 'Cricket: India vs Australia Test Series Announced',
        description: 'The highly anticipated test series between India and Australia has been officially announced for next month.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/300x200/1e222a/ffffff?text=Cricket+News',
        publishedAt: new Date().toISOString(),
        source: { name: 'Sports Central' },
        category: 'Cricket'
      },
      {
        title: 'Football Transfer Window: Major Signings Expected',
        description: 'Several top clubs are expected to make significant signings during the upcoming transfer window.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/300x200/1e222a/ffffff?text=Football+News',
        publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        source: { name: 'Football Daily' },
        category: 'Football'
      },
      {
        title: 'Basketball: NBA Playoffs Heating Up',
        description: 'The NBA playoffs are reaching their climax with several teams vying for the championship.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/300x200/1e222a/ffffff?text=Basketball+News',
        publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        source: { name: 'Basketball Times' },
        category: 'Basketball'
      },
      {
        title: 'Tennis: Grand Slam Tournament Schedule Released',
        description: 'The complete schedule for the upcoming tennis grand slam tournaments has been announced.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/300x200/1e222a/ffffff?text=Tennis+News',
        publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
        source: { name: 'Tennis World' },
        category: 'Tennis'
      },
      {
        title: 'Olympics: Preparations for Next Games Underway',
        description: 'Host city preparations for the next Olympic Games are progressing well with new venues being completed.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/300x200/1e222a/ffffff?text=Olympics+News',
        publishedAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
        source: { name: 'Olympic News' },
        category: 'Olympics'
      },
      {
        title: 'Formula 1: Championship Race Intensifies',
        description: 'The Formula 1 championship race is heating up with multiple drivers in contention for the title.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/300x200/1e222a/ffffff?text=F1+News',
        publishedAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
        source: { name: 'F1 Racing' },
        category: 'Formula 1'
      }
    ];

    console.log('Sports news fetched:', mockNews);
    return mockNews;
    
    // Uncomment this when you get a NewsAPI key
    /*
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: 'sports',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
        apiKey: API_KEY
      }
    });
    
    console.log('News API Response:', response.data);
    return response.data.articles || [];
    */
    
  } catch (error) {
    console.error('News API Error:', error);
    return [];
  }
};

export const getNewsByCategory = async (category) => {
  try {
    console.log(`Fetching ${category} news...`);
    
    // Mock category-specific news
    const categoryNews = {
      'cricket': [
        {
          title: `${category.charAt(0).toUpperCase() + category.slice(1)}: Latest Updates`,
          description: `Stay updated with the latest ${category} news and developments.`,
          url: '#',
          urlToImage: `https://via.placeholder.com/300x200/1e222a/ffffff?text=${category.charAt(0).toUpperCase() + category.slice(1)}`,
          publishedAt: new Date().toISOString(),
          source: { name: `${category.charAt(0).toUpperCase() + category.slice(1)} Central` },
          category: category.charAt(0).toUpperCase() + category.slice(1)
        }
      ]
    };
    
    return categoryNews[category] || [];
    
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    return [];
  }
}; 