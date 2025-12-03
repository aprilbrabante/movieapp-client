<template>
    <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 300px;">
        <div class="text-center text-orange">
        <div class="spinner-border text-orange" role="status" aria-hidden="true"></div>
        <div class="mt-2 text-orange">Loading movies...</div>
        </div>
    </div>

    <div v-else class="container mt-4">
        <h2 class="mb-3 text-orange text-center">Admin Dashboard</h2>
        <div class="d-flex flex-column flex-sm-row gap-2 mb-2">
            <router-link class="btn btn-success" :to="{ path: `/registerMovie`}"><i class="bi bi-plus-lg me-2" aria-hidden="true"></i>Add New Movie</router-link>
        </div>

        <div class="table-responsive">
            <table class="table table-striped table-hover table-sm">
                <thead class="table-warning">
                    <tr>
                        <th>Title</th>
                        <th >Description</th>
                        <th>Year</th>
                        <th>Director</th>
                        <th>Genre</th>
                        <th colspan="2" class="text-center">Action</th>
                    </tr>
                </thead>

                <tbody v-if="movies.data && movies.data.length">
                    <MovieItemComponent
                        v-for="(movie, index) in paginatedmovies"
                        :key="index"
                        :movieData="movie"
                        @archived="handleArchived"
                    />
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6" class="text-orange text-center">No movies.</td>
                    </tr>
                </tbody>        
            </table>

        </div>

        <div class="container mb-1">
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
    </div>
</template>


<script setup>

    import { onBeforeMount, reactive, computed, ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import api from '../api';
    import { Notyf } from 'notyf';
    import MovieItemComponent from '../components/MovieItemComponent.vue';

    const router = useRouter();

    const movies = reactive({ data: [] });
    const loading = ref(false);

    const itemsPerPage = 6;
    const currentPage = ref(1);

    const notyf = new Notyf();

    async function fetchmoviesData() {
        try {
            loading.value = true;

            console.log("api.defaults.baseURL:", api.defaults.baseURL);

            const {data} = await api.get("/movies/getMovies");
            movies.data = data.movies;


        } catch (error) {
            console.error('Error loading movies:', error);
        } finally {
            loading.value = false;
        }
    }

    onBeforeMount(async () => {
        await fetchmoviesData();
    });

    const totalPages = computed(() =>
        Math.max(1, Math.ceil(movies.data.length / itemsPerPage))
    );

    const paginatedmovies = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        return movies.data.slice(start, start + itemsPerPage);
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

    async function handleArchived() {
        await fetchmoviesData();
    }

    async function handleActivated() {
        await fetchmoviesData();
    }

</script>