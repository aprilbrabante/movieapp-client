<!-- MyModal.vue -->
<template>
  <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalLabelId" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="modalLabelId">
            {{ movie ? movie.title : 'Movie' }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="movie">

            <p class="mb-2"><strong>Title</strong></p>
            <p class="small mb-3">{{ movie.title }}</p>

            <p class="mb-2"><strong>Director</strong></p>
            <p class="small mb-3">{{ movie.director }}</p>

            <p class="mb-2"><strong>Year</strong></p>
            <p class="small mb-3">{{ movie.year }}</p>

            <p class="mb-2"><strong>Genre</strong></p>
            <p class="small mb-3">{{ movie.genre }}</p>

            <p class="mb-2"><strong>Comments</strong></p>
            <p class="small mb-3" style="white-space: pre-line;">
              {{
                movie.comments && movie.comments.length
                  ? movie.comments
                      .map(c => `${c.comment}\nUser: ${c.userId}`)
                      .join("\n")
                  : "No comments yet."
              }}
            </p>

            <div class="mt-3">
              <label for="newComment" class="form-label small">Add a comment</label>
              <textarea id="newComment"
                        v-model="newComment"
                        class="form-control form-control-sm"
                        rows="3"
                        placeholder="Write your comment..."></textarea>
              <div class="d-flex justify-content-end mt-2">
                <button class="btn btn-primary btn-sm" @click="addComment">Add Comment</button>
              </div>
            </div>

          </div>

          <div v-else>
            <p>Loading movie...</p>
          </div>

          <slot></slot>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="onClose"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { defineProps, ref, onMounted, defineExpose, watch } from 'vue';
  import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
  import { Notyf } from 'notyf';
  import { useGlobalStore } from '../stores/global.js'

  import api from '../api.js';

  const notyf = new Notyf();
  const { user } = useGlobalStore();

  const newComment = ref('');
  const props = defineProps({
    modalId: { type: String, required: true },
    movie: { type: Object, default: null }
  });

  const emit = defineEmits(['close']);

  const modalLabelId = `${props.modalId}Label`;
  let bsModal = null;

  onMounted(async () => {

    console.log('onMounted');
    const modalElement = document.getElementById(props.modalId);
    if (modalElement) {

      bsModal = new Modal(modalElement, { backdrop: true });
    }
  });

  function onClose() {
    emit('close');
  }

  defineExpose({
    show: () => bsModal && bsModal.show(),
    hide: () => bsModal && bsModal.hide()
  });


async function addComment() {
    
    try {
        let res = await api.patch(`/movies/addComment/${props.movie._id}`, {
            comment: newComment.value 
        });

        if (res.status === 200) {
            notyf.success("Comment Added Successfully");

            newComment.value = "";

            const movieRes = await api.get(`/movies/getMovie/${props.movie._id}`);
            props.movie.comments = movieRes.data.comments || [];
        }
    } catch (error) {
        console.log(error)
        if ([400,401,404].includes(error.response.status)) {
            notyf.error(error.response.data.error);
        } else {
            notyf.error("Movie Update failed. Please contact administrator");
        }            
    } finally {

    }


}

</script>

<style scoped>
  .modal-body p.small {
    margin-bottom: 0.75rem;
  }
</style>
