import { identifyVisitor as identifyVisitorInEvents } from './EventsService';
import { identifyVisitor as identifyVisitorInSend } from './SendService';

export async function identifyVisitor(
  email: string,
  firstName?: string,
  lastName?: string,
  phoneNumber?: string
): Promise<unknown> {
  identifyVisitorInSend(email, firstName, lastName);

  // Log the 'IDENTITY' event
  try {
    return await identifyVisitorInEvents(email, firstName, lastName, phoneNumber);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
