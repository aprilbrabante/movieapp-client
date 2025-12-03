<template>
  <tr>
    <td>{{ movieData.title }}</td>
    <td>{{ movieData.description }}</td>
    <td>{{ movieData.year }}</td>
    <td>{{ movieData.director }}</td>
    <td>{{ movieData.genre }}</td>
    <td class="justify-content-center ">
      <router-link class="btn btn-primary" :to="{ path: `/editMovie/${movieData._id}`}">Update</router-link>
    </td>
    <td class="justify-content-center ">
      <router-link to="#" class="btn btn-danger" :disabled="loading" @click="archiveProduct">
        {{ loading ? 'Deleting...' : 'Delete' }}
      </router-link>
    </td>
   
  </tr>
</template>

<script setup>

    import { useGlobalStore } from '../stores/global.js'
    import { Notyf } from 'notyf';
    import { ref } from 'vue';
    import api from '../api.js';

    const notyf = new Notyf();
    const { user } = useGlobalStore();

    const loading = ref(false);

    const props = defineProps({
    movieData: {
        type: Object
    }
    });

    const emit = defineEmits(['archived']);

    const movieId = props.movieData._id;
    console.log('arhive product id bef:', movieId)
    async function archiveProduct() {

       loading.value = true
        
        try {
            console.log('arhive product id:', props.movieData._id)
            let res = await api.delete(`/movies/deleteMovie/${props.movieData._id}`);

            if (res.status === 200) {
                notyf.success("Movie Deleted Successfully");
                emit("archived", props.movieData._id);

            }
        } catch (error) {
            console.log(error)
            if ([400,401,404].includes(error.response.status)) {
                notyf.error(error.response.data.error);
            } else {
                notyf.error("Movie Deleted failed. Please contact administrator");
            }            
        } finally {
            loading.value = false;
        }
    }


</script>
