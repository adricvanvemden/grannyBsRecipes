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
      <div className="group max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
        {image && (
          <div>
            <Image src={image} alt={title} fill />
          </div>
        )}
        <div className="p-8 flex flex-col gap-y-4">
          <h2 className="tracking-wide text-2xl font-semibold">{title}</h2>
          {shortDescription && <p className="mt-2 text-gray-500">{shortDescription}</p>}
          <span className="group-hover:underline self-end">Go to recipe</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
