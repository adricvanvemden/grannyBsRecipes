import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/utils';

interface TagSectionProps {
  title: string;
  tags?: { name: string; type: string }[];
  badgeColor?: string;
}

const TagSection: React.FC<TagSectionProps> = ({ title, tags, badgeColor = 'bg-accent' }) => (
  <div>
    <strong>{title}</strong>
    <div className="flex text-nowrap">
      {tags?.map((tag, index) => (
        <Badge key={index} variant="default" className={cn('w-fit text-white', badgeColor)}>
          {tag.name}
        </Badge>
      ))}
    </div>
  </div>
);

export default TagSection;
