<template>
    <div class="card shadow-sm">
        <div class="card-body p-4">
            <h4 class="card-title mb-3 text-center">Register Movie</h4>
            <p class="text-muted text-center small mb-4">Please fill in the form to register</p>

            <form id="registerProductForm" class="needs-validation" v-on:submit="handleSubmit">
                <div class="row g-3">
                    <div class="col-md-12">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="title" name="title" required placeholder="Product Name" v-model="title">
                        <div class="invalid-feedback">Please enter title.</div>
                    </div>

                    <div class="col-md-12">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" name="description" required placeholder="Description" rows="5" v-model="description">
                        </textarea>
                        <div class="invalid-feedback">Please enter Description.</div>
                    </div>

                    <div class="col-12">
                        <label for="year" class="form-label">Year</label>
                        <input type="number" class="form-control" id="year" name="year" required placeholder="1990"  v-model="year">
                        <div class="invalid-feedback">Please provide a valid year.</div>
                    </div>

                    <div class="col-md-12">
                        <label for="director" class="form-label">Director</label>
                        <input type="text" class="form-control" id="director" name="description" required placeholder="Director"  v-model="director"/>
                       
                        <div class="invalid-feedback">Please enter Director.</div>
                    </div>

                    <div class="col-md-12">
                        <label for="genre" class="form-label">Genre</label>
                        <input type="text" class="form-control" id="genre" name="genre" required placeholder="Genre"  v-model="genre"/>
                        <div class="invalid-feedback">Please enter Genre.</div>
                    </div>

                    <div class="col-12 d-grid">
						<button type="submit" class="btn btn-primary btn-block" v-if="isEnabled"  :disabled="loading">
                            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            {{ loading ? 'Updating...' : 'Update' }}
                        </button>
                        <button type="submit" class="btn btn-danger btn-block" v-else disabled>Update</button>
                    </div>

                    <div class="col-12 d-grid">
                        <button type="button" class="btn btn-secondary " @click="cancelForm">Cancel</button>
                    </div>

                </div>

            </form>
        </div>
    </div>
</template>

<style>
    body { background: #f8f9fa; }
    .card { max-width: 540px; margin: 48px auto; }
</style>

<script setup>

    import { watch, ref, onBeforeMount, reactive } from "vue";
	import { useRoute, useRouter } from 'vue-router';
	import { useGlobalStore } from '../stores/global.js'
    import { Notyf } from 'notyf';
    import api from "../api.js";

    const route = useRoute();
	const router = useRouter();
	const { user } = useGlobalStore();
    const notyf = new Notyf();

    const loading = ref(false);
    const title = ref("");
    const description = ref("");
    const year = ref("");
    const director = ref("");
    const genre = ref("");
    let movies = reactive([]);
    const isEnabled = ref(false);

    const movieId = route.params.movieId;

    watch([title, description, year, director, genre], (currentValue, oldValue) => {
        if (currentValue.every(input => input != "") && Number(currentValue[2]) >=1) {
            isEnabled.value = true;
        } else {
            isEnabled.value = false;
        }
    });

    async function getProductDetails() {
        try {

            let res = await api.get(`/movies/getMovie/${movieId}`);

            if (res.status === 200) {
                movies = res.data;
                title.value = movies.title;
                description.value = movies.description;
                year.value = movies.year;
                director.value = movies.director;
                genre.value = movies.genre;


            }
            
        } catch (error) {

            console.log(error);

            if ([400,401,404].includes(error.response.status)) {
                notyf.error(error.response.data.error);
            } else {
                notyf.error("Login failed. Please contact administrator");
            }
            
        }
    }

    onBeforeMount(()=> {
        getProductDetails();
    });

    async function handleSubmit(e) {
        
        e.preventDefault();

        loading.value = true
        
        try {
            let res = await api.patch(`/movies/updateMovie/${movieId}`, {
                title: title.value,
                description: description.value,
                year: year.value,
                director: director.value,
                genre: genre.value         
            });

            if (res.status === 200) {
                notyf.success("Movie Updated Successfully");

                title.value = "";
                description.value = "";
                year.value = "";
                director.value = "";
                genre.value = "";

                router.push({name: "Admin"});
            }
        } catch (error) {
            console.log(error)
            if ([400,401,404].includes(error.response.status)) {
                notyf.error(error.response.data.error);
            } else {
                notyf.error("Movie Update failed. Please contact administrator");
            }            
        } finally {
            loading.value = false;
        }
    }

    function cancelForm() {
        title.value = '';
        description.value = '';
        year.value = '';
        director.value = "";
        genre.value = "";
        
        router.back();
    }

</script>