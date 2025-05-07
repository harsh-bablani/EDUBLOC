import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCredentialStore } from '../../store/credentialStore';
import CredentialCard from '../../components/credentials/CredentialCard';
import Button from '../../components/ui/Button';

const CredentialsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { credentials, fetchUserCredentials, verifyCredential, isLoading } = useCredentialStore();
  
  useEffect(() => {
    if (user) {
      fetchUserCredentials(user.id);
    }
  }, [user, fetchUserCredentials]);
  
  const handleVerify = (id: string) => {
    verifyCredential(id);
  };
  
  // Group credentials by status
  const verifiedCredentials = credentials.filter(cred => cred.status === 'verified');
  const pendingCredentials = credentials.filter(cred => cred.status === 'pending');
  const revokedCredentials = credentials.filter(cred => cred.status === 'revoked');
  
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Your Credentials
              </h1>
              <p className="text-neutral-600">
                Manage and share your blockchain-verified achievements
              </p>
            </div>
            
            <Button 
              variant="primary"
              icon={<PlusCircle size={18} />}
              onClick={() => {/* Would open a credential import modal */}}
            >
              Import Credential
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              {/* Verified Credentials */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
                  Verified Credentials ({verifiedCredentials.length})
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {verifiedCredentials.length > 0 ? (
                    verifiedCredentials.map(credential => (
                      <CredentialCard key={credential.id} credential={credential} />
                    ))
                  ) : (
                    <div className="col-span-3 p-8 bg-white rounded-lg shadow-card text-center">
                      <p className="text-neutral-600">You don't have any verified credentials yet.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Pending Credentials */}
              {pendingCredentials.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
                    Pending Verification ({pendingCredentials.length})
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingCredentials.map(credential => (
                      <CredentialCard 
                        key={credential.id} 
                        credential={credential}
                        onVerify={handleVerify}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Revoked Credentials */}
              {revokedCredentials.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
                    Revoked Credentials ({revokedCredentials.length})
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {revokedCredentials.map(credential => (
                      <CredentialCard key={credential.id} credential={credential} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CredentialsPage;