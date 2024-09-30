import Vue from 'vue'
// import Swiper core and required components
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,  } from 'swiper'

import Swiper from 'swiper'

// Import Swiper Vue.js components
// import { Swiper, SwiperSlide } from 'swiper'

// Import Swiper styles
// import 'swiper/swiper.scss'
// import 'swiper/components/navigation/navigation.scss'
// import 'swiper/components/pagination/pagination.scss'
// import 'swiper/components/scrollbar/scrollbar.scss'

// install Swiper components
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
const swipe = new Swiper()
Vue.use(swipe)
