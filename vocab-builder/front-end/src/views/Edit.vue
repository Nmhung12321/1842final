<template>
  <div class="ui padded segment basic">
    <h1 class="ui blue center aligned header">Edit Word</h1>
    
    <div class="ui raised very padded segment">
      <word-form 
        @createOrUpdate="createOrUpdate"
        @cancel="goBack"
        :word="this.word"
        :allCategories="categories"
        submitText="Update"
      ></word-form>
    </div>
  </div>
</template>

<script>
import { categoryApi } from '@/helpers/categoryApi';
import WordForm from '@/components/WordForm.vue';
import { vocabApi } from '@/helpers/vocabApi';

export default {
  name: 'edit',
  components: {
    'word-form': WordForm
  },
  data() {
    return {
      word: {},
      categories: []
    };
  },
  async mounted() {
    this.word = await vocabApi.getWord(this.$route.params.id);
    this.categories = await categoryApi.getCategories();
  },
  methods: {
    createOrUpdate: async function(word) {
      await vocabApi.updateWord(word);
      this.flash('Word updated successfully!', 'success');
      this.$router.push(`/words/${word._id}`);
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.back();
      } else {
        this.$router.push('/words');
      }
    }
  }
};
</script>
