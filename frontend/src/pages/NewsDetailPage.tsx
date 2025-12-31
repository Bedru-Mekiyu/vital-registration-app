import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock article data - in production, fetch from API/database
  const article = {
    id: id,
    title: 'Digital Birth Registration System Launched Nationwide',
    content: `
      <p>The Ethiopian government has officially launched a comprehensive digital birth registration system that will revolutionize how citizens register vital life events across the country.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Instant digital certificate generation</li>
        <li>Blockchain verification for security</li>
        <li>Multi-language support in all major Ethiopian languages</li>
        <li>Mobile-first design for accessibility</li>
      </ul>
      
      <h2>Impact on Citizens</h2>
      <p>This new system reduces the average registration time from several weeks to just 2-3 days. Citizens can now apply from the comfort of their homes using any internet-connected device.</p>
      
      <h2>Regional Rollout</h2>
      <p>The system is being rolled out across all regions, with special emphasis on rural areas where traditional registration has been challenging. Mobile registration units will visit remote communities to assist with the transition.</p>
      
      <h2>Training and Support</h2>
      <p>Comprehensive training programs are being conducted for government staff, and multilingual support teams are available 24/7 to assist citizens with the new system.</p>
      
      <p>For more information or to start your registration process, visit our services page or contact our support team.</p>
    `,
    category: 'Announcements',
    date: '2025-10-05',
    author: 'Ministry of Digital Affairs',
    featured: true
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: 'Check out this important announcement',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Article link copied to clipboard"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/30 py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/news')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Button>

        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <Badge className="mb-4">{article.category}</Badge>
                {article.featured && (
                  <Badge variant="outline" className="ml-2 border-primary text-primary">
                    Featured
                  </Badge>
                )}
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                  {article.title}
                </h1>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={shareArticle}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </div>

              <div 
                className="prose prose-slate dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className="pt-6 border-t">
                <div className="flex gap-4">
                  <Button onClick={() => navigate('/services')}>
                    Apply for Service
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/contact')}>
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsDetailPage;
