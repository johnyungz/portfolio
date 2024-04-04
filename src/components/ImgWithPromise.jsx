import { useEffect, useState } from "react";

function ImgWithPromise({ imageId, mediaPath, className }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${mediaPath}${imageId}`);
        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.source_url);
        } else {
          console.error('Error fetching image URL');
        }
      } catch (error) {
        console.error('Error fetching image URL:', error)
      }
    };

    fetchImage();
  }, [imageId, mediaPath])

  return <img src={imageUrl} alt="Work" className={className}/>;
}

export default ImgWithPromise