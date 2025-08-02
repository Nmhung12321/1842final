<template>
  <div id="app">
    <Header></Header>

    <!-- Main Content -->
    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    'Header': Header,
    'Footer': Footer
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app > div.ui.text.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.myFlash {
  width: 300px;
  margin: 10px;
  position: absolute;
  top: 50px;
  right: 15px;
  z-index: 1000;
}

input {
  width: 300px;
}

div.label {
  width: 130px;
}

div.input {
  margin-bottom: 10px;
}

h1.ui.header {
  padding: 5px;
  width: 40%;
  margin-inline: auto;
  border-bottom: 3px solid #7c3aed;
  margin-bottom: 1em;
}
</style>
