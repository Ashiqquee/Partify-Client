import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom'

const NavItem = ({icon,name,path}) => {

    const navigate = useNavigate();

    const handleRoute = () => {
        navigate(`/admin${path}`)
    }

    return(
        <>
            <div onClick={handleRoute} className="flex  items-center justify-between p-4 hover:bg-gray-100 cursor-pointer ">
                <p className="flex items-center space-x-2" href="/admin/brand-dashboard">
                    <FontAwesomeIcon icon={icon} />
                    <span className="text-black font-bold  ">{name}</span>
                </p>

            </div>
        </>
    )
};


export default NavItem;