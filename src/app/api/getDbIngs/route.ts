import { NextResponse, NextRequest } from "next/server";
require('dotenv').config();
import { connectToDb } from "@/database_actions/dbConfig";
import { handleNewUserReg } from "@/database_actions/users";

 connectToDb();


export async function GET() {
    try{
        const user = await handleNewUserReg()

        return NextResponse.json({ message: user?.savedIngredients, status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while getting ingredients", status: 500 });
    }
}