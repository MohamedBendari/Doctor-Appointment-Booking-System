<template>
  <div v-if="upcomingAppointment" class="position-fixed bottom-0 start-0 m-4 rounded-4 shadow-lg text-white" style="z-index: 1000; animation: slideIn 0.5s ease-out; max-width: 350px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div class="d-flex align-items-start p-4 gap-3">
      <i class="fas fa-bell fs-4 text-warning mt-1"></i>
      <div class="flex-grow-1">
        <h4 class="h6 fw-bold mb-1">Reminder: Upcoming Appointment</h4>
        <p class="small mb-0 opacity-75">Appointment with {{ upcomingAppointment.doctorName }} at {{ formatTime(upcomingAppointment.appointmentTime) }}</p>
      </div>
      <button @click="dismissReminder" type="button" class="btn-close btn-close-white" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppointmentReminder',
  data() {
    return {
      upcomingAppointment: null,
      reminderInterval: null
    }
  },
  mounted() {
    this.checkUpcomingAppointments();
    // Check every minute
    this.reminderInterval = setInterval(this.checkUpcomingAppointments, 60000);
  },
  beforeUnmount() {
    if (this.reminderInterval) {
      clearInterval(this.reminderInterval);
    }
  },
  methods: {
    checkUpcomingAppointments() {
      const appointments = JSON.parse(localStorage.getItem('myAppointments') || '[]');
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      
      // Find appointments for today
      const todayAppointments = appointments.filter(app => app.appointmentDate === today);
      
      // Find the next appointment within 2 hours
      const upcomingAppointments = todayAppointments.filter(app => {
        const [hours, minutes] = app.appointmentTime.split(':').map(Number);
        const appointmentTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
        const timeDiff = appointmentTime.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        return hoursDiff > 0 && hoursDiff <= 2;
      });
      
      if (upcomingAppointments.length > 0) {
        // Sort by time and get the earliest
        upcomingAppointments.sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime));
        this.upcomingAppointment = upcomingAppointments[0];
      } else {
        this.upcomingAppointment = null;
      }
    },
    formatTime(time) {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes);
      
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    },
    dismissReminder() {
      this.upcomingAppointment = null;
    }
  }
}
</script>

<style scoped>
/* Custom animation for the sliding effect */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>