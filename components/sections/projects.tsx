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
  <Link href={`/projects/[projectsSlug]`} as={`/projects/${slug}`}>
    <a
      aria-label={`${title} - Project`}
      className={clsx(
        'focus group border bg-box-primary rounded-md overflow-hidden flex flex-col',
        'transform transition-transform ease-in-out duration-100 hover:text-color-link',
        featured && 'shadow-lg hover:-translate-y-1 focus:-translate-y-0',
        className
      )}
    >
      {featured && (
        <div className="pb-2/3 bg-gray-100 relative border-b overflow-hidden">
          {images && images[0] && (
            <img
              className={clsx('absolute w-full h-full object-cover')}
              src={toNotionImageUrl(images[0].url)}
              alt={title}
            />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between">
        <div className="p-4 pb-4">
          <div className="font-semibold text-color-primary group-hover:text-blue-500">
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
  <div className="container ">
    <div className="m-auto max-w-3xl pb-8">
      <h1 className="text-4xl font-bold">{preview && 'Projects'}</h1>
      <div className="text-2xl ">{preview && 'My works and projects'}</div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {project.slice(0, preview ? 6 : undefined).map((p) => (
        <Project key={p.id} featured {...p} />
      ))}
    </div>
    {preview && (
      <div>
        {project.slice(8, 8).map((p) => (
          <Project key={p.id} className="hidden md:flex" {...p} />
        ))}
      </div>
    )}
  </div>
)
