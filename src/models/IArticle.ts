import IModel from './IModel'

export interface IArticleItem {
  type_of: string
  id: number
  title: string
  description: string
  cover_image: string
  readable_publish_date: string
  social_image: string
  tag_list: string[]
  tags: string
  slug: string
  path: string
  url: string
  canonical_url: string
  comments_count: number
  positive_reactions_count: number
  collection_id: null
  created_at: Date | Date
  edited_at: Date | Date
  crossposted_at: Date | null
  published_at: Date | Date
  last_comment_at: Date | Date
  published_timestamp: Date
  user: {
    name: string
    username: string
    twitter_username: string
    github_username: string
    website_url: string
    profile_image: string
    profile_image_90: string
  }
  organization: {
    name: string
    username: string
    slug: string
    profile_image: string
    profile_image_90: string
  }
}

export interface IArticle extends IModel {
  type_of: string
  id: number
  title: string
  description: string
  cover_image: string
  readable_publish_date: string
  social_image: string
  tag_list: string
  tags: string[]
  slug: string
  path: string
  url: string
  canonical_url: string
  comments_count: number
  positive_reactions_count: number
  collection_id: number
  created_at: Date
  edited_at: Date | null
  crossposted_at: Date | null
  published_at: Date
  last_comment_at: Date
  published_timestamp: Date
  body_html: string
  body_markdown: string
  user: {
    name: string
    username: string
    twitter_username: string
    github_username: string
    website_url: string
    profile_image: string
    profile_image_90: string
  }
  organization: {
    name: string
    username: string
    slug: string
    profile_image: string
    profile_image_90: string
  }
}
