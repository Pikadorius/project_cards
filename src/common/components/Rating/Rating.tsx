import React from 'react'

import StarIcon from '@mui/icons-material/Star'
import Rating from '@mui/material/Rating'

type RatingCard = {
  value: number
}

export const RatingCard: React.FC<RatingCard> = ({ value }) => {
  return (
    <div>
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </div>
  )
}
