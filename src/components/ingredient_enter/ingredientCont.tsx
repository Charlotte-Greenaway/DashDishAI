"use client";
import TabComp from "@/components/ingredient_enter/tabComp";
import Results from "@/components/ingredient_enter/res";
import { useState, useEffect } from "react";
import ResultsIngs from "@/components/ingredient_results/res";
import axios from "axios";

const IngredientCont = () => {
  const [ings, setIngs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [analysing, setAnalysing] = useState(true);
  const [recipeanaly, setRecipeanaly] = useState(false);
  const [initialset, setInitial] = useState(false);
  const updateIngs = async () => {
    const response = await axios.post("./api/setIngs", {
      ingredients: ings,
    });
    if (response.status === 500) {
      console.log(response);
    }
  };
  const dbIngs = async () => {
    const response = await axios.get("./api/getDbIngs");
    setIngs(response.data.message);
    setAnalysing(false)
  };
  useEffect(() => {
    if(!initialset){
      dbIngs();
      setInitial(true);
    }
  }, []);
  useEffect(() => {
    if(initialset){
      updateIngs();
    }
  }, [ings]);
  return (
    <>
      <div className="flex w-full flex-row flex-wrap mt-5 xl:ml-auto ">
        <div className="flex w-full flex-col justify-start fitcontsm ml-auto xl:mr-0 lg:ml-auto lg:mr-0">
          <TabComp setIngs={setIngs} ings={ings} setAnalysing={setAnalysing} />
        </div>
        <Results
          ings={ings}
          setIngs={setIngs}
          analysing={analysing}
          setRecipes={setRecipes}
          setRecipeanaly={setRecipeanaly}
        />
      </div>
      <ResultsIngs recipes={recipes} recipeanaly={recipeanaly} />
    </>
  );
};
export default IngredientCont;
