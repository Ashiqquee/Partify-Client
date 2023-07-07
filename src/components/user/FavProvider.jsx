

const FavProvider = () => {
   
    return(

        <section className="main flex flex-wrap ml-0 md:ml-48">
            <div className="wrapper w-full">

                <div className="left-col">
                    {/* Favorite Users */}
                    <div className="bg-white border border-gray-300 mt-8 p-4">
                        <h2 className="font-bold text-lg mb-4">Providers</h2>
                        <div className="flex items-center mb-4">
                            <div className="profile-pic h-10 w-14">
                                <div className="avatar">
                                    <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src="https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg" alt="profile" />
                                    </div>
                                </div>
                            </div>
                            <p className="username font-bold text-black text-sm ml-2 whitespace-normal max-w-[12rem] overflow-hidden truncate">Ashisds</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="profile-pic h-10 w-14">
                                <div className="avatar">
                                    <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src="https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg" alt="profile" />
                                    </div>
                                </div>
                            </div>
                            <p className="username font-bold text-black text-sm ml-2">Ashiq</p>
                        </div>
                    </div>

                    {/* User List */}

                </div>

            </div>
        </section>
    )

}

export default FavProvider;