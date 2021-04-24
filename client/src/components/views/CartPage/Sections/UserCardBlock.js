import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import aditya from "../../images/Quinkpost.jpg";
import { Grid, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx'

function UserCardBlock(props) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
      }))
      
    const classes = useStyles();

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://quink-post.herokuapp.com/${image}`
        } else {
            return aditya
        }
    }

    const renderItems = () => (
        props.products && props.products.map(product => (
                <Grid item xs={12} md={3} sm={6} >
            <Card style={{padding: '2px', margin: '10px', boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={renderCartImage(product.images)}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.price}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                    <Button size="small" color="primary"onClick={()=> props.removeItem(product._id)}>
                        Remove Content
                    </Button>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {product.description}
                    </CardContent>
                </Collapse>
            </Card>
            </Grid>
            ))  
        )

    return (
        <div>
            <Grid container spacing={3} direction='row' alignItems='flex-start' justify='center'>
                    {renderItems()}
            </Grid>
        </div>
    )
}

export default UserCardBlock