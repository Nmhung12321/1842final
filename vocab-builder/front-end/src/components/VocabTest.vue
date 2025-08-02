<template>
  <div class="ui blue segment center aligned">
    <div v-if="timeLimit > 0" class="float right">
      <i class="clock icon red"></i> Time: {{ timer }}s
    </div>
    <p class="ui header">Translate this word:</p>
    <h2 class="ui header">{{ currentWord }}</h2>

    <div class="ui two column stackable grid">
      <div
      class="column"
      v-for="(option, index) in options"
      :key="index"
      >
        <button 
          @click="checkAnswer(option)" 
          :class="getOptionClass(option)"
          :disabled="!!selectedAnswer"
          class="ui basic fluid large button"
        >
          {{ option }}
        </button>
      </div>
    </div>
    
    <div v-if="feedback" class="ui message" :class="isCorrect ? 'positive' : 'negative'">
      {{ feedback }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true
    },
    timeLimit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentIndex: 0,
      currentWord: '',
      currentAnswer: '',
      currentWords: [],
      options: [],
      selectedAnswer: '',
      isCorrect: false,
      feedback: '',
      interval: null,
      timer: 0,
      score: 0
    }
  },
  watch: {
    words: {
      immediate: true,
      handler(newVal) {
        if (Array.isArray(newVal) && newVal.length > 0) {
          this.currentWords = [...newVal];
          this.prepareQuestion();
        }
      }
    }
  },
  methods: {

    prepareQuestion() {
      if (this.currentIndex >= this.currentWords.length) {
        this.$emit('complete', this.score);
        return;
      }

      const currentWord = this.currentWords[this.currentIndex];

      this.currentWord = currentWord['question'];
      this.currentAnswer = currentWord['answer'];

      // Prepare options (correct answer + 3 random wrong answers)
      this.options = [this.currentAnswer];
      const pool = this.currentWords.filter(w => w !== currentWord);

      while (this.options.length < Math.min(4, this.currentWords.length)) {
        const randomWord = pool[Math.floor(Math.random() * pool.length)];
        const randomOption = randomWord['answer'];
        if (!this.options.includes(randomOption)) {
          this.options.push(randomOption);
        }
      }

      // Shuffle options
      this.options = this.options.sort(() => Math.random() - 0.5);
      this.selectedAnswer = '';
      this.feedback = '';

      // Start timer
      this.startTimer();
    },
    checkAnswer(selected) {
      this.selectedAnswer = selected;
      this.isCorrect = selected === this.currentAnswer;
      this.feedback = this.isCorrect ? 'Correct!' : `Incorrect. The answer is: ${this.currentAnswer}`;

      if (this.isCorrect) {
        this.score++;
      }

      setTimeout(() => {
        this.currentIndex++;
        this.prepareQuestion();
      }, 1000);
    },
    getOptionClass(option) {
      if (!this.selectedAnswer) return '';
      if (option === this.currentAnswer) return 'positive';
      if (option === this.selectedAnswer && option !== this.currentAnswer) return 'negative';
    },
    startTimer() {
      clearInterval(this.interval);
      if (this.timeLimit === 0) return;

      this.timer = this.timeLimit;
      this.interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer --;
        } else {
          this.checkAnswer(null);
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }
}
</script>
