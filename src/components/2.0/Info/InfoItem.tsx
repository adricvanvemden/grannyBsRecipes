import { cn } from '@/lib/utils/utils';

// InfoItem.tsx
interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
  className?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, className }) => (
  <span className={cn(className, 'text-start')}>
    <span className="flex items-center gap-2">
      {icon}
      {label}
    </span>
    {value}
  </span>
);

export default InfoItem;
