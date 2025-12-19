import { Outlet } from "react-router-dom";

// Фиктивный защищенный маршрут, который всегда позволяет доступ
const ProtectedRouteMock = () => {
  // В режиме обхода аутентификации всегда разрешаем доступ
  return <Outlet />;
};

export default ProtectedRouteMock;