<template>
  <div class="hero">
    <img src="/movie.jpg" alt="Movie Banner" class="hero-img" />
    <h1 class="tagline">Your World of Movies Starts Here</h1>
  </div>

  <HighlightsComponentVue />
</template>


<script setup>
	import HighlightsComponentVue from "../components/HighlightsComponent.vue";
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
}

.hero-img {
  width: 100%;
  height: 300px; /* adjust if needed */
  object-fit: cover;
}

.tagline {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #E50914;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0,0,0,0.7);
}

</style>