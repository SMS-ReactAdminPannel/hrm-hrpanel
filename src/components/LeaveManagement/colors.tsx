// utils/colors.ts
export const getColorClassById = (id: string) => {
  const colorClasses = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-red-100 text-red-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-teal-100 text-teal-800',
    'bg-orange-100 text-orange-800',
    'bg-cyan-100 text-cyan-800'
  ];
  
  const hash = Array.from(id).reduce(
    (hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0
  );
  const index = Math.abs(hash) % colorClasses.length;
  
  return colorClasses[index];
};