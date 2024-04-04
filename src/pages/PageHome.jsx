import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll } from 'framer-motion';
import { Link } from "react-router-dom";
import ImgWithPromise from "../components/ImgWithPromise";


function PageHome({ restBase }) {
  const restPath = restBase + 'pages/7';
  const worksRestpath = restBase + 'works?acf_Format=standard';
  const mediaPath = restBase + 'media/';

  const [restData, setRestData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [restDataWorks, setRestDataWorks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(restPath);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRestData(data);
        setLoadStatus(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [worksRestpath]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(worksRestpath);
      if (response.ok) {
        const data = await response.json();
        setRestDataWorks(data);
      }
    };
    fetchData();
  }, [worksRestpath]);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  })

  return (
    <>
      {isLoaded ? (
        <section id='main-hero' className="bg-background text-text-colour font-hankeng pt-52 text-sm md:text-base lg:text-lg">

          {/* hero banner */}
          <section className="py-6 mx-4 border-b md:px-4 md:w-4/5 lg:w-3/4 md:m-auto">
      <motion.h2
        className="text-4xl font-medium sm:text-6xl lg:text-7xl xl:text-[80px] 2xl:text-[116px] pb-2"
        initial={{ opacity: 0, y: 20 }} // Initial styles
        animate={{ opacity: 1, y: 0 }} // Animation styles
        transition={{ duration: 0.6, delay: 0.2 }} // Animation duration and delay
      >
        {restData.acf.home_hook} <br />
        <div className="lg:pl-20 2xl:pl-40">{restData.acf.home_hook_2}</div>
      </motion.h2>

      <motion.p
        className="font-light pb-4 pb-4 max-w-[450px] md:pb-8 sm:text-lg md:text-xl lg:pb-12 lg:pl-20 lg:text-2xl lg:max-w-[600px] 2xl:text-3xl 2xl:max-w-[900px] 2xl:pl-[186px]"
        initial={{ opacity: 0, y: 20 }} // Initial styles
        animate={{ opacity: 1, y: 0 }} // Animation styles
        transition={{ duration: 0.6, delay: 0.4 }} // Animation duration and delay
      >
        {restData.acf.about_me_dev}
      </motion.p>
    </section>

          
          {/* skills */}
          <section className="py-12 px-4 border-b md:w-4/5 lg:w-3/4 md:m-auto">
            <p className="font-light pb-6 sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl lg:w-3/5">{restData.acf.skills_description}</p>
            <article className="">
              {restData.acf.web_dev_title.map((item) => (
              <section key={item.title}>
              <h2 ref={ref} className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl flex items-center">
                  <ImgWithPromise 
                      imageId={item.code} 
                      mediaPath={mediaPath} 
                      className="mr-4 h-auto max-w-12 lg:max-w-20" // Adjust margin, height, and max-width as needed
                  />
                  {item.title}
              </h2>
              <motion.div className="h-1 bg-[#121212] origin-left"
              style={{ scaleX: scrollYProgress }}
              ></motion.div>
                <div className="xl:flex xl:justify-between">
                  <p className="font-light xl:py-4 sm:text-lg md:text-xl lg:text-2xl 2xl:text-[28px] lg:w-3/4 lg:pr-12 xl:pr-40">{item.description}</p>
                  <ul className="py-4 lg:w-1/4">
                    {item.skills.map((item) =>
                    <li key={item.skill}
                        className="font-poppins font-semibold sm:text-lg md:text-2xl lg:text-3xl 2xl:text-5xl mb-2 lg:mb-6"
                    >{item.skill}</li>
                    )}
                  </ul>
                </div>
                </section>       
                ))}
            
            </article>
          </section>

          {/* works section */}
          <section className="w-full bg-[#121212] text-[white] font-inconsolata">
            <>
            <div className="px-4 py-20 md:w-4/5 lg:w-2/3 md:m-auto lg:px-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-12">Works</h2>
            {restDataWorks.map((item, index) => (
              <motion.div className={`lg:flex lg:justify-between lg:pb-28 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              initial={{ opacity: 0 }} 
              whileInView = {{ opacity: 1 }}
              viewport={{ once: true }}
              key={item.acf.portfolio_title}
              >
                
                <div className="lg:w-3/5">
                  <ImgWithPromise className='shadow-[0px_0px_4px_1px_#303030] w-full' imageId={item.acf.image_1} mediaPath={mediaPath} />
               
                </div>

                  <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-center">
                    <Link to={`/works/${item.slug}`}>
                      <h3 className="font-medium text-xl md:2xl lg:text-3xl">{item.acf.portfolio_title}</h3>
                    </Link>
                    <ul className="">
                        {item.acf.skills_short && item.acf.skills_short.map((skill, skillIndex) => (
                          <React.Fragment key={skillIndex}>
                            <li className="inline">{skill.each_skill}</li>
                            {skillIndex !== item.acf.skills_short.length - 1 && <span className="inline"> &bull; </span>}
                        </React.Fragment>
                    ))}
                    </ul>
                
                    <p className="font-light tracking-wide pb-12 text-[#f0f0f0] lg:text-lg">{item.acf.what_i_learned}</p>
                  </div>
        
              </motion.div>
            ))}
            </div>
            </>
          </section>
        </section>
      ) : (
        <p>plz wait</p>
      )}
    </>
  );
}

export default PageHome;
