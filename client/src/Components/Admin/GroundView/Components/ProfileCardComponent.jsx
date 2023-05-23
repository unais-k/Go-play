import React from "react";

function ProfileCardComponent({ viewData }) {
    const date = new Date(viewData?.createdAt).toDateString();

    return (
        <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                    {viewData?.images ? (
                        <img className="h-auto w-full mx-auto" src={viewData?.images[0]} alt="" />
                    ) : (
                        "NO IMAGES FOUND"
                    )}
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{viewData?.name}</h1>
                {/* <h3 className="text-gray-600 font-lg text-semibold leading-6">{viewData?.Owner.name}</h3> */}
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    {viewData?.place},{viewData?.nearCity}
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    {/* <li className="flex items-center py-3">
                        <span>Status</span>
                        <span className="ml-auto">
                            <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span>
                        </span>
                    </li> */}
                    <li className="flex items-center py-3">
                        <span>Member since</span>
                        <span className="ml-auto">{date}</span>
                    </li>
                </ul>
            </div>

            <div className="my-4"></div>
        </div>
    );
}

export default ProfileCardComponent;
