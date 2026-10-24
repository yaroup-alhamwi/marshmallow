import { gallery } from '../data/site'

// بيظهر بس إذا في صور بملف site.js
// BASE_URL حتى تشتغل الصور تحت أي رابط (GitHub Pages مثلاً)
const url = (src) => (src.startsWith('http') ? src : import.meta.env.BASE_URL + src.replace(/^\//, ''))

export default function Gallery() {
  if (!gallery.length) return null
  return (
    <section className="section gallery" aria-labelledby="gallery-title">
      <div className="wrap">
        <h2 className="section__title" id="gallery-title">من عنّا</h2>
        <ul className="gallery__grid">
          {gallery.map((g) => (
            <li key={g.src}>
              <img src={url(g.src)} alt={g.alt} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
