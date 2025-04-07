import { Helmet } from "react-helmet";
import AdminPanel from "../components/admin/AdminPanel";

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Administración - Miyuki</title>
        <meta name="description" content="Panel de administración de Miyuki - Bisutería Artesanal" />
      </Helmet>
      <AdminPanel />
    </>
  );
};

export default Admin;
