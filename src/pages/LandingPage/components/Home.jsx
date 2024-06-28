import { Card } from "flowbite-react";
import Form1 from './Forms/Form1'
const Home = ({ form, handleSubmit }) => {
    return (
        <div>
            <div className="flex flex-wrap " >
                <div className="w-full md:w-7/10 border-b border-black" style={{ maxHeight: "85vh" }}>
                    <img
                        src="https://i.ibb.co/mvdqV88/Screenshot-2024-06-25-at-11-33-04-AM.png"
                        alt="Large description"
                        className="w-full h-full object-cover"
                        style={{ maxHeight: 'calc(100vh - 4rem)' }} // Adjust for navbar height if needed
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-3/10 bg-[#f6f2ec] p-8 overflow-auto border-b border-black" style={{ maxHeight: "85vh" }}>
                    <h2 className="text-2xl mb-6 p-4">Let's Find Your Dream Properties, Request a Callback</h2>
                    <Form1 form={form} handleSubmit={handleSubmit} />
                </div>
            </div>

            {/* Cards Section */}
            <div className="container mx-auto px-4 mb-20 mt-16 ">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold mb-4" style={{ color: "#faa283" }}>HOT PROPERTIES</h2>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">NEWLY LAUNCHED IN FARIDABAD</h1>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <Card
                        className="max-w-sm shadow-none border-none"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="https://i.ibb.co/10YBYbg/Screenshot-2024-06-27-at-10-38-03-AM.png"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                            Universal Square By Auric
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                            Independent SCO FLOORS Sector 79, Faridabad
                        </p>
                        <h3 className="text-xl tracking-tight text-gray-900 dark:text-white text-center">
                            Starting @45 Lakh*
                        </h3>
                    </Card>
                    <Card
                        className="max-w-sm shadow-none border-none"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="https://i.ibb.co/CKm1hMd/Screenshot-2024-06-27-at-10-38-19-AM.png"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                            MANSHA ORCHID PLOTS
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                            Gated Plot Township Sector 110, Faridabad

                        </p>
                        <h3 className="text-xl tracking-tight text-gray-900 dark:text-white text-center">
                            Starting @45000/sq. yard.*
                        </h3>
                    </Card>
                    <Card
                        className="max-w-sm shadow-none border-none"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="https://i.ibb.co/DgKfqC9/Screenshot-2024-06-27-at-10-38-30-AM.png"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">

                            MANSHA AFFORDABLE FLATS
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400 text-center">

                            2BHK & 4BHK Flats Sector 104, Faridabad
                        </p>
                        <h3 className="text-xl tracking-tight text-gray-900 dark:text-white text-center">
                            Starting @31.25 Lakh*
                        </h3>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home