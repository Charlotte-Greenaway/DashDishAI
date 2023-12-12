import { NextResponse, NextRequest } from "next/server";
require('dotenv').config();
import { connectToDb } from "@/database_actions/dbConfig";
import recipeModel from "@/models/recipeModel";
 connectToDb();


export async function POST(request: NextRequest) {
    try{
        const { id, userRating, rating, numOfRatings} = await request.json();
        const newRating = ((rating * numOfRatings) + userRating) / (numOfRatings + 1)
        const result = await recipeModel.updateOne({ _id: id }, { $set: { rating: newRating, numOfRatings: numOfRatings+1 } });
        console.log(result);
        return NextResponse.json({ status: 200 });  
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while updating rating", status: 500 });
    }
}