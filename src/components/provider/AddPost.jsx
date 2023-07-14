import { useState } from "react";
import axiosInstance from "../../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const AddPost = () => {
    
    const token = useSelector(state => state.provider.token);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        caption: '',
        tagline: '',
        file: []
    });
    const[loading,setLoading] = useState(false);
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setFormData(prevFormData => ({
            ...prevFormData,
            file: files
        }));
      
    };

    const validateFormData = () => {
        const { caption, tagline,file } = formData;
        const errors = {};

        if (caption.trim().length < 5) {
            errors.phone = 'Caption needed';
        }

        if (tagline.trim().length < 6) {
            errors.password = 'add some tags';
        }

        if(file.length<1){
            errors.file = "Add atleast 1 image"
        }


        return errors;
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        const errors = validateFormData();
        
        if (Object.keys(errors).length === 0) {
            setLoading(true);
       try {
           const form = new FormData();
           form.append('caption',formData.caption)
           form.append('tagline', formData.tagline)
           formData.file.forEach((file) => {
               form.append('file', file);
           });

           const response = await axiosInstance.post('/provider/post', form , {
               headers: {
                   Authorization: `Bearer ${token}`,
                   'Content-Type': 'multipart/form-data',
               },
           });
           if(response.status === 200){
               setLoading(false);
               navigate('/provider/profile');
               
           }
       } catch (error) {
        console.log(error);
       }
        } else if (Object.keys(errors).length === 3) {
            toast.error('Enter all fields')
        } else if (errors.caption) {
            toast.error(errors.caption)
        } else if (errors.tagline) {
            toast.error(errors.tagline)
        } else if (errors.file){
            toast.error(errors.file)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

      
    }


    return (

        <>
            <form className="flex justify-center p-4  w-full" onSubmit={handleSubmit}>
                <div className="border-b border-gray-900/10 pb-12 ">
                    <h2 className="text-base font-black leading-7 text-gray-900">Add New Post</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Publishing new posts enhances your ability to attract and engage with users.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="about" className="block font-bold text-sm  leading-6 text-gray-900">Caption</label>
                            <div className="mt-2">
                                <textarea id="about" value={formData.caption} onChange={handleChange} name="caption" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Insights shared in the post</p>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="about" className="block font-bold text-sm  leading-6 text-gray-900">Tagline</label>
                            <div className="mt-2">
                                <textarea id="about" placeholder="eg: #latest #new" name="tagline" value={formData.tagline} onChange={handleChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write some Tagline.</p>
                        </div>




                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-bold leading-6 text-gray-900">Cover photo</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                    </svg>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                            <span>Upload a file</span>
                                            <input id="file-upload" accept="image/*" name="file" onChange={handleFileChange} multiple  type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                            <div className="flex">
                                {formData.file.length > 0 && (
                                    <ul className="flex list-none p-0">
                                        {formData.file.map((file, index) => (
                                            <li key={index} className="mr-4">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Image ${index + 1}`}
                                                    className="w-16 h-16 mt-1"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </div>
                        {
                            loading ? <button type="submit" className="loading loading-dots loading-md   font-medium text-center text-white bg-indigo-500
                                  rounded-lg transition duration-200 hover:bg-indigo-600 ease"></button>
                                : <button type="submit" className="w-full btn-sm  font-medium text-center text-white bg-indigo-500
                                  rounded-lg transition duration-200 hover:bg-indigo-600 ease">Add</button>
                        }
                       


                    </div>
                </div>
            </form>

        </>

    )

}

export default AddPost;