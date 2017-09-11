<template>
	<div id="about">
		<div class="row films">
			<div class="col-xs-12 col-md-12">
				<ul class="films-list">
					<index-film-item v-for="(film, index) in films" v-bind:item="film" v-bind:key="index"></index-film-item>
				</ul>
			</div>
		</div>
		<div class="footer">
			<router-link v-bind:to="'/AddFilm'">
				<div class="add-film-btn">
					add film
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import db 			from '../assets/js/db-imitation'

  	export default {
		props: ['item'],
		data () {
			return ({
				films: []
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
				if (this.findGetParameter('genre')) {
					var genre = this.findGetParameter('genre');
					this.films = [];
					for (var i = 0; i < db.films.length; i++)
						db.films[i].info.genre == genre ? this.films.push(db.films[i].info) : 0;
				} else
					for (var i = 0; i < db.films.length; i++)
						this.films.push(db.films[i].info);
			},
			searchFilm (name) {
				this.films = [];
				if (name) {
					for (var i = 0; i < db.films.length; i++)
						db.films[i].info.title == name ? this.films.push(db.films[i].info) : 0;
				} else {
					this.checkGenre();
				}
			}
		},
		created () {
			this.checkGenre();
		},
		beforeRouteUpdate (to, from, next) {
			next();
			this.checkGenre();
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