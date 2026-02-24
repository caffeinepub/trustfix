import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-gray-200 hover:border-trustfix-green transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.dataset.fallback) {
              target.dataset.fallback = '1';
              target.src = '/assets/generated/pest-control-tech.dim_800x600.png';
            }
          }}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-4 left-4 bg-trustfix-green text-white text-xs">
          {service.category}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
        <p className="text-xl font-bold text-trustfix-orange mt-3">
          Starting at ₹{service.price}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <Link to="/booking" search={{ service: service.name }} className="w-full">
          <Button className="w-full bg-trustfix-green hover:bg-trustfix-green/90 text-white">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
