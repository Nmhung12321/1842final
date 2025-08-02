<template>
  <div class="ui search icon input fluid suggest-search">
    <input
      v-model="query"
      @input="handleInput"
      id="search"
      type="text"
      :placeholder="placeholder"
      class="prompt"
    />
    <i class="search icon"></i>
  </div>
</template>

<script>
export default {
  name: "SuggestSearch",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Searching ...'
    },
    searchFields: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      query: "",
      suggestList: [],
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
        this.suggestList = [];
        this.$emit("search", null);
        return;
      }

      this.suggestList = this.data.filter(item =>
        this.searchFields.some(field =>
          (item[field] || '').toLowerCase().includes(q)
        )
      );
      
      this.$emit("search", this.suggestList);
      
    },
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
