<template>
  <div class="ui search icon input fluid suggest-search">
    <input
      v-model="query"
      @input="handleInput"
      id="search"
      type="text"
      placeholder="Searching..."
      class="prompt"
    />
    <i class="search icon"></i>
  </div>
</template>

<script>
export default {
  name: "SuggestSearch",
  props: {
    words: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      query: "",
      suggestWords: [],
    };
  },
  watch: {
    query() {
      this.handleInput();
    }
  },
  methods: {
    handleInput() {
      const q = this.query.trim().toLowerCase();
      if (!q) {
        this.suggestWords = [];
        this.$emit("update", null);
        return;
      }

      this.suggestWords = this.words.filter((w) =>
        [w.german, w.english, w.vietnamese].some(val =>
          val.toLowerCase().includes(q)
        )
      );
      
      this.$emit("update", this.suggestWords);
      
    },
    selectWord(word) {
      this.query = `${word.german} → ${word.english}`;
      this.suggestWords = [word];
      this.$emit("update", [word]);
    },
  },
  mounted() {
    console.log("Words received: ", this.words);
    
  }
};
</script>

<style scoped>
.suggest-search {
  width: 100%;
  box-shadow: 0 2px 8px rgba(145, 0, 255, 0.15);
  border-radius: 20px;
}
</style>
