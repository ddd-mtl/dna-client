import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { ConductorAppProxy, EntryDefSelect, HappDef, HappViewModel, IDnaViewModel } from "@ddd-qc/dna-client";
import { DummyDvm } from "./viewModels/dummy";
import {RealDvm} from "./viewModels/real";
import { DummyList } from "./elements/dummy-list";



/** */
export const PlaygroundHappDef: HappDef = {
  id: "playground",
  dvmDefs: [
    ["dummy_role", DummyDvm],
    ["impostor_role", DummyDvm],
    ["real_role", RealDvm],
  ]
}


/**
 *
 */
export class DummyApp extends ScopedElementsMixin(LitElement) {

  @state() private _loaded = false;
  @state() private _selectedZomeName = ""

  private _conductorAppProxy!: ConductorAppProxy;
  private _happ!: HappViewModel;
  private _dnaRoleId!: string;

  get dummyDvm(): IDnaViewModel { return this._happ.getDvm("dummy_role")! }


  /** */
  async firstUpdated() {
    let HC_PORT = Number(process.env.HC_PORT);
    this._conductorAppProxy = await ConductorAppProxy.new(HC_PORT);
    this._happ = await this._conductorAppProxy.newHappViewModel(this, PlaygroundHappDef); // FIXME this can throw an error

    //await dummyDvm.probeAll();
    //await dummyDvm.fetchAllEntryDefs();

    this._loaded = true;
  }


  /** */
  async onDumpLogs(e: any) {
    this.dummyDvm.dumpLogs()
  }


  /** */
  async onRefresh(e: any) {
    let entryDefs = await this.dummyDvm.fetchAllEntryDefs();
    //console.log({entryDefs})
  }


  /** */
  async onEntrySelect(e: any) {
    //console.log("onEntrySelect() CALLED", e)
    const label = this.shadowRoot!.getElementById("entryLabel") as HTMLElement;
    label.innerText = JSON.stringify(e.detail);
  }


  /** */
  render() {
    console.log("dummy-app render() called!")
    if (!this._loaded) {
      return html`<span>Loading...</span>`;
    }

    return html`
      <div style="margin:10px;">
        <h2>Dummy App</h2>
        <input type="button" value="dump logs" @click=${this.onDumpLogs}>
        <input type="button" value="refresh" @click=${this.onRefresh}>
        <br/>
        <span>Select AppEntryType:</span>
        <entry-def-select .dnaViewModel="${this.dummyDvm}" @entrySelected=${this.onEntrySelect}></entry-def-select>
        <div style="margin:10px;">
        <span><span id="entryLabel">none</span></span>
        </div>
        <dummy-list></dummy-list>
      </div>
    `
  }

  static get scopedElements() {
    return {
      "entry-def-select": EntryDefSelect,
      "dummy-list": DummyList,
      //"fake-list": FakeList,
    };
  }
}
