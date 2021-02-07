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
        'max-w-md mx-auto rounded-xl overflow-hidden bg-transparent md:max-w-2xl ',
        featured && 'over:-translate-y-1 focus:-translate-y-2 ',
        className
      )} target="_blank"
    >
  <div className="md:flex ">
    <div className="md:flex-shrink-0 p-4">
        {images && images[0] && (
            <img
              className="h-24 w-full object-cover md:w-32 md:h-32 sm:w-32 "
              src={toNotionImageUrl(images[0].url)}
              alt={title}
            />
          )}{
           !images &&  (
            <img
              className="h-24 w-full object-cover md:w-32 md:h-32 sm:w-32"
              src={`https://dummyimage.com/600x400/3257A7/F4C770&text=${tags[0]}`}
              alt={title}
            />
          )
    }{
           images && images.length<1 &&  (
            <img
              className="h-24 w-full object-cover md:w-32 sm:w-32"
              src={`https://dummyimage.com/600x400/3257A7/F4C770&text=${tags[0]}`}
              alt={title}
            />
          )
    }
    </div>
    <div className="p-2">
      <a className="block mt-2 text-lg leading-tight font-medium hover:underline notion-blue">{title.slice(0,35)}{title.length>70 && "..."}</a>
      <p className="mt-2">{description.slice(0,70)}{description.length>58 && "..."}</p>
        {tags.map((p) => (
            <div className="inline-flex items-center px-3 py-1 rounded-large text-sm font-medium leading-5 mb-2 mr-2 bg-indigo-100 text-indigo-800" >{p}</div>
        ))}
<p className="inline mt-2">{dateFormatter.format(new Date(created))} </p>
    </div>
  </div>
</a>
        </Link>
)

export const Bookmarks: React.FC<{
  bookmark: BookmarkData[]
  preview?: boolean
}> = ({ bookmark, preview}) => (
  <div className="container ">
    <div className="m-auto max-w-3xl pb-8">
      <h1 className="text-4xl font-bold">{preview && 'Bookmarks'}</h1>
      <div className="text-2xl ">{preview && 'Some Bookmarks'}</div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-1  my-4 ">
        {Object.keys(bookmark).map(()=>(
  created
        ))}
        <div className="divide-y divide-solid">
      {bookmark.slice(0, preview ? 3 : undefined).map((p) => (
          <div className=" p-8 "><Bookmark key={p.id} featured {...p} /></div>

      ))}
      </div>
    </div>
  </div>
)