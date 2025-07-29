<template>
  <div class="test-container">
    <h1 class="test-title">Vocabulary Test</h1>
    
    <div v-if="!testStarted" class="start-test">
      <p>Test your vocabulary knowledge</p>
      <button @click="startTest" class="start-btn">Begin Test</button>
    </div>
    
    <div v-if="testStarted && !testCompleted" class="test-interface">
      <div class="question">
        <p>Translate this word:</p>
        <h2>{{ currentQuestion }}</h2>
      </div>
      
      <div class="options">
        <button 
          v-for="(option, index) in options" 
          :key="index" 
          @click="checkAnswer(option)"
          class="option-btn"
        >
          {{ option }}
        </button>
      </div>
      
      <div v-if="feedback" class="feedback" :class="{ correct: isCorrect, incorrect: !isCorrect }">
        {{ feedback }}
      </div>
    </div>
    
    <div v-if="testCompleted" class="results">
      <h3>Test Completed!</h3>
      <p>Your score: {{ score }} / {{ words.length }}</p>
      <button @click="resetTest" class="retry-btn">Try Again</button>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'vocabulary-test',
  data() {
    return {
      words: [],
      testStarted: false,
      testCompleted: false,
      currentQuestion: '',
      currentAnswer: '',
      options: [],
      feedback: '',
      isCorrect: false,
      score: 0,
      currentIndex: 0
    };
  },
  async mounted() {
    this.words = await api.getWords();
  },
  methods: {
    startTest() {
      this.testStarted = true;
      this.prepareQuestion();
    },
    
    prepareQuestion() {
      if (this.currentIndex >= this.words.length) {
        this.testCompleted = true;
        return;
      }
      
      const currentWord = this.words[this.currentIndex];
      // Randomly choose to show English or German
      if (Math.random() > 0.5) {
        this.currentQuestion = currentWord.english;
        this.currentAnswer = currentWord.german;
      } else {
        this.currentQuestion = currentWord.german;
        this.currentAnswer = currentWord.english;
      }
      
      // Prepare options (correct answer + 3 random wrong answers)
      this.options = [this.currentAnswer];
      while (this.options.length < 4) {
        const randomWord = this.words[Math.floor(Math.random() * this.words.length)];
        const randomOption = this.currentQuestion === randomWord.english ? randomWord.german : randomWord.english;
        if (!this.options.includes(randomOption)) {
          this.options.push(randomOption);
        }
      }
      
      // Shuffle options
      this.options = this.options.sort(() => Math.random() - 0.5);
      this.feedback = '';
    },
    
    checkAnswer(selectedAnswer) {
      this.isCorrect = selectedAnswer === this.currentAnswer;
      this.feedback = this.isCorrect ? 'Correct!' : `Incorrect. The answer is: ${this.currentAnswer}`;
      
      if (this.isCorrect) {
        this.score++;
      }
      
      setTimeout(() => {
        this.currentIndex++;
        this.prepareQuestion();
      }, 1500);
    },
    
    resetTest() {
      this.testStarted = false;
      this.testCompleted = false;
      this.score = 0;
      this.currentIndex = 0;
      this.currentQuestion = '';
      this.currentAnswer = '';
      this.options = [];
      this.feedback = '';
    }
  }
};
</script>

<style scoped>
.test-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.test-title {
  color: #2d3748;
  text-align: center;
  margin-bottom: 1.5rem;
}

.start-test {
  text-align: center;
}

.start-btn {
  background-color: #4a6fa5;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.start-btn:hover {
  background-color: #3a5a8a;
}

.question {
  text-align: center;
  margin-bottom: 2rem;
}

.question h2 {
  color: #2d3748;
  font-size: 1.8rem;
  margin-top: 0.5rem;
}

.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-btn {
  background-color: #f8f9fa;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.option-btn:hover {
  background-color: #e9ecef;
}

.feedback {
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 1rem;
}

.correct {
  background-color: #d4edda;
  color: #155724;
}

.incorrect {
  background-color: #f8d7da;
  color: #721c24;
}

.results {
  text-align: center;
}

.results h3 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.retry-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background-color: #5a6268;
}

@media (max-width: 640px) {
  .options {
    grid-template-columns: 1fr;
  }
  
  .test-container {
    padding: 1.5rem;
    margin: 1rem;
  }
}
</style>