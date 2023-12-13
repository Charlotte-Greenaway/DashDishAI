import mongoose from 'mongoose';
import { connectToDb } from '@/database_actions/dbConfig';
import UserModel from '@/models/user-model';
import {currentUser} from '@clerk/nextjs/server';
connectToDb();

export const handleNewUserReg = async () => {
    try{
        
        //getclerk id of current user
        const loggedInUser = await currentUser();
        //check if user exists in mongo db
        const userExists = await UserModel.findOne({clerkUserId:loggedInUser?.id});
        //if they do then return
        if (userExists){
            return userExists
        }
        //else create user
        const newUser = new UserModel({
            email:loggedInUser?.emailAddresses[0].emailAddress,
            clerkUserId:loggedInUser?.id
        })
        await newUser.save();
        return newUser;
    }catch(error:any){
        throw new Error(error);
    }
}

export const getMongoUserId = async () =>{
    try{
        const loggedInUser = await currentUser();
        const userInMongo = await UserModel.findOne({
            clerkUserId: loggedInUser?.id,
        })
        if(userInMongo) return userInMongo._id;
    }catch(error:any){
        throw new Error (error);
    }
}

export const updatedSavedIngredients = async (ingredients:string[])=>{
    const loggedInUser = await currentUser();
    
    const result = await UserModel.updateOne({ clerkUserId: loggedInUser?.id }, { $set: { savedIngredients: ingredients } });
}

export const updatedSavedRecipe = async (recipe:string)=>{
    const loggedInUser = await currentUser();
    
    const result = await UserModel.updateOne(
        { clerkUserId: loggedInUser?.id },
        { $addToSet: { savedRecipes: recipe } }
      );
}

export const removeSavedRecipe = async (recipe: string) => {
    const loggedInUser = await currentUser();
  
    const result = await UserModel.updateOne(
      { clerkUserId: loggedInUser?.id },
      { $pull: { savedRecipes: recipe } }
    );
  
  };

