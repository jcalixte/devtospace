import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { Notyf } from 'notyf'

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
  const stringParams = params ? `?${params.join('&')}` : ''

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

const notif = new Notyf()

export const success = (message: string) => {
  notif.success({
    backgroundColor: '#40739e',
    message
  })
}

export const error = (message: string) => {
  notif.error({
    backgroundColor: '#ee5253',
    message
  })
}
