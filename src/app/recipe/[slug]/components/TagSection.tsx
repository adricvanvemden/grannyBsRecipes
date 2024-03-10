import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagSectionProps {
  title: string;
  tags?: string[];
  badgeColor?: string;
}

const TagSection: React.FC<TagSectionProps> = ({ title, tags, badgeColor = 'bg-slate-400' }) => (
  <div>
    <strong>{title}</strong>
    <div className="flex text-nowrap">
      {tags?.map((tag, index) => (
        <Badge key={index} variant="outline" className={cn('w-fit', badgeColor)}>
          {tag}
        </Badge>
      ))}
    </div>
  </div>
);

export default TagSection;
