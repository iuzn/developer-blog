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
      aria-label={`${title} - Yer İmi`}
      className={clsx(
        'max-w-md mx-auto  ',
        featured && 'hover:-translate-y-1 focus:-translate-y-2 ',
        className
      )}
      target="_blank"
    >
      <div className="group md:flex p-2 items-center transition duration-300 ease-in-out transform hover:bg-color-secondary hover:color-secondary rounded-large">
        <div className="md:flex-shrink-0 transition duration-300 ease-in-out transform group-hover:scale-110 ">
          {images && images[0] && (
            <img
              className="h-32 w-full object-cover md:w-48 sm:w-full rounded-large "
              src={toNotionImageUrl(images[0].url)}
              alt={title}
            />
          )}
          {!images && (
            <img
              className="h-32 w-full object-cover md:w-48 sm:w-full rounded-large"
              src={`https://dummyimage.com/600x400/434190/c3dafe&text=${tags[0]}`}
              alt={title}
            />
          )}
          {images && images.length < 1 && (
            <img
              className="h-32 w-full object-cover md:w-48 sm:w-full rounded-large"
              src={`https://dummyimage.com/600x400/434190/c3dafe&text=${tags[0]}`}
              alt={title}
            />
          )}
        </div>
        <div className="p-2 lg:ml-4">
          <title className=" block mt-2 text-lg font-semibold leading-tight font-medium">
            {title.slice(0, 100)}
            {title.length > 101 && '...'}
          </title>
          <p className="mt-2 pb-3">
            {description.slice(0, 120)}
            {description.length > 120 && '...'}
          </p>
          <time className="inline-flex mr-4 color-primary-60 group-hover:color-secondary">
            {dateFormatter.format(new Date(created))}
          </time>
            <p className="inline-flex mr-4 color-primary-60 group-hover:color-secondary ">{new URL(link).hostname}</p>
          {tags.map((tag) => (
            <div key={tag} className="inline-flex items-center px-3 py-1 rounded-large text-sm font-medium leading-5 mr-2 bg-indigo-100 text-indigo-800 group-hover:color-primary group-hover:bg-color-primary">
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
      <h1 className="text-4xl font-bold dark:text-blue-400">{preview && 'Yer imleri'}</h1>
      <div className="text-2xl ">{preview && 'İnternette dikkatimi çeken sayfalar'}</div>
    </div>
    <div className="grid grid-cols-1  border-b-2 border-fuchsia-600 sm:grid-cols-1  my-4 ">
      {bookmark.slice(0, preview ? 3 : undefined).map((p) => (
        <div key={p.id}  className="p-8">
          <Bookmark featured {...p} />
        </div>
      ))}
    </div>
  </div>
)
