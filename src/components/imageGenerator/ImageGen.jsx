import React, { useRef, useState } from 'react'
import "./imageGen.css"
import defImg from "../assets/profilepic.png"


const ImageGen = () => {

  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading,setLoading] = useState(false);
  const imageGen = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url)
    setLoading(false);
   
  };
  

  
  

  return (
    <div className='ai-image-generator'>
            <div className='header'>
               Ai image <span>generator</span>
            </div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url==="/"?defImg:image_url} alt="" />
                </div>
                <div className="loading">
                  <div className={loading?"loading-bar-full":"loading-bar"}>
                  </div>
                  <div className={loading?"loading-text":"display-none"}>
                    Loading...
                  </div>
                </div>
                
            </div>
            <div className='searchBox'>
                    <input type="text"  ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
                    <div onClick={()=>{imageGen()}} className="generate-btn">Generate</div>
                </div>
    </div>
  )
}

export default ImageGen
