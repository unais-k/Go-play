import React, { useEffect, useState } from "react";
import { GroundViewReqApi } from "../../../API/Services/ClientRequest";
import { useSelector } from "react-redux";

function ModalBookingComponent({ bookingData, setShowModal }) {
    const token = useSelector((state)=>state.userLogin.token)
  console.log(bookingData);
  //   const [showModal, setShowModal] = React.useState(false);
  const [time, setTime] = useState([]);
  const [date, setDate] = useState({});
  const [groundId, setGroundId] = useState({});
  const [groundData, setGroundData] = useState({});

  const GroundData = async () =>{
    const response = await GroundViewReqApi(groundId)
    if(response.status === 200){
        setGroundData(response.data.result)
    }

  } 

  useEffect(() => {
    if (bookingData) {
      setTime(bookingData.time);
      setDate(bookingData.date);
      setGroundId(bookingData.groundId);
      GroundData()
    }
  }, []);
  return (
    <div>
      {/* <button
        className="bg-orange-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Book Now
      </button> */}

      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Checkout</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <table class="table-auto">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Date</th>
                      <th>Place</th>
                      <th>Total</th>
                      <th>Advance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4">
                        {time?.map((res) => {
                          return <div>{res.time}</div>;
                        })}
                      </td>
                      {console.log(date, "kkkk")}
                      <td className="px-4">{new Date(date).toDateString()}</td>
                      <td className="px-4">{groundData.name},{groundData.place}</td>
                      <td className="px-4">{bookingData.price}</td>
                      <td className="px-4">{Math.floor(bookingData.price/15)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
}

export default ModalBookingComponent;