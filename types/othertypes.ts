import { ExtendedRecordMap } from 'notion-types'

export interface Linked {
  types: Linked[];
  href: string;
  selected: boolean;
  children: string;
  className: string
}

export interface PageProps {
  recordMap?: ExtendedRecordMap
}