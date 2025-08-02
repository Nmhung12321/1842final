<template>
  <div class="ui padded segment basic">
    <h1 class="ui blue center aligned header">Add New Word</h1>
    
    <div class="ui raised very padded segment">
      <word-form 
        @createOrUpdate="createOrUpdate"
        @cancel="goBack"
        :allCategories="categories"
        submitText="Create Word"
      ></word-form>
    </div>
  </div>
</template>

<script>
import WordForm from '@/components/WordForm.vue';
import { categoryApi } from '@/helpers/categoryApi';
import { vocabApi } from '@/helpers/vocabApi';

export default {
  name: 'new-word',
  components: {
    'word-form': WordForm
  },
  data() {
    return {
      categories: []
    }
  },
  async mounted() {
    this.categories = await categoryApi.getCategories();
  },
  methods: {
    createOrUpdate: async function(word) {
      const res = await vocabApi.createWord(word);
      if (res?.exists) {
        this.flash(res.message, 'error');
        return;
      }

      this.flash('Word created successfully!', 'success');
      this.$router.push(`/words/${res._id}`);
    },
    goBack() {
      this.$router.push('/words');
    }
  }
};
</script>
