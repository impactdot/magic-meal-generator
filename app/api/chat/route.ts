import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
// import { OpenAI } from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { diet, bio, cal } = await req.json();

    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'user',
          content: `Generate one recipe with the ingridients given below. The diet for the recipe is also given below. The recipe should have ${cal} calories, so adjust the weight of each ingridient accordingly. If the ingridients below have "none" or something similar, then you are free to create any recipe. If this word - ${cal} is "Don't care", then you can stop caring about the calories. Divide your output into following sections: ingridients needed and their weight, steps to cook the recipe. Put the name of the recipe on the first line and the calorie count of that meal on the second line. Wish a pleasant cooking or meal or something of that sort in the end.
                
                Ingredients: ${bio}
                Diet: ${diet}

        }`,
        },
      ],
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Check if the error is an APIError
    // if (error instanceof OpenAI.APIError) {
    //   const { name, status, headers, message } = error;
    //   return NextResponse.json({ name, status, headers, message }, { status });
    // } else {
    //   throw error;
    // }
  }
}
