import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { memo, FC, CSSProperties, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {VscDebugStart} from 'react-icons/vsc';

const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 50,
  left: 'auto',
};

const SingleButtonNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card sx={{ width: 170, background: 'black', color: 'white' }}>
        <CardActionArea>
          <CardContent >
            <Typography variant="h5">
              {data.label}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              marginTop="20px"
            >
              <Typography sx={{ color: 'cyan' }}>Find out </Typography>
            </Stack>
  
          </CardContent>
        </CardActionArea>
  
      </Card >
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={sourceHandleStyleA}
      />
    </>
)};


export default memo(SingleButtonNode);
