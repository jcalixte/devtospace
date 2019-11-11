<template>
  <div class="hello">
    <div class="table-container">
      <table class="table is-striped is-hoverable is-fullwidth">
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td class="checkbox-container">
              <input
                type="checkbox"
                :value="article.id"
                name="stored-article"
                v-model="storedArticles"
              />
            </td>
            <td>
              <router-link
                :to="{ name: 'article', params: { id: article.id } }"
              >
                {{ article.title }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="button is-info" @click="page++">Charger plus</button>
  </div>
</template>

<script lang="ts">
declare const navigator: any
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IArticleItem } from '@/models/IArticle'
import ArticleService from '@/services/ArticleService'
import { notify } from '../utils'

@Component
export default class ArticleQuery extends Vue {
  private articles: IArticleItem[] = []
  private storedArticles: number[] = []
  private page: number = 1

  private async mounted() {
    this.articles = await ArticleService.queryAllArticles(this.page)
    this.storedArticles = await ArticleService.allStoredIds()
  }

  private share() {
    if ('bluetooth' in navigator) {
      navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      })
    }
  }

  @Watch('page')
  private async onPageChange(page: number) {
    const articles = [
      ...this.articles,
      ...(await ArticleService.queryAllArticles(page))
    ]
    const uniques = new Map()
    articles.forEach((article) => {
      uniques.set(article.id, article)
    })
    this.articles = [...uniques.values()]
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

<style scoped lang="scss">
.checkbox-container {
  text-align: center;
}
</style>
