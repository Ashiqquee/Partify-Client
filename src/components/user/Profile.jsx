const Profile = () => {
   

    return (
        <>
            <div className="justify-center bg-transparent items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Edit Details
                            </h3>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div className='px-5'>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                                <div className="mt-2">
                                                    <input type="text"   name="name" id="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                                <div className="mt-2">
                                                    <input type="text"  name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div>
                                                    <div className='md:flex'>
                                                        <img
                                                            
                                                            alt="...."
                                                            className="avatar"
                                                        />
                                                    </div>
                                                    <div className="pt-5">
                                                        <input
                                                            type="file"
                                                            name="photo"
                                                            acceptedfiles=".jpg,.jpeg,.png"
                                                            id="file"
                                                            multiple
                                                            //  multiple 
                                                            // onChange={handleImageChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            {/* <span className='text-red-600'>{err&&err}</span> */}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {

                                    // setEdit(false)
                                }
                                }
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    // submitEdits()
                                }}

                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> 

        </>
    )

}


export default Profile;