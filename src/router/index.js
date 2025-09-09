import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Doctors from '../pages/Doctors.vue';
import MyAppointments from '../pages/MyAppointmentsPage.vue';
import Contact from '../pages/Contact.vue';
import Booking from '../pages/Booking.vue';
import DoctorLogin from '../pages/DoctorLogin.vue';
import DoctorDashboard from '../pages/Dashboard.vue';
import DoctorProfile from '../pages/DoctorProfilePage.vue'; // استيراد الصفحة الجديدة

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/doctors', name: 'Doctors', component: Doctors },
  { path: '/my-appointments', name: 'MyAppointments', component: MyAppointments },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/book/:doctorId', name: 'Booking', component: Booking, props: true },
  { path: '/doctor-login', name: 'DoctorLogin', component: DoctorLogin },
  { path: '/doctor-dashboard', name: 'DoctorDashboard', component: DoctorDashboard },
  { path: '/doctor-profile', name: 'DoctorProfile', component: DoctorProfile } // إضافة المسار الجديد
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;