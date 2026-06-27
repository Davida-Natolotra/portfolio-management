import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { DatePicker } from 'primeng/datepicker';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ReportingMetadataApi } from '../../api/metadata/reporting-metadata.api';
import { ReportingDataApi } from '../../api/data/reporting-data.api';
import {
  action_status,
  activity_status,
  AFGHealthStrategyInterface,
  AreaCoopInterface,
  DataSourceIndicatorsInterface,
  OrganisationUnitInterface,
  PerformanceIndicatorsInterface,
  SensInterface,
  TechnicalAreaInterface
} from '../../models/reporting.interface';

function genderSumValidator(control: AbstractControl): ValidationErrors | null {
  const female = control.get('total_population_covered_female')?.value as number | null;
  const male = control.get('total_population_covered_male')?.value as number | null;
  const covered = control.get('total_population_covered')?.value as number | null;
  if (covered != null && female != null && male != null && female + male !== covered) {
    return { genderSumMismatch: true };
  }
  return null;
}

function populationReachedValidator(control: AbstractControl): ValidationErrors | null {
  const covered = control.get('total_population_covered')?.value as number | null;
  const reached = control.get('total_population_reached')?.value as number | null;
  if (covered != null && reached != null && reached > covered) {
    return { populationReachedExceeded: true };
  }
  return null;
}

@Component({
  selector: 'app-reporting-edit',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    StepperModule,
    ButtonModule,
    AutoCompleteModule,
    InputText,
    Textarea,
    Select,
    InputNumber,
    DatePicker,
  ],
  templateUrl: './reporting-edit.html',
  styleUrl: './reporting-edit.scss',
})
export class ReportingEdit implements OnInit, OnDestroy {
  // Autocomplete data lists
  regionList: OrganisationUnitInterface[] = [];
  regionSuggestions: OrganisationUnitInterface[] = [];
  districtList: OrganisationUnitInterface[] = [];
  districtSuggestions: OrganisationUnitInterface[] = [];
  technicalAreaList: TechnicalAreaInterface[] = [];
  technicalAreaSuggestions: TechnicalAreaInterface[] = [];
  areaCoopList: AreaCoopInterface[] = [];
  areaCoopSuggestions: AreaCoopInterface[] = [];
  typeContribList: AreaCoopInterface[] = [];
  typeContribSuggestions: AreaCoopInterface[] = [];
  afgHealthList: AFGHealthStrategyInterface[] = [];
  afgHealthSuggestions: AFGHealthStrategyInterface[] = [];
  mouIndicatorsList: PerformanceIndicatorsInterface[] = [];
  mouIndicatorsSuggestions: PerformanceIndicatorsInterface[] = [];
  sensList: SensInterface[] = [];
  sensSuggestions: SensInterface[] = [];
  dataSourceList: DataSourceIndicatorsInterface[] = [];
  dataSourceSuggestions: DataSourceIndicatorsInterface[] = [];
  list15: number[] = [];
  actionStatusList: action_status[] = [];
  activityStatusList: activity_status[] = [];
  private fb = inject(FormBuilder);
  reportingForm = this.fb.group(
    {
      // A - BLOC 1: FRAMEWORK & FUNDING
      region: [null, Validators.required], // autocomplete from getRegion
      district: [{ value: null, disabled: true }, Validators.required], // autocomplete, enabled after region selected, resets when region changes, list from getDistrict(region.id)
      technical_area: [null, Validators.required], // autocomplete from getTechnicalArea
      area_of_cooperation: [null, Validators.required], // autocomplete from getAreaOfCooperation
      type_of_contribution: [{ value: null, disabled: true }, Validators.required], // autocomplete, enabled after area_of_cooperation selected, list from getTypeOfContribution(area_of_cooperation.id)
      assigned_funding: [null, [Validators.required, Validators.min(0)]], // positive number

      // B - BLOC 2: ALIGNEMENT STRATÉGIQUE
      alignment_mou: ['', Validators.required], // text input
      reason_alignment: ['', [Validators.required, Validators.minLength(50)]], // textarea, minimum 50 characters
      alignment_AFGH: [null, Validators.required], // autocomplete from getAFGHealthStrategy

      // C - BLOC 3: MONITORING TECHNICAL PERFORMANCE
      performance_indicator: [null, Validators.required], // autocomplete from getMOUIndicators
      related_activity: ['', Validators.required], // text input
      activity_status: [null, Validators.required], // option list from getActivityStatusList
      sens: [null, Validators.required], // autocomplete from getSensList
      data_source_indicator: [null, Validators.required], // autocomplete from getDataSourceIndicator
      annual_target: [null, [Validators.required, Validators.min(0)]], // positive integer
      result_achieved: [null, [Validators.required, Validators.min(0)]], // positive integer
      achievement_rate: [{ value: 0, disabled: true }], // automatic compute (result_achieved / annual_target * 100), read-only
      performance_status: [{ value: '', disabled: true }], // automatic compute, read-only
      total_population_covered: [{ value: null, disabled: true }], // auto-filled from getPopulationDistrict(district.id), read-only
      total_population_reached: [null, [Validators.required, Validators.min(0)]], // positive integer, must be ≤ total_population_covered (group validator)
      total_population_covered_female: [null, [Validators.required, Validators.min(0)]], // positive integer
      total_population_covered_male: [null, [Validators.required, Validators.min(0)]], // positive integer, female + male must equal total_population_covered (group validator)

      // D - BLOC 4: QUALITATIVE ANALYSIS
      key_success: ['', Validators.required], // textarea
      bottleneck_factors: ['', Validators.required], // textarea

      // E - BLOC 5: RISK MATRIX & ACTION PLAN
      risk_alert_identified: ['', Validators.required], // textarea
      impact: [null, Validators.required], // select from getList15
      probability: [null, Validators.required], // select from getList15
      risk_score: [{ value: 0, disabled: true }], // automatic compute: impact * probability, read-only
      risk_level: [{ value: '', disabled: true }], // automatic compute: "high" if 15 < score ≤ 25, "moderate" if 5 < score ≤ 12, "low" if 1 < score ≤ 4, read-only
      measure_mitigation_proposed: [''], // textarea, mandatory when risk_level is "high" or "moderate"
      main_responsible: ['', Validators.required], // text input
      due_date: [null, Validators.required], // date picker (DD-MM-YYYY)
      action_status: [null, Validators.required], // select from getActionStatusList
    },
    { validators: [genderSumValidator, populationReachedValidator] },
  );
  private metadataAPI = inject(ReportingMetadataApi);
  private dataAPI = inject(ReportingDataApi);
  private destroy$ = new Subject<void>();

