import RecipeSearch from "../components/recipe_components/SearchRecipe";
import AdminUpload from "../components/admin_components/AdminUploadRecipe";
import ClearAPIComponent from "../components/admin_components/ClearAPIComponent";
import AdminUpdateRecipe from "../components/admin_components/AdminUpdateRecipe";
import DisplayAllRecipe from "../components/recipe_components/DisplayAllRecipe";
import "../styling/AdminPageStyle.css";

const AdminPage = () => {
  return (
    <div>git
      <header className="header">
        <h1>ADMINS ONLY!</h1>
        <RecipeSearch />
      </header>

      <div className="card">
        <h2>UPLOAD RECIPE</h2>
        <AdminUpload />

        <h2>DELETE RECIPE</h2>
        <DisplayAllRecipe />

        <h2>UPDATE RECIPE</h2>
        <AdminUpdateRecipe />

        <ClearAPIComponent />
      </div>
    </div>
  );
};

export default AdminPage;
