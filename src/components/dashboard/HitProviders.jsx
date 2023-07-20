
const HitProviders = ({ frequentProvider }) => {
    return(
       <>
            <div className="flex flex-col py-8 pl-6 pr-2  bg-white flex-shrink-0 w-full "> 
            {

                frequentProvider?.map((provider) => {
                    return (
                        <>
                            <div key={provider?._id} className='flex  items-cente border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg h-full    bg-indigo-400 '>
                                <div className="h-12 w-12 rounded-full border overflow-hidden">
                                    <img
                                        src={provider.profilePic}
                                        alt="Avatar"
                                        className="h-full w-full"
                                    />
                                </div>
                                <div className="text-sm font-bold ml-3 mt-3 text-white ">
                                    {provider.name}
                                </div>

                            </div>
                            

                       

                           
                        </>
                    )
                })
            }
             
              
            </div>
       </>
    )
};


export default HitProviders;