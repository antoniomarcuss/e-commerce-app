"use client";
import UserForm from "../components/UserForm";

const CreateUser = () => {
  return (
    <div className="custom-container">
      <h1 className="text-3xl font-medium">Novo Usuário</h1>
      <UserForm />
    </div>
  );
};

export default CreateUser;
