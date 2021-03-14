import fetch from 'node-fetch'

export const getBlogTable = async <T>(blogId: string): Promise<T[]> =>
  fetch(`https://notion-cloudflare-worker.iu.workers.dev/v1/table/${blogId}`).then((res) =>
    res.json()
  )
