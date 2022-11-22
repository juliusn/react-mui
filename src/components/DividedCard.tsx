import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

interface DividedCardProps {
  left?: React.ReactNode
  right?: React.ReactNode
  size?: number
}
const calc = (n : number|undefined) => {
  if(!n) return{ leftSize: 5, rightSize: 5, middle: 2 };
  if( n <= 1 ) return{ leftSize: 1, rightSize: 10, middle: 1 };
  if( n >= 9 ) return{ leftSize: 10, rightSize: 1, middle: 1 };
  return{ leftSize: n, rightSize: 11-n, middle: 1 };
};
/**
 *left = left side component of card
 *right = Right side component of card
 *size = value = 1-9. Value means left side component precentage of card size. 5 = 5/11, undefined is 50%
 * */
const DividedCard = ({ left, right, size }: DividedCardProps ) => {
  const { leftSize, rightSize, middle } = calc(size);
  return(
    <Grid container spacing={5}>
      <Grid item xs={leftSize}>
        {left}
      </Grid>
      <Grid item sx={{ backgroundColro: "blue" }} xs={middle}>
        <Divider sx={{ width: "50%" }} orientation="vertical" />
      </Grid>
      <Grid item xs={rightSize}>
        {right}
      </Grid>
    </Grid>
  );
};

export default DividedCard;
