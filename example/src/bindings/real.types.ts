/* This file is generated by zits. Do not edit manually */

// @ts-ignore
import {
// @ts-ignore
WebsocketConnectionOptions, KitsuneAgent, KitsuneSpace, HoloHashB64, AgentPubKeyB64, DnaHashB64, WasmHashB64, EntryHashB64, ActionHashB64, AnyDhtHashB64, InstalledAppId, Signature, CellId, DnaProperties, RoleName, InstalledCell, Timestamp, Duration, HoloHashed, NetworkInfo, FetchPoolInfo,
/** hdk/action.ts */
// @ts-ignore
SignedActionHashed, RegisterAgentActivity, ActionHashed, ActionType, Action, NewEntryAction, Dna, AgentValidationPkg, InitZomesComplete, CreateLink, DeleteLink, OpenChain, CloseChain, Update, Delete, Create,
/** hdk/capabilities.ts */
// @ts-ignore
CapSecret, CapClaim, GrantedFunctionsType, GrantedFunctions, ZomeCallCapGrant, CapAccessType, CapAccess, CapGrant,
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
// @ts-ignore
DhtOpType, DhtOp, getDhtOpType, getDhtOpAction, getDhtOpEntry, getDhtOpSignature,
/** hdk/entry.ts */
// @ts-ignore
EntryVisibility, AppEntryDef, EntryType, EntryContent, Entry,
/** hdk/record.ts */
// @ts-ignore
Record as HcRecord, RecordEntry as HcRecordEntry,
/** hdk/link.ts */
//AnyLinkableHash,
// @ts-ignore
ZomeIndex, LinkType, LinkTag, RateWeight, RateBucketId, RateUnits, Link,
/** api/admin/types.ts */
// @ts-ignore
InstalledAppInfoStatus, DeactivationReason, DisabledAppReason, StemCell, ProvisionedCell, ClonedCell, CellType, CellInfo, AppInfo, MembraneProof, FunctionName, ZomeName, ZomeDefinition, IntegrityZome, CoordinatorZome, DnaDefinition, ResourceBytes, ResourceMap, CellProvisioningStrategy, CellProvisioning, DnaVersionSpec, DnaVersionFlexible, AppRoleDnaManifest, AppRoleManifest, AppManifest, AppBundle, AppBundleSource, NetworkSeed, ZomeLocation,
} from '@holochain/client';


/// Simple Hashes
// @ts-ignore
type AgentArray = Uint8Array;
// @ts-ignore
type DnaArray = Uint8Array;
// @ts-ignore
type WasmArray = Uint8Array;
// @ts-ignore
type EntryArray = Uint8Array;
// @ts-ignore
type ActionArray = Uint8Array;
// @ts-ignore
type AnyDhtArray = Uint8Array;
// @ts-ignore
type AnyLinkableArray = Uint8Array;
// @ts-ignore
type ExternalArray = Uint8Array;

// @ts-ignore
import {
/** Common */
// @ts-ignore
DhtOpHashB64, DhtOpHash,
/** DnaFile */
// @ts-ignore
DnaFile, DnaDef, Zomes, WasmCode,
/** entry-details */
// @ts-ignore
EntryDetails, RecordDetails, Details, DetailsType, EntryDhtStatus,
/** Validation */
// @ts-ignore
ValidationStatus, ValidationReceipt,
} from '@holochain-open-dev/core-types';

/**  */
export interface Real {
  value: number
}

export enum RealEntryType {
	Real = 'Real',
}
export type RealEntryVariantReal = {Real: Real}
export type RealEntry = 
 | RealEntryVariantReal;
