import FoodSpinner from '@/components/ui/FoodSpinner';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <FoodSpinner size={80} />
    </div>
  );
} 