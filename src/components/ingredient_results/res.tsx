"use client";
import {
  Image,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Badge,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaStar, FaHeart, FaCheck } from "react-icons/fa";
import axios from "axios";
interface MyComponentProps {
  recipes: any[];
  recipeanaly: any;
  dbSavedRecipes: any[];
}
const ResultsIngs: React.FC<MyComponentProps> = ({
  recipes,
  recipeanaly,
  dbSavedRecipes,
}) => {
  const resultsRef: any = useRef(null);
  const [savedStatus, setSavedStatus] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipeanaly]);

  useEffect(() => {
    const initialSavedStatus = dbSavedRecipes.reduce((acc, recipe) => {
      acc[recipe] = true;
      return acc;
    }, {});
    setSavedStatus(initialSavedStatus);
  }, [dbSavedRecipes]);

  const saveRecipe = async (id: string) => {
    if (savedStatus[id] === true) {
      setSavedStatus((prev) => ({ ...prev, [id]: !prev[id] }));
      const res = await axios.post("/api/removeSavedRecipe", {
        id: id,
      });
    } else {
      setSavedStatus((prev) => ({ ...prev, [id]: !prev[id] }));
      const res = await axios.post("/api/saveRecipe", {
        id: id,
      });
    }
  };

  return (
    <>
      {recipeanaly && (
        <div className="show" ref={resultsRef}>
          <span className="loader mx-auto"></span>
          <span className="loader2">Loading</span>
        </div>
      )}
      <div className="flex flex-row flex-wrap justify-center mt-10 max-w-[1150px] mx-auto">
        {recipes.length > 0 &&
          !recipeanaly &&
          recipes[0] !== "No recipes" &&
          recipes.map((item) => (
            <>
              <Badge
                content={
                  savedStatus[item._id] ? (
                    <FaCheck color="white" size={20} className="my-2 mx-1" />
                  ) : (
                    <FaHeart color="white" size={20} className="my-2 mx-1" />
                  )
                }
                color="danger"
                shape="circle"
                placement="top-right"
                onClick={() => saveRecipe(item._id)}
                className="cursor-pointer"
                style={{
                  transition: "color 0.3s, background-color 0.3s",
                }}
              >
                <a
                  className="py-4 fitcont my-3 mx-1"
                  href={`/recipe?id=${item._id}&missingIngs=${
                    item.missingIngs
                  }${savedStatus[item._id] ? "&saved=true" : ""}`}
                >
                  <Card
                    className="py-4 fitcont mx-auto my-3"
                    key={item.recipeId}
                  >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start mx-auto">
                      <p className="text-tiny uppercase font-bold mx-auto max-w-[300px] text-center">
                        {item.recipeTitle}
                      </p>
                      {item.rating > 0 ? (
                        <div className="flex mx-auto my-3">
                          {Array.from({ length: item.rating }).map(
                            (_, index) => (
                              <FaStar key={index} color="gold" size={20} />
                            )
                          )}
                        </div>
                      ) : (
                        // If there are no ratings, render a message with a grey star
                        <>
                          <small className="inline mx-auto my-3">
                            <FaStar color="grey" size={20} className="inline" />{" "}
                            No Ratings
                          </small>
                        </>
                      )}
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 mx-auto">
                      <div className="image-container fit-content rounded-xl">
                        <Image
                          alt="Card background"
                          className="object-cover rounded-xl mx-auto fitcont"
                          src={item.image}
                          width={270}
                        />
                        <div className="image-overlay rounded-xl">
                          <p>{item.summary}</p>
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Chip color="success" variant="dot">
                        <small>
                          {item.matchedIngs.length} Matched Ingredients
                        </small>
                      </Chip>

                      <Chip color="danger" variant="dot">
                        <small>
                          {item.missingIngs.length} Missing Ingredients
                        </small>
                      </Chip>
                    </CardFooter>
                  </Card>
                </a>
              </Badge>
            </>
          ))}
        {recipes[0] == "No recipes" && !recipeanaly && (
          <h1 className="text-2xl text-bold">No results</h1>
        )}
      </div>
    </>
  );
};

export default ResultsIngs;
