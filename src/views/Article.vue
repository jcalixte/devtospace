<template>
  <div class="article" v-if="article">
    <h1>{{ article.title }}</h1>
    <article v-html="article.body_html"></article>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IArticle } from '../models/IArticle'
import ArticleService from '../services/ArticleService'

@Component
export default class Article extends Vue {
  @Prop({ type: Number, required: true })
  private id!: number
  private article: IArticle | null = null

  private async created() {
    this.article = await ArticleService.get(this.id)
  }
}
</script>

<style scoped lang="scss"></style>
