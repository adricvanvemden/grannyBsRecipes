import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  image?: string;
  title: string;
  shortDescription?: string;
  href: string;
}

const Card: React.FC<CardProps> = ({ image, title, shortDescription, href }) => {
  return (
    <Link href={href}>
      <div className="group h-full bg-white rounded-xl shadow-md">
        {image && (
          <div>
            <Image src={image} alt={title} fill />
          </div>
        )}
        <div className="p-8 flex flex-col gap-y-4">
          <h2 className="tracking-wide text-lg font-semibold">{title}</h2>
          {shortDescription && <p className="mt-2 text-gray-500 text-sm">{shortDescription}</p>}
          <span className="group-hover:underline self-end text-sm">Go to recipe</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
