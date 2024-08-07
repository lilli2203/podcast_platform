import { EmptyStateProps } from '@/types';
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EmptyState = ({ 
  title, 
  search, 
  buttonLink, 
  buttonText, 
  additionalText, 
  iconSrc = '/icons/emptyState.svg', 
  buttonIconSrc = '/icons/discover.svg',
  footerText,
  footerLink
}: EmptyStateProps) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (buttonLink) {
      router.push(buttonLink);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-full gap-3 bg-gray-800 p-5 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <Image src={iconSrc} width={250} height={250} alt="No content" />
      </div>
      <div className="flex flex-col items-center w-full max-w-[300px] gap-3">
        <h1 className="text-20 font-semibold text-white-1 text-center">{title}</h1>
        {search && (
          <p className="text-14 text-center text-gray-300">
            Adjust your search criteria to find the content you're looking for.
          </p>
        )}
        {additionalText && (
          <p className="text-14 text-center text-gray-400">
            {additionalText}
          </p>
        )}
        {buttonLink && (
          <Button 
            className="bg-orange-1 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-2 transition-colors"
            onClick={handleButtonClick}
          >
            <div className="flex items-center gap-2">
              <Image 
                src={buttonIconSrc}
                width={20}
                height={20}
                alt="Action"
              />
              <span className="text-16 font-bold">{buttonText}</span>
            </div>
          </Button>
        )}
      </div>
      {footerText && (
        <div className="mt-5 text-center">
          <p className="text-14 text-gray-500">{footerText}</p>
          {footerLink && (
            <Link href={footerLink} className="text-blue-400 hover:underline">
              Learn more
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

export default EmptyState;
