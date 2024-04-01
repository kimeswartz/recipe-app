import RecipeSearch from "../components/SearchRecipe";
import AdminUpdate from "../components/AdminComponents/AdminUpdate";
import AdminUpload from "../components/AdminComponents/AdminUploadRecipe";
import ClearAPIComponent from "../components/AdminComponents/ClearAPIComponent";
import DisplayAllRecipe from "../components/DisplayAllRecipe";
import "../styling/AdminPage.css";

const AdminPage = () => {

  return (
    <div>
      <header className="header">
        <h1>ENDAST ADMINS!</h1>
        <RecipeSearch />
      </header>

      <div className="card">
        <h2>HÄR KAN DU LADDA UPP ETT RECEPT</h2>
        <AdminUpload />

        <h2>HÄR KAN DU TA BORT ETT RECEPT</h2>
        <DisplayAllRecipe />

        <h2>HÄR KAN DU UPPDATERA ETT RECEPT</h2>
        <AdminUpdate />

        <ClearAPIComponent />
      </div>
    </div>
  );
};

export default AdminPage;