import { NextResponse, NextRequest } from "next/server";
require('dotenv').config();
import { connectToDb } from "@/database_actions/dbConfig";
import {updatedSavedIngredients} from '@/database_actions/users';
 connectToDb();


export async function POST(request: NextRequest) {
    try{
        const { ingredients } = await request.json();
        await updatedSavedIngredients(ingredients)

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while saving ingredients", status: 500 });
    }
}