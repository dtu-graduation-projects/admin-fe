<style>
.go-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: none;
  z-index: 2000;
  color: slategray;
}

.go-to-top.show {
  display: block;
}
</style>

<template>
  <div>
    <!-- Your page content here -->
    <button class="go-to-top" @click="goToTop" :class="{ show: showButton }"><ArrowUpIcon></ArrowUpIcon></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButton: false,
    };
  },
  methods: {
    goToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    checkScroll() {
      if (window.pageYOffset > 100) {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.checkScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.checkScroll);
  },
};
</script>
<style scoped>
.go-to-top.show {
  display: block;
  border: 2px solid slategray;
  padding: 5px;
  border-radius: 50%;
}
</style>