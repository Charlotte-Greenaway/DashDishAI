"use client";
import {Tabs, Tab} from "@nextui-org/react";
import React from 'react';
import InputImage from "@/components/ingredient_enter/inputImage";
import InputText from "@/components/ingredient_enter/inputText";
const TabComp = ({setIngs, ings, setAnalysing}:any) =>{
    return(
        <Tabs aria-label="Dynamic tabs" >
        <Tab key={1} title={"Upload Image"}>
            <InputImage setIngs={setIngs} ings={ings} setAnalysing={setAnalysing}/>
        </Tab>
        <Tab key={2} title={"Input Text"}>
            <InputText setIngs={setIngs} ings={ings}/>
        </Tab>
        </Tabs>
    )
}

export default TabComp;