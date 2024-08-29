import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const PhotoCard = ({name, photo}) => {
  return (
    <Card sx={{ minWidth: 200  }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="180"
        image={photo}
        
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{height:"40px"}}>
          {name}
        </Typography>
       
      </CardContent>
    </CardActionArea>
  </Card>
  );
}

export default PhotoCard