import style from '../styles/about.module.scss'

export default function About() {
  return (
    <div className={style.testing}>
      <h1 id={style.title}>About Midpoints</h1>
      
      <h2 id={style.section}>Midpoint is a website where a user can enter points of interest to them and in return
      the website will generate great meeting locations between each point of interest</h2>
    </div>
  )
}
