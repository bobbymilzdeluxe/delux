import AOS from 'aos'

import 'aos/dist/aos.css'

export default ({ app }) => {
  app.AOS = AOS.init({
    once: true,
    delay: 150,
  })
}
