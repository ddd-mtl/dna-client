import {CellProxy, DnaViewModel, HappViewModel, ZomeProxy, ZomeViewModel} from "@ddd-qc/dna-client";
import { EntryHash } from "@holochain/client";
import {LabelZvm} from "./label";
import {ContextKey} from "@lit-labs/context/src/lib/context-key";

/** */
export interface DummyZomePerspective {
  values: number[];
}


/**
 *
 */
export class DummyZomeProxy extends ZomeProxy {

  async getDummy(eh: EntryHash): Promise<number> {
    return this.call('get_dummy', eh);
  }
  async createDummy(value: number): Promise<EntryHash> {
    return this.callBlocking('create_dummy', value);
  }
  async getMyDummies(): Promise<number[]> {
    return this.call('get_my_dummies', null);
  }
}


/**
 *
 */
export class DummyZvm extends ZomeViewModel {

  static DEFAULT_ZOME_NAME = "zDummy";

  /** Ctor */
  constructor(protected _cellProxy: CellProxy, zomeName?: string) {
    super(new DummyZomeProxy(_cellProxy, zomeName? zomeName : DummyZvm.DEFAULT_ZOME_NAME));
  }

  private _values: number[] = [];


  get zomeProxy(): DummyZomeProxy {return this._baseZomeProxy as DummyZomeProxy;}


  /** -- ViewModel Interface -- */

  protected hasChanged(): boolean {return true}

  get perspective(): DummyZomePerspective {return {values: this._values}}

  /** */
  async probeAll(): Promise<void> {
    //let entryDefs = await this._proxy.getEntryDefs();
    //console.log({entryDefs})
    this._values = await this.zomeProxy.getMyDummies();
    this.notifySubscribers();
  }

  /**  */
  async createDummy(value: number): Promise<EntryHash> {
    const res = await this.zomeProxy.createDummy(value);
    /** Add directly to perspective */
    this._values.push(value);
    this.notifySubscribers();
    return res;
  }
}


/**
 *
 */
export class DummyDvm extends DnaViewModel {

  static DEFAULT_ROLE_ID = "rDummy";

  /** Ctor */
  constructor(happ: HappViewModel, roleId?: string) {
    super(happ, [DummyZvm, LabelZvm], roleId);
  }

  /** QoL Helpers */
  get dummyZvm(): DummyZvm {return this.getZomeViewModel(DummyZvm.DEFAULT_ZOME_NAME) as DummyZvm}
  get labelZvm(): LabelZvm {return this.getZomeViewModel(LabelZvm.DEFAULT_ZOME_NAME) as LabelZvm}


  /** -- ViewModel Interface -- */

  protected hasChanged(): boolean {return true}

  get perspective(): number {return 4242}

}

