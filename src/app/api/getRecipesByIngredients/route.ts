import { NextResponse, NextRequest } from "next/server";
require('dotenv').config();
import { connectToDb } from "@/database_actions/dbConfig";
import recipeModel from '@/models/recipeModel';

 connectToDb();


export async function POST(request: NextRequest) {

    console.log(request)
    const { ingredients } = await request.json();
    console.log(ingredients)
    try {
        const query = {
            cleanIngredients: { $regex: ingredients.join("|"), $options: "i" }
          };
          
          const recipes = await recipeModel.aggregate([
            {
              $match: query
            },
            {
              $addFields: {
                ingredientMatches: {
                  $size: {
                    $filter: {
                      input: "$cleanIngredients",
                      as: "ingredient",
                      cond: {
                        $in: ["$$ingredient", ingredients]
                      }
                    }
                  }
                }
              }
            },
            {
              $sort: {
                ingredientMatches: -1
              }
            },
            {
              $limit: 9
            }
          ]).exec();

        console.log(recipes);
        const ingredientMatch = recipes.map((item:any)=>{
            const p = { ...item };
            const missingIngs:any[]=[];
            const matchedIngs:any[]=[];
            ingredients.forEach((ing:string) => {
                if (item.cleanIngredients.some((recipeIngredient:string) => recipeIngredient.includes(ing))) {
                  matchedIngs.push(ing);
                } else {
                  missingIngs.push(ing);
                }
              });
            p.missingIngs=missingIngs;
            p.matchedIngs=matchedIngs;
            return p;
        })
        //console.log(ingredientMatch);
        const response = ingredientMatch;
        return NextResponse.json({ message: response, status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while fetching recipes", status: 500 });
    }
}