<template>
  <div class="edit-word-container">
    <div class="edit-header">
      <h1 class="edit-title">Edit Word</h1>
      <div class="header-accent"></div>
    </div>
    
    <div class="form-card">
      <word-form 
        @createOrUpdate="createOrUpdate" 
        :word="this.word"
        submitText="Update Word"
      ></word-form>
    </div>
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'edit',
  components: {
    'word-form': WordForm
  },
  data() {
    return {
      word: {}
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
  },
  methods: {
    createOrUpdate: async function(word) {
      await api.updateWord(word);
      this.flash('Word updated successfully!', 'success');
      this.$router.push(`/words/${word._id}`);
    }
  }
};
</script>

<style scoped>
.edit-word-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0;
}

.edit-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.edit-title {
  color: #2d3748;
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.header-accent {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  margin: 0 auto;
  border-radius: 2px;
}

.form-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

/* Responsive design */
@media (max-width: 768px) {
  .edit-word-container {
    margin: 1.5rem;
  }
  
  .edit-title {
    font-size: 1.8rem;
  }
  
  .form-card {
    padding: 1.8rem;
  }
}

@media (max-width: 480px) {
  .form-card {
    padding: 1.5rem;
  }
  
  .edit-title {
    font-size: 1.6rem;
  }
}
</style>