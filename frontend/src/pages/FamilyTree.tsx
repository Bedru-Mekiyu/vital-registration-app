import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, Baby, Link as LinkIcon } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  certificate_type?: string;
}

const FamilyTree = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  useEffect(() => {
    loadFamilyData();
  }, [user]);

  const loadFamilyData = async () => {
    if (!user) return;

    try {
      // Get family relationships
      const { data: relationships } = await supabase
        .from('family_relationships')
        .select('*')
        .or(`person_id.eq.${user.id},related_person_id.eq.${user.id}`);

      // Get certificates to extract family info
      const { data: certificates } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id);

      const members: FamilyMember[] = [];

      // Parse relationships
      if (relationships) {
        for (const rel of relationships) {
          members.push({
            id: rel.id,
            name: 'Family Member',
            relationship: rel.relationship_type,
          });
        }
      }

      // Parse certificates for family data
      if (certificates) {
        for (const cert of certificates) {
          if (cert.certificate_type === 'birth' && cert.certificate_data) {
            const data = cert.certificate_data as any;
            if (typeof data === 'object' && data.father_name) {
              members.push({
                id: `father-${cert.id}`,
                name: data.father_name,
                relationship: 'Father',
                certificate_type: 'birth'
              });
            }
            if (typeof data === 'object' && data.mother_name) {
              members.push({
                id: `mother-${cert.id}`,
                name: data.mother_name,
                relationship: 'Mother',
                certificate_type: 'birth'
              });
            }
          } else if (cert.certificate_type === 'marriage' && cert.certificate_data) {
            const data = cert.certificate_data as any;
            if (typeof data === 'object' && data.spouse_name) {
              members.push({
                id: `spouse-${cert.id}`,
                name: data.spouse_name,
                relationship: 'Spouse',
                certificate_type: 'marriage'
              });
            }
          }
        }
      }

      setFamilyMembers(members);
    } catch (error) {
      console.error('Error loading family data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case 'spouse':
        return <Heart className="h-4 w-4 text-pink-600" />;
      case 'parent':
      case 'father':
      case 'mother':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'child':
        return <Baby className="h-4 w-4 text-green-600" />;
      default:
        return <LinkIcon className="h-4 w-4 text-gray-600" />;
    }
  };

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
            <Users className="h-8 w-8 text-primary" />
            <h1 className="font-display text-3xl font-bold text-foreground">
              Family Tree
            </h1>
          </div>
          <p className="text-muted-foreground">
            Visualize your family relationships based on registered certificates
          </p>
        </div>

        {familyMembers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Family Members Found</h3>
              <p className="text-muted-foreground">
                Family relationships will appear here as you register certificates
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    {getRelationshipIcon(member.relationship)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {member.relationship}
                      </Badge>
                      {member.certificate_type && (
                        <Badge variant="outline">
                          {member.certificate_type}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="mt-8 bg-muted/50">
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Note:</strong> Family tree is automatically generated from your registered certificates and manual relationships.
              Apply for birth, marriage, or adoption certificates to expand your family tree.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyTree;
