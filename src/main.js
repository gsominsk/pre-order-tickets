import Vue 			from 'vue'
import App 			from './App'
import VueRouter 	from 'vue-router'
Vue.use(VueRouter)

import Film 			from './components/Film'
import Index 			from './components/Index'
import AddFilm 			from './components/AddFilm'
import CinemaPlaceRow 	from './components/CinemaPlaceRow'
import FilmItem 		from './components/FilmItem'

Vue.component('cinema-place-row', CinemaPlaceRow);
Vue.component('index-film-item', FilmItem);

const routes = [
  	{ path: '/', component: Index },
  	{ path: '/film', component: Film },
	{ path: '/AddFilm', component: AddFilm }
]

const router = new VueRouter({
  	routes,
  	mode: 'history'
})

new Vue({
  	el: '#app',
  	template: '<App/>',
  	components: { App },
  	router
}).$mount('#app')
