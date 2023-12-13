import { NextResponse, NextRequest } from "next/server";
require('dotenv').config();
import { connectToDb } from "@/database_actions/dbConfig";
import {removeSavedRecipe} from '@/database_actions/users';
 connectToDb();


export async function POST(request: NextRequest) {
    try{
        const { id } = await request.json();
        await removeSavedRecipe(id)

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while saving favourited recipe", status: 500 });
    }
}