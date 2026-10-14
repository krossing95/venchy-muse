export type CategoryId = "all" | "lifestyle" | "style-journal";
export type Category = {
  id: CategoryId;
  name: string;
};

export type IArticleIntroduction = {
  _id: string;
  articleId: string;
  eyebrowText: string;
  introLead: string;
  subTexts: string[];
};

export type ICoverSectionPost = {
  _id: string;
  articleId: string;
  tocId: string;
  imageUrl: string;
  coverText: string;
};

export type IFinalThought = {
  _id: string;
  articleId: string;
  eyebrow: string;
  thoughtHeader: string;
  texts: string[];
  decoratedContent: {
    strongText: string;
    elaboratedText: string;
  };
};

export type IFinishingTouch = {
  _id: string;
  articleId: string;
  title: string;
  introdutoryText: string;
  categorizedTexts: {
    _id: string;
    header: string;
    description: string;
  }[];
};

export type IHeroSection = {
  _id: string;
  slug: string;
  category: CategoryId;
  isPublished: boolean;
  postTitle: {
    title: string;
    decoratedTitle: string;
    subTitle: string;
    brokenSubTitle: string;
  };
  readTime: number;
  coverCaption?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IPostPiece = {
  _id: string;
  articleId: string;
  title: string;
  tocId: string;
  imageUrl: string;
  contentTexts: string[];
  decoratedContent: {
    strongText: string;
    elaboratedText: string;
  };
  subIndexText: string;
};

export type IRelatedArticle = {
  _id: string;
  articleId: string;
  url: string;
  name: string;
};

export type ITableOfContent = {
  _id: string;
  articleId: string;
  tocs: { tocId: string; toc: string }[];
};

export type SectionTitleProps = {
  eyebrow?: string;
  title: string;
};

export type PostCardProps = {
  post: IHeroSection & {
    imageUrl: string;
  };
  size?: "sm" | "md" | "lg";
  eager?: boolean;
};

export type RecentlyAddedPostProps = {
  recentlyAddedData: {
    article: IHeroSection;
    coverSections: ICoverSectionPost[];
  };
};

export type Article = {
  article: IHeroSection;
  coverSections: ICoverSectionPost[];
};

export type ArticlesResponse = {
  data: Article[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
    limit: number;
  };
};

export type ProgressiveArticlesProps = {
  initialArticles: Article[];
  initialCursor: string | null;
  initialHasMore: boolean;
  categoryId: CategoryId;
};
