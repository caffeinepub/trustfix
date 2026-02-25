import { Star } from 'lucide-react';

interface Props {
  rating: number;
  max?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: number;
}

export default function StarRating({ rating, max = 5, interactive = false, onRate, size = 16 }: Props) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`
            ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
            ${interactive ? 'cursor-pointer hover:fill-yellow-300 hover:text-yellow-300 transition-colors' : ''}
          `}
          onClick={() => interactive && onRate && onRate(i + 1)}
        />
      ))}
    </div>
  );
}
