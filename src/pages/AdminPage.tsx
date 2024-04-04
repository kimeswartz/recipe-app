import RecipeSearch from "../components/recipe_components/SearchRecipe";
import AdminUpdate from "../components/admin_components/AdminUpdate";
import AdminUpload from "../components/admin_components/AdminUploadRecipe";
import ClearAPIComponent from "../components/admin_components/ClearAPIComponent";
import DisplayAllRecipe from "../components/recipe_components/DisplayAllRecipe";
import "../styling/AdminPageStyle.css";

const AdminPage = () => {
  return (
    <div>
      <header className="header">
        <h1>ONLY ADMINS!</h1>
        <RecipeSearch />
      </header>

      <div className="card">
        <h2>HERE IS WHERE YOU CAN UPLOAD A RECIPE</h2>
        <AdminUpload />

        <h2>HERE IS WHERE YOU DELETE RECEPIES</h2>
        <DisplayAllRecipe />

        <h2>HERE IS WHERE YOU UPDATE A RECIPE</h2>
        <AdminUpdate />

        <ClearAPIComponent />
      </div>
    </div>
  );
};

export default AdminPage;
