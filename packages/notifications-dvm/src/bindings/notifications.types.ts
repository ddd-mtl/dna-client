/* This file is generated by zits. Do not edit manually */

import {
WebsocketConnectionOptions,
/** types.ts */
HoloHash,
AgentPubKey,
DnaHash,
WasmHash,
EntryHash,
ActionHash,
AnyDhtHash,
ExternalHash,
KitsuneAgent,
KitsuneSpace,
HoloHashB64,
AgentPubKeyB64,
DnaHashB64,
WasmHashB64,
EntryHashB64,
ActionHashB64,
AnyDhtHashB64,
InstalledAppId,
Signature,
CellId,
DnaProperties,
RoleName,
InstalledCell,
Timestamp,
Duration,
HoloHashed,
NetworkInfo,
FetchPoolInfo,
/** hdk/action.ts */
SignedActionHashed,
RegisterAgentActivity,
ActionHashed,
ActionType,
Action,
NewEntryAction,
Dna,
AgentValidationPkg,
InitZomesComplete,
CreateLink,
DeleteLink,
OpenChain,
CloseChain,
Update,
Delete,
Create,
/** hdk/capabilities.ts */
CapSecret,
CapClaim,
GrantedFunctionsType,
GrantedFunctions,
ZomeCallCapGrant,
CapAccessType,
CapAccess,
CapGrant,
///** hdk/countersigning.ts */
//CounterSigningSessionData,
//PreflightRequest,
//CounterSigningSessionTimes,
//ActionBase,
//CounterSigningAgents,
//PreflightBytes,
//Role,
//CountersigningAgentState,
/** hdk/dht-ops.ts */
DhtOpType,
DhtOp,
getDhtOpType,
getDhtOpAction,
getDhtOpEntry,
getDhtOpSignature,
/** hdk/entry.ts */
EntryVisibility,
AppEntryDef,
EntryType,
EntryContent,
Entry,
/** hdk/record.ts */
Record as HcRecord,
RecordEntry as HcRecordEntry,
/** hdk/link.ts */
AnyLinkableHash,
ZomeIndex,
LinkType,
LinkTag,
RateWeight,
RateBucketId,
RateUnits,
Link,
/** api/admin/types.ts */
InstalledAppInfoStatus,
DeactivationReason,
DisabledAppReason,
StemCell,
ProvisionedCell,
ClonedCell,
CellType,
CellInfo,
AppInfo,
MembraneProof,
FunctionName,
ZomeName,
ZomeDefinition,
IntegrityZome,
CoordinatorZome,
DnaDefinition,
ResourceBytes,
ResourceMap,
CellProvisioningStrategy,
CellProvisioning,
DnaVersionSpec,
DnaVersionFlexible,
AppRoleDnaManifest,
AppRoleManifest,
AppManifest,
AppBundle,
AppBundleSource,
NetworkSeed,
ZomeLocation,
   } from '@holochain/client';

import {
/** Common */
DhtOpHashB64,
//DnaHashB64, (duplicate)
//AnyDhtHashB64, (duplicate)
DhtOpHash,
/** DnaFile */
DnaFile,
DnaDef,
Zomes,
WasmCode,
/** entry-details */
EntryDetails,
RecordDetails,
Details,
DetailsType,
EntryDhtStatus,
/** Validation */
ValidationStatus,
ValidationReceipt,
   } from '@holochain-open-dev/core-types';

export interface UpdateContactInput {
  original_contact_hash: ActionHash
  previous_contact_hash: ActionHash
  updated_contact: Contact
}

export interface Contact {
  agent_pub_key: AgentPubKey
  text_number?: string
  whatsapp_number?: string
  email_address?: string
}

export interface NotificationTip {
  retry_count: number
  status: string
  message: string
  notificants: AgentPubKey[]
  contacts: Contact[]
  extra_context: string
  message_id: string
  destination: string
}

export type SignalVariantLinkCreated = {
  type: "LinkCreated"
  action: SignedActionHashed
  link_type: LinkTypes
}
export type SignalVariantLinkDeleted = {
  type: "LinkDeleted"
  action: SignedActionHashed
  link_type: LinkTypes
}
export type SignalVariantEntryCreated = {
  type: "EntryCreated"
  action: SignedActionHashed
  app_entry: EntryTypes
}
export type SignalVariantEntryUpdated = {
  type: "EntryUpdated"
  action: SignedActionHashed
  app_entry: EntryTypes
  original_app_entry: EntryTypes
}
export type SignalVariantEntryDeleted = {
  type: "EntryDeleted"
  action: SignedActionHashed
  original_app_entry: EntryTypes
}
export type Signal =
  | SignalVariantLinkCreated
  | SignalVariantLinkDeleted
  | SignalVariantEntryCreated
  | SignalVariantEntryUpdated
  | SignalVariantEntryDeleted;

export interface AgentPubKeyWithTag {
  agent: AgentPubKey
  tag: string
}

export interface RemoveNotifierForNotificantInput {
  base_notificant: AgentPubKey
  target_notifier: AgentPubKey
}

export interface UpdateTwilioCredentialsInput {
  original_twilio_credentials_hash: ActionHash
  previous_twilio_credentials_hash: ActionHash
  updated_twilio_credentials: TwilioCredentials
}

export interface Contact {
  agent_pub_key: AgentPubKey
  text_number?: string
  whatsapp_number?: string
  email_address?: string
}

export enum EntryTypesType {
	TwilioCredentials = 'TwilioCredentials',
	Contact = 'Contact',
	SentNotification = 'SentNotification',
}
export type EntryTypes = 
 | {type: {TwilioCredentials: null}, content: TwilioCredentials}
 | {type: {Contact: null}, content: Contact}
 | {type: {SentNotification: null}, content: SentNotification}


export type LinkTypes =
  | {TwilioCredentialsUpdates: null} | {NotificantToNotifiers: null} | {ContactUpdates: null} | {AnchorToNotifiers: null} | {SentNotificationUpdates: null};
export enum LinkTypesType {
	TwilioCredentialsUpdates = 'TwilioCredentialsUpdates',
	NotificantToNotifiers = 'NotificantToNotifiers',
	ContactUpdates = 'ContactUpdates',
	AnchorToNotifiers = 'AnchorToNotifiers',
	SentNotificationUpdates = 'SentNotificationUpdates',
}

export interface SentNotification {
  unique_data: string
}

export interface TwilioCredentials {
  account_sid: string
  auth_token: string
  from_number_text: string
  from_number_whatsapp: string
}
