export default async function createFileFromUrl(url, defaultType = 'image/jpeg') {
  const name = /[^/]*$/.exec(url)[0]
  const response = await fetch(url)
  const data = await response.blob()

  return new File([data], name, {
    type: data.type || defaultType
  })
}
