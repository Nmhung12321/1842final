<template>
  <div class="new-word-container">
    <div class="new-word-header">
      <h1 class="new-word-title">Add New Word</h1>
      <div class="header-divider"></div>
    </div>
    
    <div class="form-wrapper">
      <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { vocabApi } from '../helpers/vocabApi';

export default {
  name: 'new-word',
  components: {
    'word-form': WordForm
  },
  methods: {
    createOrUpdate: async function(word) {
      const res = await vocabApi.createWord(word);
      this.flash('Word created successfully!', 'success');
      this.$router.push(`/words/${res._id}`);
    }
  }
};
</script>

<style scoped>
.new-word-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.new-word-header {
  margin-bottom: 2rem;
  text-align: center;
}

.new-word-title {
  color: #2d3748;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.header-divider {
  height: 3px;
  width: 80px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  margin: 0 auto;
  border-radius: 3px;
}

.form-wrapper {
  background-color: #f8fafc;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

/* Responsive design */
@media (max-width: 768px) {
  .new-word-container {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .new-word-title {
    font-size: 1.75rem;
  }
  
  .form-wrapper {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .new-word-container {
    padding: 1rem;
  }
  
  .form-wrapper {
    padding: 1rem;
  }
}
</style>