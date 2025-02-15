import dayjs from "dayjs";
import { emailTemplates } from "./email.template.js";
import transporter from "../config/nodemailer.js";

export const sendRemainderEmail = async ({ to, type, subscription }) => {
    if (!to || !type) throw new Error("Missing neccessary params");

    const template = emailTemplates.find((t) => t.label === type);

    if (!template) throw new Error("invalid email type");

    const data = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format("DD MMM YYYY"),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    };

    const message = template.generateBody(data);
    const subject = template.generateSubject(data);

    const mailOptions = {
        from: "barickparesh1999@gmail.com",
        to,
        subject,
        html: message,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error, "error in sending email");
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
