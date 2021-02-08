import React from 'react'
import { Bookmark as BookmarkData } from '../../types/bookmark'
import { toNotionImageUrl } from '../../core/notion'
import Link from 'next/link'
import clsx from 'clsx'
import { dateFormatter } from '../../core/utils'

export const Bookmark: React.FC<
  BookmarkData & {
    featured?: boolean
    className?: string
  }
> = ({
  title,
  link,
  images,
  tags,
  created,
  description,
  featured,
  className
}) => (
  <Link href={link}>
    <a
      aria-label={`${title} - Project`}
      className={clsx(
        'max-w-md mx-auto overflow-hidden  ',
        featured && 'over:-translate-y-1 focus:-translate-y-2 ',
        className
      )}
      target="_blank"
    >
      <div className="group md:flex items-center">
        <div className="md:flex-shrink-0 group-hover:opacity-75 ">
          {images && images[0] && (
            <img
              className="h-32 w-full object-cover md:w-48 sm:w-full"
              src={toNotionImageUrl(images[0].url)}
              alt={title}
            />
          )}
          {!images && (
            <img
              className="h-32 w-full object-cover md:w-48 sm:w-full"
              src={`https://dummyimage.com/600x400/3257A7/F4C770&text=${tags[0]}`}
              alt={title}
            />
          )}
          {images && images.length < 1 && (
            <img
              className="h-32 w-full object-cover md:w-48 sm:w-full"
              src={`https://dummyimage.com/600x400/3257A7/F4C770&text=${tags[0]}`}
              alt={title}
            />
          )}
        </div>
        <div className="p-2">
          <a className="block mt-2 text-lg font-bold leading-tight font-medium hover:underline">
            {title.slice(0, 70)}
            {title.length > 70 && '...'}
          </a>
          <p className="mt-2 pb-3">
            {description.slice(0, 120)}
            {description.length > 120 && '...'}
          </p>
          <time className="inline-flex mr-4">
            {dateFormatter.format(new Date(created))}{' '}
          </time>
          {tags.map((tag) => (
            <div className="inline-flex items-center px-3 py-1 rounded-large text-sm font-medium leading-5 mr-2 bg-indigo-100 text-indigo-800">
              {tag}
            </div>
          ))}
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
      <div className="text-2xl ">{preview && 'Last Bookmarks'}</div>
    </div>
    <div className="grid grid-cols-1  border-b-2 border-fuchsia-600 sm:grid-cols-1  my-4 ">
      {bookmark.slice(0, preview ? 3 : undefined).map((p) => (
        <div className="p-8 ">
          <Bookmark key={p.id} featured {...p} />
        </div>
      ))}
    </div>
  </div>
)
