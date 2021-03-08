import React, {useState} from 'react'
import { Bookmark as BookmarkData } from '../../types/bookmark'
import { toNotionImageUrl } from '../../core/notion'
import Link from 'next/link'
import { dateFormatter } from '../../core/utils'
import clsx from 'clsx'

export const Bookmark: React.FC<
  BookmarkData & {
    featured?: boolean
    className?: string
  }
> = ({ title, link, images, tags, created, description }) => (
  <Link href={link}>
    <a
      rel="noopener"
      aria-label={`${title} - Yer İmi`}
      className="flex group rounded-large p-2"
      target="_blank"
    >
      <div className=" md:flex p-2 mr-auto ml-auto md:ml-0 items-center transition duration-150 ease-in-out transform  rounded-large">
        <div className="md:flex-shrink-0  lg:mr-0 md:mr-4 transition duration-150  ease-in-out transform group-hover:scale-110 focus:scale-110 ">
          {images && images[0] && (
            <img
              className="h-48 md:h-32 w-full object-cover md:w-56 sm:w-full rounded-large "
              src={toNotionImageUrl(
                images[0].url.replace('&width=600', '&width=192')
              )}
              alt={title}
            />
          )}
          {!images && (
            <div className="flex justify-center items-center h-32 w-full object-cover md:w-48 sm:w-full group-hover:bg-color-secondary focus:bg-color-secondary rounded-large bg-color-secondary-60">
              <p className="group-hover:text-3xl focus:text-3xl text-2xl group-hover:animate-bounce focus:animate-bounce transition-all	 ease-in-out duration-200 transform color-secondary">
                {tags && tags[0]}
                {tags[0].length < 1 &&
                  dateFormatter.format(new Date(created)).slice(0, -4)}
              </p>
            </div>
          )}
          {images && images.length < 1 && (
            <div className="flex justify-center items-center h-32 w-full object-cover md:w-48 sm:w-full group-hover:bg-color-secondary focus:bg-color-secondary rounded-large bg-color-secondary-60">
              <p className="group-hover:text-3xl focus:text-3xl text-2xl group-hover:animate-bounce focus:animate-bounce transition-all	 ease-in-out duration-200 transform color-secondary">
                {tags[0]}
              </p>
            </div>
          )}
        </div>
        <div className="inline transition transform duration-200 ease-in-out md:group-hover:bg-color-secondary md:group-hover:color-secondary md:focus:bg-color-secondary md:focus:color-secondary group-hover:color-primary focus:color-primary rounded-large pl-6 p-3 lg:ml-4">
          <title className="block mt-2 text-lg font-semibold leading-tight font-medium focus:underline hover:underline whitespace-nowrap	overflow-hidden	overflow-ellipsis	">
            {title}
          </title>
          <p className="mt-2 pb-3 whitespace-nowrap	overflow-hidden overflow-ellipsis">
            {description}
          </p>
          <time className="inline-flex mr-4 color-primary-60 md:group-hover:color-secondary md:focus:color-secondary">
            {dateFormatter.format(new Date(created))}
          </time>
          <p className="inline-flex mr-4 color-primary-60 md:group-hover:color-secondary md:focus:color-secondary">
            {new URL(link).hostname}
          </p>
          {tags &&
            tags.map((tag) => (
              <p
                key={tag}
                className={clsx(
                  tags[0].length < 1 && 'hidden',
                  'inline-flex items-center px-3 py-1 rounded-large text-sm font-medium leading-5 mr-2' +
                    ' bg-color-secondary color-secondary md:group-hover:color-primary group-hover:color-secondary' +
                    ' md:group-hover:bg-color-primary group-hover:bg-color-secondary md:focus:color-primary focus:color-secondary md:focus:bg-color-primary focus:bg-color-secondary'
                )}
              >
                {tag}
              </p>
            ))}
        </div>
      </div>
    </a>
  </Link>
)

export const Bookmarks: React.FC<{
  bookmark: BookmarkData[]
  preview?: boolean
}> = ({ bookmark, preview }) => {
  const filteredArray = bookmark
    .map((p) => p.tags)
    .map((ar) => JSON.stringify(ar[0]))
    .filter((itm, idx, arr) => arr.indexOf(itm) === idx)
    .map((str) => JSON.parse(str))
    const [tagName, setTagName] = useState("Hepsi")

  return (
    <div className="container ">
      <div className="m-auto max-w-3xl">
        <h1 className="text-4xl font-bold dark:text-blue-400">
          {preview && 'Yer imleri'}
        </h1>
        <div className="text-2xl ">
          {preview && 'İnternette dikkatimi çeken sayfalar'}
        </div>
      </div>

        {!preview && <div className="pt-8 flex flex-wrap justify-around md:justify-start gap-1 ">
          <button
              onClick={() => setTagName("Hepsi")}
              className={tagName === "Hepsi" ? "inline-flex items-center px-3 py-1 rounded-large text-sm font-bold	" +
                  "leading-5 mr-2 bg-color-primary color-primary border-color-secondary" : "inline-flex items-center mr-2" +
                  " px-3 py-1 rounded-large  text-sm font-bold" +
                  " leading-5  bg-gradient color-secondary " +
                  "border-color-primary  hover:border-secondary  hover:bg-primary"}
            >
              Hepsi
            </button>
            {
               filteredArray.sort().map((a) => (
            <button
              key={a}
              onClick={() => setTagName(a)}
              className={tagName === a ? "inline-flex items-center px-3 py-1 rounded-large text-sm font-medium" +
                  " leading-5 mr-2 bg-color-primary color-primary border-color-secondary" +
                  " hover:bg-color-primary" : "inline-flex items-center px-3 py-1 rounded-large text-sm font-medium" +
                  " leading-5 mr-2 border-color-primary bg-color-secondary color-secondary" +
                  " hover:border-color-secondary hover:color-primary  hover:bg-color-primary"}
            >
              {a}
            </button>
          ))
            }
        </div>
          }
      <div className="grid grid-cols-1 sm:grid-cols-1  ">
        {preview
          ? bookmark.slice(0, 3).map((p) => (
              <div key={p.id} className="p-4 ">
                <Bookmark featured {...p} />
              </div>
            )) : tagName==="Hepsi" ? bookmark.map((p) => (
              <div key={p.id} className="p-4 ">
                <Bookmark featured {...p} />
              </div>
            )):  bookmark.filter((p) => p.tags.includes(tagName)).map((p) => (
                <div key={p.id} className="p-4 ">
                  <Bookmark featured {...p} />
                </div>
              ))

          }
      </div>
    </div>
  )
}
