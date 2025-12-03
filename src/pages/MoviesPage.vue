<template>

    <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 300px;">
      <div class="text-center">
        <div class="spinner-border text-orange" role="status" aria-hidden="true"></div>
        <div class="mt-2 text-orange">Loading movies...</div>
      </div>
    </div>

    <div v-else class="container py-2" >

        <div class="row g-4">
            <div class="col my-2">
                <h1 class="text-center py-1 fw-bold text-orange">Now Showing</h1>

                <!-- Display message if no movies -->
                <p v-if="!loading && movies.data.length === 0" class="mt-3 text-center text-muted">
                  No avaiable movies.
                </p>

            </div>
        </div>

        <div class="row g-4">
            <MovieComponent
                v-for="(movie, index) in paginatedmovies"
                :key="index"
                :movieData="movie"
                class="col-12 col-md-6 col-lg-4"
                @view-details="openModal(movie)"
            /> 
        </div>
        <br/><br/>
        <div class="container">
            <div class="d-flex justify-content-center align-items-center mt-4 gap-3">
                <button
                    class="btn btn-warning"
                    @click="prevPage"
                    :disabled="currentPage === 1"
                >
                    Previous
                </button>

                <span class="text-orange">Page {{ currentPage }} of {{ totalPages }}</span>

                <button
                    class="btn btn-warning"
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                >
                    Next
                </button>
            </div>
        </div>

        <div>
            <MovieModal ref="productModalRef" 
                modalId="productModal"
                :movie="selectedProduct" 
                @close="closeModal">
            </MovieModal>

        </div>   
    </div>
</template>

<script setup>

    import { reactive, onBeforeMount, ref, computed } from 'vue';
    import api from '../api.js';
    import { useGlobalStore } from '../stores/global.js'
    import { Notyf } from 'notyf';
    import MovieComponent from '../components/MovieComponent.vue';
    import { useRouter } from 'vue-router';
import MovieModal from '../components/MovieModal.vue';
    const router = useRouter();

    const notyf = new Notyf();
    const { user } = useGlobalStore();
    const movies = reactive({ data: [] });
    const modalProduct = reactive({ data: [] });

    const loading = ref(false);

    const itemsPerPage = 6;
    const currentPage = ref(1);

    const selectedProduct = ref(null);
    const productModalRef = ref(null);
    
    onBeforeMount(async () => {
      try {
        loading.value = true;
        const res = await api.get("/movies/getMovies");
        movies.data = res.data.movies || [];
      } catch (error) {
        console.error('Error loading movies:', error);
        movies.data = [];
      } finally {
        loading.value = false;
      }
    });

    const totalPages = computed(() =>
        Math.max(1, Math.ceil(movies.data.length / itemsPerPage))
    );

    const paginatedmovies = computed(() => {
      const data = movies.data || [];
      const start = (currentPage.value - 1) * itemsPerPage;
      return data.slice(start, start + itemsPerPage);
    });

    function nextPage() {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
        }
    }

    function prevPage() {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    }


  async function fetchSpecificProd(movieId) {
        try {

            const response = await api.get(`/movies/getMovie/${movieId}`);
            modalProduct.data = response.data;

        } catch (error) {
            console.error('Error loading movies:', error);
        }
    }

    const openModal = async (movie) => {
        await fetchSpecificProd(movie._id);
        selectedProduct.value = modalProduct.data;
        productModalRef.value.show();
    };

    function closeModal() {
        productModalRef.value.hide();
        selectedProduct.value = null;
    }

</script>