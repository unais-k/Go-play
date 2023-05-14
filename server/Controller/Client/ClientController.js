import CityModel from "../../Model/City.js";
import timeModel from "../../Model/Time.js";
import GroundModel from "./../../Model/Grounds.js";
import eventModel from "./../../Model/Events.js";
import mongoose, { mongo } from "mongoose";
import bookingModel from "../../Model/Booking.js";
import UserModel from "../../Model/Client.js";
import reviewModel from "../../Model/Review.js";
import moment from "moment";

export const CityListResApi = async (req, res, next) => {
    try {
        const cityList = await CityModel.find({});
        res.status(200).json({ result: cityList });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const TimeSlotResApi = async (req, res, next) => {
    try {
        const find = await timeModel.find({});
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const GroundListResApi = async (req, res, next) => {
    try {
        const GroundList = await GroundModel.find({});
        res.status(200).json({ result: GroundList });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const FootballGroundResApi = async (req, res, next) => {
    try {
        const find = await GroundModel.aggregate([
            {
                $match: {
                    groundType: "",
                },
            },
        ]);
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const GroundViewResApi = async (req, res, next) => {
    try {
        const id = req.query.id;
        console.log(id, "id");
        const find = await GroundModel.findOne({ _id: id });
        const events = await eventModel.find({ groundId: id });
        const review = await reviewModel.find({ turf: id }).populate("client");

        res.status(200).json({ result: find, events: events, review: review });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

function multiIntersect(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i !== j) {
                continue;
            }
            result = result.concat(arr[i].filter((value) => arr[j].includes(value)));
        }
    }
    return Array.from(new Set(result));
}

export const SelectTypeResApi = async (req, res, next) => {
    try {
        const id = req.query.id;
        let event = [];
        const find = await eventModel.find({ groundId: id });
        for (let i = 0; i < find.length; i++) {
            event.push(find[i].eventAvailable);
        }
        const concatArray = multiIntersect(event);

        res.status(201).json({ result: concatArray });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const GroundFetchOnSelectResApi = async (req, res, next) => {
    try {
        const matchGround = await eventModel.aggregate([
            {
                $match: {
                    groundId: new mongoose.Types.ObjectId(req.query.id),
                    eventAvailable: req.query.data,
                },
            },
        ]);

        res.status(201).json({ result: matchGround });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const EventFetchOnSelectResApi = async (req, res, next) => {
    try {
        const findEvent = await eventModel.find({ _id: req.query.id });
        const slotsAvailable = findEvent[0].slots;

        const slow = await slotsAvailable.filter((e) => e.status === true);
        res.status(201).json({ result: findEvent, slots: slow });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const OnDateBookedResApi = async (req, res, next) => {
    try {
        const date = new Date(req.query.date);
        console.log(req.query.date);
        const isoDate = date.toISOString().split("T")[0];
        const selectedTime = [];
        const find = await bookingModel.find({ event: req.query.id, bookDate: isoDate });

        for (let i = 0; i < find.length; i++) {
            selectedTime.push(find[i].time);
        }
        const combinedArray = selectedTime.reduce((acc, curr) => acc.concat(curr), []);
        res.status(201).json({ result: find, time: combinedArray });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const BookingSubmitResApi = async (req, res, next) => {
    try {
        const dateString = req.body.date;
        const dateObject = moment.utc(dateString).add(1, "days");
        const formattedISOString = dateObject.toISOString();

        const date = new Date(formattedISOString);
        const formattedDate = date.toISOString().split("T")[0];

        const { bookingData } = req.body;
        const booking = await bookingModel.create({
            client: req.user.id,
            total: req.body.total[0],
            paymentId: req.body.bookingId,
            advance: req.body.advance[0],
            bookDate: formattedDate,
            sport: bookingData[0].sport,
            event: bookingData[0].eventId,
            turf: bookingData[0].groundId,
            time: req.body.time[0],
        });
        console.log(booking, "booking");
        res.status(201).json({ result: booking });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const UserDataFetchResApi = async (req, res, next) => {
    try {
        const id = req.user.id;
        const find = await UserModel.findOne({ _id: id });
        console.log(find, "find------------");
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const UserEditResApi = async (req, res, next) => {
    try {
        const { name, email, phone, city, dob } = req.body;

        const updateUser = await UserModel.updateMany(
            { _id: req.body._id },
            { $set: { name: name, email: email, phone: phone, city: city, dob: dob } }
        );
        console.log(updateUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const UserBookingDetailFetchResApi = async (req, res, next) => {
    try {
        const id = req.user.id;
        console.log(id);

        const today = new Date(Date.now());

        const dateObject = moment.utc(today).add(1, "days");
        const formattedISOString = dateObject.toISOString();

        const date = new Date(formattedISOString);
        const formattedDate = date.toISOString().split("T")[0];
        console.log(formattedDate, "date");
        const find1 = await bookingModel.find({ client: id });

        for (let i = 0; i < find1.length; i++) {
            let dateString = new Date(find1[i].bookDate);
            let DateStr = new Date(formattedDate);

            if (dateString < DateStr) {
                if (find1[i].payment === "Cancelled") {
                    let update = { $set: { status: "Cancelled" } };
                    let result = await bookingModel.updateOne(update);
                    console.log(result);

                    console.log(
                        `${result.matchedCount} document(s) matched the filter, and ${result.modifiedCount} document(s) were updated.`
                    );
                }
            } else {
                console.log(777);
            }
        }
        const find = await bookingModel.find({ client: id }).populate("turf").populate("event").sort({ bookDate: -1 });

        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const BookingDetailViewResApi = async (req, res, next) => {
    try {
        const id = req.query.id;
        const find = await bookingModel.findOne({ _id: id }).populate("turf").populate("event");
        console.log(find);
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const SubmitReviewResApi = async (req, res, next) => {
    try {
        const { text, rating } = req.body.data;
        const findXx = await bookingModel.find({ _id: req.body.id });
        const groundId = findXx[0].turf;
        const setReview = await reviewModel.create({
            rating: rating,
            turf: groundId,
            client: req.user.id,
            review: text,
        });
        const reviewStatusChangeInBookingModel = await bookingModel.updateOne(
            { _id: req.body.id },
            { $set: { review: true } }
        );
        const find = await reviewModel.find({ turf: req.body.id }).populate("client");
        console.log(setReview);
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const SearchGroundResApi = async (req, res, next) => {
    try {
        const { id } = req.query;
        console.log(req.query);
        console.log(req.body);
        let regexp = new RegExp(`^${id}`, "i");
        const find = await GroundModel.aggregate([
            {
                $match: {
                    $or: [
                        {
                            nearCity: regexp,
                        },
                        {
                            address: regexp,
                        },
                        {
                            place: regexp,
                        },
                    ],
                },
            },
        ]);
        console.log(find);
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const CancelBookingResApi = async (req, res, next) => {
    try {
        console.log(req.body);
        const id = req.user.id;
        const findAndUpdate = await bookingModel.findOneAndUpdate({ _id: req.body.id }, { $set: { status: "Cancelled" } });
        const find = await bookingModel.find({ client: id }).populate("turf").populate("event");
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const EventDateCheckResApi = async (req, res, next) => {
    try {
        // const dateString = req.body.date;
        // const arr = req.body.time;
        // console.log(arr);
        // const dateObject = moment.utc(dateString).add(1, "days");
        // const formattedISOString = dateObject.toISOString();
        // const date = new Date(formattedISOString);
        let bookedSlots = [];
        // const formattedDate = date.toISOString().split("T")[0];
        console.log(req.body);
        let checkDateForWeek;
        if (req.body.event === "Week") {
            for (let j = 1; j < 8; j++) {
                const dateString = req.body.date;
                const arr = req.body.time;
                const dateObject = moment.utc(dateString).add(j, "days");
                const formattedISOString = dateObject.toISOString();
                const date = new Date(formattedISOString);
                const formattedDate = date.toISOString().split("T")[0];
                console.log(formattedDate, "date");
                for (let i = 0; i < arr.length; i++) {
                    checkDateForWeek = await bookingModel.aggregate([
                        {
                            $match: {
                                event: new mongoose.Types.ObjectId(req.body.eventId),
                                bookDate: formattedDate,
                                time: {
                                    $elemMatch: {
                                        slots: req.body.time[i].slots,
                                    },
                                },
                            },
                        },
                    ]);
                    if (checkDateForWeek.length > 0) {
                        bookedSlots.push(checkDateForWeek);
                    }
                }
            }
        }
        console.log(bookedSlots);
        res.status(202).json({ result: bookedSlots });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};
