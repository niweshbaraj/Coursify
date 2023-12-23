export default function AdminDashboard() {
    return (
        <div className='grid grid-rows-3 grid-cols-4 grid-flow-col relative'>
            <div className='row-span-full w-4/5 bg-orange-500'>
                <div>
                    <img
                        src="https://c8.alamy.com/comp/2RJ89AN/hipster-bearded-man-face-fashion-guy-with-hat-and-glasses-cartoon-vector-illustration-2RJ89AN.jpg"
                        alt="StudentImage"
                        className="flex items-center justify-center w-[220px] h-[200px] self-center cursor-pointer rounded-[40px] object-cover mt-10 mx-auto"
                    />

                    <div className="flex flex-col items-center justify-center mt-8 p-4 mx-auto">
                        <p className="text-white font-bold font-['Arimo']">Admin</p>
                        <p className="text-white font-bold font-['Arimo']">
                            admin@email.com
                        </p>
                        <p className="text-white font-bold font-['Arimo']">
                            +91 98xxxx3210
                        </p>
                        <p className="text-white font-bold font-['Arimo']">
                            111; Random Colony,
                        </p>
                        <p className="text-white font-bold font-['Arimo']">
                            Random City, Random Country
                        </p>
                    </div>
                </div>
            </div>
            <div className="container bg-gray-200 col-span-3 rounded-[20px] mt-8 w-11/12 px-7 py-5">
                <div className="text-black text-xl font-bold tracking-[2px]">FOUNDATION COURSES</div>
                <div className=" container w-full h-5/6 mt-2 bg-zinc-100 rounded-[20px] p-3">
                    <table>
                        <tbody>
                            <tr>
                                <td className="tracking-[1px] uppercase text-sm px-6 py-1">Programming in Python</td>
                                <td className="tracking-[2px] text-sm px-24 py-1">BSCS1002</td>
                                <td className="pr-4 pl-28 py-1">
                                    <button className="px-1.5 py-0.5 text-xs 
                                                bg-orange-500 hover:bg-orange-800 
                                                text-bold text-white tracking-[2px] uppercase rounded-[30px]">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="tracking-[1px] uppercase text-sm px-6 py-1">Statistics for Data Science II</td>
                                <td className="tracking-[2px] text-sm px-24 py-1">BSMA1004</td>
                                <td className="pr-4 pl-28 py-1">
                                    <button className="px-1.5 py-0.5 text-xs 
                                                bg-orange-500 hover:bg-orange-800 
                                                text-bold text-white tracking-[2px] uppercase rounded-[30px]">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container bg-gray-200 col-span-3 rounded-[20px] mt-8 w-11/12 px-7 py-5">
                <div className="text-black text-xl font-bold tracking-[2px]">DIPLOMA COURSES</div>
                <div className="w-full h-[249px] mt-2 bg-zinc-100 rounded-[20px]">

                </div>
            </div>
            <div className="container bg-gray-200 col-span-3 rounded-[20px] mt-8 mb-8 w-11/12 px-7 py-5">
                <div className="text-black text-xl font-bold tracking-[2px]">DEGREE COURSES</div>
                <div className="w-full h-[249px] mt-2 bg-zinc-100 rounded-[20px]">

                </div>
            </div>
        </div>
    )
}
