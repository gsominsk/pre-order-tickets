<template>
	<div class="row add-new-film-wrap">
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="add-new-film">
				<form name="addNewFilmForm" v-on:submit.prevent="saveFilm" required>
					<input type="text" name="title" v-model="film.title" placeholder="title of movie..." required>
					<select v-model="film.genre" required>
						<option value="comedy">Comedy</option>
						<option value="action">Action</option>
						<option value="adventure">Adventure</option>
						<option value="crime">Crime</option>
						<option value="drama">Drama</option>
					</select>
					<div class="range-slider">
						<input name="maxFamous"
							   type="range"
							   value="0"
							   min="0"
							   max="500"
							   class="range-slider__range"
							   v-model="film.duration"
							   v-on:change="setValue()"/>
						<span class="range-slider__value">{{film.duration}} m.</span>
					</div>
					<div class="upload-file-block">
						<input class="box__file"
							   type="file" name="files[]"
							   id="file"
							   data-multiple-caption="{count} files selected"
							   v-on:change="checkFiles"
							   multiple />
						<div class="files-names">
							<span v-for="file in fileNames">{{file}}</span>
						</div>
					</div>

					<input type="text"
						   name="startTime"
						   class="timepicker"
						   v-model="film.startTime"
						   onkeypress="return false"
						   autocomplete="off"
						   placeholder="Start time..."
						   v-on:click="showTime"
						   required>
					<input type="text"
						   name="dateOfRelease"
						   id="datepicker"
						   autocomplete="off"
						   onkeypress="return false"
						   placeholder="Date of release..."
						   v-model="film.dateOfRelease"
						   v-on:click="showDate"
						   required>
					<input type="text"
						   class="price"
						   name="ticketPrice"
						   placeholder="Ticket price..."
						   v-model="film.ticketPrice"
						   required>

					<textarea name="description" rows="5" v-model="film.description"></textarea>
					<button class="add-film-btn">
						save
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script >
	export default {
		data: function () {
			return ( {
				film: {
					duration: 0,
					photo: []
				},
				fileNames: ['Drug file or clik to upload.'],
			})
		},
		methods: {
			saveFilm: function () {
				!this.film.startTime ? this.film.startTime = document.addNewFilmForm.startTime.value : 0;
				!this.film.dateOfRelease ? this.film.dateOfRelease = document.addNewFilmForm.dateOfRelease.value : 0;
				!this.film.ticketPrice ? this.film.ticketPrice = document.addNewFilmForm.ticketPrice.value : 0;

				this.film.key = window.btoa( unescape(encodeURIComponent(this.film.title + new Date)) );
				if (this.film.photo.length == 0) {
					this.film.photo = [
						{src:'static/empty.png'}
					];
				}
				if (localStorage.films) {
					var movies = JSON.parse(localStorage.films);
					var sessions = JSON.parse(localStorage.sessions)
					movies[movies.length] = this.film;
					sessions[this.film.key] = [];
					localStorage.films = JSON.stringify(movies);
					localStorage.sessions = JSON.stringify(sessions);
				} else {
					localStorage.films 		= JSON.stringify([this.film]);
					var sessions = {};
					sessions[this.film.key] = [];
					localStorage.sessions 	= JSON.stringify(sessions);
				}
			},
			setValue: function () {
				console.log('eee');
			},
			showTime: function () {
				$('input.timepicker').timepicker({});
			},
			showDate: function () {
				$( "#datepicker" ).datepicker();
			},
			checkFiles: function () {
				var uploadPhotos	= document.querySelectorAll('.box__file')[0];
				var files           = uploadPhotos.files; //sames as here
				var reader          = new FileReader();
				var file			= 0;

				addFiles(this);

				function addFiles (_this) {
					if (!files[file].type.match(/.(jpg|jpeg|png|gif|bmp)$/i)) {
						console.log('file type not match');
					} else if (files[file]) {
						reader.readAsDataURL(files[file]); //reads the data as a URL
						reader.onloadend = () => {
							_this.film.photo[file] = {
								src: reader.result,
								name: files[file].name
							};
							_this.fileNames.push(files[file].name);
							++file < files.length ? addFiles(_this) : 0;
						}
					} else {console.log('error');}
				}
			}
		},
		mounted () {
			rangeSlider();
			this.showDate();
			this.showTime();

			$('.price').mask("99.99$");

			function rangeSlider () {
				var slider = $('.range-slider'),
					range = $('.range-slider__range'),
					value = $('.range-slider__value');

				slider.each(function(){
					value.each(function(){
						var value = $(this).prev().attr('value');
					});
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
