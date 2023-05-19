import React, { useState } from "react";
import { StackedGraph } from "../Graph/StackedComponent";
import DashCardComponent from "./Components/DashCardComponent";
import { DonutGraph } from "../Graph/DonutComponent";
import Loader from "../Layout/Loader";

function TurfHomePage() {
    const [loader, setLoader] = useState(false);
    return (
        <div>
            <DashCardComponent />
            {loader && <Loader />}
            <div className="mt-12">
                <div className=" grid gap-10 grid-cols-1 lg:grid-cols-2">
                    <div className="bg-white shadow-lg">{<StackedGraph />}</div>
                    <div className="bg-white h-96 w-96 shadow-lg">{<DonutGraph />}</div>
                </div>
            </div>
        </div>
    );
}

export default TurfHomePage;
