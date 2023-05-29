import React from "react";

function Loader() {
    return (
        <div>
            <div className="flex">
                <div className="relative">
                    <div
                        className="w-12 h-12 rounded-full absolute
                            border-4 border-dashed border-gray-200"
                    ></div>

                    <div
                        className="w-12 h-12 rounded-full animate-spin absolute
                            border-4 border-dashed border-green-500 border-t-transparent"
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Loader;