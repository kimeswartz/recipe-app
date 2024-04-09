import { useState } from "react";
import AdminUpload from "../components/admin_components/AdminUploadRecipe";
import DisplayAllRecipe from "../components/recipe_components/DisplayAllRecipe";
import AdminUpdateRecipe from "../components/admin_components/AdminUpdateRecipe";
import ClearAPIComponent from "../components/admin_components/ClearAPIComponent";

const AdminPage = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showClear, setShowClear] = useState(false);

  const toggleUpload = () => {
    setShowUpload(!showUpload);
    setShowDelete(false);
    setShowEdit(false);
    setShowClear(false);
  };

  const toggleDelete = () => {
    setShowUpload(false);
    setShowDelete(!showDelete);
    setShowEdit(false);
    setShowClear(false);
  };

  const toggleEdit = () => {
    setShowUpload(false);
    setShowDelete(false);
    setShowEdit(!showEdit);
    setShowClear(false);
  };

  const toggleClear = () => {
    setShowUpload(false);
    setShowDelete(false);
    setShowEdit(false);
    setShowClear(!showClear);
  };

  return (

    <section className="standard-container">

    <div>
      <h1>Welcome, Admin!</h1>

      <div className="standard-container pointer" onClick={toggleUpload}>
        {showUpload ? "Close Upload Recipe" : "Open Upload Recipe"}
      </div>
      {showUpload && <AdminUpload />}

      <div className="standard-container pointer" onClick={toggleDelete}>
        {showDelete ? "Close Delete Recipe" : "Open Delete Recipe"}
      </div>
      {showDelete && <DisplayAllRecipe />}

      <div className="standard-container pointer" onClick={toggleEdit}>
        {showEdit ? "Close Edit a Recipe" : "Open Edit a Recipe"}
      </div>
      {showEdit && <AdminUpdateRecipe />}

      <div className="standard-container pointer" onClick={toggleClear}>
        {showClear ? "Close Clear All Recipes" : "Open Clear All Recipes"}
      </div>
      {showClear && <ClearAPIComponent />}
    </div>
    </section>
  );
};

export default AdminPage;
