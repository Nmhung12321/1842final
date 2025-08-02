<template>
  <div>
    <div class="ui fluid input">
      <input id="edit" v-model="localCategory.name" placeholder="typing category ..." />
      <div class="ui tiny buttons">
        <button class="ui teal button" @click="handleEdit">Save</button>
        <button class="ui button" @click="onCancel">Cancel</button>
      </div>
    </div>
    <p v-if="errorPresent" class="ui error message">
      Please fill out the name!
    </p>
  </div>
</template>

<script>
export default {
  name: 'category-input',
  props: {
    category: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: ''
        }
      }
    }
  },
  data() {
    return {
      localCategory: { ...this.category },
      errorPresent: false
    }
  },
  watch: {
    category: {
      handler(newCat) {
        this.localCategory = { ...newCat };
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleEdit() {
      const name = this.localCategory.name.trim();
      if (!name) {
        this.errorPresent = true;
        return;
      }
      this.$emit('createOrUpdate', this.localCategory);
    },
    onCancel() {
      this.$emit('cancel');
    }
  }
}
</script>
