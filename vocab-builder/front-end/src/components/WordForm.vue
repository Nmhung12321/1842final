<template>
  <div class="ui container">
    <div v-if="errorsPresent.isError" class="ui error message">
      <i class="close icon"></i>
      <div class="header">Error</div>
      <p>{{ errorsPresent.message }}</p>
    </div>

    <form class="ui form" action="#" @submit.prevent="onSubmit">
      <div class="field">
        <div class="ui labeled input fluid">
          <div class="ui green label">
            <i class="de flag"></i> German
          </div>
          <input type="text" placeholder="Enter word..." v-model="localWord.german" id="german" />
        </div>
      </div>
      <div class="field">
        <div class="ui labeled input fluid">
          <div class="ui blue label">
            <i class="gb flag"></i> English
          </div>
          <input type="text" placeholder="Enter word..." v-model="localWord.english" id="english" />
        </div>
      </div>
      <div class="field">
        <div class="ui labeled input fluid">
          <div class="ui red label">
            <i class="vn flag"></i> Vietnamese
          </div>
          <input type="text" placeholder="Enter word..." v-model="localWord.vietnamese" id="vietnamese" />
        </div>
      </div>
      <div class="field">
        <div class="ui labeled input fluid">
          <div class="ui purple label">
            <i class="tags icon"></i> Category
          </div>
          <select class="ui dropdown" v-model="categoryId" id="category">
            <option value="">unknown</option>
            <option
            v-for="(cat, index) in allCategories"
            :key="index"
            :value="cat._id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="ui container center aligned">
        <button type="button" class="ui cancel large button" @click="onCancel">Cancel</button>
        <button class="ui primary large button">{{ submitText }}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'word-form',
  props: {
    word: {
      type: Object,
      required: false,
      default: () => {
        return {
          english: '',
          german: '',
          vietnamese: '',
          category: null
        }
      }
    },
    allCategories: {
      type: Array,
      required: true
    },
    submitText: {
      type: String,
      default: 'Submit'
    }
  },
  data() {
    return {
      localWord: { ...this.word },
      errorsPresent: {
        isError: false,
        message: ''
      }
    }
  },
  watch: {
    word: {
      handler(newWord) {
        this.localWord = { ...newWord };
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    categoryId: {
      get() {
        return this.localWord.category?._id || '';
      },
      set(newVal) {
        this.localWord.category = this.allCategories.find(cat => cat._id === newVal) || null;
      }
    }
  },
  methods: {
    onSubmit() {
      const { german, english, vietnamese } = this.localWord;

      if (!german || !english || !vietnamese) {
        this.errorsPresent.isError = true;

        if (!german && !english && !vietnamese) {
          this.errorsPresent.message = "Please fill out all fields";
        } else {
          const missing = [];
          if (!german) missing.push("German");
          if (!english) missing.push("English");
          if (!vietnamese) missing.push("Vietnamese");
          this.errorsPresent.message = `Please fill out ${missing.join(', ')} field!`;
        }
        return;
      }
      this.$emit('createOrUpdate', this.localWord);
      this.errorsPresent = {
        isError: false,
        message: ""
      }
    },
    onCancel() {
      this.$emit('cancel');
    }
  }
};
</script>
