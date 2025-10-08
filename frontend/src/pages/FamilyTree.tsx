import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Users, UserPlus, Heart, Baby } from 'lucide-react';
import { motion } from 'framer-motion';

const FamilyTree: React.FC = () => {
  const { data: familyData, isLoading } = useQuery({
    queryKey: ['family-tree'],
    queryFn: async () => {
      const response = await axios.get('/api/family/tree');
      return response.data;
    }
  });

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'SPOUSE':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'CHILD':
        return <Baby className="h-5 w-5 text-blue-500" />;
      case 'FATHER':
      case 'MOTHER':
        return <Users className="h-5 w-5 text-green-500" />;
      default:
        return <Users className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Family Tree
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View your family relationships and certificates
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
          <UserPlus className="h-5 w-5 mr-2" />
          Add Family Member
        </button>
      </motion.div>

      {/* Family Tree */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        {familyData?.familyTree && Object.keys(familyData.familyTree).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(familyData.familyTree).map(([relationship, members]: [string, any]) => (
              <div key={relationship}>
                <div className="flex items-center space-x-2 mb-4">
                  {getRelationshipIcon(relationship)}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                    {relationship.toLowerCase()}
                    {Array.isArray(members) && members.length > 1 ? 's' : ''}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.isArray(members) ? members.map((member: any) => (
                    <div
                      key={member.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </h4>
                          {member.certificate && (
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                member.certificate.status === 'APPROVED' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}>
                                {member.certificate.status}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {member.certificate.type}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )) : [members].map((member: any) => (
                    <div
                      key={member.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </h4>
                          {member.certificate && (
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                member.certificate.status === 'APPROVED' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}>
                                {member.certificate.status}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {member.certificate.type}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No family members found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add family members by creating certificates that include family information.
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Family Member
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FamilyTree;