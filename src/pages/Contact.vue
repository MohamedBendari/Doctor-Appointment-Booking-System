<template>
  <div class="contact-page">
    <section class="bg-primary text-white py-5 text-center">
      <div class="container">
        <h1 class="display-4 fw-bold">Contact Us</h1>
        <p class="lead">We're here to help with any inquiries</p>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-6">
            <div class="card p-4 p-md-5 border-0 shadow-lg rounded-4 h-100">
              <h2 class="h4 fw-bold mb-4 text-primary">Send Us a Message</h2>
              <form @submit.prevent="submitForm" class="row g-4">
                <div class="col-12">
                  <label for="name" class="form-label fw-bold">Full Name:</label>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    class="form-control"
                    required
                  />
                  <div v-if="errors.name" class="text-danger mt-1">{{ errors.name }}</div>
                </div>

                <div class="col-12">
                  <label for="email" class="form-label fw-bold">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    class="form-control"
                    required
                  />
                  <div v-if="errors.email" class="text-danger mt-1">{{ errors.email }}</div>
                </div>

                <div class="col-12">
                  <label for="phone" class="form-label fw-bold">Phone Number:</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="form.phone"
                    class="form-control"
                  />
                </div>

                <div class="col-12">
                  <label for="subject" class="form-label fw-bold">Subject:</label>
                  <select id="subject" v-model="form.subject" class="form-select" required>
                    <option value="" disabled>Select a subject</option>
                    <option value="appointment">Appointment Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="complaint">Complaint</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="other">Other</option>
                  </select>
                  <div v-if="errors.subject" class="text-danger mt-1">{{ errors.subject }}</div>
                </div>

                <div class="col-12">
                  <label for="message" class="form-label fw-bold">Message:</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    class="form-control"
                    rows="5"
                    required
                  ></textarea>
                  <div v-if="errors.message" class="text-danger mt-1">{{ errors.message }}</div>
                </div>

                <div class="col-12 mt-3">
                  <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill" :disabled="isSubmitting">
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <i v-else class="fas fa-paper-plane me-2"></i>
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="d-flex flex-column gap-4 h-100">
              <div class="card p-4 border-0 shadow-sm rounded-4 h-100">
                <h2 class="h4 fw-bold mb-4 text-primary">Contact Information</h2>

                <div class="d-flex flex-column gap-3">
                  <div class="d-flex align-items-start gap-3 pb-3 border-bottom">
                    <i class="fas fa-map-marker-alt text-primary mt-1 fs-5"></i>
                    <div>
                      <h4 class="h6 fw-bold mb-1">Address</h4>
                      <p class="text-muted mb-0">Tahrir Street, Downtown<br>Cairo, Egypt</p>
                    </div>
                  </div>

                  <div class="d-flex align-items-start gap-3 pb-3 border-bottom">
                    <i class="fas fa-phone text-primary mt-1 fs-5"></i>
                    <div>
                      <h4 class="h6 fw-bold mb-1">Phone</h4>
                      <p class="text-muted mb-0">01234567890<br>02-12345678</p>
                    </div>
                  </div>

                  <div class="d-flex align-items-start gap-3 pb-3 border-bottom">
                    <i class="fas fa-envelope text-primary mt-1 fs-5"></i>
                    <div>
                      <h4 class="h6 fw-bold mb-1">Email</h4>
                      <p class="text-muted mb-0">info@clinic.com<br>support@clinic.com</p>
                    </div>
                  </div>

                  <div class="d-flex align-items-start gap-3">
                    <i class="fas fa-clock text-primary mt-1 fs-5"></i>
                    <div>
                      <h4 class="h6 fw-bold mb-1">Working Hours</h4>
                      <p class="text-muted mb-0">Saturday - Thursday: 9:00 AM - 10:00 PM<br>Friday: 2:00 PM - 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card p-4 border-0 shadow-sm rounded-4 text-center">
                <h4 class="h6 fw-bold mb-3 text-primary">Follow Us</h4>
                <div class="d-flex justify-content-center gap-3">
                  <a href="#" class="btn btn-sm text-white rounded-circle p-0" style="width: 40px; height: 40px; background-color: #3b5998; font-size: 1.2rem;">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="btn btn-sm text-white rounded-circle p-0" style="width: 40px; height: 40px; background-color: #1da1f2; font-size: 1.2rem;">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#" class="btn btn-sm text-white rounded-circle p-0" style="width: 40px; height: 40px; background-color: #e4405f; font-size: 1.2rem;">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="#" class="btn btn-sm text-white rounded-circle p-0" style="width: 40px; height: 40px; background-color: #0077b5; font-size: 1.2rem;">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="showSuccessModal" class="modal-backdrop fade show d-flex justify-content-center align-items-center">
      <div class="modal-dialog">
        <div class="modal-content rounded-4 shadow-lg p-4 text-center">
          <i class="fas fa-check-circle text-success mb-3" style="font-size: 3rem;"></i>
          <h3 class="fw-bold text-success mb-2">Your message was sent successfully!</h3>
          <p class="text-muted mb-4">Thank you for contacting us. We will respond to you as soon as possible.</p>
          <button @click="closeSuccessModal" class="btn btn-primary rounded-pill px-4">Okay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      showSuccessModal: false
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      
      if (!this.form.name.trim()) {
        this.errors.name = 'Name is required';
      }

      if (!this.form.email.trim()) {
        this.errors.email = 'Email is required';
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email address';
      }

      if (!this.form.subject) {
        this.errors.subject = 'Please select a subject';
      }

      if (!this.form.message.trim()) {
        this.errors.message = 'Message is required';
      } else if (this.form.message.trim().length < 10) {
        this.errors.message = 'Message is too short (minimum 10 characters)';
      }
      
      return Object.keys(this.errors).length === 0;
    },
    
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({
          ...this.form,
          timestamp: new Date().toISOString(),
          id: Date.now()
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        this.isSubmitting = false;
        this.showSuccessModal = true;
        this.resetForm();
      }, 2000);
    },
    
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      };
      this.errors = {};
    },
    
    closeSuccessModal() {
      this.showSuccessModal = false;
    }
  }
}
</script>

<style scoped>
/* You can keep minimal custom styles here if needed, but the goal is to use Bootstrap as much as possible */
.contact-page {
  direction: ltr; /* Ensure LTR direction for English content */
}

/* You can still add custom styles to fine-tune spacing or unique elements */
.form-control, .form-select {
  border-radius: 0.5rem;
}

/* Modal backdrop and dialog styling */
.modal-backdrop.show {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
}
</style>