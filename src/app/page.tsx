import { handleNewUserReg } from "@/database_actions/users";
import IngredientCont from "@/components/ingredient_enter/ingredientCont";
export default async function Home() {
  await handleNewUserReg();
  return (
    <>
      <IngredientCont />
    </>
  );
}
