import RecipeSearch from "../components/SearchRecipe";
import UploadRecipe from "../components/UploadRecipe";
import UpdateRecipe from "../components/UpdateRecipe";
import DisplayAllRecipe from "../components/DisplayAllRecipes";

/**
 * =====> TODO <=====
 * - LÄGG TILL ETT "BUTTON" PÅ VARJE RECEPT FÖR ATT KUNNA RADERA JUST DET RECEPTET ==> (DONE) <==
 * - LÄGG TILL DISPLAY-ALL-RECIPES PÅ ADMINPAGE ==> (DONE) <==
 * - GÖR EN DROPP-DOWN-MENY FÖR KATEGORIER I UPLOAD-RECIPES
 */

/**
 * =====> FRÅGOR <=====
 * - BÖR SEARCH-RECIPES VARA MED PÅ ADMIN-PAGE?
 *      - OM DEN SKA, UTVECKLA SÅ ATT DELETE FINNS MED PÅ DET RECEPTET
 * - SKA JAG GÖRA EN EGEN FIL FÖR CSS TILL MIN ADMIN-PAGE ELLER SKA VI HA NÅGON GEMENSAM?
 */


function AdminPage() {
  return (
    <div>
        <h1>This is the Admin Page, Welcome!</h1>
        <div className="card">
            <h2>To search for a recipe, enter its title:</h2>
            <RecipeSearch />
            <h2>To upload a recipe, enter the correct attributes</h2>
            <UploadRecipe />
            <h2>Here is where you can delete a recipe</h2>
            <DisplayAllRecipe />
            <br /><br />
            <h2>Here is where you can edit an existing recipe</h2>
            <UpdateRecipe />
        </div>
    </div>
  )
}

export default AdminPage