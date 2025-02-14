import dayjs from "dayjs";

import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMAINDERS = [7, 5, 2, 1];

export const sendRemainder = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") {
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date is passed for subscriptions ${subscriptionId}. Stopping workflow`,
    );
    return;
  }

  for (const daysBefore of REMAINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilRemainder(
        context,
        `Remainder ${daysBefore} days before`,
        reminderDate,
      );
    }
    await triggerRemainder(context, `Remainder ${daysBefore} days before`);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilRemainder = async (context, label, date) => {
  console.log(`Sleeping until ${label} remainder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerRemainder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} remainder`);
    // send email, SMS, push notifications...
  });
};
