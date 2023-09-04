import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        // <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
        //     <Link href="/" className="flex space-x-3">
        //         <Image
        //             alt="header text"
        //             src="/food.svg"
        //             className="sm:w-12 sm:h-12 w-8 h-8"
        //             width={32}
        //             height={32}
        //         />
        //         <h1 className="sm:text-4xl text-m font-bold ml-2 tracking-tight">
        //             magic meal generator
        //         </h1>
        //     </Link>
        // </header>
        <header className="flex justify-center items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
            <Link href="/" className="flex space-x-3 items-center">
                <Image
                    alt="header text"
                    src="/food.svg"
                    className="sm:w-12 sm:h-12 w-8 h-8"
                    width={32}
                    height={32}
                />
                <h1 className="sm:text-4xl text-2xl sm:ml-2 font-bold sm:tracking-tight text-center sm:text-left">
                    magic meal generator
                </h1>
            </Link>
        </header>
    );
}
