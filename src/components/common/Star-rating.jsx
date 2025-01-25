import React from "react";
import { Button } from "../UI/button";
import { StarIcon } from "lucide-react";

const StarRatingComponent = ({ rating, handleRatingChange }) => {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      className={`p-2  rounded-full transition-colors ${
        star <= rating
          ? "text-black-500 hover:bg-yellow-500"
          : "text-black-500 hover:bg-yellow-400"
      }`}
      variant="outline"
      size="icon"
      onClick={() => (handleRatingChange ? handleRatingChange(star) : null)}
    >
      <StarIcon
        className={`w-20 h-10 ${
          star <= rating ? "fill-yellow-400" : "fill-slate-100"
        }`}
      />
    </Button>
  ));
};

export default StarRatingComponent;
