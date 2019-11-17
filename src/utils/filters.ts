const date = (date: string) => {
  if (!date) {
    return ''
  }
  return new Date(date).toLocaleDateString()
}

export default {
  date
} as { [key: string]: (...params: any[]) => void }
