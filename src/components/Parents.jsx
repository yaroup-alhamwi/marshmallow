import { parentPoints, review } from '../data/site'
import { iconFor } from './Icons'

export default function Parents() {
  return (
    <section className="section parents" id="parents" aria-labelledby="parents-title">
      <div className="wrap parents__inner">
        <div>
          <h2 className="section__title" id="parents-title" data-reveal>إنتِ عندك مشوار… وهو عنده مارشميللو</h2>
          <p className="section__lead" data-reveal style={{ '--i': 1 }}>
            مكان راقي، آمن، ومجهّز ليقضي طفلك وقته باللعب والفرح، وانتِ مرتاحة البال.
          </p>
          <figure className="review" data-reveal style={{ '--i': 2 }}>
            <blockquote>{review.text}</blockquote>
            <figcaption>{review.who}</figcaption>
          </figure>
        </div>
        <ul className="points">
          {parentPoints.map((p, i) => {
            const Icon = iconFor[p.icon]
            return (
              <li key={p.title} className="point" data-reveal style={{ '--i': i + 1 }}>
                <span className="point__icon"><Icon width={26} height={26} /></span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
