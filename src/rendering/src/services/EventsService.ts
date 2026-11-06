import { event, identity } from '@sitecore-content-sdk/events';
import type { IdentityData } from '@sitecore-content-sdk/events';
import Cookies from 'js-cookie';

import { CUSTOM_EVENTS } from 'src/constants/custom-events';
import { TICKETS } from 'src/models/mock-tickets';
import config from 'sitecore.config';

const channel = 'WEB';
const currency = 'USD';
const language = (
  typeof window !== 'undefined' ? window?.navigator?.language : config.defaultLanguage
)?.slice(0, 2);

export const identifyVisitor = async (
  email: string,
  firstName = '',
  lastName = '',
  phone = ''
): Promise<unknown> => {
  const eventData: IdentityData = {
    email,
    channel,
    currency,
    language,
    firstName,
    lastName,
    phone,
    page: window?.location?.pathname + window?.location?.search,
    identifiers: [
      {
        id: email,
        provider: 'email',
      },
    ],
  };

  return identity(eventData);
};

export const logAudiencePreferenceEvent = async (audience: string): Promise<unknown> => {
  return event({
    type: CUSTOM_EVENTS.audiencePreference.type,
    extensionData: {
      channel,
      currency,
      audience,
    },
  });
};

export const logTicketPurchase = async (ticketId: number): Promise<unknown> => {
  const purchasedTicketItem = TICKETS[ticketId];

  // Log PAYMENT_FORM_COMPLETED custom event
  await event({
    type: CUSTOM_EVENTS.paymentFormCompleted.type,
    extensionData: {
      channel,
      currency,
    },
  });

  // Log PAYMENT_SUCCESSFUL custom event
  await event({
    type: CUSTOM_EVENTS.paymentSuccessful.type,
    extensionData: {
      channel,
      currency,
    },
  });

  // Log TICKET_PURCHASED custom event
  return event({
    type: CUSTOM_EVENTS.ticketPurchased.type,
    extensionData: {
      channel,
      currency,
      ticketId,
      ticketName: purchasedTicketItem.name,
      pricePaid: purchasedTicketItem.price,
    },
  });
};

export const logAttendeeFormCompleted = async (): Promise<unknown> => {
  return event({
    type: CUSTOM_EVENTS.attendeeFormCompleted.type,
    extensionData: {
      channel,
      currency,
    },
  });
};

export const logTicketSelected = async (): Promise<unknown> => {
  return event({
    type: CUSTOM_EVENTS.ticketSelected.type,
    extensionData: {
      channel,
      currency,
    },
  });
};

export const logSearchProfileData = async (payload: {
  entities: [
    {
      affinity: { audience: [{ value: string; score: number }] };
      events: { views: [{ id: string }] };
    }
  ];
}): Promise<unknown> => {
  // Transform the affinity scores & page views into suitable forms for the guest data extension
  const affinities = payload?.entities?.[0].affinity?.audience?.reduce(
    (obj, item) => (
      (obj[
        item.value
          .split(' ')
          .map((x, index) => (index === 0 ? x.toLowerCase() : x))
          .join('')
      ] = Math.round((item.score + Number.EPSILON) * 100) / 100),
      obj
    ),
    {} as Record<string, number>
  );

  const pageViews = payload?.entities?.[0].events?.views
    ?.slice(0, 5)
    .reduce(
      (obj, item, index) => ((obj[`page${index + 1}`] = sessionStorage.getItem(item.id)), obj),
      {} as Record<string, string>
    );

  const extensionData = {
    uuid: Cookies.get('__rutma')?.split('.')[0],
    ...affinities,
    ...pageViews,
  };

  return event({
    type: CUSTOM_EVENTS.searchProfileData.type,
    extensionData: {
      channel,
      currency,
      ...extensionData,
    },
  });
};
