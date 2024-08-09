import {LitElement} from "lit";
import { state } from "lit/decorators.js";
import {
  BaseRoleName,
  AppProxy,
  ConductorAppProxy,
  flattenCells,
  CellIdStr, AgentIdMap, DnaId, CellAddress,
} from "@ddd-qc/cell-proxy";
import {HappViewModel} from "./HappViewModel";
import {CellDef, HvmDef} from "./definitions";
import {
  AppWebsocket,
  ClonedCell,
  InstalledAppId,
  NetworkInfo, Timestamp
} from "@holochain/client";
import {DnaViewModel} from "./DnaViewModel";
//import {CellId} from "@holochain/client/lib/types";
// @ts-ignore
import * as net from "net";


/**
 *
 */
export class HappElement extends LitElement {

  /** Must be defined by subclass */
  static HVM_DEF: HvmDef;

  /** Set during init triggered at ctor */
  appProxy!: AppProxy;
  @state() hvm!: HappViewModel;


  /** Ctor */
  protected constructor(port_or_socket: number | AppWebsocket, appId?: InstalledAppId, adminUrl?: URL, defaultTimeout?: number) {
    super();
    /* await */ this.constructHvm(port_or_socket, appId, adminUrl, defaultTimeout);
  }

  /** */
  async hvmConstructed(): Promise<void> {}
  /** */
  async perspectiveInitializedOffline(): Promise<void> {}
  /** */
  async perspectiveInitializedOnline(): Promise<void> {}

  /** */
  override shouldUpdate() {
    return !!this.hvm;
  }

  /** */
  protected async constructHvm(port_or_socket: number | AppWebsocket, appId?: InstalledAppId, adminUrl?: URL, defaultTimeout?: number): Promise<void> {
    const hvmDef = (this.constructor as typeof HappElement).HVM_DEF;
    if (!hvmDef) {
      throw Error("HVM_DEF static field undefined in HappElement subclass " + this.constructor.name);
    }
    /** Override appId */
    if (appId) {
      hvmDef.id = appId;
    }
    this.appProxy = await ConductorAppProxy.new(port_or_socket, hvmDef.id, adminUrl, defaultTimeout);
    this.hvm = await HappViewModel.new(this, this.appProxy, hvmDef);
    await this.hvm.authorizeAllZomeCalls(this.appProxy.adminWs);
    await this.hvmConstructed();
    await this.initializePerspective();
  }


  /** */
  async initializePerspective(): Promise<void> {
    await this.hvm.initializePerspectiveOffline();
    await this.perspectiveInitializedOffline();
    // TODO move this to a later stage
    await this.hvm.initializePerspectiveOnline();
    await this.perspectiveInitializedOnline();
  }


  // /** */
  // async networkInfoCell(hcl: HCL): Promise<NetworkInfo> {
  //   const dvm = this.hvm.getDvm(hcl);
  //   if (!dvm) {
  //     return Promise.reject("No DNA found at given HCL: " + hcl.toString());
  //   }
  //   const netInfoMap = await this.appProxy.networkInfo({dnas: [dvm.cell.dnaId.hash]});
  //   return netInfoMap[dvm.cell.dnaId][1];
  // }


  /** */
  async networkInfoAll(baseRoleName?: string): Promise<Record<CellIdStr, [Timestamp, NetworkInfo]>> {
    console.log(`networkInfoAll() "${baseRoleName}"`);
    /** Grab cellMap */
    const hvmDef = (this.constructor as typeof HappElement).HVM_DEF;
    const cellMap = this.appProxy.getAppCells(hvmDef.id);
    if (!cellMap) {
      return Promise.reject("No cells found at given appId: " + hvmDef.id);
    }
    /** Get cell Ids */
    let cellAddrs: CellAddress[] = [];
    if (baseRoleName) {
      const cfr = cellMap[baseRoleName];
      if (!cfr) {
        return Promise.reject("No cells found at given baseRoleName: " + baseRoleName);
      }
      cellAddrs = flattenCells(cfr);
    } else {
      for (const cells of Object.values(cellMap)) {
        cellAddrs = cellAddrs.concat(flattenCells(cells))
      }
    }
    console.log(`networkInfoAll() cellIds`, cellAddrs.map(cellId => cellId.str));
    /* Sort by agent key */
    let dnaPerAgentMap: AgentIdMap<DnaId[]> = new AgentIdMap();
    for (const cellAddr of cellAddrs) {
      if (!dnaPerAgentMap.get(cellAddr.agentId)) {
        dnaPerAgentMap.set(cellAddr.agentId, []);
      }
      dnaPerAgentMap.get(cellAddr.agentId)!.push(cellAddr.dnaId);
    }
    console.log(`networkInfoAll() dnaMap`, dnaPerAgentMap);
    /** Call NetworkInfo per AgentId */
    const allNetInfos: Record<CellIdStr, [Timestamp, NetworkInfo]> = {};
    for (const [agent, dnaIds] of dnaPerAgentMap.entries()) {
      const netInfos = await this.appProxy.networkInfo({dnas: dnaIds.map((dna) => dna.hash)});
      let i  = 0;
      for (const netInfo of netInfos) {
        const idStr = new CellAddress(dnaIds[i]!, agent).str;
        allNetInfos[idStr] = [Date.now(), netInfo];
        i += 1;
      }
    }
    /* Done */
    return allNetInfos;
  }


