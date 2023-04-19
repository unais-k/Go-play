import React, { useEffect, useState } from "react";
import { AvailableStatusChangeReqApi } from "../../../../API/Services/TurfAdminRequest";
import { useSelector } from "react-redux";
import { message } from "antd";

function AboutComponent({ viewData }) {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [toggle, setToggle] = useState(false);
    const date = new Date(viewData.createdAt).toDateString();

    const handleToggle = async () => {
        console.log(1111);
        setToggle((current) => !current);
        console.log(toggle, "toggle");
        const response = await AvailableStatusChangeReqApi(toggle, token);
        if (response.status === 200) {
            message.success("Venue is available now");
        } else if (response.status === 203) {
            message.warning("Venue is not available now");
        } else {
            message.error("Something went wrong");
        }
    };
    useEffect(() => {
        console.log("UseEffect working");
    }, [toggle]);

    const handleToggleFalse = async () => {
        setToggle(false);
        console.log(toggle, "false");
    };
    const handleToggleTrue = async () => {
        setToggle(true);
        console.log(toggle, "true");
    };

    return (
        <div class="bg-white p-3 shadow-sm rounded-sm">
            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                    <svg
                        class="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </span>
                <span class="tracking-wide">About</span>
            </div>
            <div class="text-gray-700">
                {viewData.length === 0 ? (
                    <div class="grid md:grid-cols-2 text-sm">
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Owner name</div>
                            <div class="px-4 py-2">Manual</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Venue Name</div>
                            <div class="px-4 py-2">Soccer club</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Gender</div>
                            <div class="px-4 py-2">Female</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Contact No.</div>
                            <div class="px-4 py-2">+917594022964</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Current Address</div>
                            <div class="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Permanant Address</div>
                            <div class="px-4 py-2">Arlington Heights, IL, Illinois</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Email.</div>
                            <div class="px-4 py-2">
                                <a class="text-blue-800" href="mailto:jane@example.com">
                                    jane@example.com
                                </a>
                            </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Birthday</div>
                            <div class="px-4 py-2">Feb 06, 1998</div>
                        </div>
                    </div>
                ) : (
                    <div class="grid md:grid-cols-2 text-sm">
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Owner name</div>
                            <div class="px-4 py-2">{viewData.Owner.name}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Venue Name</div>
                            <div class="px-4 py-2">{viewData.name}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Contact No.</div>
                            <div class="px-4 py-2">+91{viewData.phone}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Current Address</div>
                            <div class="px-4 py-2">{viewData.address}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Available Status</div>
                            <div class="px-4 py-2">
                                {viewData.available && toggle === true ? (
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={toggle}
                                            onClick={handleToggleFalse}
                                            class="sr-only peer"
                                            checked
                                        />
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                ) : (
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={toggle}
                                            onClick={handleToggleTrue}
                                            class="sr-only peer"
                                        />
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                )}
                            </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Email.</div>
                            <div class="px-4 py-2">
                                <a class="" href={`mailto:${viewData.email}`}>
                                    {viewData.email}
                                </a>
                            </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Type</div>
                            <div class="px-4 py-2">{viewData.groundType}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Created At</div>
                            <div class="px-4 py-2">{date}</div>
                        </div>
                    </div>
                )}
                {/* <div class="grid md:grid-cols-2 text-sm">
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Owner name</div>
                        <div class="px-4 py-2">{viewData.Owner.name}</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Venue Name</div>
                        <div class="px-4 py-2">{viewData.name}</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Gender</div>
                        <div class="px-4 py-2">Female</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Contact No.</div>
                        <div class="px-4 py-2">+91{viewData.phone}</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Current Address</div>
                        <div class="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Permanant Address</div>
                        <div class="px-4 py-2">Arlington Heights, IL, Illinois</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Email.</div>
                        <div class="px-4 py-2">
                            <a class="text-blue-800" href="mailto:jane@example.com">
                                jane@example.com
                            </a>
                        </div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Birthday</div>
                        <div class="px-4 py-2">Feb 06, 1998</div>
                    </div>
                </div> */}
            </div>
            {/* <button class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                Show Full Information
            </button> */}
        </div>
    );
}

export default AboutComponent;
