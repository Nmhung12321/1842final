<template>
  <div class="ui container">
    <div class="ui raised very padded segment">
      <h1 class="ui blue center aligned header">Words</h1>

      <suggest-search 
      :data="allWords"
      :search-fields="['german', 'english', 'vietnamese']"
      placeholder="Searching word ..."
      @search="onSearchUpdate"
      ></suggest-search>

      <word-table
      :all-words="allWords"
      :words="words"
      @delete="onDestroy"
      ></word-table>
    </div>
  </div>
</template>

<script>
import SuggestSearch from '@/components/SuggestSearch.vue';
import { vocabApi } from '@/helpers/vocabApi';
import WordTable from '@/components/WordTable.vue';

export default {
  name: 'words',
  components: {
    'suggest-search': SuggestSearch,
    'word-table': WordTable
  },
  data() {
    return {
      allWords: [],
      words: []
    };
  },
  async mounted() {
    this.allWords = await vocabApi.getWords();
    this.words = [...this.allWords];
  },
  methods: {
    async onDestroy(id) {
      await vocabApi.deleteWord(id);
      this.flash('Word deleted successfully!', 'success');
      this.words = this.words.filter(word => word._id !== id);
    },
    async onSearchUpdate(filtered) {
      if (filtered === null) {
        this.words = [...this.allWords];
      } else {
        this.words = filtered.length ? filtered : [];
      }
    }
  }
};
</script>
