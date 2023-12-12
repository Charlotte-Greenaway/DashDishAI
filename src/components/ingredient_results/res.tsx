"use client";
import {
  Image,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
interface MyComponentProps {
  recipes: any[];
  recipeanaly: any;
}
const ResultsIngs: React.FC<MyComponentProps> = ({ recipes, recipeanaly }) => {
  const resultsRef: any = useRef(null);

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipeanaly]);
  return (
    <>
      {recipeanaly && (
        <div className="show" ref={resultsRef}>
          <span className="loader mx-auto"></span>
          <span className="loader2">Loading</span>
        </div>
      )}
      <div className="flex flex-row flex-wrap justify-center mt-10">
        {recipes.length > 0 &&
          !recipeanaly &&
          recipes.map((item) => (
            <>
            <a className="py-4 fitcont mx-auto my-3" href={`/recipe?id=${item._id}&missingIngs=${item.missingIngs}`}>
              <Card className="py-4 fitcont mx-auto my-3" key={item.recipeId}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start mx-auto">
                  <p className="text-tiny uppercase font-bold mx-auto m-w-[300px]">
                    {item.recipeTitle}
                  </p>
                  {item.rating > 0 ? (
                    <div className="flex mx-auto my-3">
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <FaStar key={index} color="gold" size={20} classNm/>
                      ))}
                    </div>
                  ) : (
                    // If there are no ratings, render a message with a grey star
                    <>
                      <small className="inline mx-auto my-3">
                        <FaStar color="grey" size={20} className="inline" /> No
                        Ratings
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
                    <small>{item.matchedIngs.length} Matched Ingredients</small>
                  </Chip>

                  <Chip color="danger" variant="dot">
                    <small>{item.missingIngs.length} Missing Ingredients</small>
                  </Chip>
                </CardFooter>
              </Card>
              </a>
            </>
          ))}
      </div>
    </>
  );
};

export default ResultsIngs;
