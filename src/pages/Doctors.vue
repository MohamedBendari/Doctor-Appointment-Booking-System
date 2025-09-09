<template>
  <div class="doctors-page">
    <section class="bg-primary text-white py-5 text-center">
      <div class="container">
        <h1 class="display-4 fw-bold">Our Certified Doctors</h1>
        <p class="lead">Choose from the best doctors in various specialties</p>
      </div>
    </section>

    <section class="bg-light py-4 border-bottom">
      <div class="container">
        <div class="row g-3 align-items-end">
          <div class="col-12 col-lg-5">
            <div class="input-group shadow-sm rounded-pill">
              <span class="input-group-text bg-white border-0 rounded-start-pill">
                <i class="fas fa-search text-primary"></i>
              </span>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search for a doctor by name or specialty..."
                class="form-control border-0 rounded-end-pill py-3"
                @input="filterDoctors"
              />
              <button v-if="searchQuery" @click="clearSearch" class="btn btn-light rounded-end-pill">
                <i class="fas fa-times text-secondary"></i>
              </button>
            </div>
          </div>

          <div class="col-12 col-md-4 col-lg-2">
            <label class="form-label fw-bold text-muted mb-1">Specialty:</label>
            <select v-model="selectedSpecialty" @change="filterDoctors" class="form-select rounded-pill">
              <option v-for="specialty in specialties" :key="specialty" :value="specialty">
                {{ specialty }}
              </option>
            </select>
          </div>

          <div class="col-12 col-md-4 col-lg-2">
            <label class="form-label fw-bold text-muted mb-1">City:</label>
            <select v-model="selectedLocation" @change="filterDoctors" class="form-select rounded-pill">
              <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
          </div>

          <div class="col-12 col-md-4 col-lg-3">
            <label class="form-label fw-bold text-muted mb-1">Sort by:</label>
            <select v-model="sortBy" @change="sortDoctors" class="form-select rounded-pill">
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>

        <div v-if="hasActiveFilters" class="d-flex flex-wrap align-items-center gap-2 mt-4">
          <span class="text-muted fw-bold">Active Filters:</span>
          <span v-if="searchQuery" class="badge bg-primary text-white rounded-pill px-3 py-2 d-flex align-items-center gap-2">
            Search: {{ searchQuery }}
            <button @click="clearSearch" class="btn btn-sm btn-link text-white p-0">
              <i class="fas fa-times"></i>
            </button>
          </span>
          <span v-if="selectedSpecialty !== 'All Specialties'" class="badge bg-primary text-white rounded-pill px-3 py-2 d-flex align-items-center gap-2">
            Specialty: {{ selectedSpecialty }}
            <button @click="clearSpecialtyFilter" class="btn btn-sm btn-link text-white p-0">
              <i class="fas fa-times"></i>
            </button>
          </span>
          <span v-if="selectedLocation !== 'All Cities'" class="badge bg-primary text-white rounded-pill px-3 py-2 d-flex align-items-center gap-2">
            City: {{ selectedLocation }}
            <button @click="clearLocationFilter" class="btn btn-sm btn-link text-white p-0">
              <i class="fas fa-times"></i>
            </button>
          </span>
          <button @click="clearAllFilters" class="btn btn-danger btn-sm rounded-pill px-3">Clear All Filters</button>
        </div>
      </div>
    </section>

    <section class="py-4 border-bottom bg-white">
      <div class="container d-flex justify-content-between align-items-center">
        <span class="text-muted fw-bold">{{ filteredDoctors.length }} doctors available</span>
        <div class="btn-group">
          <button
            @click="viewMode = 'grid'"
            :class="{ active: viewMode === 'grid' }"
            class="btn btn-outline-secondary rounded-start-pill"
          >
            <i class="fas fa-th-large"></i>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="{ active: viewMode === 'list' }"
            class="btn btn-outline-secondary rounded-end-pill"
          >
            <i class="fas fa-list"></i>
          </button>
        </div>
      </div>
    </section>

    <section class="doctors-section py-5">
      <div class="container">
        <div v-if="filteredDoctors.length === 0" class="text-center text-muted py-5">
          <i class="fas fa-search fa-4x text-light mb-3"></i>
          <h3>No doctors found</h3>
          <p>Try changing your search or filter criteria</p>
          <button @click="clearAllFilters" class="btn btn-primary mt-3">Clear All Filters</button>
        </div>

        <div v-else :class="['row', 'g-4', { 'row-cols-1': viewMode === 'list', 'row-cols-lg-3 row-cols-md-2 row-cols-1': viewMode === 'grid' }]">
          <div v-for="doctor in paginatedDoctors" :key="doctor.id" class="col">
            <div
              class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden"
              :class="{ 'flex-row': viewMode === 'list' }"
              style="cursor: pointer;"
              @click="viewDoctorDetails(doctor)"
            >
              <div :class="['doctor-image', { 'col-4': viewMode === 'list', 'w-100': viewMode === 'grid' }]">
                <img :src="doctor.photo" :alt="doctor.name" class="img-fluid w-100 h-100 object-fit-cover" />
                <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill">
                  <i class="fas fa-star me-1"></i>{{ doctor.rating }}
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
                      <span
                        v-for="slot in doctor.availableSlots.slice(0, 3)"
                        :key="slot"
                        class="badge bg-light text-primary border border-primary-subtle px-3 py-2"
                      >
                        {{ slot }}
                      </span>
                      <span v-if="doctor.availableSlots.length > 3" class="text-muted fw-bold align-self-center">
                        +{{ doctor.availableSlots.length - 3 }} more
                      </span>
                    </div>
                  </div>
                  <div class="d-flex gap-2 mt-3">
                    <button @click.stop="bookAppointment(doctor)" class="btn btn-primary w-100 rounded-pill">
                      <i class="fas fa-calendar-plus me-2"></i>Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-5">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link rounded-start-pill" href="#" @click.prevent="goToPage(currentPage - 1)">
                <i class="fas fa-chevron-right"></i>
              </a>
            </li>
            <li
              class="page-item"
              v-for="page in visiblePages"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link rounded-end-pill" href="#" @click.prevent="goToPage(currentPage + 1)">
                <i class="fas fa-chevron-left"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
