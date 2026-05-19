import { useEffect } from 'react'

function Seo({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title
    }

    if (description) {
      let descriptionMeta = document.querySelector('meta[name="description"]')

      if (!descriptionMeta) {
        descriptionMeta = document.createElement('meta')
        descriptionMeta.name = 'description'
        document.head.appendChild(descriptionMeta)
      }

      descriptionMeta.content = description
    }
  }, [title, description])

  return null
}

export default Seo
