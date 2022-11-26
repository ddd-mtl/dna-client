import {CellProxy} from "./CellProxy";
import {IZomeViewModel, ZvmClass, ZvmDef} from "./ZomeViewModel";
import {ReactiveElement} from "lit";
import {AgentPubKeyB64, Dictionary, EntryHashB64} from "@holochain-open-dev/core-types";
import {IViewModel, ViewModel} from "./ViewModel";
import { HappViewModel } from "./HappViewModel";
import {CellId, InstalledCell, RoleId, ZomeName} from "@holochain/client";
import {ICellDef} from "./CellDef";
import {createContext} from "@lit-labs/context";
import { IRoleSpecific, RoleSpecific, RoleSpecificMixin } from "./mixins";


/** Interfaces that DnaViewModel must implement */
export type IDnaViewModel = _DnaViewModel & ICellDef & IViewModel & IRoleSpecific;

/** Interface specific to DnaViewModel class */
interface _DnaViewModel {
  fetchAllEntryDefs(): Promise<Dictionary<[string, boolean][]>>;
  //get entryTypes(): Dictionary<[string, boolean][]>;
  dumpLogs(zomeName?: ZomeName): void;
}

export type DvmClass = {new(happ: HappViewModel, roleId?: RoleId): IDnaViewModel};

export type DvmDef = DvmClass | [DvmClass, RoleId] // optional roleId override

/**
 * Abstract ViewModel for a DNA.
 * It holds the CellProxy and all the ZomeViewModels of the DNA.
 * A DNA is expected to derive this class and add extra logic at the DNA level.
 */
export abstract class DnaViewModel extends RoleSpecificMixin(ViewModel) implements IDnaViewModel {

  /** Ctor */
  protected constructor(happ: HappViewModel, zvmDefs: ZvmDef[], roleId?: RoleId) {
    super();
    if (roleId) {
      this.roleId = roleId;
    }
    this._cellProxy = happ.conductorAppProxy.newCellProxy(happ.appInfo, this.roleId); // FIXME can throw error
    /** Create all ZVMs for this DNA */
    for (const zvmDef of zvmDefs) {
      let zvm;
      if (Array.isArray(zvmDef)) {
        zvm = new zvmDef[0](this._cellProxy, zvmDef[1]);
      } else {
        zvm = new zvmDef(this._cellProxy);
      }
      // TODO check zvm.zomeName exists in _cellProxy
      this._zomeViewModels[zvm.zomeName] = zvm;
    }
    this.provideContext(happ.host);
  }


  /** -- Fields -- */
  protected _cellProxy: CellProxy;
  protected _zomeViewModels: Dictionary<IZomeViewModel> = {};
  private _allEntryDefs: Dictionary<[string, boolean][]> = {};


  /** CellDef interface */
  get installedCell(): InstalledCell {return this._cellProxy.installedCell}
  //get roleId(): RoleId { return this._cellProxy.roleId } // Already defined in RoleSpecificMixin
  get cellId(): CellId { return this._cellProxy.cellId }
  get dnaHash(): EntryHashB64 { return this._cellProxy.dnaHash}
  get agentPubKey(): AgentPubKeyB64 { return this._cellProxy.agentPubKey }


  /** -- Getters -- */

  getEntryDefs(zomeName: ZomeName): [string, boolean][] | undefined {return this._allEntryDefs[zomeName]}
  getZomeViewModel(zomeName: ZomeName): IZomeViewModel | undefined {return this._zomeViewModels[zomeName]}


  /** -- Methods -- */

  /** Override so we can provide context of all zvms */
  /*private*/ provideContext(host: ReactiveElement): void {
    //console.log("DVM.provideContext()", host, this)
    super.provideContext(host);
    for (const zvm of Object.values(this._zomeViewModels)) {
      zvm.provideContext(host)
    }
  }


  getContext():any {return createContext<typeof this>('dvm/' + this.roleId)};


  /** */
  async probeAll(): Promise<void> {
    for (const [name, zvm] of Object.entries(this._zomeViewModels)) {
      //console.log("Dvm.probeAll()", name)
      await zvm.probeAll();
    }
  }


  /** Useless since the entry defs are in the integrity zome which is not represented here */
  async fetchAllEntryDefs(): Promise< Dictionary<[string, boolean][]>> {
    for (const zvm of Object.values(this._zomeViewModels)) {
      //const zomeName = (zvm.constructor as any).DEFAULT_ZOME_NAME;
      const zomeName =  zvm.zomeName;
      this._allEntryDefs[zomeName] = await this._cellProxy.callEntryDefs(zomeName); // TODO optimize
    }
    return this._allEntryDefs;
  }



  /** */
  dumpLogs(zomeName?: ZomeName): void {
    this._cellProxy.dumpLogs(zomeName)
  }
}
