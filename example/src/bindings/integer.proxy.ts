/* This file is generated by zits. Do not edit manually */

import {ExampleSignalProtocol, IntegerEntry, SystemSignalProtocol, Integer, LitHappSignal, SystemSignal, } from './integer.types';
import {
WebsocketConnectionOptions,
/** types.ts */
//HoloHash,
//AgentPubKey,
//DnaHash,
//WasmHash,
//EntryHash,
//ActionHash,
//AnyDhtHash,
//ExternalHash,
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


/// Simple Hashes
type AgentArray = Uint8Array;
type DnaArray = Uint8Array;
type WasmArray = Uint8Array;
type EntryArray = Uint8Array;
type ActionArray = Uint8Array;
type AnyDhtArray = Uint8Array;
type AnyLinkableArray = Uint8Array;

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

import {ZomeProxy} from '@ddd-qc/lit-happ';
import {integerFunctionNames} from './integer.fn';
import {IntegerUnitEnum, IntegerLinkType} from './integer.integrity';

/**
 *
 */
export class IntegerProxy extends ZomeProxy {
  static readonly DEFAULT_ZOME_NAME = "zInteger";
  static readonly FN_NAMES = integerFunctionNames;
  static readonly ENTRY_TYPES = Object.values(IntegerUnitEnum);
  static readonly LINK_TYPES = Object.values(IntegerLinkType);
 
  async getInteger(ah: ActionArray): Promise<number> {
    return this.call('get_integer', ah);
  }

  async createBlockingInteger(value: number): Promise<ActionArray> {
    return this.callZomeBlockPostCommit('Integer','create_blocking_integer', value);
  }

  async createInteger(value: number): Promise<ActionArray> {
    return this.callBlocking('create_integer', value);
  }

  async getMyValuesLocal(): Promise<[ActionArray, number][]> {
    return this.call('get_my_values_local', null);
  }

  async getMyValues(): Promise<[ActionArray, number][]> {
    return this.call('get_my_values', null);
  }

  async getMyValuesIncremental(knowns: ActionArray[]): Promise<[ActionArray, number][]> {
    return this.call('get_my_values_incremental', knowns);
  }
}
