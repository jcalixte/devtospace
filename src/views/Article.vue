<template>
  <div class="article-component">
    <article v-if="!articleLoaded" class="message is-primary no-article">
      <div class="message-body">
        <p>
          The article is not available offline...
        </p>
        <br />
        <button
          @click="download"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          download
        </button>
      </div>
    </article>
    <section v-if="article" class="article">
      <img
        v-if="article.cover_image"
        :src="article.cover_image"
        alt="Cover image"
      />
      <h1 class="title is-1">{{ article.title }}</h1>
      <h2 class="subtitle is-2">{{ article.user.name }}</h2>
      <h3 class="subtitle is-3">
        <a :href="article.url">original link</a>
      </h3>
      <article v-html="body" class="article-body"></article>
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
    this.articleLoaded = !!this.article
    if (!this.article) {
      this.article = await ArticleService.queryArticle(this.articleId)
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
  img {
    display: block;
    margin: auto;
  }
}
.article-body {
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
