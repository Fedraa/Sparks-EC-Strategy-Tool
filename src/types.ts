export type CatchmentTier = 'Primary (0-2 km)' | 'Secondary (2-5 km)' | 'Extended (5-10 km)';

export interface PoICategory {
  id: number;
  slug: string;
  category: string;
  poiToTapIn: string;
  poiExamples: string[];
  catchmentTier: CatchmentTier;
  targetAudience: string;
  peakHours: string;
  impactScore: 'Very High' | 'High' | 'Medium';
  effortScore: 'Low' | 'Medium' | 'High';
  fastestLeadSource: boolean;
  strategicObjective: string;
  activationTactics: string[];
  conversionFunnel: {
    awareness: string;
    consideration: string;
    trialBooking: string;
    enrollment: string;
  };
  valuePropForPartner: string;
  samplePitchScriptWA: string;
  samplePitchEmail: string;
  checklist: string[];
}

export interface PartnerVenue {
  id: string;
  name: string;
  categoryId: number;
  categoryName: string;
  locationArea: string;
  distanceKm: number;
  contactPerson: string;
  contactChannel: string;
  status: 'Prospect' | 'Contacted' | 'In Discussion' | 'Agreement Signed' | 'Active Activation' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  estimatedWeeklyFootfall: number;
  agreedMechanism: string;
  leadsGenerated: number;
  notes: string;
}

export interface StrategyResult {
  summary: string;
  locationAnalysis: string;
  primaryPoiTactics: {
    categoryName: string;
    targetVenues: string[];
    activationMechanism: string;
    expectedReachWeekly: string;
    pitchAngle: string;
    deliverables: string[];
  }[];
  roadmap4Weeks: {
    week: string;
    title: string;
    actions: string[];
  }[];
  kpiProjections: {
    projectedLeads: string;
    trialBookings: string;
    projectedEnrolments: string;
    estimatedCAC: string;
  };
  budgetBreakdown: {
    item: string;
    percentage: number;
    costEst: string;
  }[];
  secretWeaponTip: string;
}
