'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown, { DietType } from '../components/DropDown';
import DropDownCal, { CalType } from '../components/DropDownCal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useChat, useCompletion } from 'ai/react';
import { StreamingTextResponse } from 'ai';

export default function Page() {
  const [bio, setBio] = useState('');
  const [diet, setDiet] = useState<DietType>('High-protein');
  const [cal, setCal] = useState<CalType>('500-1200');
  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        bio,
        cal,
        diet,
      },
      onResponse() {
        scrollToBios();
      },
    });
  // const onSubmit = (e: any) => {
  //     setBio(input);
  //     handleSubmit(e);
  // };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setBio(input);
    handleSubmit(e);
  };
  const lastMessage = messages[messages.length - 1];
  const generatedBios =
    lastMessage?.role === 'assistant' ? lastMessage.content : null;
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-8">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate your next meal using ChatGPT
        </h1>
        <form className="max-w-xl w-full" onSubmit={onSubmit}>
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium">
              1. Input the ingridients you have or want to use. Or input
              "nothing", if you don't care about the ingredients.
              <span className="text-slate-500">
                (make sure to include allergies)
              </span>
              .
            </p>
          </div>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={'e.g. chicken breast fillet, brown rice, etc.'}
          />
          <div className="flex mb-5 items-center space-x-3">
            <p className="text-left font-medium">
              2. Select the amount of calories you want to eat.
            </p>
          </div>
          <div className="block mb-5">
            <DropDownCal cal={cal} setCal={(newCal) => setCal(newCal)} />
          </div>
          <div className="flex mb-5 items-center space-x-3">
            <p className="text-left font-medium">3. Select your diet.</p>
          </div>
          <div className="block">
            <DropDown diet={diet} setDiet={(newDiet) => setDiet(newDiet)} />
          </div>
          {!isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              type="submit"
            >
              Generate your meal recipe &rarr;
            </button>
          )}
          {isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <span className="loading">
                <span style={{ backgroundColor: 'white' }} />
                <span style={{ backgroundColor: 'white' }} />
                <span style={{ backgroundColor: 'white' }} />
              </span>
            </button>
          )}
        </form>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <output className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Your generated meal
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                <div
                  className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedBios);
                    toast('Recipe copied to clipboard', {
                      icon: '✂️',
                    });
                  }}
                  key={generatedBios}
                >
                  {generatedBios.split('\n').map((generatedBio, index) => {
                    return (
                      <p
                        key={index}
                        style={{
                          textAlign: 'left',
                        }}
                      >
                        {generatedBio}
                      </p>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </output>
      </main>
      <Footer />
    </div>
  );
}
