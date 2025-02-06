import { useUser } from '../../context/UserContext';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="text-center text-gray-600">
      <h2 className="text-6xl pt-20">
        Bienvenido <span className="font-bold">{user?.name}</span> al dashboard de administrador de
        IUPI
      </h2>
    </div>
  );
};

export default Dashboard;
