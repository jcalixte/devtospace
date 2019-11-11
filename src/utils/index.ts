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
