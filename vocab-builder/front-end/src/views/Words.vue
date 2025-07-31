<template>
  <div class="ui container">
    <div class="ui raised very padded segment">
      <h1 class="ui blue center aligned header">Words</h1>
      <suggest-search :words="allWords" @update="onSearchUpdate"></suggest-search>
      <table v-if="words.length" id="words" class="ui celled blue inverted center aligned table">
        <thead>
          <tr>
            <th>English</th>
            <th>German</th>
            <th>Vietnamese</th>
            <th colspan="3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(word, i) in words" :key="i">
            <td>{{ word.english }}</td>
            <td>{{ word.german }}</td>
            <td>{{ word.vietnamese }}</td>
            <td class="collapsing">
              <router-link
                :to="{ name: 'show', params: { id: word._id } }"
                class="ui green button compact circular"
                title="View details"
              >
                <i class="eye icon"></i> Show
              </router-link>
            </td>
            <td class="collapsing">
              <router-link
                :to="{ name: 'edit', params: { id: word._id } }"
                class="ui yellow button compact circular"
                title="Edit"
              >
                <i class="edit icon"></i> Edit
              </router-link>
            </td>
            <td class="collapsing">
              <button
                @click.prevent="onDestroy(word._id)"
                class="ui red button compact circular"
                title="Delete"
                style="margin: 0;"
              >
                <i class="trash icon"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="ui warning message">
        Can't find any suitable words!
      </p>
    </div>
  </div>
</template>

<script>
import SuggestSearch from '@/components/SuggestSearch.vue';
import { vocabApi } from '../helpers/vocabApi';

export default {
  name: 'words',
  components: {
    'suggest-search': SuggestSearch
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
      const confirmed = confirm('Are you sure you want to delete this word?');
      if (!confirmed) return;

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
