import { generateToken } from "../../Middleware/AuthVerify.js";
import AdminModel from "../../Model/Admin.js";
import CityModel from "../../Model/City.js";
import UserModel from "../../Model/Client.js";
import eventModel from "../../Model/Events.js";
import GroundModel from "../../Model/Grounds.js";
import timeModel from "../../Model/Time.js";
import TurfAdminModel from "../../Model/TurfAdmin.js";
import nodeMailer from "nodemailer";
import notificationModel from "./../../Model/Notification.js";
import bookingModel from "../../Model/Booking.js";
import OfferModel from "../../Model/Offer.js";
import moment from "moment";
import mongoose from "mongoose";

export const adminLogin = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        const Check = await AdminModel.findOne({ email: email, password: password });

        if (!Check) res.status(401).json({ message: "Email is not valid" });
        if (Check) {
            const token = generateToken({ role: "adminLogin", id: Check._id });
            res.status(200).json({ token: token, id: Check._id });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const userListReqApi = async (req, res) => {
    try {
        let ClientId = [];
        const find = await UserModel.find({});
        for (let i = 0; i < find.length; i++) {
            ClientId.push(find[i]._id);
        }
        const agg = await bookingModel.aggregate([
            {
                $match: {
                    client: {
                        $in: ClientId,
                    },
                },
            },
        ]);

        // const suj = await bookingModel.aggregate([
        //     {
        //         $group: {
        //             _id: "$client",
        //             count: { $sum: 1 },
        //         },
        //     },
        //     {
        //         $match: {
        //             count: { $gt: 0 },
        //         },
        //     },
        // ]);
        // console.log(suj);

        res.status(200).json({ result: find, book: agg });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const notificationReqApi = async (req, res) => {
    try {
        const getTurfAdminRequest = await TurfAdminModel.aggregate([{ $match: { status: false } }]);
        res.status(200).json({ result: getTurfAdminRequest });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const ApproveTurfAdmin = async (req, res) => {
    try {
        const { id } = req.body;
        const find = await TurfAdminModel.findOne({ _id: id });
        let transporter = nodeMailer.createTransport({
            port: 465, // true for 465, false for other ports
            host: "smtp.gmail.com",
            secure: true,
            auth: {
                user: process.env.NodeMailerEmail,
                pass: process.env.NodeMailerPassword,
            },
        });
        const mailData = {
            from: process.env.NodeMailerEmail, // sender address
            to: find.email, // list of receivers
            subject: "Congratulation",
            text: "That was easy!",
            html: "<b>Hey there! </b> <br>Your request for starting business with go-play.com <br/>  <br>has been approved You can now login with registered credential</br>",
        };
        transporter.sendMail(mailData, async (error, info) => {
            if (error) {
                return console.log(error, 11);
            }
            const findOwner = await TurfAdminModel.findOneAndUpdate({ _id: id }, { $set: { status: true } });
            console.log(findOwner);
            res.status(200).json({ message: "Mail send", message_id: info.messageId, name: find.name });
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const CancelTurfAdmin = async (req, res) => {
    try {
        const { id } = req.body;
        const find = await TurfAdminModel.findById(id);
        let transporter = nodeMailer.createTransport({
            port: 465, // true for 465, false for other ports
            host: "smtp.gmail.com",
            secure: true,
            auth: {
                user: process.env.NodeMailerEmail,
                pass: process.env.NodeMailerPassword,
            },
        });
        const mailData = {
            from: process.env.NodeMailerEmail, // sender address
            to: find.email, // list of receivers
            subject: "Sorry!",
            text: "Some credential is not valid!",
            html: "<b>Hey there! </b> <br>Your request for starting business with go-play.com <br/>  <br>has been canceled, So please Register with correct credentials</br>",
        };
        transporter.sendMail(mailData, async (error, info) => {
            if (error) {
                return console.log(error, 11);
            }
            const findOwner = await TurfAdminModel.findByIdAndDelete(id);
            res.status(200).json({ message: "Mail send", message_id: info.messageId, name: find.name });
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const AddCity = async (req, res) => {
    try {
        const { data } = req.body;

        const find = await CityModel.findOne({ data });
        if (find) {
            res.status(401).json({ message: "City already exist" });
        } else {
            await CityModel.create({
                City: data,
            }).then(async () => {
                const list = await CityModel.find({});
                res.status(201).json({ message: "Created", result: list });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const FindCity = async (req, res) => {
    try {
        const find = await CityModel.find({});
        console.log(find);
        res.status(200).json({ result: find });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const GroundListAdminResApi = async (req, res) => {
    try {
        const groundList = await GroundModel.find({}).populate("Owner");
        console.log(groundList);
        res.status(200).json({ result: groundList });
    } catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: error });
    }
};

export const GroundViewResApi = async (req, res) => {
    try {
        const id = req.query.id;
        const find = await GroundModel.findOne({ _id: id }).populate("Owner");
        const events = await eventModel.find({ groundId: id });
        res.status(201).json({ result: find, event: events });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const BlockGroundResApi = async (req, res) => {
    console.log(req.body);
    try {
        const id = req.body.data;
        console.log(id);
        const find = await GroundModel.updateOne({ _id: id }, { $set: { status: true } });

        res.status(202).json({ result: find });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const UnblockGroundResApi = async (req, res) => {
    console.log(req.body);
    try {
        const id = req.body.data;
        console.log(id);
        const find = await GroundModel.updateOne({ _id: id }, { $set: { status: false } });

        res.status(202).json({ result: find });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const OwnerListResApi = async (req, res) => {
    try {
        const find = await TurfAdminModel.find({});

        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const EventDetailFetchResApi = async (req, res) => {
    try {
        const id = req.query.id;
        const findDetail = await eventModel.findOne({ _id: id }).populate("groundId");
        res.status(201).json({ result: findDetail });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const ChatRequestResApi = async (req, res) => {
    try {
        const findDetail = await notificationModel.find().populate("sender");
        console.log(findDetail);
        res.status(201).json({ result: findDetail });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const FetchAllBookingResApi = async (req, res) => {
    try {
        const find = await bookingModel.find({ offer: false }).populate("turf").populate("client");
        const events = await OfferModel.find({}).populate("turf").populate("client");
        console.log(find, events);
        res.status(201).json({ result: find, event: events });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const UserEventBookingDetailFetchResApi = async (req, res) => {
    try {
        const id = req.query.id;
        console.log(req.query.id);
        const find = await OfferModel.findOne({ client: id }).populate("turf").populate("event").sort({ bookDate: -1 });
        const Booked = await bookingModel.find({ offerId: find._id });

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
            }
        }

        console.log(find, "-------------------");

        res.status(201).json({ result: find, events: Booked });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};
