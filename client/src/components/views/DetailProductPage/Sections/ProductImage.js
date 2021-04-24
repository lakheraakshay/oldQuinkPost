import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import aditya from '../../images/Quinkpost.jpg'

function ProductImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `http://quink-post.herokuapp.com/${item}`,
                    thumbnail: `http://quink-post.herokuapp.com/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    let body;

    if (Images.length > 0) {
       body = <ImageGallery showThumbnails={false} showPlayButton={false} items={Images} />   
    } else {
        body =  <img className='image-gallery-image' alt='' style={{width: '100%'}} src={aditya} />
    }

    return (
        <div>
            {body}
        </div>
    )
}

export default ProductImage
