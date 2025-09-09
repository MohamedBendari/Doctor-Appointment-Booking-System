<template>
  <div class="doctor-dashboard-page py-5 bg-light" style="direction: ltr;">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="display-5 fw-bold text-primary mb-1">Doctor Dashboard</h1>
          <p class="lead text-muted">Welcome, {{ doctorName }}.</p>
        </div>
        <router-link to="/doctor-profile" class="btn btn-secondary rounded-pill px-4">
          <i class="fas fa-user-cog me-2"></i>
          Profile Settings
        </router-link>
      </div>

      <div class="row g-4 mb-5 justify-content-center">
        <div class="col-md-3 col-sm-6">
          <div class="card p-4 h-100 shadow-sm border-0 rounded-4 text-center">
            <h5 class="card-title text-primary fw-bold">Today's Appointments</h5>
            <p class="display-4 fw-bold text-dark">{{ todayAppointments.length }}</p>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="card p-4 h-100 shadow-sm border-0 rounded-4 text-center">
            <h5 class="card-title text-primary fw-bold">Total Patients</h5>
            <p class="display-4 fw-bold text-dark">{{ totalPatients }}</p>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="card p-4 h-100 shadow-sm border-0 rounded-4 text-center">
            <h5 class="card-title text-primary fw-bold">Upcoming Appointments</h5>
            <p class="display-4 fw-bold text-dark">{{ upcomingAppointments.length }}</p>
          </div>
        </div>
      </div>
      
      <h2 class="h3 fw-bold mb-4">Today's Appointments</h2>
      <div v-if="todayAppointments.length === 0" class="alert alert-info text-center py-5 rounded-4 border-0">
        <i class="fas fa-calendar-check fa-4x text-light mb-3"></i>
        <h4 class="mt-3">No Appointments Today</h4>
        <p class="mb-0">There are no booked appointments at the moment.</p>
      </div>
      <div v-else class="list-group">
        <div v-for="appointment in todayAppointments" :key="appointment.id" class="list-group-item p-4 rounded-4 mb-3 border-0 shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div class="d-flex align-items-center flex-grow-1">
            <div class="appointment-info flex-grow-1">
              <h5 class="mb-1 fw-bold text-primary">Patient: {{ appointment.patientName }}</h5>
              <div class="d-flex gap-3 text-muted small mt-2">
                <p class="mb-0"><i class="fas fa-clock me-1"></i> Time: {{ appointment.appointmentTime }}</p>
                <p class="mb-0"><i class="fas fa-phone me-1"></i> {{ appointment.patientPhone }}</p>
                <p class="mb-0"><i class="fas fa-envelope me-1"></i> {{ appointment.patientEmail }}</p>
              </div>
            </div>
          </div>
          <button @click="markAsComplete(appointment)" class="btn btn-success rounded-pill px-4 mt-3 mt-md-0">
            <i class="fas fa-check me-2"></i>
            Completed
          </button>
        </div>
      </div>

      <h2 class="h3 fw-bold mt-5 mb-4">All Appointments</h2>
      <div class="card p-4 shadow-sm rounded-4 border-0">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead class="bg-light">
              <tr>
                <th scope="col" class="fw-bold">Patient</th>
                <th scope="col" class="fw-bold">Date</th>
                <th scope="col" class="fw-bold">Time</th>
                <th scope="col" class="fw-bold">Phone</th>
                <th scope="col" class="fw-bold">Status</th>
                <th scope="col" class="fw-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="doctorAppointments.length === 0">
                <td colspan="6" class="text-center text-muted py-4">No booked appointments</td>
              </tr>
              <tr v-else v-for="appointment in doctorAppointments" :key="appointment.id">
                <td>{{ appointment.patientName }}</td>
                <td>{{ formatDate(appointment.appointmentDate) }}</td>
                <td>{{ appointment.appointmentTime }}</td>
                <td>{{ appointment.patientPhone }}</td>
                <td>
                  <span class="badge rounded-pill px-3 py-2" :class="getStatusClass(appointment)">
                    {{ getStatusText(appointment) }}
                  </span>
                </td>
                <td>
                  <button @click="viewAppointmentDetails(appointment)" class="btn btn-sm btn-outline-secondary rounded-pill">
                    <i class="fas fa-eye me-1"></i>
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'DoctorDashboardPage',
  data() {
    return {
      allAppointments: [],
      doctorName: '',
      doctorId: null,
      showNotesModal: false,
      showDetailsModal: false,
      selectedAppointment: null,
    };
  },
  mounted() {
    this.checkAuth();
    this.loadAppointments();
  },
  computed: {
    doctorAppointments() {
      if (!this.doctorId) return [];
      return this.allAppointments.filter(app => app.doctorId === this.doctorId);
    },
    upcomingAppointments() {
      const now = new Date();
      return this.doctorAppointments.filter(app => {
        const appointmentDate = new Date(app.appointmentDate);
        return appointmentDate.toDateString() !== now.toDateString() && appointmentDate > now && app.status !== 'completed';
      });
    },
    todayAppointments() {
      const today = new Date().toDateString();
      return this.doctorAppointments.filter(app => new Date(app.appointmentDate).toDateString() === today && app.status !== 'completed');
    },
    completedAppointments() {
      return this.doctorAppointments.filter(app => app.status === 'completed');
    },
    totalPatients() {
      return new Set(this.doctorAppointments.map(app => app.patientEmail)).size;
    }
  },
  methods: {
    checkAuth() {
      const savedDoctor = localStorage.getItem('currentDoctor');
      if (savedDoctor) {
        const doctorData = JSON.parse(savedDoctor);
        this.doctorName = doctorData.name;
        this.doctorId = doctorData.id;
      } else {
        this.$router.push('/doctor-login');
      }
    },
    loadAppointments() {
      const savedAppointments = localStorage.getItem('myAppointments');
      if (savedAppointments) {
        this.allAppointments = JSON.parse(savedAppointments);
        this.allAppointments.forEach(app => {
          if (!app.hasOwnProperty('status')) {
            app.status = 'upcoming'; // set default status
          }
        });
      }
    },
    markAsComplete(appointment) {
      const appointmentIndex = this.allAppointments.findIndex(app => app.id === appointment.id);
      if (appointmentIndex !== -1) {
        this.allAppointments[appointmentIndex].status = 'completed';
        localStorage.setItem('myAppointments', JSON.stringify(this.allAppointments));
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    getStatusClass(appointment) {
      if (appointment.status === 'completed') {
        return 'bg-success-subtle text-success';
      }
      const appointmentDate = new Date(appointment.appointmentDate);
      const today = new Date();
      if (appointmentDate.toDateString() === today.toDateString()) {
        return 'bg-warning-subtle text-warning-emphasis';
      }
      return 'bg-info-subtle text-info';
    },
    getStatusText(appointment) {
      if (appointment.status === 'completed') {
        return 'Completed';
      }
      const appointmentDate = new Date(appointment.appointmentDate);
      const today = new Date();
      if (appointmentDate.toDateString() === today.toDateString()) {
        return 'Today';
      }
      return 'Upcoming';
    },
    viewAppointmentDetails(appointment) {
      this.selectedAppointment = appointment;
      this.showDetailsModal = true;
    },
    closeDetailsModal() {
      this.showDetailsModal = false;
      this.selectedAppointment = null;
    }
  }
};
</script>

<style scoped>
.doctor-dashboard-page {
  direction: ltr;
}
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.list-group-item:hover {
  background-color: #f8f9fa;
  transform: scale(1.01);
}
</style>
