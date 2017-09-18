<template>
  	<div class="film">
		<div class="admin" v-on:click="changeRoot">
			<i v-if="admin == 1" class="fa fa-unlock" aria-hidden="true"></i>
			<i v-else class="fa fa-lock" aria-hidden="true"></i>
		</div>
	  	<div class="row film-descr-wrap">
		  	<div class="col-xs-12 col-sm-6 col-md-6">
				<div class="film-img-wrap" v-bind:style="{ 'background-image': 'url(' + description.photo[0].src + ')' }"></div>
		  	</div>
		  	<div class="col-xs-12 col-sm-6 col-md-6">
				<div class="film-descr">
					<ul class="film-descr-list">
						<li class="fdl-item">
							<span>Movie title :</span>
							<span>{{description.title}}</span>
						</li>
						<li class="fdl-item">
							<span>Genre :</span>
							<span>{{description.genre}}</span>
						</li>
						<li class="fdl-item">
							<span>Start time :</span>
							<span>{{description.startTime}}</span>
						</li>
						<li class="fdl-item">
							<span>Duration :</span>
							<span>{{description.duration}}</span>
						</li>
						<li class="fdl-item">
							<span>Date of release :</span>
							<span>{{description.dateOfRelease}}</span>
						</li>
						<li class="fdl-item">
							<span>Ticket price :</span>
							<span>{{description.ticketPrice}}</span>
						</li>
						<li class="fdl-item">
							<span>Description :</span>
							<span>{{description.description}}</span>
						</li>

					</ul>
				</div>
		  	</div>
	  	</div>
  		<div class="row cinema-places-wrap">
			<div class="col">
				<div class="buy-ticket-info">Buy ticket</div>
				<div class="places-wrap">
					<div class="places-map">
						<cinema-place-row v-on:click.native="orderPlace" v-for="(row, index) in map" v-bind:item="index+1" v-bind:row="index" v-bind:key="index"></cinema-place-row>
					</div>
				</div>
				<div class="btn-pre-order" v-on:click="order">
					<span>submit</span>
				</div>
			</div>
		</div>
		<div class="footer" v-if="admin == 1">
			<router-link v-bind:to="'/'">
				<div class="delete-film-btn" v-on:click="deleteFilm">
					delete film
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>

export default {
	data: function () {
		return {
			description: {
				title			: '',
				genre			: '',
				startTime		: '',
				duration		: '',
				dateOfRelease	: '',
				ticketPrice		: '',
				description		: '',
				photo			: [
					{
						src: 'static/empty.png'
					}
				]
			},
			map: [1,2,3,4,5,6,7,8],
			ordered: [],
			clicked: [],
			admin: localStorage.admin
		}
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
		orderPlace: function () {
			if (!event.target.classList.contains('places-row') && event.target.hasAttribute('col')) {
				if (event.target.hasAttribute('style')) {
					var row = event.target.parentElement.getAttribute('row'),
						col = event.target.getAttribute('col');

					for (var i = 0; i < this.clicked.length; i++) {
						if (this.clicked[i].row == row && this.clicked[i].col == col) {
							this.clicked.splice(i, 1);
							event.target.removeAttribute('style');
							break ;
						}
					}
				} else {
					this.clicked[this.clicked.length] = {
						row: event.target.parentElement.getAttribute('row'),
						col: event.target.getAttribute('col')
					};
					event.target.setAttribute('style', 'background: lightgrey;');
				}
			}
		},
		order: function () {
			console.log(this.clicked);

			var sessions = JSON.parse(localStorage.sessions);

			for (var i = 0; i < this.clicked.length; i++) {
				sessions[this.description.key][sessions[this.description.key].length] = this.clicked[i];
			}
			localStorage.sessions = JSON.stringify(sessions);
			console.log(sessions);
		},
		deleteFilm: function () {
			var sessions= JSON.parse(localStorage.sessions);
			var movies	= JSON.parse(localStorage.films);

			delete sessions[this.description.key];
			for (var i = 0; i < movies.length; i++) {
				if (movies[i].key = this.description.key) {
					movies.splice(i, 1);
				}
			}
			localStorage.sessions = JSON.stringify(sessions);
			localStorage.films = JSON.stringify(movies);
		},
		changeRoot () {
			console.log('hello');
			localStorage.admin = localStorage.admin == 1 ? 0 : 1;
			this.admin = this.admin == 1 ? 0 : 1;
		}
	},
	mounted () {
		var movies 	= JSON.parse(localStorage.films);
		var sessions= JSON.parse(localStorage.sessions);
		var film 	= this.findGetParameter('film');

		console.log(sessions);

		console.log(movies);
		if (film) {
			for (var i = 0; i < movies.length; i++) {
				console.log(film, movies[i].key);
				if (movies[i].key == film.replace(' ', '+')) {
					for (var key in movies[i]) {
						this.description[key] = movies[i][key];
					}
					for (var j = 0; j < sessions[movies[i].key].length; j++) {
						var r = sessions[movies[i].key][j].row;
						var c = sessions[movies[i].key][j].col;

						document.querySelectorAll('[row]')[r].childNodes[c*2].style.background = 'lightgrey';
					}
					return ;
				}
			}
		}
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
