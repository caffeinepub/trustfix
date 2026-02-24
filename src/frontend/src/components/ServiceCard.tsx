import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  service: {
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
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-4 left-4 bg-trustfix-green text-white">
          {service.category}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{service.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-gray-600 text-sm">{service.description}</p>
        <p className="text-2xl font-bold text-trustfix-orange mt-4">
          Starting at ₹{service.price}
        </p>
      </CardContent>

      <CardFooter>
        <Link to="/booking" search={{ service: service.name }} className="w-full">
          <Button className="w-full bg-trustfix-green hover:bg-trustfix-green/90 text-white">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
