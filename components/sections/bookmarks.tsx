import React from 'react'
import { Bookmark as BookmarkData } from '../../types/bookmark'
import { toNotionImageUrl } from '../../core/notion'
import Link from 'next/link'

export const Bookmark: React.FC<
  BookmarkData & {
    className?: string
  }
> = ({ title, link, images, tags, created, description }) => (
    <Link href={link}>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:bg-red-700">
  <div className="md:flex">
    <div className="md:flex-shrink-0">
        {images && images[0] && (
            <img
              className="h-48 w-full object-cover md:w-48"
              src={toNotionImageUrl(images[0].url)}
              alt={title}
            />
          )}
    </div>
    <div className="p-8">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{tags}</div>
      <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title}</a>
      <p className="mt-2 text-gray-500">{description}</p>
      <p className="mt-2 text-gray-500">{created}</p>
    </div>
  </div>
</div>
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
        <Bookmark key={p.id} {...p} />
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