<template>
  <div>
    <div id="ProductCard" class="card p-2 h-80">
      <div class="card-body d-flex flex-column">
        <img
        class="img-fluid rounded"
        :src="`https://placehold.co/600x200/orange/black?font=playfair&text=${encodeURIComponent(movieData.title)}`"
        />

        <p class="mt-auto fw-semibold text-orange mt-2">
          {{ movieData.description }}
        </p>

        <button v-if="user.token" class="btn btn-outline-dark mt-auto" @click="$emit('view-details', productData)">
            View Details
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>

  import { useGlobalStore } from '../stores/global.js'

  import { computed } from 'vue';

  const { user } = useGlobalStore();

  const props = defineProps({
  movieData: {
      type: Object
  }
  });

</script>