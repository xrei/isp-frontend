type RequestConfig = {
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
  url: string
  body?: unknown
}

export const request = (apiBase: string) => (config: RequestConfig) => {
  const { url, method = 'GET', body } = config

  return fetch(apiBase + url, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.text()
    })
    .then((data) => {
      return data ? JSON.parse(data) : {}
    })
}

export const createRequest = request
