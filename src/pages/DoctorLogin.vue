<template>
  <div class="doctor-login-page d-flex align-items-center py-5">
    <section class="w-100" style="direction: ltr;">
      <div class="container">
        <div class="card mx-auto p-4 p-md-5 shadow-lg rounded-4 border-0" style="max-width: 450px;">
          <div class="text-center mb-4">
            <i class="fas fa-user-md text-primary mb-3" style="font-size: 3rem;"></i>
            <h2 class="h4 fw-bold text-dark mb-1">Doctor Login</h2>
            <p class="text-muted">Sign in to access the dashboard</p>
          </div>

          <form @submit.prevent="login" class="d-grid gap-3">
            <div class="mb-3">
              <label for="email" class="form-label fw-bold">Email:</label>
              <input
                type="email"
                id="email"
                v-model="credentials.email"
                class="form-control rounded-pill px-3 py-2"
                required
                placeholder="doctor@example.com"
              />
              <div v-if="errors.email" class="text-danger small mt-1">{{ errors.email }}</div>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label fw-bold">Password:</label>
              <div class="input-group rounded-pill">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="credentials.password"
                  class="form-control border-end-0 rounded-start-pill px-3 py-2"
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="btn btn-outline-secondary border-start-0 rounded-end-pill"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="rememberMe" id="rememberMe">
                <label class="form-check-label text-muted small" for="rememberMe">Remember me</label>
              </div>
              <a href="#" class="text-decoration-none text-primary small">Forgot password?</a>
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill mt-3" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <i v-else class="fas fa-sign-in-alt me-2"></i>
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
          </form>

          <div class="p-3 mt-4 rounded-3 border-start border-4 border-primary bg-light text-muted">
            <h4 class="h6 fw-bold mb-1">Demo Credentials:</h4>
            <p class="mb-0 small"><strong>Email:</strong> ahmed.mohamed@hospital.com</p>
            <p class="mb-0 small"><strong>Password:</strong> 1234567</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// قم باستيراد ملف البيانات الخاص بالأطباء
import { doctors } from '../data/doctors.js';

export default {
  name: 'DoctorLoginPage',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      errors: {},
      showPassword: false,
      rememberMe: false,
      isLoading: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    validateForm() {
      this.errors = {};
      if (!this.credentials.email) {
        this.errors.email = 'البريد الإلكتروني مطلوب.';
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.credentials.email)) {
        this.errors.email = 'بريد إلكتروني غير صالح.';
      }
      if (!this.credentials.password) {
        this.errors.password = 'كلمة المرور مطلوبة.';
      } else if (this.credentials.password.length < 6) {
        this.errors.password = 'كلمة المرور قصيرة جداً.';
      }
      return Object.keys(this.errors).length === 0;
    },

    async login() {
      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;

      setTimeout(() => {
        // البحث عن الطبيب في ملف البيانات
        const foundDoctor = doctors.find(doc => 
          doc.email === this.credentials.email && doc.password === this.credentials.password
        );
        
        if (foundDoctor) {
          // تخزين بيانات الطبيب في localStorage
          localStorage.setItem('doctorLoggedIn', 'true');
          localStorage.setItem('currentDoctor', JSON.stringify({
            id: foundDoctor.id,
            name: foundDoctor.name
          }));
          
          this.isLoading = false;
          this.$router.push('/doctor-dashboard');
        } else {
          this.isLoading = false;
          this.errors.password = 'بيانات الدخول غير صحيحة.';
        }
      }, 1500);
    }
  }
};
</script>

<style scoped>
.doctor-login-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
</style>