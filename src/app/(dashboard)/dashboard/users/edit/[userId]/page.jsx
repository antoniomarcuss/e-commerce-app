import UserForm from "../../components/UserForm";

const EditUsers = ({ params: { userId } }) => {
  return (
    <div className="custom-container">
      <h1 className="text-3xl font-medium">Editar Usuário</h1>
      <UserForm userId={userId} />
    </div>
  );
};

export default EditUsers;
