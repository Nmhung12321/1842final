<template>
    <div class="ui container category-page">
        <h1 class="ui header">Categories</h1>
        <div class="ui secondary pointing menu">
            <a
                v-for="cat in categories"
                :key="cat.id"
                class="item"
                style="cursor:pointer"
            >
                {{ cat.name }}
            </a>
        </div>

        <!-- <div v-if="selectedCategory">
            <h2 class="ui header">Vocabulary for "{{ selectedCategory.name }}"</h2>
            <div class="ui relaxed divided list">
                <div class="item" v-for="vocab in vocabularies" :key="vocab.id">
                    <div class="content">
                        <div class="header">{{ vocab.word }}</div>
                        <div class="description">{{ vocab.meaning }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="ui message">
                Please select a category to view vocabulary.
            </div>
        </div> -->
    </div>
</template>

<script>
import { categoryApi } from '@/helpers/categoryApi';

export default {
    name: 'Category',
    data() {
        return {
            categories: [],
            selectedCategoryId: null,
            vocabularies: [],
        };
    },
    computed: {
        selectedCategory() {
            return this.categories.find(cat => cat.id === this.selectedCategoryId);
        },
    },
    methods: {
        async fetchCategories() {
            this.categories = await categoryApi.getCategories();
        }
    },
    mounted() {
        this.fetchCategories();
    },
};
</script>

<style scoped>
/* No custom CSS needed, using Semantic UI classes */
</style>
