
const HitProviders = ({ frequentProvider, mostLikedPost,role }) => {
    return(
       <>
            <div className="flex flex-col py-8 pl-6 pr-2  bg-white flex-shrink-0 w-full "> 
            {

               role === 'admin' ?

                        frequentProvider?.map((provider) => {
                            return (
                                <>
                                    <div key={provider?._id} className='flex  items-cente border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg h-full    bg-indigo-300 '>
                                        <div className="h-12 w-12 rounded-full border overflow-hidden">
                                            
                                            <img
                                                src={provider.profilePic}
                                                alt="Avatar"
                                                className="h-full w-full"
                                            />
                                        </div>
                                        <div className="text-base font-sans font-medium ml-3 mt-3 text-black ">
                                            {provider.name}
                                        </div>

                                    </div>





                                </>
                            )
                        })
                        
                        :
                        mostLikedPost?.map(post => {
                            return(
                                <>
                                    <div key={post?._id} className='flex  items-cente border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg h-full    bg-indigo-400 '>
                                        <div className="h-20 w-20  border overflow-hidden">
                                            <img
                                                src={post?.postImages[0]}
                                                alt="Avatar"
                                                className="h-full w-full"
                                            />
                                        </div>
                                        <div className="text-sm font-sans font-medium ml-3 mt-7 text-white ">
                                            {new Date(post?.createdAt).toDateString()}
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