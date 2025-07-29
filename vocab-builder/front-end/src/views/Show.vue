<template>
  <div class="word-detail-container">
    <h1 class="page-title">Word Details</h1>

    <div class="input-group">
      <div class="input-label">
        <span class="flag-icon">🇩🇪</span>
        <span>German</span>
      </div>
      <input type="text" class="input-field" readonly :value="word.german" />
    </div>

    <div class="input-group">
      <div class="input-label">
        <span class="flag-icon">🇬🇧</span>
        <span>English</span>
      </div>
      <input type="text" class="input-field" readonly :value="word.english" />
    </div>

    <div class="action-buttons">
      <router-link 
        :to="{ name: 'edit', params: { id: this.$route.params.id }}" 
        class="edit-button"
      >
        Edit Word
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'show',
  data() {
    return {
      word: {}
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    this.word = await api.getWord(id);
  }
};
</script>

<style scoped>
.word-detail-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.page-title {
  color: #2d3748;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
}

.flag-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

.input-field {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f8fafc;
  color: #1a202c;
}

.input-field:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.edit-button {
  padding: 0.8rem 1.5rem;
  background-color: #4299e1;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.edit-button:hover {
  background-color: #3182ce;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 640px) {
  .word-detail-container {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style>