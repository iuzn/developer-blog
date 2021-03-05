import React, { useContext } from 'react'
import styles from '../sections/styles.module.css'
import StoreContext from '../../store'
import Loading from '../loading'

export type MappingType =
  | 'pathname'
  | 'url'
  | 'title'
  | 'og:title'
  | 'issue-number'
  | 'issue-term'

interface ReactUtterancesProps {
  repo: string
  issueMap: MappingType
  issueTerm?: string
  issueNumber?: number
  label?: string
}

interface ReactUtterancesState {
  pending: boolean
}

export class Index extends React.Component<
  ReactUtterancesProps,
  ReactUtterancesState
> {
  reference: React.RefObject<HTMLDivElement>
  scriptElement: any

  constructor(props: ReactUtterancesProps) {
    super(props)

    if (props.issueMap === 'issue-term' && props.issueTerm === undefined) {
      throw Error(
        "Property 'issueTerm' must be provided with issueMap 'issue-term'"
      )
    }

    if (props.issueMap === 'issue-number' && props.issueNumber === undefined) {
      throw Error(
        "Property 'issueNumber' must be provided with issueMap 'issue-number'"
      )
    }

    this.reference = React.createRef<HTMLDivElement>()
    this.state = { pending: true }
  }

  componentDidMount(): void {
    const { repo, issueMap, issueTerm, issueNumber, label } = this.props
    const scriptElement = document.createElement('script')
    scriptElement.src = 'https://utteranc.es/client.js'
    scriptElement.async = true
    scriptElement.defer = true
    scriptElement.setAttribute('repo', repo)
    scriptElement.setAttribute('crossorigin', 'annonymous')
    const store = localStorage.getItem('THEME')
    let theme = ''
    const isLight = store === 'light'
    const isDark = store === 'dark'
    const isDim = store === 'dim'
    const isSepia = store === 'sepia'
    if (isLight) {
      theme = 'github-light'
    }
    if (isDark) {
      theme = 'github-dark'
    }
    if (isDim) {
      theme = 'icy-dark'
    }
    if (isSepia) {
      theme = 'boxy-light'
    }
    scriptElement.setAttribute('theme', theme)

    scriptElement.onload = () => this.setState({ pending: false })

    if (label) {
      scriptElement.setAttribute('label', label)
    }

    if (issueMap === 'issue-number') {
      scriptElement.setAttribute('issue-number', issueNumber!.toString())
    } else if (issueMap === 'issue-term') {
      scriptElement.setAttribute('issue-term', issueTerm!)
    } else {
      scriptElement.setAttribute('issue-term', issueMap)
    }

    // TODO: Check current availability
    this.scriptElement = scriptElement
    this.reference.current!.appendChild(scriptElement)
  }

  render(): React.ReactElement {
    return (
      <div className={styles.comments}>
        <div className={styles.utterances} ref={this.reference}>
          {this.state.pending && (
            <div className="flex justify-center content-center m-4">
              <Loading size={40} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
