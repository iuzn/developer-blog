import React from 'react'
import clsx from 'clsx'
import { Bookmark as BookmarkData } from '../../types/bookmark'
import { toNotionImageUrl } from '../../core/notion'
import Link from 'next/link'

export const Bookmark: React.FC<
  BookmarkData & {
    featured?: boolean
    className?: string
  }
> = ({ title, link, images, tags, created, description,featured, className }) => (
    <Link href={link}>
        <a
      aria-label={`${title} - Bookmark`}
      className={clsx(
        'focus group border bg-box-primary rounded-md overflow-hidden flex flex-col',
        'transform transition-transform ease-in-out duration-100 hover:text-color-link',
        featured && 'shadow-lg hover:-translate-y-1 focus:-translate-y-0',
        className
      )}
    >
      {featured && (
        <div className="pb-2/3 bg-gray-100 relative border-b overflow-hidden">
          {images && images[0] && (
            <img
              className={clsx('absolute w-full h-full object-cover')}
              src={toNotionImageUrl(images[0].url)}
              alt={title}
            />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between">
        <div className="p-4 pb-4">
          <div className="font-semibold text-color-primary group-hover:text-blue-500">
            {title}
          </div>
          <div className="text-s" />
          <div className={clsx(!featured && 'text-sm', 'text-color-primary')}>

            {description}
            {link}
            {created}
            {tags}
          </div>
        </div>
      </div>
    </a>
        </Link>
)

export const Bookmarks: React.FC<{
  bookmark: BookmarkData[]
  preview?: boolean
}> = ({ bookmark, preview }) => (
  <div className="container ">
    <div className="m-auto max-w-3xl pb-8">
      <h1 className="text-4xl font-bold">{preview && 'Bookmarks'}</h1>
      <div className="text-2xl ">{preview && 'Some Bookmarks'}</div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {bookmark.slice(0, preview ? 6 : undefined).map((p) => (
        <Bookmark key={p.id} featured {...p} />
      ))}
    </div>
    {preview && (
      <div>
        {bookmark.slice(8, 8).map((p) => (
          <Bookmark key={p.id} className="hidden md:flex" {...p} />
        ))}
      </div>
    )}
  </div>
)