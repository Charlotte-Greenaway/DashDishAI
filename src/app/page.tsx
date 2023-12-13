import { handleNewUserReg } from "@/database_actions/users";
import IngredientCont from "@/components/ingredient_enter/ingredientCont";

export default async function Home() {
  const user = await handleNewUserReg();
  const savedRecs= user?.savedRecipes;
  return (
    <>
      <IngredientCont user={savedRecs}/>
    </>
  );
}
