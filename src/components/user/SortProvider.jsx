import Select from 'react-select';
import axiosInstance from '../../api/axios';
import { useEffect, useState } from 'react';


const SortProvider = ({ selectedOptions, searchText, setSearchText, handleChange, selectedService, setSelectedService, setSelectedServiceId }) => {
    
    const[services,setServices] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    let servicesId = [];

    const fetchServices = async() => {
        try {
            const response = await axiosInstance.get('/services');
            setServices(response?.data?.serviceList);

            servicesId = response?.data?.serviceList?.map(service => service._id);
            setSelectedId(servicesId)
            setSelectedServiceId(servicesId)

        } catch (error) {
            console.log(error);
        }
    }

    const keralaDistricts = [
        "",
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
    ];
    const keralaDistrictsOptions = keralaDistricts.map((district) => ({
        value: district,
        label: district,
    }));

    const serviceOptions = services?.map((service) => ({
        value: service._id,
        label: service.serviceName,
    }));
    const handleSelectChange = (event) => {
        handleChange(event);
    };

   

    const handleSearch = (event) => {
        setSearchText(event.target.value)
    };

    const handleServiceChange = (selectedOptions) => {
     
        if(selectedOptions?.length === 0) {
            setSelectedService([])
            return setSelectedServiceId(selectedId)
        } 
        const ids = selectedOptions?.map(service => service.value);
        setSelectedServiceId(ids)
        setSelectedService(selectedOptions);
    }

    useEffect(() => {
        fetchServices();
    },[])

    return(
        <>
            <div className="md:flex ml-6 md:ml-0">
                <div className="mt-3 w-64 ml-4">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative h-10 m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                            placeholder="Search Provid.."
                            aria-label="Search"
                            aria-describedby="button-addon1"
                            value={searchText}
                            onChange={(event) => handleSearch(event)}
                        />



                    </div>
                </div>


                <div className="mt-3 w-64 ml-4">
                <Select name="place"
                    placeholder='Select Place'
                    options={keralaDistrictsOptions}
                    value={selectedOptions}
                    onChange={handleSelectChange} />
                </div>

                
                {
                    selectedService?.length > 0 ? 
                        <div className="mt-3 w-64 ml-4">
                            <Select name="place"
                                placeholder='Select Service'
                                isMulti

                                options={serviceOptions}
                                value={selectedService}
                                onChange={handleServiceChange} />

                        </div> : 
                        <div className="mt-3 w-64 ml-4">
                            <Select name="place"
                            isMulti
                                placeholder='Select Service'
                                options={serviceOptions}
                                onChange={handleServiceChange} />

                        </div>
                }



            </div>
        </>
    )
}

export default SortProvider;