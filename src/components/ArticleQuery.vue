<template>
  <div class="hello">
    <h3>Articles</h3>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <input
          type="checkbox"
          :value="article.id"
          name="stored-article"
          v-model="storedArticles"
        />
        <router-link :to="{ name: 'article', params: { id: article.id } }">
          {{ article.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IArticleItem } from '@/models/IArticle'
import ArticleService from '@/services/ArticleService'

@Component
export default class ArticleQuery extends Vue {
  private articles: IArticleItem[] = []
  private storedArticles: number[] = []

  private async mounted() {
    this.articles = await ArticleService.queryAllArticles()
    this.storedArticles = await ArticleService.allStoredIds()
  }

  @Watch('storedArticles')
  private async onStoredArticlesChange(storedArticles: number[]) {
    const actualStoredArticles = await ArticleService.allStoredIds()
    const newToStoreIds = storedArticles.filter(
      (id) => !actualStoredArticles.includes(id)
    )
    const oldToStoreIds = actualStoredArticles.filter(
      (id) => !storedArticles.includes(id)
    )

    newToStoreIds.forEach((id) => ArticleService.storeArticle(id, true))
    oldToStoreIds.forEach((id) => ArticleService.removeArticle(id))
  }
}
</script>

<style scoped lang="scss"></style>
