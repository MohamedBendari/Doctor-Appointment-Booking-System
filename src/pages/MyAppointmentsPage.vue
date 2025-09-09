<template>
  <div class="my-appointments-page">
    <section class="bg-primary text-white py-5 text-center">
      <div class="container">
        <h1 class="display-4 fw-bold">My Appointments</h1>
        <p class="lead">Manage your medical appointments</p>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container">
        <div v-if="appointments.length === 0" class="text-center text-muted py-5">
          <i class="fas fa-calendar-times fa-4x text-light mb-3"></i>
          <h3>No appointments booked</h3>
          <p>You have not booked any appointments yet</p>
          <router-link to="/doctors" class="btn btn-primary mt-3">Book Your First Appointment</router-link>
        </div>

        <div v-else class="d-flex flex-column gap-4">
          <div v-for="appointment in appointments" :key="appointment.id" class="card p-4 shadow-sm rounded-4 border-0">
            <div class="d-flex justify-content-between align-items-start mb-3 pb-3 border-bottom">
              <div class="doctor-info">
                <h3 class="h5 fw-bold text-primary mb-1">{{ appointment.doctorName }}</h3>
                <p class="text-primary fw-bold mb-1">{{ appointment.specialty }}</p>
                <p class="text-muted small mb-0"><i class="fas fa-map-marker-alt text-primary me-1"></i> {{ appointment.location }}</p>
              </div>
              <div class="badge rounded-pill px-3 py-2" :class="getStatusClass(appointment)">
                {{ getStatusText(appointment) }}
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-sm-6 d-flex align-items-center gap-2 text-muted">
                <i class="fas fa-calendar text-primary"></i>
                <span>{{ formatDate(appointment.appointmentDate) }}</span>
              </div>
              <div class="col-sm-6 d-flex align-items-center gap-2 text-muted">
                <i class="fas fa-clock text-primary"></i>
                <span>{{ appointment.appointmentTime }}</span>
              </div>
              <div class="col-sm-6 d-flex align-items-center gap-2 text-muted">
                <i class="fas fa-user text-primary"></i>
                <span>{{ appointment.patientName }}</span>
              </div>
              <div class="col-sm-6 d-flex align-items-center gap-2 text-muted">
                <i class="fas fa-phone text-primary"></i>
                <span>{{ appointment.patientPhone }}</span>
              </div>
            </div>

            <div class="d-flex gap-2 justify-content-end mt-3">
              <button
                v-if="canCancel(appointment)"
                @click="cancelAppointment(appointment)"
                class="btn btn-outline-danger rounded-pill px-4"
              >
                <i class="fas fa-times me-2"></i>
                Cancel Appointment
              </button>
              <button
                v-if="canReschedule(appointment)"
                @click="rescheduleAppointment(appointment)"
                class="btn btn-outline-secondary rounded-pill px-4"
              >
                <i class="fas fa-edit me-2"></i>
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="showCancelModal" class="modal-backdrop fade show d-flex justify-content-center align-items-center">
      <div class="modal-dialog">
        <div class="modal-content rounded-4 shadow-lg p-4 text-center">
          <h3 class="fw-bold text-danger mb-3">Confirm Cancellation</h3>
          <p class="text-muted mb-4">Are you sure you want to cancel the appointment with {{ selectedAppointment.doctorName }}?</p>
          <div class="d-flex gap-2 justify-content-center mt-3">
            <button @click="confirmCancel" class="btn btn-danger rounded-pill px-4">Yes, Cancel</button>
            <button @click="closeCancelModal" class="btn btn-secondary rounded-pill px-4">Go Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAppointmentsPage',
  data() {
    return {
      appointments: [],
      showCancelModal: false,
      selectedAppointment: null
    }
  },
  mounted() {
    this.loadAppointments();
  },
  methods: {
    loadAppointments() {
      const savedAppointments = localStorage.getItem('myAppointments');
      if (savedAppointments) {
        this.appointments = JSON.parse(savedAppointments).map((appointment, index) => ({
          ...appointment,
          id: index + 1
        }));
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    getStatusClass(appointment) {
      const appointmentDate = new Date(appointment.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (appointmentDate < today) {
        return 'bg-success-subtle text-success';
      } else if (appointmentDate.toDateString() === today.toDateString()) {
        return 'bg-warning-subtle text-warning-emphasis';
      } else {
        return 'bg-info-subtle text-info';
      }
    },
    getStatusText(appointment) {
      const appointmentDate = new Date(appointment.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (appointmentDate < today) {
        return 'Completed';
      } else if (appointmentDate.toDateString() === today.toDateString()) {
        return 'Today';
      } else {
        return 'Upcoming';
      }
    },
    canCancel(appointment) {
      const appointmentDate = new Date(appointment.appointmentDate);
      const today = new Date();
      return appointmentDate >= today;
    },
    canReschedule(appointment) {
      const appointmentDate = new Date(appointment.appointmentDate);
      const today = new Date();
      return appointmentDate >= today;
    },
    cancelAppointment(appointment) {
      this.selectedAppointment = appointment;
      this.showCancelModal = true;
    },
    confirmCancel() {
      this.appointments = this.appointments.filter(app => app.id !== this.selectedAppointment.id);
      localStorage.setItem('myAppointments', JSON.stringify(this.appointments));
      this.closeCancelModal();
    },
    closeCancelModal() {
      this.showCancelModal = false;
      this.selectedAppointment = null;
    },
    rescheduleAppointment(appointment) {
      this.$router.push({
        name: 'Booking',
        params: { doctorId: appointment.doctorId }
      });
    }
  }
}
</script>