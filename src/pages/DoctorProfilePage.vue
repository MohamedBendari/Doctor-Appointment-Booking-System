<template>
  <div class="doctor-profile-page py-5 bg-light" style="direction: ltr;">
    <div class="container">
      <h1 class="display-5 fw-bold text-primary mb-4">My Profile Settings</h1>
      <p class="lead text-muted mb-5">Edit your available schedule.</p>

      <div class="card p-4 shadow-sm rounded-4 border-0" style="max-width: 800px; margin: auto;">
        <form @submit.prevent="saveProfile">
          <h4 class="h5 fw-bold mb-3">Edit Available Time Slots</h4>
          <div class="row g-3">
            <div class="col-12">
              <label class="form-label">Choose your available times:</label>
              <div class="d-flex flex-wrap gap-2">
                <div v-for="slot in allTimeSlots" :key="slot" class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" :id="slot" :value="slot" v-model="profile.availableSlots">
                  <label class="form-check-label" :for="slot">{{ slot }}</label>
                </div>
              </div>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary mt-4 rounded-pill px-5">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { doctors } from '../data/doctors';

export default {
  name: 'DoctorProfilePage',
  data() {
    return {
      profile: {
        id: 1,
        availableSlots: []
      },
      allTimeSlots: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"]
    };
  },
  mounted() {
    this.loadProfile();
  },
  methods: {
    loadProfile() {
      const doctorData = doctors.find(d => d.id === this.profile.id);
      if (doctorData) {
        this.profile.availableSlots = [...doctorData.availableSlots];
      }
    },
    saveProfile() {
      const doctorIndex = doctors.findIndex(d => d.id === this.profile.id);
      if (doctorIndex !== -1) {
        doctors[doctorIndex].availableSlots = this.profile.availableSlots;
        alert('Changes saved successfully!');
        this.$router.push('/doctor-dashboard');
      }
    }
  }
};
</script>

<style scoped>
.doctor-profile-page {
  direction: ltr;
}
</style>
