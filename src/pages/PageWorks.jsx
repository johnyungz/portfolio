import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HighlightedCode from "../components/HighlightedCode";
import ImgWithPromise from "../components/ImgWithPromise";

function PageWorks({ restBase }) {
  const { slug } = useParams();
  const restPath = `${restBase}works?_embed&slug=${slug}`
  const [restData, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const mediaPath = restBase + 'media/'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(restPath);
        if (response.ok) {
          const data = await response.json();
          setData(data[0]); 
          setIsLoaded(true);
        } else {
          setIsLoaded(false);
        }
      } catch (error) {
        setIsLoaded(false);
      }
    };

    fetchData();
  }, [restPath]);

  const fetchImageUrl = async (imageId) => {
    if (!imageId) return ''; // Return empty string if imageId is not available
    const response = await fetch(`${mediaPath}${imageId}`)
    if (response.ok) {
      const data = await response.json()
      return data.source_url; // Return the image URL
    } else {
      console.error('Error fetching image URL');
      return ''; // Return empty string in case of error
    }
  };

  return (
    <>
      {isLoaded ? (
        <main>
          <section className="w-full bg-[#121212] text-[white]">
            <div className="px-4 py-20 pt-40 md:w-1/2 md:m-auto font-inconsolata">
              <h2 className="font-bold text-5xl md:text-6xl lg:text-7xl" dangerouslySetInnerHTML={{ __html: restData.title.rendered }}>
              </h2>
              <div>{restData.acf.buttons.map((item, key) => (
                <div>
                  <a  className='pr-4 md:text-lg text-xl xl:text-4xl' key={key + item} href={item.github}>Github</a>
                  <a className='pr-4 md:text-lg text-xl xl:text-4xl' key={key + item} href={item.live}>live</a>
                </div>
              ))}</div>
              <p className="md:text-lg text-xl xl:text-4xl">
                {restData.acf.work_description}
              </p>
              <ImgWithPromise imageId={restData.acf.image_2} mediaPath={mediaPath} />
            </div>
          </section>
          <section className="text-[#121212] bg-[white] px-4 py-20 sm:w-4/5 md:w-3/4 lg:w-3/5 m-auto font-hankeng">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-6">Project Highlights</h2>
            <ul>{restData.acf.highlights.map((item, key) => (
              <li key={key} className="lg:text-lg mb-4 sm:mb-8 md:mb-12">
                <h3 className="font-bold text-xl md:2xl lg:text-3x">{item.highlight_title}</h3>
                <p className="lg:text-lg mb-4 sm:mb-8 md:mb-12">{item.description}</p>
                {item.image && (<ImgWithPromise imageId={item.image} mediaPath={mediaPath} />)}
                {item.code && (<HighlightedCode className="h-12" language="javascript" code={item.code} />)}
                </li>
            ))}</ul>

            <section>
              <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">Reflections</h2>
              <p className="lg:text-lg mb-4 sm:mb-8">{restData.acf.project_details}</p>
            </section>
          </section>
        </main>
      ) : (
        <p>not loaded</p>
      )}
    </>
  );
}

export default PageWorks;
