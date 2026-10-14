"use client";

import * as React from "react";
import { RecentlyAddedPostProps } from "@/types/types";
import PostCard from "../utils.post-card";

const RecentlyAddedPost: React.FC<RecentlyAddedPostProps> = ({
  recentlyAddedData: { article, coverSections },
}) => {
  const [image, setImage] = React.useState<string>(coverSections[0]?.imageUrl);

  React.useEffect(() => {
    const index = Math.floor(Math.random() * coverSections.length);
    const imageUrl = coverSections[index].imageUrl;
    setImage(imageUrl);
  }, []);
  return (
    <PostCard
      size="sm"
      key={article._id}
      post={{ ...article, imageUrl: image }}
    />
  );
};
export default RecentlyAddedPost;
