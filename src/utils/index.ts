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
