<template>
  <div class="home">
    <ArticleQuery />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ArticleQuery from '../components/ArticleQuery.vue'

@Component({
  components: { ArticleQuery }
})
export default class Home extends Vue {}
</script>
