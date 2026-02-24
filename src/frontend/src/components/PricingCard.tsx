import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PricingCardProps {
  service: {
    name: string;
    description: string;
    price: string;
    category: string;
  };
}

export default function PricingCard({ service }: PricingCardProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-trustfix-green transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{service.name}</CardTitle>
        <p className="text-sm text-gray-500">{service.category}</p>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        <p className="text-3xl font-bold text-trustfix-orange">₹{service.price}</p>
        <p className="text-xs text-gray-500 mt-1">Starting price</p>
      </CardContent>

      <CardFooter>
        <Link to="/booking" search={{ service: service.name }} className="w-full">
          <Button className="w-full bg-trustfix-green hover:bg-trustfix-green/90 text-white">
            Book Service
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
