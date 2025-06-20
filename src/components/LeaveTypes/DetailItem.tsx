interface DetailItemProps {
  label: string;
  value: string;
}

export default function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="border-b pb-3">
      <span className="text-gray-500 text-sm">{label}:</span>
      <span className="ml-2 font-medium text-gray-800">{value}</span>
    </div>
  );
}