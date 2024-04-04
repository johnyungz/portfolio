import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImgWithPromise from "../components/ImgWithPromise";

function PageWork ( {restBase} ) {

  const worksRestpath = restBase + 'works?acf_Format=standard';
  const [restDataWorks, setRestDataWorks] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const mediaPath = restBase + 'media/';

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(worksRestpath);
      if (response.ok) {
        const data = await response.json();
        setRestDataWorks(data);
        console.log(data);
        setLoadStatus(true);
      }
      else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [worksRestpath]);

  return (
<>
{isLoaded ? 
( <section className="w-full bg-[#121212] text-[white] font-inconsolata">
<>
<div className="px-4 py-20 md:w-4/5 lg:w-2/3 md:m-auto lg:px-0">
<h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-12">Works</h2>
{restDataWorks.map((item, index) => (
  <motion.div className={`lg:flex lg:justify-between lg:pb-28`}
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
        {item.acf.buttons && item.acf.buttons.map((button, key) => (
        <div key={key}>
          <a className='pr-4 md:text-xl' href={button.github}>Github</a>
          <a className='pr-4 md:text-xl' href={button.live}>live</a>
        </div>
      ))}
        <p className="font-light tracking-wide pb-12 text-[#f0f0f0] lg:text-lg">{item.acf.what_i_learned}</p>
      </div>

  </motion.div>
))}
</div>
</>
</section>)

:
(<div>loading</div>)
}
</>  )
}

export default PageWork;