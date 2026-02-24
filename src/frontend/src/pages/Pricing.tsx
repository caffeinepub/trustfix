import PricingCard from '@/components/PricingCard';
import { servicesData } from '@/data/services';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Pricing</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparent pricing for all our services
          </p>
        </div>

        <Alert className="mb-8 glass-panel border-yellow-200 shadow-glass">
          <Info className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Note:</strong> Final price depends on inspection and actual work required.
          </AlertDescription>
        </Alert>

        <div className="space-y-12">
          {Object.entries(servicesData).map(([category, services]) => (
            <div key={category}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <PricingCard key={index} service={{ ...service, category }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
