import { EmptyStateProps } from '@/types'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const EmptyState = ({ title, search, buttonLink, buttonText }: EmptyStateProps) => {
  return (
    <section className="flex flex-col items-center justify-center h-full gap-3">
      <Image src="/icons/emptyState.svg" width={250} height={250} alt="No content" />
      <div className="flex flex-col items-center w-full max-w-[254px] gap-3">
        <h1 className="text-16 text-center font-medium text-white-1">{title}</h1>
        {search && (
          <p className="text-16 text-center font-medium text-white-2">Adjust your search criteria to find the desired content</p>
        )}
        {buttonLink && (
          <Button className="bg-orange-1">
            <Link href={buttonLink} className="flex items-center gap-1">
              <Image 
                src="/icons/discover.svg"
                width={20}
                height={20}
                alt="Discover"
              />
              <h1 className="text-16 font-extrabold text-white-1">{buttonText}</h1>
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export default EmptyState
