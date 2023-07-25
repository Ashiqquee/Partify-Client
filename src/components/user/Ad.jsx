import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const Ad = () => {
    
    const [ads,setAds] = useState([]);

    const fetchAds = async() => {
        try {
          const {data} = await axiosInstance.get('/ads');
          console.log(data.adsList);
            setAds(data.adsList);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAds();
    },[])

    return(

      <>
           
          { ads.map((ad) => {
              return(
                  <div key={ad._id} className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group mt-8 w-72 ml-24 "
                      style={{ backgroundImage: `url('${ad.adImage}')` }}>
                      <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                          <h2 className="mt-4 text-xl font-semibold text-white capitalize">{ad.name}</h2>
                          <a className="mt-2 text-lg tracking-wider text-indigo-200 uppercase" href={`https://${ad.adLink}`} target="_blank" rel="noopener noreferrer">Visit Website</a>
                      </div>
                  </div>
              )

           })}
        </>
    )
};


export default Ad;
