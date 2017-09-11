<template>
  	<div class="film">
	  	<div class="row film-descr-wrap">
		  	<div class="col-xs-12 col-sm-6 col-md-6">
				<div class="film-img-wrap">
				</div>
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
							<span>{{description.releaseDate}}</span>
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
				<div class="btn-pre-order">
					<span>submit</span>
				</div>
			</div>
		</div>
		<div class="footer">
			<router-link v-bind:to="'/'">
				<div class="delete-film-btn">
					delete film
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import db 			from '../assets/js/db-imitation'

export default {
	data: function () {
		return {
			description: {
				title		: '',
				genre		: '',
				startTime	: '',
				duration	: '',
				releaseDate	: '',
				ticketPrice	: '',
				description	: ''
			},
			map: [1,2,3,4,5,6,7,8],
			ordered: [],
			clicked: []
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
				this.clicked[this.clicked.length] = {
					row: event.target.parentElement.getAttribute('row'),
					col: event.target.getAttribute('col')
				};
				event.target.setAttribute('style', 'background: lightgrey;');
			}
		}
	},
	mounted () {
		if (this.findGetParameter('film')) {
			var film = this.findGetParameter('film');
			for (var i = 0; i < db.films.length; i++) {
				if (db.films[i].info.title == film) {
					for (var key in db.films[i].info) {
						this.description[key] = db.films[i].info[key];
					}
					for (var j = 0; j < db.films[i].sessions.length; j++) {
						var r = db.films[i].sessions[j].row;
						var c = db.films[i].sessions[j].col;

						document.querySelectorAll('[row]')[r-1].childNodes[c*2].style.background = 'lightgrey';
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
