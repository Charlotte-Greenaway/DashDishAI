// components/Results.tsx
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  ScrollShadow,
  Image,
  Button,
} from "@nextui-org/react";
import getcooking from "@/images/getcooking.png";
import axios from "axios";
import { useEffect } from "react";
interface MyComponentProps {
  ings: any[];
  setIngs: any;
  setRecipes:any;
  setRecipeanaly:any;
  analysing: boolean;
}

const Results: React.FC<MyComponentProps> = ({ ings, analysing, setIngs ,setRecipes, setRecipeanaly}) => {
  const handleDoubleClick = (indexToRemove: number) => {
    // Your double-click logic goes here
    const newArray = ings.filter((_, index) => index !== indexToRemove);
    setIngs(newArray);
  };

  async function getRecipes(){
    setRecipeanaly(true);
    try{
      const response = await axios.post("./api/getRecipesByIngredients", {
        ingredients: ings,
      });
      if(response.data.message[0]!=="No recipes"){
      const rec = Array.from(response.data.message).map((item:any)=>{
        const imgSrc = `data:image/png;base64,${item.image}`;
        item.image=imgSrc;
        return item;
      })
      setRecipes(rec);
    }else{
      setRecipes(["No recipes"]);
    }
      
      setRecipeanaly(false);
    }catch(error){
      console.log(error)
    }
    
  }
 
  return (
    <>
      <Card
        className="ings p-4 space-y-5 max-w-[500px] min-w-[320px] mx-auto md:w-1/2 lg:w-1/2 xl:w-3/4 xl:ml-5"
        radius="lg"
      >
        <CardHeader>
          <h1 className="text-2xl font-bold mx-auto">Ingredients</h1>
        </CardHeader>
        {!analysing && ings.length > 0 && (
          <small className="mx-auto">Double click to remove</small>
        )}
        <CardBody className="mx-auto">
          <ScrollShadow className={`w-full grid grid-cols-2 place-items-center mx-auto fitcont ${analysing ? 'pointer-events-none opacity-50' : ''}`}>
            {
              ings.length>0 &&
              ings.map(
                (item: any, index: number) =>
                  !(item == "") && (
                    <div key={index+200}>
                      <Chip
                        key={index}
                        className="m-1 sm:mx-3 mx-15 cursor-pointer"
                        variant="flat"
                        color="success"
                        onDoubleClick={() => {
                          handleDoubleClick(index);
                        }}
                        style={{ userSelect: "none" }}
                      >
                        {item}
                      </Chip>
                    </div>
                  )
              )}
          </ScrollShadow>
          {analysing && (
            <>
            <span className="loader3"></span>
            </>
          )}
          {!analysing && ings.length < 1 && (
            <div className="mx-auto">
              <h2 className="text-green-500 mx-auto">
                Please add ingredients to find your recipes!
              </h2>
              <Image src={getcooking.src} className="h-64 mx-auto" />
            </div>
          )}
        </CardBody>
        {ings.length > 0 && !analysing && (
          <CardFooter>
            <Button color="success" className="mx-auto text-[#ffffff]" onClick={getRecipes}>
              Find Your Recipes
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default Results;
