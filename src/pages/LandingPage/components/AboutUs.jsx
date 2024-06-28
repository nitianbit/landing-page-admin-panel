import { Card } from 'flowbite-react'
import React from 'react'

const AboutUs = () => {
    return (
        <div>
            <div className="flex flex-wrap">
                {/* Heading */}
                <div className="w-full md:w-3/10 p-8 flex items-center justify-center" style={{ maxHeight: "52vh" }}>
                    <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
                </div>
                {/* Paragraph */}
                <div className="w-full md:w-7/10 bg-[#ffcd73]" style={{ maxHeight: "52vh" }}>
                    <p className="text-gray-900 text-sm sm:text-xl p-20">
                        Welcome to <span className="font-bold">KAN Properties</span>, your trusted partner in real estate consultancy.
                        With years of experience and a deep understanding of the market, we offer personalized, transparent, and professional solutions for all your real estate needs. Whether you're buying, selling, investing, or managing property, our expert team is dedicated to ensuring you achieve your goals with confidence and ease.
                        <br />
                        At <span className="font-bold">KAN Properties</span>, we pride ourselves on our integrity, expertise, and commitment to excellence. Our tailored services and client-centric approach set us apart, making us your go-to advisor for navigating the complexities of the real estate market.
                    </p>
                </div>
            </div>

            {/*Who we are section */}
            <section className="px-8 py-24 mb-8  dark:bg-gray-800">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-16">
                        Who We Are?
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-stretch">
                        <div className="flex justify-center">
                            <Card className="max-w-sm h-full bg-[#ffcd73]">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Our Mission
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Our mission is to provide our clients with the highest level of service and to become their most trusted advisor in all real estate matters. We strive to create lasting relationships by ensuring every interaction is marked by integrity and dedication to transparency, achieving the best outcomes for our clients. Residential and Commercial Sales: Whether you are buying your first home, upgrading to a larger space, or investing in commercial properties, we have the expertise to guide you. Property Management: Our services are designed to maximize the value of your investment while ensuring your property is well-maintained.
                                </p>
                            </Card>
                        </div>
                        <div className="flex justify-center">
                            <Card className="max-w-sm h-full bg-[#ffcd73]">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Our Services
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <b> Residential and Commercial Sales:</b>
                                    Whether you are buying your first home, upgrading to a larger space, or
                                    investing in commercial properties, we have the expertise to guide you.
                                    <br />
                                    <b>Property Management:</b> Our services are designed to maximise the value of
                                    your investment while ensuring your property is well-maintained.
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <div className="container mx-auto px-4 mb-20 ">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold mb-4" >WHAT WE OFFER</h2>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Featured Properties</h1>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <Card
                        className="max-w-sm shadow-none border-none"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="https://i.ibb.co/gDSMWs4/Screenshot-2024-06-27-at-11-46-53-AM.png"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                            Shop-Cum Office
                        </h5>
                        <button
                            type="submit"
                            className="block mx-auto bg-[#ffcd73] text-black text-xl py-2 px-6 rounded-3xl hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

                        >
                            Enquire Now
                        </button>


                    </Card>
                    <Card
                        className="max-w-sm shadow-none border-none"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="https://i.ibb.co/X7PMPJH/Screenshot-2024-06-27-at-11-47-03-AM.png"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                            Residential Plots
                        </h5>
                        <button
                            type="submit"
                            className="block mx-auto bg-[#ffcd73] text-black text-xl py-2 px-6 rounded-3xl hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

                        >
                            Enquire Now
                        </button>
                    </Card>
                    <Card
                        className="max-w-sm shadow-none border-none"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="https://i.ibb.co/gPG6ZZc/Screenshot-2024-06-27-at-11-47-12-AM.png"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                            Affordable Flats
                        </h5>
                        <button
                            type="submit"
                            className="block mx-auto bg-[#ffcd73] text-black text-xl py-2 px-6 rounded-3xl hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

                        >
                            Enquire Now
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AboutUs