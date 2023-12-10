import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
require('dotenv').config();
const apiKey: string = process.env.OPENAI_API_KEY || 'your-default-api-key';

export async function POST(request: NextRequest) {
    console.log(request)
    const { image } = await request.json();
    const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true })
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: "What foods are in this image, please reply with just a comma seperated list, if there aren't any, please return blank" },
                  {
                    type: "image_url",
                    image_url: {
                      "url": image,
                    },
                  },
                ],
              },
            ],
          });
          console.log(response.choices[0]);
          return NextResponse.json({ message: response.choices[0], status: 200 });
    } catch (error) {
        
    }
}