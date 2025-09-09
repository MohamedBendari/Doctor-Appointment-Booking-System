<template>
  <div class="container text-center py-5">
    <h1 class="display-5 fw-bold text-primary mb-4">{{ msg }}</h1>
    
    <p class="lead mb-5 text-muted">
      For a guide on how to configure and customize this project, please check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-info-emphasis fw-bold">Vue CLI documentation</a>.
    </p>

    <div class="row g-4 justify-content-center">
      <div class="col-12 col-md-4">
        <div class="card p-4 shadow-sm rounded-4 h-100">
          <h3 class="h5 fw-bold mb-3 text-secondary">Installed CLI Plugins</h3>
          <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
            <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener" class="text-decoration-none text-primary">Babel</a></li>
            <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener" class="text-decoration-none text-primary">ESLint</a></li>
          </ul>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card p-4 shadow-sm rounded-4 h-100">
          <h3 class="h5 fw-bold mb-3 text-secondary">Essential Links</h3>
          <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
            <li><a href="https://vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-primary">Core Docs</a></li>
            <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-primary">Forum</a></li>
            <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-primary">Community Chat</a></li>
            <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener" class="text-decoration-none text-primary">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card p-4 shadow-sm rounded-4 h-100">
          <h3 class="h5 fw-bold mb-3 text-secondary">Ecosystem</h3>
          <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
            <li><a href="https://router.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-primary">vue-router</a></li>
            <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-primary">Vuex</a></li>
            <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener" class="text-decoration-none text-primary">vue-devtools</a></li>
            <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-primary">vue-loader</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
/* No custom styles needed for layout or colors as Bootstrap handles everything. */
</style>