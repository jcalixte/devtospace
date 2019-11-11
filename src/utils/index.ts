import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

interface IQueryParam {
  [key: string]: string | number
}

export const constructURL = (
  baseURL: string,
  append: string,
  queryParams?: IQueryParam
) => {
  const queryParamKeys = Object.keys(queryParams || {})
  const params = queryParams
    ? queryParamKeys.map((key) => `${key}=${queryParams[key]}`)
    : ''
  const stringParams = params ? `?${params}` : ''

  return `${baseURL}${append}${stringParams}`
}

export const renderMarkdown = (markdown: string): string => {
  const md = new MarkdownIt({
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (__) {
          return ''
        }
      }

      return ''
    }
  })
  return md.render(markdown)
}

export const notify = (message: string) => {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    return
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    new Notification(message)
  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission === 'default') {
    Notification.requestPermission(function(permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        new Notification(message)
      }
    })
  }
}
