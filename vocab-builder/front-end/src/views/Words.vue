<template>
  <div class="app-container">
    <div class="words-table-container">
      <table class="words-table">
        <thead>
          <tr>
            <th class="column-english">English</th>
            <th class="column-german">German</th>
            <th class="column-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(word, i) in words" :key="i" class="word-row">
            <td>
              <span class="word-text">{{ word.english }}</span>
            </td>
            <td>
              <span class="word-text">{{ word.german }}</span>
            </td>
            <td class="actions-cell">
              <div class="actions-wrapper">
                <router-link 
                  :to="{ name: 'show', params: { id: word._id } }" 
                  class="action-button view-button"
                  title="View details"
                >
                  Show
                </router-link>
                <router-link 
                  :to="{ name: 'edit', params: { id: word._id } }" 
                  class="action-button edit-button"
                  title="Edit"
                >
                  Edit
                </router-link>
                <button 
                  @click.prevent="onDestroy(word._id)" 
                  class="action-button delete-button"
                  title="Delete"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'words',
  data() {
    return {
      words: []
    };
  },
  async mounted() {
    this.words = await api.getWords();
  },
  methods: {
    async onDestroy(id) {
      const confirmed = confirm('Are you sure you want to delete this word?');
      if (!confirmed) return;

      await api.deleteWord(id);
      this.words = this.words.filter(word => word._id !== id);
    }
  }
};
</script>

<style scoped>
/* Base Styles */
:root {
  --primary-color: #6b46e1;
  --text-color: #2d3748;
  --text-light: #718096;
  --border-color: #e2e8f0;
}

.app-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Table Container */
.words-table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Table Styles */
.words-table {
  width: 100%;
  border-collapse: collapse;
}

.words-table th {
  background-color: #f9fafb;
  color: var(--text-light);
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
}

.words-table td {
  padding: 1rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-color);
  vertical-align: middle;
}

.word-row:hover {
  background-color: #f9fafb;
}

.word-text {
  font-weight: 500;
}

/* Action Buttons */
.actions-wrapper {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-weight: 500;
}

.view-button {
  background-color: #ebf8ff;
  color: #3182ce;
}

.view-button:hover {
  background-color: #bee3f8;
}

.edit-button {
  background-color: #fefcbf;
  color: #d69e2e;
}

.edit-button:hover {
  background-color: #faf089;
}

.delete-button {
  background-color: #fff5f5;
  color: #e53e3e;
}

.delete-button:hover {
  background-color: #fed7d7;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-container {
    padding: 0.5rem;
    margin: 1rem auto;
  }
  
  .words-table th,
  .words-table td {
    padding: 0.75rem;
  }
  
  .actions-wrapper {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .action-button {
    width: 100%;
    text-align: center;
  }
}
</style>