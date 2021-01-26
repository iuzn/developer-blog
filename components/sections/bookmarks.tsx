import React from 'react'
import { Bookmark as BookmarkData } from '../../types/bookmark'
import { toNotionImageUrl } from '../../core/notion'
import Link from 'next/link'
import clsx from 'clsx'
import {dateFormatter} from "../../core/utils";

export const Bookmark: React.FC<
  BookmarkData & {
    featured?: boolean
    className?: string
  }
> = ({ title, link, images, tags, created, description, featured, className }) => (
    <Link href={link} >
        <a
      aria-label={`${title} - Project`}
      className={clsx(
        'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl',
        featured && 'shadow-lg hover:-translate-y-1 focus:-translate-y-0',
        className
      )} target="_blank"
    >
  <div className="md:flex">
    <div className="md:flex-shrink-0">
        {images && images[0] && (
            <img
              className="h-48 w-full object-cover md:w-64"
              src={toNotionImageUrl(images[0].url)}
              alt={title}
            />
          )}
    </div>
    <div className="p-8">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{tags}</div>
      <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title.slice(0,70)}{title.length>70 && "..."}</a>
      <p className="mt-2 text-gray-500">{description.slice(0,85)}{description.length>70 && "..."}</p>
      <p className="mt-2 text-gray-500">{dateFormatter.format(new Date(created))}</p>
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
    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-4">
      {bookmark.slice(0, preview ? 3 : undefined).map((p) => (
        <Bookmark key={p.id} featured {...p} />
      ))}
    </div>
  </div>
)