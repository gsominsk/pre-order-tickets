<template>
	<ul class="places-row">
		<li class="pr-item" >Ряд {{item}}</li>
		<li class="pr-item" col="1">1</li>
		<li class="pr-item" col="2">2</li>
		<li class="pr-item" col="3">3</li>
		<li class="pr-item" col="4">4</li>
		<li class="pr-item" col="5">5</li>
		<li class="pr-item" col="6">6</li>
		<li class="pr-item" col="7">7</li>
		<li class="pr-item" col="8">8</li>
	</ul>
</template>

<script>
	export default {
		props: ['item']
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
