import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

interface DividedCardProps {
  left?: React.ReactNode
  right?: React.ReactNode
  spacing?: number
}
const calc = (n : number) => {
  if(n<=0) return 1;
  if(n>=10) return 9;
  return n;
};
const DividedCard = ({ left, right, spacing }: DividedCardProps ) => {
  const leftSpacing = spacing? calc(spacing): 5;
  const rightSpacing = 10-leftSpacing;
  return(
    <Grid sx={{ padding: 2,  marginTop: 3, marginBottom: 2 }} container>
      <Grid item xs={leftSpacing}>
        {left}
      </Grid>
      <Grid item xs={1}>
        <Divider orientation={"vertical"}  />
      </Grid>
      <Grid item xs={1}/>
      <Grid item xs={rightSpacing}>
        {right}
      </Grid>
    </Grid>
  );
};

export default DividedCard;