import { doctors, specialties, cities } from '../data/doctors.js'

export default {
  name: 'DoctorsPage',
  data() {
    return {
      doctors: doctors,
      specialties: specialties,
      cities: cities,
      filteredDoctors: [],
      searchQuery: '',
      selectedSpecialty: 'All Specialties',
      selectedLocation: 'All Cities',
      sortBy: 'name',
      viewMode: 'grid',
      currentPage: 1,
      doctorsPerPage: 6,
    }
  },
  computed: {
    hasActiveFilters() {
      return (
        this.searchQuery ||
        this.selectedSpecialty !== 'All Specialties' ||
        this.selectedLocation !== 'All Cities'
      );
    },
    paginatedDoctors() {
      const start = (this.currentPage - 1) * this.doctorsPerPage;
      const end = start + this.doctorsPerPage;
      return this.filteredDoctors.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredDoctors.length / this.doctorsPerPage);
    },
    visiblePages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  mounted() {
    this.initializeFromQuery();
    this.filterDoctors();
  },
  watch: {
    '$route.query': {
      handler() {
        this.initializeFromQuery();
        this.filterDoctors();
      },
      deep: true,
    },
  },
  methods: {
    initializeFromQuery() {
      const query = this.$route.query;
      if (query.search) this.searchQuery = query.search;
      if (query.specialty) this.selectedSpecialty = query.specialty;
      if (query.location) this.selectedLocation = query.location;
    },
    filterDoctors() {
      let filtered = [...this.doctors];
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialty.toLowerCase().includes(query)
        );
      }
      if (this.selectedSpecialty !== 'All Specialties') {
        filtered = filtered.filter((doctor) => doctor.specialty === this.selectedSpecialty);
      }
      if (this.selectedLocation !== 'All Cities') {
        filtered = filtered.filter((doctor) => doctor.location === this.selectedLocation);
      }
      this.filteredDoctors = filtered;
      this.sortDoctors();
      this.currentPage = 1;
    },
    sortDoctors() {
      this.filteredDoctors.sort((a, b) => {
        switch (this.sortBy) {
          case 'rating': return b.rating - a.rating;
          case 'experience': return parseInt(b.experience) - parseInt(a.experience);
          case 'name':
          default: return a.name.localeCompare(b.name, 'en');
        }
      });
    },
    clearSearch() {
      this.searchQuery = '';
      this.filterDoctors();
    },
    clearSpecialtyFilter() {
      this.selectedSpecialty = 'All Specialties';
      this.filterDoctors();
    },
    clearLocationFilter() {
      this.selectedLocation = 'All Cities';
      this.filterDoctors();
    },
    clearAllFilters() {
      this.searchQuery = '';
      this.selectedSpecialty = 'All Specialties';
      this.selectedLocation = 'All Cities';
      this.filterDoctors();
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) this.currentPage = page;
    },
    bookAppointment(doctor) {
      this.$router.push({
        name: 'Booking',
        params: { doctorId: doctor.id },
      });
    },
    viewDoctorDetails(doctor) {
      this.bookAppointment(doctor);
    },
  },
};
</script>

<style scoped>
.form-select.rounded-pill {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}
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
