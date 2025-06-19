"use client";


export default function Services() {
    return (
        <>
            <div className="text-gray-600">
                <div className="relative">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZGLENT57QMeUSmqQ14UgfUqP_t6nf89OisrnuGE038ccdotrxRyHSCO9aMDh9fRSgQ&usqp=CAU"
                        alt="Consultancy Services"
                        className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-50 w-full"></div>
                    <div className="absolute inset-0 flex items-center max-w-screen-lg mx-auto pl-6">
                        <div className="text-white text-2xl md:text-4xl font-bold border-b pb-4">
                            What We Do
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
