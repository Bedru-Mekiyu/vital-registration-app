import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Trophy, Star, Target, TrendingUp } from 'lucide-react';

interface Reward {
  id: string;
  points_earned: number;
  badge_type: string;
  description: string;
  earned_at: string;
}

const Rewards = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadRewardsData();
  }, [user]);

  const loadRewardsData = async () => {
    if (!user) return;

    try {
      // Get user profile with points
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setProfile(profileData);
      setTotalPoints(profileData?.points || 0);

      // Get rewards history
      const { data: rewardsData } = await supabase
        .from('gamification_rewards')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      setRewards(rewardsData || []);
    } catch (error) {
      console.error('Error loading rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const badges = [
    { name: 'First Application', icon: Star, color: 'text-yellow-600', required: 1, earned: rewards.length >= 1 },
    { name: 'Active User', icon: TrendingUp, color: 'text-blue-600', required: 5, earned: rewards.length >= 5 },
    { name: 'Certificate Collector', icon: Award, color: 'text-purple-600', required: 10, earned: rewards.length >= 10 },
    { name: 'Master Organizer', icon: Trophy, color: 'text-green-600', required: 20, earned: rewards.length >= 20 },
  ];

  const levelProgress = (totalPoints % 1000) / 10;
  const currentLevel = Math.floor(totalPoints / 1000) + 1;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="font-display text-3xl font-bold text-foreground">
              Rewards & Achievements
            </h1>
          </div>
          <p className="text-muted-foreground">
            Track your progress and earn badges for using our platform
          </p>
        </div>

        {/* Points Card */}
        <Card className="mb-8 shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {totalPoints} Points
                </h2>
                <p className="text-sm text-muted-foreground">
                  Level {currentLevel}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                <Award className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to Level {currentLevel + 1}</span>
                <span className="font-medium">{levelProgress.toFixed(0)}%</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Achievement Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.name}
                    className={`text-center p-6 rounded-lg border-2 ${
                      badge.earned
                        ? 'border-primary bg-primary/5'
                        : 'border-muted bg-muted/20 opacity-50'
                    }`}
                  >
                    <Icon className={`h-12 w-12 mx-auto mb-3 ${badge.color}`} />
                    <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {badge.earned ? 'Earned!' : `Need ${badge.required} achievements`}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Rewards History */}
        <Card>
          <CardHeader>
            <CardTitle>Rewards History</CardTitle>
          </CardHeader>
          <CardContent>
            {rewards.length === 0 ? (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No rewards yet. Complete applications to earn points!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{reward.badge_type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {reward.description || 'Achievement unlocked'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(reward.earned_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-lg font-bold">
                      +{reward.points_earned}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rewards;
