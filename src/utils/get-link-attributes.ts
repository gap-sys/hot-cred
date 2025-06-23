export const getLinkAttributes = (url: string) => {
  if (!url) {
    return { target: '', rel: '' }
  }

  if (url.startsWith('https://') || url.endsWith('.pdf')) {
    return {
      target: '_blank',
      rel: 'noopener noreferrer',
    }
  }

  return { target: '', rel: '' }
}
