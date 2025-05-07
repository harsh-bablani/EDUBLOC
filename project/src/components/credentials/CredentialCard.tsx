import React from 'react';
import { Calendar, Shield, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Credential } from '../../types';

interface CredentialCardProps {
  credential: Credential;
  onVerify?: (id: string) => void;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ credential, onVerify }) => {
  const statusColors = {
    verified: 'success',
    pending: 'warning',
    revoked: 'error'
  } as const;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative">
        {credential.imageUrl ? (
          <div 
            className="h-40 bg-cover bg-center"
            style={{ backgroundImage: `url(${credential.imageUrl})` }}
          />
        ) : (
          <div className="h-40 bg-gradient-to-r from-primary-600 to-secondary-600" />
        )}
        <div className="absolute top-2 right-2">
          <Badge 
            variant={statusColors[credential.status]}
            size="md"
            className="capitalize"
          >
            {credential.status}
          </Badge>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-neutral-900">{credential.title}</h3>
        <p className="text-neutral-700 font-medium mb-1">Issued by: {credential.issuer}</p>
        
        <div className="flex items-center mb-3 text-sm text-neutral-600">
          <Calendar size={16} className="mr-1" />
          <span>Issued on {formatDate(credential.issueDate)}</span>
        </div>
        
        <p className="text-neutral-600 text-sm mb-4">{credential.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {credential.skills.map((skill, index) => (
            <Badge key={index} variant="primary" size="sm">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="mt-auto pt-3 flex flex-col space-y-2">
          <div className="flex items-center text-xs text-neutral-500 break-all">
            <Shield size={14} className="mr-1 flex-shrink-0" />
            <span className="truncate" title={credential.verificationHash}>
              {credential.verificationHash}
            </span>
          </div>
          
          <div className="flex space-x-2">
            {credential.status === 'pending' && onVerify && (
              <Button 
                variant="primary" 
                size="sm" 
                fullWidth
                onClick={() => onVerify(credential.id)}
              >
                Verify Now
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              fullWidth
              icon={<ExternalLink size={14} />}
              onClick={() => window.open(`/credential/${credential.id}`, '_blank')}
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CredentialCard;