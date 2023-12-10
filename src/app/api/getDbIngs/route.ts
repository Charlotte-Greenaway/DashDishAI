import { NextResponse, NextRequest } from "next/server";
require('dotenv').config();
import { connectToDb } from "@/database_actions/dbConfig";
import {currentUser} from '@clerk/nextjs/server';
import UserModel from "@/models/user-model";
connectToDb();

export async function POST() {
    try{
        const loggedInUser = await currentUser();
        //check if user exists in mongo db
        const userExists = await UserModel.findOne({clerkUserId:loggedInUser?.id});
        if(userExists){
            return NextResponse.json({ message: userExists?.savedIngredients, status: 200 });
        }else{
            return NextResponse.json({ message: [], status: 200 });
        }
                
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message:["error"], status: 500 });
    }
}