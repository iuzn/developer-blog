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
    <Link href={link}  >
        <a
      aria-label={`${title} - Project`}
      className={clsx(
        'max-w-md mx-auto rounded-xl overflow-hidden bg-transparent md:max-w-2xl ',
        featured && 'over:-translate-y-1 focus:-translate-y-2 ',
        className
      )} target="_blank"
    >
  <div className="md:flex ">
    <div className="md:flex-shrink-0 ">
        {images && images[0] && (
            <img
              className="h-48 w-full object-cover rounded-large md:w-64"
              src={toNotionImageUrl(images[0].url)}
              alt={title}
            />
          )}{
           !images &&  (
            <img
              className="h-48 w-full object-cover rounded-large md:w-64"
              src={`https://dummyimage.com/600x400/3257A7/F4C770&text=${tags}`}
              alt={title}
            />
          )
    }{
           images && images.length<1 &&  (
            <img
              className="h-48 w-full object-cover rounded-large md:w-64"
              src={`https://dummyimage.com/600x400/3257A7/F4C770&text=${tags}`}
              alt={title}
            />
          )
    }
    </div>
    <div className="p-8">
      <a className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white hover:underline">{title.slice(0,70)}{title.length>70 && "..."}</a>
        <p className="inline mt-2 text-gray-500">{dateFormatter.format(new Date(created))} </p>
      <p className="mt-2 text-gray-500">{description.slice(0,70)}{description.length>58 && "..."}</p>
      <div className="inline-flex items-center px-3 py-1 rounded-large text-sm font-medium leading-5 mb-2  bg-indigo-100 text-indigo-800">{tags}</div>
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
          <div className=" flex divide-y divide-gray-400 md:divide-y-8"><Bookmark key={p.id} featured {...p} /></div>

      ))}
    </div>
  </div>
)