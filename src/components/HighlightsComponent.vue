<template>
  <section class="py-5 bg-dark text-center text-light">
    <div class="container">
      <h2 class="mb-4 fw-bold text-orange">New items of this season.</h2>

      <div id="multiItemCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">

          <!-- Slide 1 -->
          <div class="carousel-item active">
            <div class="row justify-content-center">
              <!-- Card 1 -->
              <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 custom-card">
                  <img src="\movie1.jfif" class="card-img h-100" style="object-fit: cover;" alt="Strength Training">
                </div>
              </div>


              <!-- Card 2 -->
              <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 custom-card">
                  <img src="\movie2.jfif" class="card-img h-100" style="object-fit: cover;" alt="Strength Training">
                </div>
              </div>
              <!-- Card 3 -->
              <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 custom-card">
                  <img src="\movie3.jfif" class="card-img h-100" style="object-fit: cover;" alt="Strength Training">
                </div>
              </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="carousel-item">
            <div class="row justify-content-center">
              <!-- Card 4 -->
              <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 custom-card">
                  <img src="\movie4.jfif" class="card-img h-100" style="object-fit: cover;" alt="Strength Training">
                </div>
              </div>
              <!-- Card 5 -->
              <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 custom-card">
                  <img src="\movie5.jfif" class="card-img h-100" style="object-fit: cover;" alt="Strength Training">
                </div>
              </div>
              <!-- Card 6 -->
              <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 custom-card">
                  <img src="\movie6.jfif" class="card-img h-100" style="object-fit: cover;" alt="Strength Training">
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Carousel controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#multiItemCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#multiItemCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "WhyChooseUs",
};
</script>

<style scoped>
.custom-card {
  background-color: #1a1a1a;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
}

.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(255, 165, 0, 0.3);
}
</style>
