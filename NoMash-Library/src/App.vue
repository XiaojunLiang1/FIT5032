<script>
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
import LibraryRegistrationForm from './components/LibraryRegistrationForm.vue'
import LoginView from './views/LoginView.vue';
import CountBookAPI from './views/CountBookAPI.vue';
import GetAllBookAPI from './views/GetAllBookAPI.vue';


export default {
  name: 'APP',
  components: {
    BHeader,
    //CountBookAPI,
    //GetAllBookAPI,
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI' && this.$route.name !== 'GetAllBookAPI';
    }
  }
}
</script>

<template>
  <header v-if="showHeader">
    <BHeader />
  </header>

  <main>
    <!-- <LibraryRegistrationForm /> -->
    <!-- <JSONLab /> -->
    <router-view></router-view>
    <!-- <LoginView /> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
