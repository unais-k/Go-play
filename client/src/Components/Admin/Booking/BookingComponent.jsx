import React, { useEffect, useState } from "react";
import { FetchAllBookingsReqApi } from "../../../API/Services/AdminRequest";
import { useSelector } from "react-redux";
import TableComponent from "./Components/TableComponent";
import ListCard from "./Components/ListCard";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";

function BookingComponent() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.adminLogin.token);
    const [data, setData] = useState([]);
    const [event, setEvent] = useState([]);
    const [loader, setLoader] = useState(false);

    const fullData = async () => {
        setLoader(true);
        const response = await FetchAllBookingsReqApi(token);
        if (response.status === 201) {
            setData(response.data.result);
            setEvent(response.data.event);
            setLoader(false);
        }
    };
    const handleView = (id) => {
        console.log(id);
        navigate("/admin/offer-view/" + id);
    };

    useEffect(() => {
        if (token) {
            fullData();
        }
    }, [token]);
    return (
        <div className="px-10">
            <div>
                {event?.length > 0 ? (
                    <>
                        <h1 className="w-full mx-4 my-3 font-normal text-2xl font-heading uppercase mb-10">
                            Offer Bookings
                        </h1>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div>
                {event?.map((res) => {
                    return (
                        <div key={res.client._id} onClick={() => handleView(res.client._id)}>
                            <ListCard event={res} />
                        </div>
                    );
                })}
            </div>
            <div className="">
                {loader && <Loader />}
                {data?.length > 0 ? (
                    <h1 className="w-full mx-4 my-3 font-normal text-2xl font-heading uppercase">Bookings</h1>
                ) : (
                    <></>
                )}
            </div>
            {data?.map((res) => {
                return (
                    <>
                        <div key={res.turf?._id} className="bg-gray-100 rounded w-full lg:max-w-full lg:flex m-3">
                            <div
                                className="h-48 p-2 lg:h-auto lg:w-48 flex-none bg-cover text-center overflow-hidden"
                                title="Mountain"
                            >
                                <img src={res?.turf?.images} alt="" />
                            </div>
                            <div className=" p-4 flex justify-between leading-normal">
                                <TableComponent data={res} />
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
}

export default BookingComponent;
