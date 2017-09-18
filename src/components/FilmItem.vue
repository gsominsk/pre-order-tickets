<template>
	<li class="fl-item">
		<div class="film-img-wrap" v-bind:style="{ 'background-image': 'url(' + item.photo[0].src + ')' }">
			<router-link v-bind:to="'/film?film='+item.key"></router-link>
		</div>
	</li>
</template>

<script>
  	export default {
  		props: ['item']
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