<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  <p>can I haz auto reload?  I can!</p>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App, bundled with Brunch! yay"
    };
  }
};
</script>
