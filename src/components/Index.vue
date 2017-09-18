	<template>
	<div id="about">
		<div class="row films">
			<div class="admin" v-on:click="changeRoot">
				<i v-if="admin == 1" class="fa fa-unlock" aria-hidden="true"></i>
				<i v-else class="fa fa-lock" aria-hidden="true"></i>
			</div>
			<div class="col-xs-12 col-md-12">
				<ul class="films-list">
					<index-film-item v-for="(film, index) in films" v-bind:item="film" v-bind:key="index"></index-film-item>
				</ul>
			</div>
		</div>
		<router-link v-bind:to="'/AddFilm'" v-if="admin == 1" class="footer">
			<div class="add-film-btn">
				add film
			</div>
		</router-link>
	</div>
</template>

<script>

  	export default {
		props: ['item'],
		data () {
			return ({
				films: [],
				admin: localStorage.admin
			})
		},
		methods: {
			findGetParameter(parameterName) {
				var result = null,
					tmp = [];
				location.search
					.substr(1)
					.split("&")
					.forEach(function (item) {
						tmp = item.split("=");
						if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
					});
				return result;
			},
			checkGenre () {
				if (!localStorage.films) return;
				var movies = JSON.parse(localStorage.films);

				if (this.findGetParameter('genre')) {
					var genre = this.findGetParameter('genre');
					this.films = []
					for (var i = 0; i < movies.length; i++) {
						movies[i].genre == genre ? this.films.push(movies[i]) : 0;
					}
				} else
					for (var i = 0; i < movies.length; i++)
						this.films.push(movies[i]);
				setTimeout(() => {
					this.showFilms();
				}, 300);
			},
			searchFilm (name) {
				if (!localStorage.films) return;
				this.films = [];
				var movies = JSON.parse(localStorage.films);

				if (movies.length == 0) return ;
				if (name) {
					for (var i = 0; i < movies.length; i++)
						movies[i].title == name ? this.films.push(movies[i]) : 0;
					setTimeout(() => {
						this.showFilms();
					}, 300);
				} else {
					this.checkGenre();
				}
			},
			showFilms () {
				var bb = document.getElementsByClassName('fl-item');

				if (bb.length == 0) return ;

				for (var i = 0; i < bb.length; i++) {
					bb[i].setAttribute('style', 'opacity: 1');
				}
			},
			changeRoot () {
				localStorage.admin = localStorage.admin == 1 ? 0 : 1;
				this.admin = this.admin == 1 ? 0 : 1;
			}
		},
		created () {
			this.checkGenre();
		},
		mounted () {
			document.getElementsByClassName('films-list')[0].removeAttribute('style');
			setTimeout(function () {
				document.getElementsByClassName('films-list')[0].setAttribute('style', 'opacity: 1');
			}, 300)
		},
		beforeRouteUpdate (to, from, next) {
			next();
			this.checkGenre();
		},
		beforeDestroy () {
		},
		watch : {
			item: function () {
				this.searchFilm(this.item);
			}
		}
  	}
</script>
<!-- styling for the component -->
<style>
	#about {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>