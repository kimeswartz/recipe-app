import RecipeSearch from "../components/SearchRecipe";
import UploadRecipe from "../components/UploadRecipe";
import UpdateRecipe from "../components/UpdateRecipe";
import AdminRecipes from "../components/AdminComponents/AdminAllRecipes";

/**
 * =====> TODO <=====
 * - LÄGG TILL ETT "BUTTON" PÅ VARJE RECEPT FÖR ATT KUNNA RADERA JUST DET RECEPTET ==> (DONE) <==
 * - LÄGG TILL DISPLAY-ALL-RECIPES PÅ ADMINPAGE ==> (DONE) <==
 * - GÖR EN DROPP-DOWN-MENY FÖR KATEGORIER I UPLOAD-RECIPES
 */

/**
 * =====> FRÅGOR <=====
 * - BÖR SEARCH-RECIPES VARA MED PÅ ADMIN-PAGE? ==> SVAR: JA, DEN KAN VARA MED.
 *      - OM DEN SKA, UTVECKLA SÅ ATT DELETE FINNS MED PÅ DET RECEPTET
 * - SKA JAG GÖRA EN EGEN FIL FÖR CSS TILL MIN ADMIN-PAGE ELLER SKA VI HA NÅGON GEMENSAM? ==> JA, MED ENKEL DESIGN (ANVÄNDARVÄNLIG)
 */


function AdminPage() {
  return (
    <div>
        <h1>This is the Admin Page, Welcome!</h1>
        <br />
        <div className="card">
            <h2>To search for a recipe, enter its title:</h2>
            <RecipeSearch />
            <br />
            <h2>To upload a recipe, enter the correct attributes</h2>
            <UploadRecipe />
            <h2>Here is where you can delete a recipe</h2>
            <AdminRecipes />
            <br /><br /><br />
            <h2>Here is where you can edit an existing recipe</h2>
            <UpdateRecipe />
        </div>
    </div>
  )
}

export default AdminPage