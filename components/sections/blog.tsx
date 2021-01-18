import React from 'react'
import clsx from 'clsx'
import { BlogPost as BlogPostData } from '../../types/blog'
import Link from 'next/link'
import styles from './blog.module.css'
import { toNotionImageUrl } from '../../core/notion'

export const BlogPost: React.FC<
  BlogPostData & {
    featured?: boolean
    className?: string
  }
> = ({ title, preview, video, showVideo, featured, slug, images }) => (
  <div className={styles.post}>
    {featured &&
      (showVideo ? (
        <div className="pb-2/3 aspect-16x9 bg-gray-100 relative border-b overflow-hidden">
          <iframe
            title={title}
            className={clsx('absolute w-full h-full object-cover')}
            src={'https://youtube.com/embed/' + video.substr(video.length - 11)}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="pb-2/3 aspect-16x9 bg-gray-100 relative border-b overflow-hidden">
          <img
            className={clsx('absolute w-full h-full object-cover')}
            src={toNotionImageUrl(images[0].url)}
            alt={title}
          />
        </div>
      ))}

    <div className="flex flex-1 flex-col justify-between ">
      <div className="p-4 pb-10 ">
        <div className="font-semibold text-xl pb-2">{title}</div>
        <div className={clsx(!featured && 'text-sm')}>
          {featured && preview}
        </div>
      </div>
    </div>

    {!featured && (
      <img
        className={clsx('rounded-br-large absolute w-full h-full object-cover')}
        src={toNotionImageUrl(images[0].url)}
        alt={title}
      />
    )}
    <Link href={`/blog/[projectSlug]`} as={`/blog/${slug}`}>
      <a aria-label={`${title} - Blog`}>
        {featured && (
          <footer className={styles.footer}>
            {!showVideo ? 'Keep reading' : 'Keep watching'}
          </footer>
        )}
        {!featured && <footer className={styles.footer}>Read</footer>}
      </a>
    </Link>
  </div>
)

export const Blog: React.FC<{
  blogpost: BlogPostData[]
  preview?: boolean
}> = ({ blogpost, preview }) => (
  <div>
    <div className="grid grid-cols-1 ">
      {blogpost.slice(0, preview ? 1 : undefined).map((p) => (
        <BlogPost key={p.id} featured {...p} />
      ))}
    </div>

    {preview && (
      <div className="container pb-8">
        <div className="m-auto max-w-3xl">
          <h1 className="text-4xl font-bold">Blog</h1>
          <div className="text-2xl ">Other posts that may interest you</div>
        </div>
        <div className="md:grid mt-4 grid-cols-2 sm:grid-cols-4 gap-4 ">
          {blogpost.slice(1, 5).map((p) => (
            <BlogPost key={p.id} className="hidden md:flex" {...p} />
          ))}
        </div>
      </div>
    )}
  </div>
)
