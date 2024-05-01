import Header from '/app/components/header.js';
import Link from 'next/link';

export default function About() {
    return (
        <main style={{ 
            position: "relative",
            minHeight: "180vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <Header text="About Us"/>
            <div className="flex flex-col justify-evenly text-sm pt-36 p-20 text-justify">
                <div>
                    <h1 className='text-5xl my-6 text-green'>
                        About Paws and Claws:
                    </h1>                    
                    <p className="text-lg">                    
                        At Paws and Claws, we believe that pets are not just animals, but they are part of our family, our confidants, and our best friends. This website is a tribute to these wonderful creatures that fill our lives with joy, laughter, and love.
                    </p>
                    <h1 className='text-2xl my-6'>
                        Our Mission: 
                    </h1>
                    <p className="text-lg">
                        Our mission is to create a platform where pet lovers can share and celebrate the beauty, diversity, and sheer adorableness of their pets. We aim to build a community that appreciates pets, learns from them, and loves them just as much as we do.
                    </p>
                    <h1 className='text-2xl my-6'>
                        What We Do: 
                    </h1>
                    <p className="text-lg">
                        We provide a platform for pet owners to showcase their pets in all their glory. From the smallest hamster to the largest Great Dane, from the quietest fish to the noisiest parrot - we welcome them all!
                    </p>
                    <h1 className='text-2xl my-6'>
                        Join Us: 
                    </h1>
                    <p className="text-lg">
                    If you have a pet friend who deserves to be in the spotlight, join us! Share your pet’s photos, tell us their stories, let the world know how special they are. After all, every pet deserves a moment in the spotlight.
                    </p>
                    <p className="text-lg">
                        Thank you for visiting Paws and Claws. We can’t wait to meet your furry (or feathery, or scaly) friends!
                    </p>
                </div> 
                <h1 className="flex flex-row justify-center my-8 text-5xl font-bold text-green">Ready to get started?</h1>             
                <div className="flex flex-row justify-center mt-20">                    
                    <div className="mx-28">                
                        <Link 
                                href="/tab/signup" 
                                className="bg-green hover:bg-gray text-white text-center font-bold text-4xl py-4 w-52 h-52 flex items-center justify-center rounded-full relative z-10">
                                Sign Up Today!
                            <img 
                                src="/dog.jpg"
                                alt="Small Image"
                                className="absolute left-[-160px] top-[-50px] w-18 h-18 rounded-full"
                            />                 
                        </Link> 
                    </div>
                    <div className="flex justify-center my-8 text-2xl">OR</div>
                        <div className="flex justify-center m-28 relative h-28">
                        <Link href={"/tab/pets"} className="bg-green hover:bg-gray text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center relative z-10">
                            <p className='mt-10'>Check Available Pets</p>
                        <img 
                            src="/cat.jpg"
                            alt="Image Alt Text"
                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50 h-25 rounded z-0 cursor-pointer"
                            style={{ zIndex: -1, top: 'calc(50% - 120px)', borderRadius: '50px 50px 0 0'  }}
                        />
                        </Link>
                    </div>
                </div>  
            </div>
        </main>
    );
}