  // Computed value getters for read-only display
  get achievementRateValue(): number {
    return (this.reportingForm.get('achievement_rate')!.value as number) ?? 0;
  }

  get performanceStatusValue(): string {
    return (this.reportingForm.get('performance_status')!.value as string) ?? '';
  }

  get totalPopulationCoveredValue(): number | null {
    return this.reportingForm.get('total_population_covered')!.value as number | null;
  }

  get riskScoreValue(): number {
    return (this.reportingForm.get('risk_score')!.value as number) ?? 0;
  }

  get riskLevelValue(): string {
    return (this.reportingForm.get('risk_level')!.value as string) ?? '';
  }

  get riskLevelDisplay(): string {
    const level = this.riskLevelValue;
    return level ? level.charAt(0).toUpperCase() + level.slice(1) : '—';
  }

  get genderSumError(): boolean {
    const errors = this.reportingForm.errors;
    return !!(errors && errors['genderSumMismatch'] && this.reportingForm.touched);
  }

  get populationReachedError(): boolean {
    const errors = this.reportingForm.errors;
    return !!(errors && errors['populationReachedExceeded'] && this.reportingForm.touched);
  }

  ngOnInit(): void {
    this.loadStaticData();
    this.setupReactiveLogic();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Autocomplete search methods — returns all items when query is empty (for dropdown button)
  searchRegion(event: any): void {
    const q = (event.query as string).toLowerCase().trim();
    this.regionSuggestions = q
      ? this.regionList.filter((r) => r.name.toLowerCase().includes(q))
      : [...this.regionList];
  }

  searchDistrict(event: any): void {
    const q = (event.query as string).toLowerCase().trim();
    this.districtSuggestions = q
      ? this.districtList.filter((d) => d.name.toLowerCase().includes(q))
      : [...this.districtList];
  }

  searchTechnicalArea(event: any): void {
    const q = (event.query as string).toLowerCase().trim();
    this.technicalAreaSuggestions = q
      ? this.technicalAreaList.filter((t) => t.name.toLowerCase().includes(q))
      : [...this.technicalAreaList];
  }

  searchAreaCoop(event: any): void {
    const q = (event.query as string).toLowerCase().trim();
    this.areaCoopSuggestions = q
      ? this.areaCoopList.filter((a) => a.name.toLowerCase().includes(q))
      : [...this.areaCoopList];
  }

  searchTypeContrib(event: any): void {
    const q = (event.query as string).toLowerCase().trim();
    this.typeContribSuggestions = q
      ? this.typeContribList.filter((t) => t.name.toLowerCase().includes(q))
      : [...this.typeContribList];
  }

  searchAfgHealth(event: any): void {
    const q = (event.query as string).toLowerCase().trim();
    this.afgHealthSuggestions = q
      ? this.afgHealthList.filter((a) => a.name.toLowerCase().includes(q))
      : [...this.afgHealthList];
  }

  searchMouIndicators(event: any): void {
    const q = (event.query as string).toLowerCase().trim();
    this.mouIndicatorsSuggestions = q
      ? this.mouIndicatorsList.filter((m) => m.name.toLowerCase().includes(q))
      : [...this.mouIndicatorsList];
  }

  searchSens(event: any): void {
    const q = (event.query as string).toLowerCase().trim();
    this.sensSuggestions = q
      ? this.sensList.filter((s) => s.name.toLowerCase().includes(q))
      : [...this.sensList];
  }

  searchDataSource(event: any): void {
    const q = (event.query as string).toLowerCase().trim();
    this.dataSourceSuggestions = q
      ? this.dataSourceList.filter((d) => d.name.toLowerCase().includes(q))
      : [...this.dataSourceList];
  }

  onSubmit(): void {
    if (this.reportingForm.valid) {
      console.log(this.reportingForm.getRawValue());
    } else {
      this.reportingForm.markAllAsTouched();
    }
  }

  private loadStaticData(): void {
    this.metadataAPI
      .getRegion()
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.regionList = d));
    this.metadataAPI
      .getTechnicalArea()
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.technicalAreaList = d));
    this.metadataAPI
      .getAreaOfCooperation()
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.areaCoopList = d));
    this.metadataAPI
      .getAFGHealthStrategy()
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.afgHealthList = d));
    this.metadataAPI
      .getSensList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.sensList = d));
    // These APIs return a single object — wrap in array for autocomplete
    this.metadataAPI
      .getMOUIndicators()
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.mouIndicatorsList = d));
    this.metadataAPI
      .getDataSourceIndicator()
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.dataSourceList = [d]));
    this.metadataAPI
      .getList15()
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.list15 = (d as number[]).map(Number)));
    this.metadataAPI
      .getActionStatusList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.actionStatusList = d));
    this.metadataAPI
      .getActivityStatusList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.activityStatusList = d));
  }

  private setupReactiveLogic(): void {
    const f = this.reportingForm;

    // Region → District: reset and reload district list when region changes
    f.get('region')!
      .valueChanges.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a: any, b: any) => a?.id === b?.id),
      )
      .subscribe((region: any) => {
        f.get('district')!.setValue(null, { emitEvent: false });
        f.get('district')!.disable({ emitEvent: false });
        f.get('total_population_covered')!.setValue(null, { emitEvent: false });
        this.districtList = [];
        this.districtSuggestions = [];

        if (region?.id) {
          f.get('district')!.enable({ emitEvent: false });
          this.metadataAPI
            .getDistrict(region.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((d) => {
              this.districtList = d;
            });
        }
      });

    // District → auto-fill total_population_covered from getPopulationDistrict
    f.get('district')!
      .valueChanges.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a: any, b: any) => a?.id === b?.id),
      )
      .subscribe((district: any) => {
        if (district?.id) {
          this.dataAPI
            .getPopulationDistrict(district.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((d) => {
              (f.get('total_population_covered')! as AbstractControl<any>).setValue(d.population, {
                emitEvent: false,
              });
            });
        } else {
          f.get('total_population_covered')!.setValue(null, { emitEvent: false });
        }
      });

    // Area of cooperation → Type of contribution: reload list when selection changes
    f.get('area_of_cooperation')!
      .valueChanges.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a: any, b: any) => a?.id === b?.id),
      )
      .subscribe((areaCoop: any) => {
        f.get('type_of_contribution')!.setValue(null, { emitEvent: false });
        f.get('type_of_contribution')!.disable({ emitEvent: false });
        this.typeContribList = [];
        this.typeContribSuggestions = [];

        if (areaCoop?.id) {
          f.get('type_of_contribution')!.enable({ emitEvent: false });
          this.metadataAPI
            .getTypeOfContribution(areaCoop.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((d) => {
              this.typeContribList = d;
            });
        }
      });

    // annual_target + result_achieved → achievement_rate (%) + performance_status
    const recomputePerformance = () => {
      const target = (f.get('annual_target')!.value as unknown as number) ?? 0;
      const result = (f.get('result_achieved')!.value as unknown as number) ?? 0;
      const rate = target > 0 ? Math.round((result / target) * 100) : 0;
      const status =
        target > 0 ? (rate >= 100 ? 'On Track' : rate >= 70 ? 'At Risk' : 'Off Track') : '';
      f.get('achievement_rate')!.setValue(rate, { emitEvent: false });
      f.get('performance_status')!.setValue(status, { emitEvent: false });
    };
    f.get('annual_target')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(recomputePerformance);
    f.get('result_achieved')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(recomputePerformance);

    // impact + probability → risk_score + risk_level + conditional validator on measure_mitigation_proposed
    const recomputeRisk = () => {
      const impact = (f.get('impact')!.value as unknown as number) ?? 0;
      const probability = (f.get('probability')!.value as unknown as number) ?? 0;
      const score = impact * probability;
      let level = '';
      if (score > 15 && score <= 25) level = 'high';
      else if (score > 5 && score <= 12) level = 'moderate';
      else if (score > 1 && score <= 4) level = 'low';

      f.get('risk_score')!.setValue(score, { emitEvent: false });
      f.get('risk_level')!.setValue(level, { emitEvent: false });

      const mitigation = f.get('measure_mitigation_proposed')!;
      if (level === 'high' || level === 'moderate') {
        mitigation.setValidators([Validators.required]);
      } else {
        mitigation.clearValidators();
      }
      mitigation.updateValueAndValidity({ emitEvent: false });
    };
    f.get('impact')!.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(recomputeRisk);
    f.get('probability')!.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(recomputeRisk);
  }
}
