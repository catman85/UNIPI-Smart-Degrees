<template>
  <!-- Footer -->
<footer class="page-footer font-small blue pt-4">

  <!-- Copyright -->
  <div class="footer-copyright text-center py-3">© {{this.getCurrentYear()}},
     Made with ❤️ by<a href="https://github.com/catman85"> Jimmy </a>
  </div>
  <!-- Copyright -->

</footer>
<!-- Footer -->
</template>

<script>
  export default {
    name: "myfooter",
    data() {
      return {}
    },
    methods: {
      getCurrentYear() {
        return new Date().getFullYear();
      }
    }
  }

</script>
