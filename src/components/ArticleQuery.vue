<template>
  <div class="article-query">
    <p v-if="online">Check articles you want to read once offline</p>
    <p v-else>Here are all the articles you can read offline</p>
    <div class="table-container">
      <table
        class="table is-striped is-hoverable is-fullwidth"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td class="checkbox-container" v-if="online">
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
  </div>
</template>

<script lang="ts">
declare const navigator: any
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { IArticleItem } from '@/models/IArticle'
import ArticleService from '@/services/ArticleService'
import infiniteScroll from 'vue-infinite-scroll'

@Component({
  directives: { infiniteScroll }
})
export default class ArticleQuery extends Vue {
  @Prop({ type: Boolean, default: true })
  private online!: boolean
  private articles: IArticleItem[] = []
  private storedArticles: number[] = []
  private page: number = 1
  private busy: boolean = false

  private async created() {
    this.articles = this.online
      ? await ArticleService.queryAllArticles(this.page)
      : await ArticleService.queryAllStoredArticles()
    this.storedArticles = await ArticleService.allStoredIds()
  }

  private share() {
    if ('bluetooth' in navigator) {
      navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      })
    }
  }

  private async loadMore() {
    if (!this.online) {
      return
    }
    this.busy = true
    this.page = this.page + 1
    const articles = [
      ...this.articles,
      ...(await ArticleService.queryAllArticles(this.page))
    ]
    const uniques = new Map()
    articles.forEach((article) => {
      uniques.set(article.id, article)
    })
    this.articles = [...uniques.values()]
    this.busy = false
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
