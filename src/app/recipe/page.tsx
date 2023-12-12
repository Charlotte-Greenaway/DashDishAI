"use client"
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import axios from 'axios';

export default function Home() {
  const [recipe, setRecipe] = useState<Object>({});
  const [loading, isLoading] = useState<Boolean>(false);
  const searchParams = useSearchParams()

  const getRecipe= async(id:any,missingIngs:any) => {
    const response = await axios.post("/api/getRecipeById",{
        id:id,
        missingIngs:missingIngs
    })
    console.log(response.data);
  }
  useEffect(() => {

    if (!searchParams.get("id")) {
        window.location.href = '/' 
      
    }else{
        const id= searchParams.get("id");
        const missingIngs= searchParams.get("missingIngs")
        getRecipe(id, missingIngs)
    }
  }, []);

  return (
    <>
    </>
  );
}
