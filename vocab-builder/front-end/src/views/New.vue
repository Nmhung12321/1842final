<template>
  <div class="ui padded segment basic">
    <div v-if="!type" class="ui container center aligned">
      <h1 class="ui blue header">Create New</h1>

      <div class="ui two column stackable grid">
        <div v-for="choice in choices" class="column">
          <button
          class="ui inverted large button"
          :class="[choice.color, { active: type === choice.name }]"
          @click="navigateTo(choice.name)"
          >
            Create {{ choice.name }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="ui padded segment">
      <h2 class="ui blue center aligned header">
        Add New {{ type === 'word' ? 'Word' : 'Category' }}
      </h2>
      <div class="ui raised padded basic segment">
        <word-form 
        v-if="type === 'word'"
        @createOrUpdate="createWord"
        @cancel="goBack"
        :allCategories="categories"
        submitText="Create Word"
        ></word-form>

        <category-input
        v-if="type === 'category'"
        @createOrUpdate="createCategory"
        @cancel="goBack"
        ></category-input>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryInput from '@/components/CategoryInput.vue';
import WordForm from '@/components/WordForm.vue';
import { categoryApi } from '@/helpers/categoryApi';
import { vocabApi } from '@/helpers/vocabApi';

export default {
  name: 'new-view',
  components: {
    'word-form': WordForm,
    'category-input': CategoryInput
  },
  data() {
    return {
      categories: [],
      type: '',
      choices: [
        { name: 'word', color: 'blue' },
        { name: 'category', color: 'purple' }
      ]
    }
  },
  watch: {
    '$route'(to) {
      this.updateTypeFromRoute(to);
    }
  },
  async mounted() {
    this.categories = await categoryApi.getCategories();
    this.updateTypeFromRoute(this.$route);
  },
  methods: {
    async createWord(word) {
      const res = await vocabApi.createWord(word);
      if (res?.exists) {
        this.flash(res.message, 'error');
        return;
      }
      this.flash('Word created successfully!', 'success');
      this.$router.push(`/words/${res._id}`);
    },
    async createCategory(cat) {
      const res = await categoryApi.createCategory(cat);
      if (res?.exists) {
        this.flash(res.message, 'error');
        return;
      }
      this.flash('Category created successfully!', 'success');
      this.$router.push(`/categories/${res._id}`);
    },
    goBack() {
      this.$router.push('/new');
    },
    updateTypeFromRoute(route) {
      const subPath = route.path.split('/')[2];
      if (subPath === 'word' || subPath === 'category') {
        this.type = subPath;
      } else {
        this.type = '';
      }
    },
    navigateTo(name) {
      this.$router.push(`/new/${name}`);
    }
  }
};
</script>
