import { ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import ModalPago from '../modal-pago/ModalPago';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, logout } = useUser();
  return (
    <div className="shadow-md flex justify-between px-6 py-3">
      {showModal && <ModalPago setShowModal={setShowModal} />}
      <ul className="flex items-center gap-4">
        <Link to={'/dashboard/aprobar-pagos'}>Aprobar Pagos (Depositos)</Link>
        <Link to={'/dashboard/liberar-pagos'}>Liberar pagos (Retiros)</Link>
        {/* <Link to={'/dashboard/historial-pagos'}>Historial de pagos</Link> */}
      </ul>

      <div className="flex gap-4 items-center">
        <div className="flex relative">
          <div className="flex cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
            <h2 className="text-sm">
              {user?.name} {user?.lastName}
            </h2>
            <ChevronDown />
          </div>

          <div
            className={` transition-all duration-200 absolute w-36 h-24  gap-3 flex justify-center flex-col items-center  max-h-0 overflow-hidden bg-[rgb(255,255,255)] shadow-md -left-20 top-8  ${
              showMenu ? 'max-h-screen  ' : ''
            }  `}
          >
            <button className="text-xs hover:text-[#577fd6]" onClick={() => setShowModal(true)}>
              Informacio de pago
            </button>
            <button
              className="flex gap-2 text-xs items-center rounded-md  hover:text-[#d8544f]"
              onClick={() => logout()}
            >
              Logout <LogOut />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
