<template>
  <div class="booking-page">
    <section class="bg-primary text-white py-5 text-center">
      <div class="container">
        <h1 class="display-4 fw-bold">Book Appointment with {{ doctor.name }}</h1>
        <p class="lead">Fill out the form below to book your appointment</p>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container">
        <div class="card p-4 p-md-5 mx-auto border-0 shadow-lg rounded-4" style="max-width: 800px;">
          <div class="d-flex align-items-center mb-4 pb-3 border-bottom">
            <img :src="doctor.photo" :alt="doctor.name" class="rounded-circle me-3 border border-primary border-3" style="width: 100px; height: 100px; object-fit: cover;">
            <div class="doctor-info-summary">
              <h3 class="h4 fw-bold text-primary mb-1">{{ doctor.name }}</h3>
              <p class="text-muted mb-1">{{ doctor.specialty }}</p>
              <p class="text-muted mb-1"><i class="fas fa-map-marker-alt text-primary me-2"></i> {{ doctor.location }}</p>
              <p class="text-muted mb-0"><i class="fas fa-star text-warning me-2"></i> {{ doctor.rating }} ({{ doctor.experience }})</p>
            </div>
          </div>

          <form @submit.prevent="submitBooking" class="row g-4">
            <div class="col-md-6">
              <label for="patientName" class="form-label fw-bold">Patient Name:</label>
              <input type="text" id="patientName" v-model="booking.patientName" class="form-control" required>
              <div v-if="errors.patientName" class="text-danger mt-1">{{ errors.patientName }}</div>
            </div>

            <div class="col-md-6">
              <label for="patientPhone" class="form-label fw-bold">Phone Number:</label>
              <input type="tel" id="patientPhone" v-model="booking.patientPhone" class="form-control" required>
              <div v-if="errors.patientPhone" class="text-danger mt-1">{{ errors.patientPhone }}</div>
            </div>

            <div class="col-md-6">
              <label for="patientEmail" class="form-label fw-bold">Email Address:</label>
              <input type="email" id="patientEmail" v-model="booking.patientEmail" class="form-control" required>
              <div v-if="errors.patientEmail" class="text-danger mt-1">{{ errors.patientEmail }}</div>
            </div>

            <div class="col-md-6">
              <label for="appointmentDate" class="form-label fw-bold">Appointment Date:</label>
              <input type="date" id="appointmentDate" v-model="booking.appointmentDate" class="form-control" :min="minDate" required>
              <div v-if="errors.appointmentDate" class="text-danger mt-1">{{ errors.appointmentDate }}</div>
            </div>

            <div class="col-12">
              <label for="appointmentTime" class="form-label fw-bold">Appointment Time:</label>
              <select id="appointmentTime" v-model="booking.appointmentTime" class="form-select" required>
                <option value="" disabled>Select a time</option>
                <option v-for="slot in doctor.availableSlots" :key="slot" :value="slot">{{ slot }}</option>
              </select>
              <div v-if="errors.appointmentTime" class="text-danger mt-1">{{ errors.appointmentTime }}</div>
            </div>

            <div class="col-12 text-center mt-4">
              <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill">Confirm Booking</button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <div v-if="showConfirmation" class="modal-backdrop fade show d-flex justify-content-center align-items-center">
      <div class="modal-dialog">
        <div class="modal-content rounded-4 shadow-lg p-4">
          <div class="modal-body text-center">
            <h2 class="text-success mb-3">Your booking has been confirmed!</h2>
            <p class="lead text-muted mb-4">Thank you, {{ booking.patientName }}. Your appointment with Dr. {{ doctor.name }} has been booked for {{ booking.appointmentDate }} at {{ booking.appointmentTime }}.</p>
            <button @click="closeConfirmation" class="btn btn-primary rounded-pill px-4">Okay</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doctors } from "../data/doctors";

export default {
  name: "BookingPage",
  props: ["doctorId"],
  data() {
    return {
      doctor: null,
      booking: {
        patientName: "",
        patientPhone: "",
        patientEmail: "",
        appointmentDate: "",
        appointmentTime: "",
        doctorId: null,
        doctorName: "",
        specialty: "",
        location: "",
      },
      errors: {},
      showConfirmation: false,
      minDate: new Date().toISOString().split("T")[0],
    };
  },
  created() {
    this.doctor = doctors.find((d) => d.id == this.doctorId);
    if (this.doctor) {
      this.booking.doctorId = this.doctor.id;
      this.booking.doctorName = this.doctor.name;
      this.booking.specialty = this.doctor.specialty;
      this.booking.location = this.doctor.location;
    } else {
      this.$router.push("/doctors"); // Redirect if doctor not found
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.booking.patientName) {
        this.errors.patientName = "Name is required.";
      }
      if (!this.booking.patientPhone) {
        this.errors.patientPhone = "Phone number is required.";
      } else if (!/^\d{10,15}$/.test(this.booking.patientPhone)) {
        this.errors.patientPhone = "Invalid phone number.";
      }
      if (!this.booking.patientEmail) {
        this.errors.patientEmail = "Email is required.";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.booking.patientEmail)) {
        this.errors.patientEmail = "Invalid email address.";
      }
      if (!this.booking.appointmentDate) {
        this.errors.appointmentDate = "Appointment date is required.";
      }
      if (!this.booking.appointmentTime) {
        this.errors.appointmentTime = "Appointment time is required.";
      }
      return Object.keys(this.errors).length === 0;
    },
    submitBooking() {
      if (this.validateForm()) {
        let bookings = JSON.parse(localStorage.getItem("myAppointments")) || [];
        bookings.push(this.booking);
        localStorage.setItem("myAppointments", JSON.stringify(bookings));

        this.showConfirmation = true;
      }
    },
    closeConfirmation() {
      this.showConfirmation = false;
      this.$router.push("/my-appointments");
    },
  },
};
</script>

<style scoped>
/* Custom styles for components without a direct Bootstrap equivalent */
.booking-page {
  direction: ltr; /* Ensure LTR direction for English content */
}

/* Modal styles using Bootstrap classes with minor overrides */
.modal-backdrop.show {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
}

.modal-dialog {
  max-width: 500px;
  margin: auto;
}
</style>