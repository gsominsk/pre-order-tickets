<template>
	<div class="row add-new-film-wrap">
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="add-new-film">
				<form name="addNewFilmForm" v-on:submit.prevent="saveFilm">
					<input type="text" name="title" v-model="film.title" placeholder="title of movie...">
					<select v-model="film.genre">
						<option value="comedy">Comedy</option>
						<option value="action">Action</option>
						<option value="adventure">Adventure</option>
						<option value="crime">Crime</option>
						<option value="drama">Drama</option>
					</select>
					<input type="text" name="start-time" class="timepicker" v-model="film.startTime" placeholder="Start time..." v-on:click="showTime">
					<div class="range-slider">
						<input name="maxFamous" type="range" value="0" min="0" max="500" class="range-slider__range" v-model="film.duration" v-on:change="setValue()"/><span class="range-slider__value">{{film.duration}} m.</span>
					</div>
					<input type="text" name="date-of-release" id="datepicker" v-model="film.dateOfRelease" placeholder="Date of release..." v-on:click="showDate">
					<input type="text" class="price" name="ticket-price" v-model="film.ticketPrice" placeholder="Ticket price...">
					<div class="upload-file-block">
						<input class="box__file" v-on:change="checkFiles" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
						<div class="files-names">
							<span v-for="file in fileNames">{{file}}</span>
						</div>
					</div>

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
					duration: 0
				},
				fileNames: ['Drug fil e or clik to upload.'],
				photo: []
			})
		},
		methods: {
			saveFilm: function () {
				console.log(document.addNewFilmForm);
				console.log(this.film, this.photo);
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
							_this.photo[file] = {};
							_this.photo[file].src = reader.result;
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
