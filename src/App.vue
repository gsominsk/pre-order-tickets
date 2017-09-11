<template>
  	<div id="app">
	  	<div class="row header-menu">
		  	<div class="background-block"></div>
		  	<div class="col-xs-12 col-sm-8 col-md-8">
			  	<ul class="genre-list">
				  	<li class="gl-item"><router-link v-bind:to="'/?genre=comedy'">Comedy</router-link></li>
				  	<li class="gl-item"><router-link v-bind:to="'/?genre=action'">Action</router-link></li>
				  	<li class="gl-item"><router-link v-bind:to="'/?genre=adventure'">Adventure</router-link></li>
				  	<li class="gl-item"><router-link v-bind:to="'/?genre=crime'">Crime</router-link></li>
				  	<li class="gl-item"><router-link v-bind:to="'/?genre=drama'">Drama</router-link></li>
			  	</ul>
		  	</div>
		  	<div class="col-xs-12 col-sm-4 col-md-4">
			  	<div class="search-wrap">
				  	<input type="text" v-on:click="inputActive" v-model="filmName" name="search"/>
			  		<i class="fa fa-search" aria-hidden="true"></i>
				</div>
		  	</div>
	  	</div>
  		<!-- the router outlet, where all matched components would ber viewed -->
	  	<router-view v-bind:item="filmName"></router-view>
  	</div>
</template>

<script>
	import db 			from './assets/js/db-imitation'
	import Index 			from './components/Index'


export default {
	data: function () {
		return {
			filmName: ''
		}
	},
	methods: {
		inputActive: function () {
			event.target.setAttribute('style', 'width: 100%');

			document.onclick = () => {
				if (event.target.getAttribute('name') != 'search') {
					document.querySelectorAll('input[name=search]')[0].removeAttribute('style');
					return ;
				}
			}
		},
		searchFilm : function () {
			for (var i = 0; i < db.films.length; i++)
				this.films.push(db.films[i].info);
		}
	},
	watch: {
		'filmName': function (val, oldVal) {

		}
	}


}

</script>
<!-- styling for the component -->
<style>
	@import "./assets/css/style.css";
	@import "./assets/js/datetimepicker/jquery.datetimepicker.css";

	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	}
</style>
