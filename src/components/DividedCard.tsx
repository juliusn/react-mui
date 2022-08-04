import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

interface DividedCardProps {
  left?: React.ReactNode
  right?: React.ReactNode
  size?: number
}
const calc = (n : number|undefined) => {
  if(!n) return{ leftSize: 49, rightSize: 49 };
  if( n <= 0.02 ) return{ leftSize: 1, rightSize: 97 };
  if( n >= 0.98 ) return{ leftSize: 97, rightSize: 1 };
  const x =  n*100-1;
  return{ leftSize: x, rightSize: 98-x };
};
/**
 *left = left side component of card
 *right = Right side component of card
 *size = value = 0.01 - 0.99. Value means left side component precentage of card size. 0.5 = 50%
 * */
const DividedCard = ({ left, right, size }: DividedCardProps ) => {
  const{ leftSize, rightSize } = calc(size);
  return(
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
      <Box sx={{ flexGrow: leftSize }}>
        {left}
      </Box>
      <Box sx={{ flexGrow:2, margin: 5 }}>
        <Divider  orientation="vertical" />
      </Box>
      <Box sx= {{ flexGrow: rightSize }}>
        {right}
      </Box>
    </Box>
  );
};

export default DividedCard;
