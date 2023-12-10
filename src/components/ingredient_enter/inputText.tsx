"use client";
import { Input, Card, CardHeader, Tooltip, Button } from "@nextui-org/react";
import React from "react";
import { useRef, useState} from "react";

const InputText = ({ setIngs, ings }: any) => {
  const [inputVal,setInputVal]= useState<any>(null)
  const inputRef:any = useRef(null);
  const handleChange = () => {
    setInputVal(inputRef.current.value)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ingredient = inputRef.current.value;
    if (ings) {
      if (!ings.includes(ingredient)) {
        var newIngs;
        if (ings) {
          newIngs = [ingredient, ...ings];
        } else {
          newIngs = [ingredient];
        }
        setIngs(newIngs);
      }
    }
    inputRef.current.value = "";
    setInputVal("");
  };
  return (
    <>
      <Card
        className="p-4 space-y-5 mx-auto w-[320px] min-h-[212px]"
        radius="lg"
      >
        <CardHeader>
          Input Ingredients
          <Tooltip content="Enter your ingredients." showArrow={true} >
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
        <form onSubmit={handleSubmit}>
          <Input type="ingredients" label="Ingredients..." ref={inputRef} onChange={handleChange} value={inputVal}/>
          <Button type="submit" color="success" className="text-white w-full"> Submit</Button>
        </form>
      </Card>
    </>
  );
};

export default InputText;
