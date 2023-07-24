import Select from 'react-select';


const SortProvider = ({selectedOptions,searchText,setSearchText,handleChange}) => {
    
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
    const handleSelectChange = (event) => {
        handleChange(event);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value)
    }

    return(
        <>
            <div className="flex justify-start">
                <Select name="place"
                    placeholder='Select Place'
                    className="mt-3 w-64"

                    options={keralaDistrictsOptions}
                    value={selectedOptions}
                    onChange={handleSelectChange} />

                <div className="mt-3 w-64 ml-4">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative h-10 m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search Provid.."
                            aria-label="Search"
                            aria-describedby="button-addon1"
                            value={searchText}
                            onChange={(event) => handleSearch(event)}
                        />



                    </div>
                </div>



            </div>
        </>
    )
}

export default SortProvider;