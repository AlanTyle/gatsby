export enum Actions {
  LogAction = `LOG_ACTION`,
  SetStatus = `SET_STATUS`,
  Log = `LOG`,
  SetLogs = `SET_LOGS`,
  RenderPageTree = `RENDER_PAGE_TREE`,

  StartActivity = `ACTIVITY_START`,
  EndActivity = `ACTIVITY_END`,
  UpdateActivity = `ACTIVITY_UPDATE`,
  PendingActivity = `ACTIVITY_PENDING`,
  CancelActivity = `ACTIVITY_CANCEL`,
  ActivityErrored = `ACTIVITY_ERRORED`,
}

export enum LogLevels {
  Debug = `DEBUG`,
  Success = `SUCCESS`,
  Info = `INFO`,
  Warning = `WARNING`,
  Log = `LOG`,
  Error = `ERROR`,
}

export enum ActivityLogLevels {
  Success = `ACTIVITY_SUCCESS`,
  Failed = `ACTIVITY_FAILED`,
  Interrupted = `ACTIVITY_INTERRUPTED`,
}

export enum ActivityStatuses {
  InProgress = `IN_PROGRESS`,
  NotStarted = `NOT_STARTED`,
  Interrupted = `INTERRUPTED`,
  Failed = `FAILED`,
  Success = `SUCCESS`,
  Cancelled = `CANCELLED`,
}

export enum ActivityTypes {
  Spinner = `spinner`,
  Hidden = `hidden`,
  Progress = `progress`,
  Pending = `pending`,
}
