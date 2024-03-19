/* This file is generated by zits. Do not edit manually */

import {ZomeName, FunctionName} from '@holochain/client';


/** Array of all zome function names in "notifications" */
export const notificationsFunctionNames: FunctionName[] = [
	"entry_defs", 
	"get_zome_info", 
	"get_dna_info",
	"send_contact",
	"send_update_contact",
	"send_delete_contact",
	"create_contact",
	"get_contacts",
	"update_contact",
	"delete_contact",
	"handle_notification_tip",
	"send_notification_tip",
	"claim_notifier",
	"find_a_notifier",

	"list_notifiers",
	"select_notifier",
	"select_first_notifier",
	"get_notifiers_for_notificant",
	"get_my_notifier",
	"remove_notifier_for_notificant",
	"retrieve_sent_notifications",
	"was_it_sent",
	"create_sent_notification",

	"grant_unrestricted_capability",
	"get_grants",
	"create_twilio_credentials",
	"get_twilio_credentials",
	"update_twilio_credentials",
	"delete_twilio_credentials",

];


/** Generate tuple array of function names with given zomeName */
export function generateNotificationsZomeFunctionsArray(zomeName: ZomeName): [ZomeName, FunctionName][] {
   const fns: [ZomeName, FunctionName][] = [];
   for (const fn of notificationsFunctionNames) {
      fns.push([zomeName, fn]);
   }
   return fns;
}


/** Tuple array of all zome function names with default zome name "notifications" */
export const notificationsZomeFunctions: [ZomeName, FunctionName][] = generateNotificationsZomeFunctionsArray("notifications");
