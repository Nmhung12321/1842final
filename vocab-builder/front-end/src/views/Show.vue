<template>
  <div class="ui raised very padded text container segment">
    <h1 class="ui blue center aligned header">Word Details</h1>

    <div class="ui large blue form">
      <div class="field">
        <label for="german" class="ui green basic label">
          <i class="de flag"></i> German
        </label>
        <input type="text" class="ui input" readonly="" :value="word.german" id="german" />
      </div>
      <div class="field">
        <label for="english" class="ui blue basic label">
          <i class="gb flag"></i> English
        </label>
        <input type="text" class="" readonly="" :value="word.english" id="english" />
      </div>
      <div class="field">
        <label for="vietnamese" class="ui red basic label">
          <i class="vn flag"></i> Vietnamese
        </label>
        <input type="text" class="" readonly="" :value="word.vietnamese" id="vietnamese" />
      </div>
      <div class="field">
        <label for="category" class="ui brown label">
          <i class="tags icon"></i> Category
        </label>
        <input type="text" class="" readonly="" :value="word.category?.name || 'unknown'" id="category" />
      </div>
    </div>

    <div class="ui center aligned segment basic">
      <button
      @click="goBack"
      class="ui large green inverted button"
      title="Go back words page"
      >
        <i class="chevron circle left icon"></i> Go Back
      </button>
      <router-link 
      :to="{ name: 'edit-word', params: { id: this.$route.params.id }}" 
      class="ui large blue inverted button"
      title="Edit the word"
      >
        <i class="edit icon"></i> Edit Word
      </router-link>
    </div>
  </div>
</template>

<script>
import { vocabApi } from '@/helpers/vocabApi';

export default {
  name: 'show',
  data() {
    return {
      word: {}
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    this.word = await vocabApi.getWord(id);
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'words' });
    }
  }
};
</script>
