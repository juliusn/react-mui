import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

interface DividedCardProps {
  left?: React.ReactNode
  right?: React.ReactNode
  size?: number
}
const calc = (n : number|undefined) => {
  if(!n) return{ leftSize: 50, rightSize: 50 };
  if( n <= 0 ) return{ leftSize: 1, rightSize: 99 };
  if( n >= 1 ) return{ leftSize: 99, rightSize: 1 };
  const x =  n * 100;
  return{ leftSize: x, rightSize: 100-x };
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
        <Divider orientation="vertical" />
      </Box>
      <Box sx= {{ flexGrow: rightSize }}>
        {right}
      </Box>
    </Box>
  );
};

export default DividedCard;
