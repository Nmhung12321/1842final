<template>
  <div class="ui container">
    <div class="ui raised very padded segment">
      <h1 class="ui teal center aligned header">Categories</h1>

      <suggest-search
      :data="allCategories"
      :search-fields="['name']"
      placeholder="Searching category ..."
      @search="onSearchUpdate"
      ></suggest-search>

      <p v-if="this.categories === this.allCategories" class="ui warning message">
        There aren't any suitable categories!
      </p>

      <div class="ui teal secondary pointing menu category-scroll" v-if="allCategories.length">
        <a 
        class="item"
        v-for="(cat, index) in [{ name: 'All', _id: null }, ...categories]"
        :key="index"
        :class="{ active: (selected ? selected._id === cat._id : cat._id === null)}"
        @click="selectCategory(cat._id ? cat : null)"
        >
          {{ cat.name }}
        </a>
      </div>
      <div class="ui warning message" v-if="!allCategories.length">
        <p>Don't have any categories!</p>
      </div>

      <div class="ui bottom attached active tab segment">
        <h3 class="ui blue header">
          <div v-if="!selected">
            All words
          </div>
          <div v-else>
            Words in category: 
            <span class="ui red header">{{ selected.name }}</span>

            <div class="ui buttons mini right floated">
              <button class="ui icon button teal" title="Edit category" @click="onEdit(selected)">
                <i class="edit icon"></i>
              </button>
              <button class="ui icon button red" title="Delete category" @click="onDeleteCategory(selected._id)">
                <i class="trash icon"></i>
              </button>
            </div>
          </div>
        </h3>
        <category-input 
        v-if="editMode"
        :category="selected"
        @createOrUpdate="handleEdit"
        @cancel="onCancelEdit"
        ></category-input>

        <word-table
          :words="wordsByCategory"
          @delete="onDestroyWord"
        ></word-table>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryInput from '@/components/CategoryInput.vue';
import SuggestSearch from '@/components/SuggestSearch.vue';
import WordTable from '@/components/WordTable.vue';
import { categoryApi } from '@/helpers/categoryApi';
import { vocabApi } from '@/helpers/vocabApi';

export default {
  name: 'category',
  components: {
    'suggest-search': SuggestSearch,
    'word-table': WordTable,
    'category-input': CategoryInput
  },
  data() {
    return {
      allCategories: [],
      words: [],
      categories: [],
      selected: null,
      editMode: false
    }
  },
  async mounted() {
    this.allCategories = await categoryApi.getCategories();
    this.words = await vocabApi.getWords();
    this.categories = [...this.allCategories];

    const id = this.$route.params.id;
    if (id) {
      this.selected = this.allCategories.find(cat => cat._id === id);
      if (this.$route.path.endsWith('/edit')) {
        this.editMode = true;
      }
    }
  },
  watch: {
    selected(newVal, oldVal) {
      if (newVal?._id !== oldVal?._id) {
        this.editMode = false;
      }
    }
  },
  computed: {
    wordsByCategory() {
      if (!this.selected) return this.words;
      return this.words.filter(word =>
        word.category?._id === this.selected._id
      );
    }
  },
  methods: {
    async onSearchUpdate(filtered) {
      if (filtered === null) {
        this.categories = [...this.allCategories];
        this.selected = null;
      } else {
        this.categories = filtered;
        this.selected = filtered.length ? filtered[0] : null;
      }
    },
    selectCategory(cat) {
      const newPath = cat ? `/categories/${cat._id}` : '/categories';
      if (this.$route.path !== newPath) {
        this.selected = cat;
        this.$router.push(newPath);
      } else {
        this.selected = cat;
      }
    },
    onEdit(cat) {
      this.editMode = !(this.editMode && this.selected?._id === cat._id);
      const path = this.editMode ?  `/categories/${cat._id}/edit` : `/categories/${cat._id}`;
      this.$router.push(path);
    },
    async handleEdit(category) {
      const updated = await categoryApi.updateCategory(category);
      this.flash('Category updated', 'success');

      this.selected = updated;
      this.editMode = false;
      const path = `/categories/${this.selected._id}`;
      this.$router.push(path);
    },
    onCancelEdit() {
      this.editMode = false;
      this.$router.push(`/categories/${this.selected?._id || ''}`);
    },
    async onDeleteCategory(id) {
      if (!confirm('Are you sure you want to delete this category?')) return;
      await categoryApi.deleteCategory(id);
      this.flash('Category deleted successfully!', 'success');
      this.categories = this.categories.filter(cat => cat._id !== id);
      this.selected = null;
      this.$router.push({ name: 'categories' });
    },
    async onDestroyWord(id) {
      await vocabApi.deleteWord(id);
      this.flash('Word deleted successfully!', 'success');
      this.words = this.words.filter(word => word._id !== id);
    }
  }
}
</script>

<style scoped>
.category-scroll {
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 1rem;
  -webkit-overflow-scrolling: touch;
}
</style>