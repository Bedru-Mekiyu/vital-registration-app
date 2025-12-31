import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  User, 
  Clock, 
  Search,
  ArrowRight,
  Newspaper,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const newsArticles = [
    {
      id: 1,
      title: 'Digital Birth Registration System Launched Nationwide',
      excerpt: 'The new digital platform streamlines birth registration process, reducing wait times from weeks to days across all regions.',
      category: 'Announcements',
      date: '2025-10-05',
      author: 'Ministry of Digital Affairs',
      image: '/placeholder.svg',
      featured: true
    },
    {
      id: 2,
      title: 'New Certificate Verification Features Added',
      excerpt: 'Enhanced QR code verification and blockchain integration now available for all government certificates.',
      category: 'Updates',
      date: '2025-10-03',
      author: 'Technical Team',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 3,
      title: 'Mobile App Now Available for Offline Access',
      excerpt: 'Citizens can now access essential services even without internet connectivity through our new mobile application.',
      category: 'Announcements',
      date: '2025-09-28',
      author: 'Product Team',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 4,
      title: 'System Maintenance Scheduled',
      excerpt: 'Planned maintenance on October 15th from 2 AM to 4 AM EAT. Services will be temporarily unavailable.',
      category: 'Maintenance',
      date: '2025-09-25',
      author: 'Operations Team',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 5,
      title: 'Partnership with Regional Hospitals',
      excerpt: 'Integration with 50+ regional hospitals enables automatic birth registration upon hospital discharge.',
      category: 'Announcements',
      date: '2025-09-20',
      author: 'Partnership Team',
      image: '/placeholder.svg',
      featured: false
    }
  ];

  const categories = ['all', 'Announcements', 'Updates', 'Maintenance', 'Security'];

  const filteredNews = newsArticles
    .filter(article => 
      (category === 'all' || article.category === category) &&
      (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Announcements': return 'bg-primary text-primary-foreground';
      case 'Updates': return 'bg-secondary text-secondary-foreground';
      case 'Maintenance': return 'bg-amber-500 text-amber-50';
      case 'Security': return 'bg-red-500 text-red-50';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Announcements': return <Newspaper className="w-4 h-4" />;
      case 'Updates': return <CheckCircle className="w-4 h-4" />;
      case 'Maintenance': return <AlertCircle className="w-4 h-4" />;
      default: return <Newspaper className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/30 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4" />
            Latest Updates
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            News & Announcements
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed about platform updates, new features, and important announcements
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getCategoryColor(article.category)}>
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(article.category)}
                      {article.category}
                    </span>
                  </Badge>
                  {article.featured && (
                    <Badge variant="outline" className="border-primary text-primary">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {article.excerpt}
                </CardDescription>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full justify-between group-hover:text-primary"
                  onClick={() => window.location.href = `/news/${article.id}`}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
