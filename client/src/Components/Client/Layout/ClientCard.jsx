import React from "react";
import { AiFillStar } from "react-icons/ai";
import { FaMapPin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ClientCard({ res }) {
    console.log(res, "res");
    const navigate = useNavigate();
    const handleView = (id) => {
        navigate(`/ground-view/${res._id}`);
    };
    return (
        <div>
            <div className="flex w-full my-3" onClick={() => handleView(res._id)}>
                <div className="me-3 w-3/6">
                    <img className="h-44 mx-3 px-3" src={res.images} alt="" />
                </div>
                <div className="w-3/5 ms-4">
                    <div>
                        <h1 className="text-amber-500 uppercase font-semibold">{res.name}</h1>
                    </div>
                    <div className="flex flex-wrap text-sm text-stone-600 mt-2 mb-5">
                        <div className="">
                            <FaMapPin size={15} color="gray" />
                        </div>
                        {res.place},{res.nearCity}
                    </div>
                    <div className="flex w-fit px-3 py-0.5 ms-2 bg-green-700 text-white">
                        <AiFillStar className="pt-1" size={20} color="white" />0
                    </div>
                </div>
                <div>
                    <button className="bg-amber-500 text-white uppercase font-semibold px-4 py-2 hover:bg-amber-700">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClientCard;