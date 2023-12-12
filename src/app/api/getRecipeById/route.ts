import { NextResponse, NextRequest } from "next/server";
require("dotenv").config();
import { connectToDb } from "@/database_actions/dbConfig";
import recipeModel from "@/models/recipeModel";

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const { id, missingIngs } = await request.json();
    const docs = await recipeModel.findOne({ _id: id });

    if (docs) {
      const {
        _id,
        recipeTitle,
        summary,
        ingredients,
        cleanIngredients,
        instructions,
        diets,
        allergens,
        winePairings,
        mealType,
        cuisine,
        timeInHours,
        image,
      } = docs;
      const missingIngsArr = (missingIngs==="No Ingredients")?[]:missingIngs.split(",");
      const matchedIngsArr: string[] = [];
      if (missingIngs !== "No Ingredients") {
        
        console.log(missingIngsArr);
        cleanIngredients.forEach((ing: string) => {
          console.log(ing);
          if (!missingIngsArr.includes(ing)) {
            matchedIngsArr.push(ing);
          }
        });
      }

      return NextResponse.json({
        message: docs,
        missingIngs: missingIngsArr,
        matchedIngs: matchedIngsArr,
        status: 200,
      });
    } else {
      console.log("Recipe not found");
      return NextResponse.json({ message: "Recipe not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "An error occurred while fetching recipe",
      status: 500,
    });
  }
}
