<template>
  <div
    class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden"
    :class="{ 'flex-row': viewMode === 'list' }"
    style="cursor: pointer;"
    @click="$emit('book', doctor)"
  >
    <div :class="['doctor-image', { 'col-4': viewMode === 'list', 'w-100': viewMode === 'grid' }]">
      <img :src="doctor.photo" :alt="doctor.name" class="img-fluid w-100 h-100 object-fit-cover" />
      <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill">
        <i class="fas fa-star me-1"></i>
        {{ doctor.rating }}
      </span>
    </div>
    <div class="card-body p-4 d-flex flex-column" :class="{ 'col-8': viewMode === 'list' }">
      <h5 class="card-title fw-bold text-primary mb-1">{{ doctor.name }}</h5>
      <h6 class="card-subtitle text-muted mb-2">{{ doctor.specialty }}</h6>
      <p class="card-text text-secondary mb-3">{{ doctor.experience }}</p>

      <div class="d-flex align-items-center mb-2 text-muted">
        <i class="fas fa-map-marker-alt text-primary me-2"></i>
        <span>{{ doctor.location }}</span>
      </div>
      <div class="d-flex align-items-center mb-3 text-muted">
        <i class="fas fa-phone text-primary me-2"></i>
        <span>{{ doctor.phone }}</span>
      </div>

      <div class="mt-auto">
        <div class="mb-2">
          <span class="fw-bold text-muted d-block mb-1">Available Slots:</span>
          <div class="d-flex flex-wrap gap-2">
            <span v-for="slot in doctor.availableSlots.slice(0, 3)" :key="slot" class="badge bg-light text-primary border border-primary-subtle px-3 py-2">
              {{ slot }}
            </span>
            <span v-if="doctor.availableSlots.length > 3" class="text-muted fw-bold align-self-center">
              +{{ doctor.availableSlots.length - 3 }} more
            </span>
          </div>
        </div>

        <div class="d-flex gap-2 mt-3">
          <button @click.stop="$emit('book', doctor)" class="btn btn-primary w-100 rounded-pill">
            <i class="fas fa-calendar-plus me-2"></i>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorCard',
  props: {
    doctor: {
      type: Object,
      required: true
    },
    viewMode: {
      type: String,
      default: 'grid'
    }
  },
  emits: ['book']
}
</script>

<style scoped>
.doctor-image {
  position: relative;
}
.doctor-image img {
  height: 200px;
}
.card.flex-row .doctor-image {
  height: auto;
}
.card.flex-row .doctor-image img {
  height: 100%;
}
</style>