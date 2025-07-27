
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from "../components/ui/button";
import { Badge } from '@/components/ui/badge';
import { StarIcon, PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';

interface WeddingCardProps {
  Wedding: {
    id: string;
    name: string;
    category: string;
    image: string;
    rating: number;
    contact: {
      phone?: string;
      email?: string;
      address?: string;
    };
    price?: string;
    status?: 'contacted' | 'quote' | 'booked' | 'paid';
  };
  className?: string;
}

const WeddingCard: React.FC<WeddingCardProps> = ({ Wedding, className }) => {
  const statusColors = {
    contacted: "bg-blue-100 text-blue-800",
    quote: "bg-yellow-100 text-yellow-800",
    booked: "bg-purple-100 text-purple-800",
    paid: "bg-green-100 text-green-800"
  };

  return (
    <div className={cn("glass-card rounded-xl overflow-hidden animate-fade-in", className)}>
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={Wedding.image} 
          alt={Wedding.name}
          className="w-full h-full object-cover transition-all hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="font-medium">
            {Wedding.category}
          </Badge>
        </div>
        {Wedding.status && (
          <div className="absolute top-2 right-2">
            <Badge className={cn("font-medium", statusColors[Wedding.status])}>
              {Wedding.status.charAt(0).toUpperCase() + Wedding.status.slice(1)}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{Wedding.name}</h3>
          <div className="flex items-center space-x-1">
            <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{Wedding.rating}</span>
          </div>
        </div>
        
        {Wedding.price && (
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{Wedding.price}</span>
          </div>
        )}
        
        <div className="mt-3 space-y-2">
          {Wedding.contact.phone && (
            <div className="flex items-center text-sm text-muted-foreground">
              <PhoneIcon className="h-3 w-3 mr-2" />
              <span>{Wedding.contact.phone}</span>
            </div>
          )}
          {Wedding.contact.email && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MailIcon className="h-3 w-3 mr-2" />
              <span>{Wedding.contact.email}</span>
            </div>
          )}
          {Wedding.contact.address && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPinIcon className="h-3 w-3 mr-2" />
              <span>{Wedding.contact.address}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Button size="sm" variant="secondary" className="flex-1">Details</Button>
          <Button size="sm" className="flex-1">Contact</Button>
        </div>
      </div>
    </div>
  );
};

export default WeddingCard;
