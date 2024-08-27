import { cn } from '@/lib/utils/utils';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  image?: string;
  title: string;
  short_description?: string;
  href: string;
}

const backgroundColors = [
  'bg-[#fff9c4]/30',
  'bg-[#ffc1de]/30',
  'bg-[#c4daff]/30',
  'bg-[#c4ffda]/30',
  'bg-[#e1c4ffff]/30',
];

const borderBottomColors = [
  'border-b-[#fff9c4]',
  'border-b-[#ffc1de]',
  'border-b-[#c4daff]',
  'border-b-[#c4ffda]',
  'border-b-[#e1c4ffff]',
];

const borderTopColors = [
  'border-t-[#fff9c4]',
  'border-t-[#ffc1de]',
  'border-t-[#c4daff]',
  'border-t-[#c4ffda]',
  'border-t-[#e1c4ffff]',
];

const Card: React.FC<CardProps> = ({ image, title, short_description, href }) => {
  const random = Math.random();
  const randomColor = backgroundColors[Math.floor(random * backgroundColors.length)];
  const randomBorderTopColor = borderTopColors[Math.floor(random * borderTopColors.length)];
  const randomBorderBottomColor = borderBottomColors[Math.floor(random * borderBottomColors.length)];

  const top = random > 0.5;

  return (
    <Link
      href={href}
      className={cn('group focus:scale-105 hover:scale-105 duration-300 ease-in-out transition-transform relative')}
    >
      <div className={cn('absolute right-0 size-4 bg-background', top ? 'top-0' : 'bottom-0')} />
      <div
        className={cn(
          'absolute right-0 w-2 h-2',
          top ? randomBorderBottomColor : randomBorderTopColor,
          top
            ? 'top-0 border-b-[16px] border-r-[16px] border-t-transparent border-r-transparent'
            : 'bottom-0 border-t-[16px] border-r-[16px] border-b-transparent border-r-transparent'
        )}
      />

      <div className={cn('h-full rounded', randomColor)}>
        {image && (
          <div>
            <Image src={image} alt={title} fill />
          </div>
        )}
        <span>
          <h2 className="tracking-wide text-lg font-bold text-primary-text border-b border-neutral/30 px-4 pt-2 pb-1">
            {title}
          </h2>
          {short_description && <p className="mt-2 text-black px-4 pb-2">{short_description}</p>}
        </span>
      </div>
    </Link>
  );
};

export default Card;
