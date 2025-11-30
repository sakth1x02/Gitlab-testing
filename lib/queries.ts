export const getAllBlogsQuery = `*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  "mainImage": mainImage.asset->url,
  "author": author->name,
  body,
  excerpt,
  tags
}`

export const getBlogBySlugQuery = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  "mainImage": mainImage.asset->url,
  "author": author->name,
  body,
  excerpt,
  tags
}`
