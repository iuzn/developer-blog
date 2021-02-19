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
  <div className={clsx(styles.post, 'mb-8', featured && 'mb-8')}>
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
            src={toNotionImageUrl(images[0].url.replace("&width=600", "&width=982"))}
            alt={title}
          />
        </div>
      ))}

    <div className="flex flex-1 flex-col justify-between pb-6">
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
        src={toNotionImageUrl(images[0].url.replace("&width=600", "&width=235"))}
        alt={title}
      />
    )}
    <Link href={`/blog/[projectSlug]`} as={`/blog/${slug}`}>
      <a aria-label="Blog Gönderisi" className={styles.footer}>
        {featured &&
          (!showVideo ? 'Okumaya devam et' : 'İzlemeye devam et')
          }{!featured && (!showVideo ? 'Oku' : 'İzle')}
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
      <div className="container">
        <div className="m-auto max-w-3xl pb-4">
          <h1 className="text-4xl font-bold">Blog</h1>
          <div className="text-2xl ">Tasarım, Web, Teknoloji</div>
        </div>
        <div className="md:grid mt-4 mb-4 grid-cols-2 sm:grid-cols-4 gap-4 ">
          {blogpost.slice(1, 5).map((p) => (
            <BlogPost key={p.id} className="hidden md:flex" {...p} />
          ))}
        </div>
      </div>
    )}
  </div>
)
