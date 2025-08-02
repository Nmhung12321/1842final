<template>
  <div class="ui padded segment basic">
    <div class="ui container center aligned">
      <h1 class="ui purple header">Vocabulary Test</h1>
      <p class="ui header">Test your vocabulary knowledge</p>
    </div>
    <div v-if="words.length < 2" class="ui segment center aligned">
      <p class="ui red header">Not enough words to create a test.</p>
    </div>
    
    <div v-else class="ui segment">
      <test-settings 
      v-if="!testStarted"
      @start="startTest"
      :categories="categories"
      :max-words="words.length"
      ></test-settings>

      <vocab-test
      v-if="testStarted && !testCompleted"
      :words="testWords"
      :time-limit="Number(timeLimit)"
      @complete="completeTest"
      ></vocab-test>

      <div v-if="testCompleted" class="ui center aligned segment">
        <h3 class="ui header">Test completed!</h3>
        <p>Your score: {{ score }} / {{ testWords.length }}</p>
      <button @click="resetTest" class="ui button">Try Again</button>
    </div>
    </div>
  </div>
</template>

<script>
import TestSettings from '@/components/TestSettings.vue';
import { vocabApi } from '@/helpers/vocabApi';
import VocabTest from '@/components/VocabTest.vue';
import { categoryApi } from '@/helpers/categoryApi';

export default {
  name: 'vocabulary-test',
  components: {
    'test-settings': TestSettings,
    'vocab-test': VocabTest
  },
  data() {
    return {
      testStarted: false,
      categories: [],
      words: [],
      testWords: [],
      timeLimit: 0,
      score: 0,
      testCompleted: false
    };
  },
  async mounted() {
    this.words = await vocabApi.getWords();
    const allCategories = await categoryApi.getCategories();
    this.categories = allCategories.filter(cat => cat.words.length > 1);
  },
  methods: {
    async startTest(config) {
      this.testStarted = true;
      const { numWords, questionModel, answerModel, category, timeLimit } = config;
      
      this.timeLimit = timeLimit;
      const filterWords = await vocabApi.getWords(category?._id);

      this.testWords = filterWords
        .sort(() => (0.5 - Math.random()))
        .slice(0, numWords);
      this.testWords = this.testWords.map(word => ({
        question: word[questionModel],
        answer: word[answerModel]
      }));
    },
    completeTest(score) {
      this.testCompleted = true;
      this.score = score;
    },
    async resetTest() {
      this.testStarted = false;
      this.testCompleted = false;
      this.score = 0;
    }
  }
};
</script>
