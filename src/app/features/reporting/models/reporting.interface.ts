export interface ReportingInterface {
  ip_id: IPProfileInterface;
  report_period: ReportingPeriod;
  framework: FrameworkFundingInterface;
  strategic_alignment: StrategicAlignmentInterface;
}

export interface IPProfileInterface {
  id: string;
  name: string;
  activity_name: string;
  description: string;
  period_start: string;
  period_end: string;
  budget: Number;
  donor: string;
  version: string;
}

export interface ReportingPeriod {
  name: string;
  year: Number;
}

export interface FrameworkFundingInterface {
  region: OrganisationUnitInterface[];
  district: OrganisationUnitInterface[];
  technicalArea: TechnicalAreaInterface[];
  areaCoop: AreaCoopInterface[];
}

// Dependency Interfaces
export interface OrganisationUnitInterface {
  id: string;
  name: string;
  shortName: string;
  parent: {
    id: string;
  };
  level: Number;
}

export interface TechnicalAreaInterface {
  id: string;
  name: string;
}

export interface AreaCoopInterface {
  id: string;
  name: string;
}

export interface StrategicAlignmentInterface {
  id: string;
  alignment: string;
  reason_alignment: string;
  alignment_AFG_Health: AFGHealthStrategyInterface;
}

export interface AFGHealthStrategyInterface {
  id: Number;
  name: string;
}

export interface MonitoringAlignmentInterface {
  id: string;
}

export interface MOUIndicatorsInterface {
  id: string;
  indicator_name: string;
  baseline: Number;
  year_one: Number;
  value_one: Number;
}

export interface DataSourceIndicatorsInterface {
  id: string;
  name: string;
}

export interface SensInterface {
  id: string;
  name: string;
}

export interface PerformanceIndicatorsInterface {
  id: string;
  indicator_name: string;
}

export interface PopDistrictInterface {
  id: string;
  population: number;
}

export interface action_status {
  id: string;
  name: string;
}

export interface activity_status {
  id: string;
  name: string;
}
