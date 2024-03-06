import { Badge } from '@/components/ui/badge';

interface TagSectionProps {
  title: string;
  tags?: string[];
  badgeColor?: string;
}

const TagSection: React.FC<TagSectionProps> = ({ title, tags, badgeColor = 'bg-slate-400' }) => (
  <div>
    <span>{title}</span>
    <div className="flex text-nowrap">
      {tags?.map((tag, index) => (
        <Badge key={index} variant="secondary" className={`mr-2 w-fit ${badgeColor}`}>
          {tag}
        </Badge>
      ))}
    </div>
  </div>
);

export default TagSection;
