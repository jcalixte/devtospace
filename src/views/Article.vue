<template>
  <div class="article-component">
    <section v-if="article" class="article">
      <h1 class="title is-1">{{ article.title }}</h1>
      <h2 class="subtitle is-2">{{ article.user.name }}</h2>
      <h3 class="subtitle is-3">
        <a :href="article.url">original link</a>
      </h3>
      <article v-html="body"></article>
    </section>
    <section v-else-if="!articleLoaded" class="no-article">
      <p>The article seems to ne be available offline...</p>
      <button
        @click="download"
        class="button is-primary"
        :class="{ 'is-loading': loading }"
      >
        Download
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IArticle } from '../models/IArticle'
import ArticleService from '../services/ArticleService'
import { renderMarkdown } from '@/utils'
import 'highlight.js/scss/vs.scss'

@Component
export default class Article extends Vue {
  @Prop({ type: [String, Number], required: true })
  private id!: string | number
  private article: IArticle | null = null
  private articleLoaded: boolean = true
  private loading: boolean = false

  private async created() {
    await this.loadArticle()
  }

  private async loadArticle() {
    this.article = await ArticleService.get(this.articleId)
    if (!this.article) {
      this.articleLoaded = false
    }
  }

  private async download() {
    this.loading = true
    const loaded = await ArticleService.storeArticle(this.articleId, true)
    if (loaded) {
      await this.loadArticle()
    }
    this.loading = false
  }

  private get articleId(): number {
    return parseInt(this.id.toString(), 10)
  }

  private get body(): string {
    if (!this.article) {
      return ''
    }
    const result = renderMarkdown(this.article.body_markdown)
    return result
  }
}
</script>

<style lang="scss">
.article {
  padding: 15px;
  font-family: 'Quicksand', sans-serif;
  margin: auto;
  max-width: 650px;

  pre {
    border: 2px solid black;
    border-radius: 4px;
    padding: 5px;
    margin: 5px 0;
  }

  h1 {
    font-size: 2rem;
    text-align: center;
  }
  h2 {
    font-size: 1.5rem;
  }

  p {
    text-align: justify;
    margin: 5px 0;
  }
}
.no-article {
  text-align: center;
}
</style>
