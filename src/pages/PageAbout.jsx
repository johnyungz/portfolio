import React, { useState } from 'react';

const PageAbout = () => {
  const [image, setImage] = useState('https://johnyungzhou.com/pdata/wp-content/uploads/2024/03/catsconquest.png'); // Default image link
  const [opacity, setOpacity] = useState(100); // Set initial opacity to 100 (fully opaque)
  const [isHovered, setIsHovered] = useState({}); // Track hovered state for each paragraph
  let timeOut; // Declare timeOut variable

  // Function to handle mouse hover events and update the image state with fade effect
  const handleMouseHover = (link) => {
    clearTimeout(timeOut); // Clear any existing timeout
    setImage(link); // Set the new image immediately
    setOpacity(0); // Set opacity to 0
    timeOut = setTimeout(() => {
      setOpacity(100); // Set opacity to 100 after timeout
    }, 500); // Set the delay to 500 milliseconds
  };

  // Function to handle mouse enter event for text
  const handleMouseEnter = (index, link) => {
    setIsHovered((prev) => ({ ...prev, [index]: true })); // Set hovered state for the specific paragraph to true
    handleMouseHover(link); // Change the image
  };

  // Function to handle mouse leave event for text
  const handleMouseLeave = (index) => {
    setIsHovered((prev) => ({ ...prev, [index]: false })); // Set hovered state for the specific paragraph to false
  };

  return (
    <section>
      <section className='bg-background text-text-colour font-hankeng'> 
        <h2 className='font-hankeng text-4xl font-medium sm:text-6xl lg:text-7xl xl:text-[80px]'>A little bit about me</h2>
        <img className='max-w-[600px] block border-rounded' src='https://johnyungzhou.com/pdata/wp-content/uploads/2024/04/cubeportrait.jpg' alt='portrait of boy with glasses'></img>
      </section>
      <section className="container md:flex md:justify-between bg-[#E3E3E3] font-hankeng">
        <section className="text-section">
          {/* Text elements with mouse hover event handlers */}
          <p
            className={`text-5xl ${
              isHovered[0] ? 'text-black' : 'text-[#808080]'
            }`}
            onMouseEnter={() => handleMouseEnter(0, 'https://johnyungzhou.com/pdata/wp-content/uploads/2024/03/moviepediagood.png')}
            onMouseLeave={() => handleMouseLeave(0)}
          >
            I enjoy playing games like TFT
          </p>
          <p
            className={`text-5xl ${
              isHovered[1] ? 'text-black' : 'text-[#808080]'
            }`}
            onMouseEnter={() => handleMouseEnter(1, 'https://johnyungzhou.com/pdata/wp-content/uploads/2024/03/Screen-Shot-2024-04-01-at-18.04.38.png')}
            onMouseLeave={() => handleMouseLeave(1)}
          >
            I also enjoy going out to play a round of golf
          </p>
          <p
            className={`text-5xl ${
              isHovered[2] ? 'text-black' : 'text-[#808080]'
            }`}
            onMouseEnter={() => handleMouseEnter(2, 'https://johnyungzhou.com/pdata/wp-content/uploads/2024/03/Screen-Shot-2024-04-01-at-18.04.38.png')}
            onMouseLeave={() => handleMouseLeave(2)}
          >
            I love watching anime
          </p>
          <p
            className={`text-5xl ${
              isHovered[3] ? 'text-black' : 'text-[#808080]'
            }`}
            onMouseEnter={() => handleMouseEnter(3, 'https://johnyungzhou.com/pdata/wp-content/uploads/2024/03/Screen-Shot-2024-04-01-at-18.04.38.png')}
            onMouseLeave={() => handleMouseLeave(3)}
          >
            I love trying new things
          </p>
          {/* Add more text items as needed */}
        </section>
        <section className="image-section md:w-1/3 md:h-auto">
          {/* Image element with src set to the image state */}
          <img
            src={image}
            alt="Image"
            className={`w-full h-full object-cover transition-opacity duration-250 opacity-${opacity} hover:opacity-100`}
          />
        </section>
      </section>
    </section>
  );
};

export default PageAbout;
