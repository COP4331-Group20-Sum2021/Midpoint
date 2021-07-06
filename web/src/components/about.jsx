import style from '../styles/about.module.scss'

export default function About() {
  return (
    <>
      <img id={style.gmap} src='/googlemaps_3.png' alt='google maps' />
      <AboutPage />
    </>
  )
}
function AboutPage() {
  return (
    <div className={style.aboutBlock}>
      <div className={style.textBox}>
        <h1 id={style.title}>About Midpoint</h1>
      
        <h2 id={style.section}>Midpoint is a website where a user can enter points of interest to them and in return
        the website will generate great meeting locations between each point of interest</h2>
      </div>
    </div>
  )
}
