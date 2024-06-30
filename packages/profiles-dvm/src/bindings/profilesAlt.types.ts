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

/**
 * Profile entry definition.
 * 
 * The profile must include at a minimum the nickname of the agent
 * in order to be able to search for agents by nickname.
 */
export interface Profile {
  nickname: string
  fields: Record<string, string>
}

export enum EntryTypesType {
	Profile = 'Profile',
}
export type EntryTypes = 
 | {type: {Profile: null}, content: Profile}


export enum LinkTypes {
	PrefixPath = 'PrefixPath',
	PathToAgent = 'PathToAgent',
	AgentToProfile = 'AgentToProfile',
}

export interface CastTipInput {
  tip: TipProtocol
  peers: AgentPubKey[]
}

/** Bool: True if state change just happened (real-time) */
export enum StateChangeType {
	Create = 'Create',
	Update = 'Update',
	Delete = 'Delete',
}
export type StateChangeVariantCreate = {Create: boolean}
export type StateChangeVariantUpdate = {Update: boolean}
export type StateChangeVariantDelete = {Delete: boolean}
export type StateChange = 
 | StateChangeVariantCreate | StateChangeVariantUpdate | StateChangeVariantDelete;

export interface LinkPulse {
  link: Link
  state: StateChange
}

export interface EntryPulse {
  ah: ActionHash
  state: StateChange
  ts: Timestamp
  author: AgentPubKey
  eh: EntryHash
  def: AppEntryDef
  bytes: Uint8Array
}

/**  */
export interface ZomeSignal {
  from: AgentPubKey
  pulses: ZomeSignalProtocol[]
}

/**  */
export enum ZomeSignalProtocolType {
	System = 'System',
	Entry = 'Entry',
	Link = 'Link',
	Tip = 'Tip',
}
export type ZomeSignalProtocolVariantSystem = {System: SystemSignalProtocol}
export type ZomeSignalProtocolVariantEntry = {Entry: EntryPulse}
export type ZomeSignalProtocolVariantLink = {Link: LinkPulse}
export type ZomeSignalProtocolVariantTip = {Tip: TipProtocol}
export type ZomeSignalProtocol = 
 | ZomeSignalProtocolVariantSystem | ZomeSignalProtocolVariantEntry | ZomeSignalProtocolVariantLink | ZomeSignalProtocolVariantTip;

/** Protocol for notifying the ViewModel (UI) of system level events */
export type SystemSignalProtocolVariantPostCommitNewStart = {
  type: "PostCommitNewStart"
  app_entry_type: string
}
export type SystemSignalProtocolVariantPostCommitNewEnd = {
  type: "PostCommitNewEnd"
  app_entry_type: string
  succeeded: boolean
}
export type SystemSignalProtocolVariantPostCommitDeleteStart = {
  type: "PostCommitDeleteStart"
  app_entry_type: string
}
export type SystemSignalProtocolVariantPostCommitDeleteEnd = {
  type: "PostCommitDeleteEnd"
  app_entry_type: string
  succeeded: boolean
}
export type SystemSignalProtocolVariantSelfCallStart = {
  type: "SelfCallStart"
  zome_name: string
  fn_name: string
}
export type SystemSignalProtocolVariantSelfCallEnd = {
  type: "SelfCallEnd"
  zome_name: string
  fn_name: string
  succeeded: boolean
}
export type SystemSignalProtocol =
  | SystemSignalProtocolVariantPostCommitNewStart
  | SystemSignalProtocolVariantPostCommitNewEnd
  | SystemSignalProtocolVariantPostCommitDeleteStart
  | SystemSignalProtocolVariantPostCommitDeleteEnd
  | SystemSignalProtocolVariantSelfCallStart
  | SystemSignalProtocolVariantSelfCallEnd;

/** Used by UI ONLY. That's why we use B64 here. */
export enum TipProtocolType {
	Ping = 'Ping',
	Pong = 'Pong',
	Entry = 'Entry',
	Link = 'Link',
	App = 'App',
}
export type TipProtocolVariantPing = {Ping: AgentPubKey}
export type TipProtocolVariantPong = {Pong: AgentPubKey}
export type TipProtocolVariantEntry = {Entry: EntryPulse}
export type TipProtocolVariantLink = {Link: LinkPulse}
export type TipProtocolVariantApp = {App: Uint8Array}
export type TipProtocol = 
 | TipProtocolVariantPing | TipProtocolVariantPong | TipProtocolVariantEntry | TipProtocolVariantLink | TipProtocolVariantApp;
