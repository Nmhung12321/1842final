<template>
  <form @submit.prevent="startTest" @reset.prevent="resetForm" class="ui form">
    <h2 class="ui pink diving header center aligned">Configure Test</h2>

    <div class="two fields stackable">
      <div class="field">
        <label for="quesModel">Question Language:</label>
        <select id="quesModel" v-model="config.questionModel" class="ui dropdown">
          <option v-for="(language, index) in languages" :key="index" :value="language.id">
            {{ language.name }}
          </option>
        </select>
      </div>
      <div class="field">
        <label for="ansModel">Answer Language:</label>
        <select id="ansModel" v-model="config.answerModel" class="ui dropdown">
          <option v-for="(language, index) in languages" :key="index" :value="language.id">
            {{ language.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="inline fields">
      <label for="all">Type of Words: </label>
      <div class="field">
        <div class="ui radio checkbox">
          <input id="all" type="radio" value="all" v-model="typeSource" />
          <label for="all">All words</label>
        </div>
      </div>
      <div class="field">
        <div class="ui radio checkbox">
          <input id="categoryType" type="radio" value="category" v-model="typeSource">
          <label for="categoryType">From category</label>
        </div>
      </div>
    </div>
    <div class="field" v-if="typeSource === 'category'">
      <label for="category">Select Category: </label>
      <select id="category" v-model="config.category" class="ui dropdown">
        <option v-for="(cat, index) in categories" :key="index" :value="cat">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div class="two fields">
      <div class="field">
        <label for="numWords">Number of Words: </label>
        <input id="numWords" v-model="config.numWords" type="number" min="2" :max="maxWordsLocal" class="ui input" />
      </div>
      <div class="field">
        <label for="time">Time per word (seconds): </label>
        <input id="time" v-model="config.timeLimit" type="number" min="0" :max="120" class="ui input" />
      </div>
    </div>

    <div class="ui container center aligned">
      <button class="ui button" type="reset">Reset</button>
      <button class="ui primary button" type="submit">Start</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "test-settings",
  props: {
    categories: [],
    maxWords: 0
  },
  data() {
    return {
      languages: [
        { name: 'German', id: 'german' },
        { name: 'English', id: 'english' },
        { name: 'Vietnamese', id: 'vietnamese' }
      ],
      typeSource: 'all',
      maxWordsLocal: 0,
      config: {
        questionModel: 'german',
        answerModel: 'english',
        category: null,
        numWords: 5,
        timeLimit: 0
      }
    }
  },
  watch: {
    maxWords: {
      immediate: true,
      handler(val) {
        this.handleNumWords(val);
      }
    },
    'config.questionModel'(newQ) {
      if (newQ === this.config.answerModel) {
        const alt = this.languages.find(lang => lang.id != newQ);
        if (alt) this.config.answerModel = alt.id;
      }
    },
    'config.answerModel'(newA) {
      if (newA === this.config.questionModel) {
        const alt = this.languages.find(lang => lang.id !== newA);
        if (alt) this.config.questionModel = alt.id;
      }
    },
    'config.category'(newCat) {
      if (this.typeSource === 'category' && newCat?.words) {
        const count = newCat.words.length;
        this.handleNumWords(count);
      }
    },
    typeSource(val) {
      if (val === 'category' && this.config.category?.words) {
        const count = this.config.category.words.length;
        this.handleNumWords(count);
      }
      if (val === 'all') {
        this.config.category = null;
        this.handleNumWords(this.maxWords);
      }
    }
  },
  methods: {
    startTest() {
      if (this.typeSource === 'all') {
        this.config.category = null;
      }

      this.$emit('start', {...this.config});
    },
    resetForm() {
      this.typeSource = 'all';
      this.config = {
        questionModel: 'german',
        answerModel: 'english',
        category: null,
        numWords: Math.min(this.maxWords, 5),
        timeLimit: 0
      };
    },
    handleNumWords(val) {
      this.maxWordsLocal = val;
      this.config.numWords = Math.min(this.config.numWords || 5, val);
    }
  }
};
</script>
