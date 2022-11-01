import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { memo, FC, CSSProperties, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {VscDebugStart} from 'react-icons/vsc';
import App from './App';

import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <App />
);

