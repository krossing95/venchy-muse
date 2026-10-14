import { CategoryId } from "@/types/types";

export const getCategory = (category: CategoryId) => {
  const categoryMap: Record<CategoryId, string> = {
    lifestyle: "Lifestyle",
    "style-journal": "Style Journal",
    all: "All Articles",
  };

  return categoryMap[category];
};
