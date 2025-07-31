<template>
  <div class="ui blue tertiary inverted vertical footer large segment">
    <div class="ui center aligned container">
      <p>
          &copy; {{ new Date().getFullYear() }} Vocab Learning App. All rights reserved.
          <br>
          Designed by Hung.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
div.footer {
  padding: 2em 0;
  margin-top: 1.5em;
}

</style>