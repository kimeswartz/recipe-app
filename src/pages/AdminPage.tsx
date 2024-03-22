import RecipeSearch from "../components/SearchRecipe";
import AdminUpdate from "../components/AdminComponents/AdminUpdate";
import AdminRecipes from "../components/AdminComponents/AdminAllRecipes";
import AdminUpload from "../components/AdminComponents/AdminUploadRecipe";

import "../styling/AdminPage.css";

const AdminPage = () => {
  return (
    <div>
      <header className="header">
        <h1>ADMINS ONLY!</h1>
        <RecipeSearch />
      </header>
    
      <div className="card">
        <h2>THIS IS THE SECTION WHERE YOU CAN UPLOAD A NEW RECIPE</h2>
        <AdminUpload />

        <h2>Here is where you can delete a recipe</h2>
        <AdminRecipes />

        <h2>Here is where you can edit an existing recipe</h2>
        <AdminUpdate />
      </div>
    </div>
  );
};

export default AdminPage;