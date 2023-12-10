"use client";
import { useState, useEffect, useRef } from "react";
import {
  Image,
  Skeleton,
  Card,
  CardHeader,
  Tooltip,
  Button,
} from "@nextui-org/react";
import Head from "next/head";
import handleFileChange from "@/utils/uploadImage";
import axios from "axios";

const InputImage = ({ setIngs, ings, setAnalysing }: any) => {
  const analyseImage = useRef(null);
  const [image, setImage] = useState<any>(null);
  const [selected, setSelected] = useState<any>(undefined);
  const [skeleton, setSkeleton] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setSelected(event.target.value);
    }
    handleFileChange(event, setImage, setSkeleton, setError);
  };

  async function getOpenAiResults(image: any) {
    setAnalysing(true);
    const response = await axios.post("./api/getIngs", {
      image: image,
    });
    let ingstwo = await response.data.message.message.content;
    ingstwo = ingstwo.split(",");
    ingstwo = ingstwo.filter((item: string) => item !== "");
    // Step 1: Convert elements to lowercase
    const lowercasedArray = ingstwo.map((item: string) => item.toLowerCase());
    var newIngs;
    if (ings) {
      newIngs = [...lowercasedArray, ...ings];
    } else {
      newIngs = [...lowercasedArray];
    }

    // Step 2: Remove duplicates
    const uniqueSet: Set<number> = new Set(newIngs);
    let uniqueArray: number[] = Array.from(uniqueSet);
    setIngs(uniqueArray);
    setAnalysing(false);
    return newIngs;
  }
  useEffect(() => {
    if (image) {
      getOpenAiResults(image);
    }
  }, [image]);

  const removeImage = () => {
    setImage(null);
    setSelected("");
  };
  const labelStyles = {
    display: "inline-block",
    cursor: "pointer",
    padding: "0.375rem 0.75rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "#ffffff",
    backgroundColor: error ? "#e53e3e" : "#18C964", // Red for error, green for default
    border: "1px solid transparent",
    borderRadius: "0.25rem",
    transition:
      "background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  };
  return (
    <>
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js" />
        <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js" />
      </Head>
      <Card
        className="p-4 space-y-5 mx-auto w-[320px] min-h-[212px]"
        radius="lg"
      >
        <CardHeader>
          Get Ingredients By Image
          <Tooltip
            content="Upload Image of ingredients for quick add."
            showArrow={true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 m-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </Tooltip>
        </CardHeader>
        <label style={labelStyles}>
          Choose File
          <input
            type="file"
            accept="image/*"
            className="hidden" // Hide the actual file input
            onChange={onFileChange}
            value={selected}
          />
        </label>
        {error && (
          <small style={{ margin: "0", color: "red" }}>
            Please upload a valid file
          </small>
        )}
        {skeleton ||
          (image && (
            <>
              {skeleton && (
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
              )}
              {image && (
                <>
                  <Button
                    color="danger"
                    variant="bordered"
                    className="fit-content"
                    onClick={removeImage}
                  >
                    Remove Image
                  </Button>
                  <div className="mx-auto">
                    <Image
                      src={image}
                      alt="Uploaded"
                      ref={analyseImage}
                      style={{ margin: "auto", maxHeight: 30 + "dvh" }}
                    />
                  </div>
                </>
              )}
            </>
          ))}
      </Card>
    </>
  );
};

export default InputImage;
