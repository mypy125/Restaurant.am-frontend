import React from "react";
import "./HomePage.css";

const HomePage  = () => {
    return(
        <div>
        <section className='-z-50 banner relative flex flex-col justify-center items-center'>
            <div className='w-[50vw] z-10 text-center'>
                <p className='text-2xl lg:text-7xl font-bold z-10 py-5'>Taco Cloud</p>
                <p className='z-10 text-gray-300 text-xl lg:text-4xl'>
                    Test the Convenience: Food, Fast And Delivered</p>
            </div>
        </section>
        <div className='cover absolute top-0 left-0 right-0'></div>
        <div className='fadout'>121212</div>
        </div>
    )
}
export default HomePage