  /** */
  dumpLastestNetworkInfo(baseRoleName?: string) {
    console.log(`dumpLastestNetworkInfo() "${baseRoleName}"`);
    /** Grab cellMap */
    const hvmDef = (this.constructor as typeof HappElement).HVM_DEF;
    const cellMap = this.appProxy.getAppCells(hvmDef.id);
    if (!cellMap) {
      throw Error("No cells found at given appId: " + hvmDef.id);
    }
    /** Get cell Ids */
    let cellAddrs: CellAddress[] = [];
    if (baseRoleName) {
      const cfr = cellMap[baseRoleName];
      if (!cfr) {
        throw Promise.reject("No cells found at given baseRoleName: " + baseRoleName);
      }
      cellAddrs = flattenCells(cfr);
    } else {
      for (const cells of Object.values(cellMap)) {
        cellAddrs = cellAddrs.concat(flattenCells(cells))
      }
    }
    let logs = cellAddrs.map((cellAddr) => {
      const logs = this.appProxy.networkInfoLogs[cellAddr.str];
      if (!logs || logs.length === 0) {
        return;
      }
      const [ts, info] = logs[logs.length - 1]!;
      const hcl = this.appProxy.getLocations(cellAddr)!;
      const cellName = this.appProxy.getCellName(hcl[0]!);
      return {
            ts,
            name: cellName,
            dna: cellAddr.dnaId.short,
            arc: info.arc_size,
            peers: info.current_number_of_peers,
            total_peers: info.total_network_peers,
            rounds: info.completed_rounds_since_last_time_queried,
            bytes: info.bytes_since_last_time_queried,
            fetch_bytes: info.fetch_pool_info.op_bytes_to_fetch,
            fetch_ops: info.fetch_pool_info.num_ops_to_fetch,
            agent: cellAddr.agentId.short,
          }
    })
    console.table(logs);
  }


  /* */
  dumpNetworkInfoLogs(cellIdStr?: string) {
    console.log(`dumpNetworkInfoLogs() "${cellIdStr}"`);
    let logMap = this.appProxy.networkInfoLogs;
    if (cellIdStr) {
      logMap = {};
      logMap[cellIdStr] = this.appProxy.networkInfoLogs[cellIdStr]!;
    }
    for (const [cellIdStr, infoPairs] of Object.entries(logMap)) {
      const cellAddr = CellAddress.from(cellIdStr);
      const hcl = this.appProxy.getLocations(cellAddr)!;
      const cellName = this.appProxy.getCellName(hcl[0]!);
      console.log(`NetworfInfo logs of cell "${cellName}" | [${cellAddr.agentId.short}, ${cellAddr.dnaId.short}]`);
      const logs = infoPairs
        .map(([ts, info]) => {
          return {
            ts,
            arc: info.arc_size,
            peers: info.current_number_of_peers,
            total_peers: info.total_network_peers,
            rounds: info.completed_rounds_since_last_time_queried,
            bytes: info.bytes_since_last_time_queried,
            fetch_bytes: info.fetch_pool_info.op_bytes_to_fetch,
            fetch_ops: info.fetch_pool_info.num_ops_to_fetch,
          }
        });
      console.table(logs);
    }
  }


  /** */
  async createClone(baseRoleName: BaseRoleName, cellDef?: CellDef): Promise<[ClonedCell, DnaViewModel]> {
    return this.hvm.cloneDvm(baseRoleName, cellDef);
  }

}
