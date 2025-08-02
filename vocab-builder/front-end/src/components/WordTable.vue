<template>
  <div class="ui container">
    <table v-if="words.length" id="words" class="ui celled blue inverted center aligned table">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
          <th>Vietnamese</th>
          <th colspan="3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(word, index) in words" :key="index">
          <td>{{ word.english }}</td>
          <td>{{ word.german }}</td>
          <td>{{ word.vietnamese }}</td>
          <td class="collapsing">
            <router-link
              :to="{ name: 'show-word', params: { id: word._id } }"
              class="ui green button compact circular"
              title="View details"
            >
              <i class="eye icon"></i> Show
            </router-link>
          </td>
          <td class="collapsing">
            <router-link
              :to="{ name: 'edit-word', params: { id: word._id } }"
              class="ui yellow button compact circular"
              title="Edit"
            >
              <i class="edit icon"></i> Edit
            </router-link>
          </td>
          <td class="collapsing">
            <button
              @click.prevent="onDestroy(word._id)"
              class="ui red button compact circular"
              title="Delete"
              style="margin: 0;"
            >
              <i class="trash icon"></i> Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="ui warning message">
      Can't find any suitable words!
    </p>
  </div>
</template>

<script>
export default {
  name: 'word-table',
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  methods: {
    onDestroy(id) {
      const confirmed = confirm('Are you sure you want to delete this word?');
      if (!confirmed) return;
      this.$emit('delete', id);
    }
  }
}
</script>