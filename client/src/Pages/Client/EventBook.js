import React from "react";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import { useSelector } from "react-redux";
import Footer from "../../Components/Client/Footer/Footer";
import BookingListComponent from "../../Components/Client/Event/BookingList/BookingListComponent";

function EventBook() {
    const location = useSelector((state) => state.userLogin.city);
    return (
        <div>
            <div className="h-16 mt-1 border-b">
                {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"mumbai11"} />}
            </div>
            <ConstNavbar />

            <BookingListComponent />

            <Footer />
        </div>
    );
}

export default EventBook;
