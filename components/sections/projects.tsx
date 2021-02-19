import React from 'react'
import clsx from 'clsx'
import { Project as ProjectData } from '../../types/project'
import Link from 'next/link'
import { toNotionImageUrl } from '../../core/notion'

export const Project: React.FC<
  ProjectData & {
    featured?: boolean
    className?: string
  }
> = ({ title, preview, images, featured, slug, className }) => (
  <Link href={`/projeler/[projelerSlug]`} as={`/projeler/${slug}`}>
    <a
      aria-label={`${title} - Project`}
      className={clsx(
        'focus group border bg-box-primary rounded-md overflow-hidden flex flex-col rounded-large',
        'transform transition-transform ease-in-out duration-100 hover:color-secondary hover:bg-color-secondary ',
        featured && 'shadow-lg hover:-translate-y-1 focus:-translate-y-0',
        className
      )}
    >
      {featured && (
        <div className="pb-2/3 bg-gray-100 relative border-b overflow-hidden">
          {images && images[0] && (
            <img
              className={clsx('absolute w-full h-full object-cover')}
              src={toNotionImageUrl(images[0].url.replace("&width=600", "&width=320"))}
              alt={title}
            />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between">
        <div className="p-4 pb-4">
          <div className="font-semibold text-color-primary group-hover:color-seconday">
            {title}
          </div>
          <div className="text-s" />
          <div className={clsx(!featured && 'text-sm', 'text-color-primary')}>
            {preview}
          </div>
        </div>
      </div>
    </a>
  </Link>
)

export const Projects: React.FC<{
  project: ProjectData[]
  preview?: boolean
}> = ({ project, preview }) => (
  <div className="container pb-8">
    <div className="m-auto max-w-3xl pb-4">
      <h1 className="text-4xl font-bold">{preview && 'Projeler'}</h1>
      <div className="text-2xl ">{preview && 'Kendi yaptığım ve dahil olduğum bazı işler'}</div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {project.slice(0, preview ? 3 : undefined).map((p) => (
        <Project key={p.id} featured {...p} />
      ))}
    </div>
  </div>
)
