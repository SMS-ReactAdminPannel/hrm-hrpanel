import React, { useCallback } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  readonly?: boolean
  onChange?: (rating: number) => void
}

const StarRating = React.memo<StarRatingProps>(({ rating, readonly = false, onChange }) => {
  const handleStarClick = useCallback(
    (star: number) => {
      if (!readonly && onChange) {
        onChange(star)
      }
    },
    [readonly, onChange],
  )

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          } ${!readonly ? "cursor-pointer" : ""}`}
          onClick={() => handleStarClick(star)}
        />
      ))}
    </div>
  )
})

StarRating.displayName = "StarRating"

export default StarRating
