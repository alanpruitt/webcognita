(() => {
  'use strict';

  const STORAGE_PRIMARY_KEY = 'webcognita_bcm_state_v1';
  const STORAGE_SHADOW_KEY = 'webcognita_bcm_shadow_lkg_v1';
  const SCHEMA_VERSION = 4;
  const SAMFORD_MONEYBALL_URL = 'https://www.samford.edu/sports-analytics/fans/2019/The-Moneyball-Science';
  const DEPODESTA_OBP_WEIGHT = 2737.8 / 1584.9; // 1.7274x (Samford "The Moneyball Science": RS = -804.6 + 2737.8*OBP + 1584.9*SLG)

  const LENS_META = {
    ALL: {
      label: 'Master Moneyball View',
      counselorTitle: 'Sabermetrics (OBP + SLG = OPS) + 8-5 Auto-Shifting Capture + Constrained Optimization',
      checklist: [
        'Sabermetrics Over Gut Feel: Buy on-base percentage (OBP = zero-quote P-Card / GPC / SB eQuote wins, Open-Market 6-12 Mo Recompetes & signed PPQs), never chase 2%-win blind RFP cattle calls.',
        'Self-Rebalancing 8-5 Rhythm: Cap daily BD at 75 mins (25m Morning BI Triage + 20m "2 Portals/Day" Next-Up cap that auto-shrinks to 0m at 108/108 + 30m Afternoon Recompete/PI pitch).',
        'Constrained Optimization: Solve the weekly principal-hour knapsack across 10 NAICS x 10 PSCs, Yuma City LSA (FAR 52.219-2), DoD PIEE/SPRS + 5-Base AZ Lodging, and ADE BPM007864 (Submitted 11/25).'
      ]
    },
    SBDC: {
      label: 'SBDC Session',
      counselorTitle: 'AWC / AZ SBDC Focus: Oakland A\'s Unit Economics, GBP + Trade Name Moat & AZ FAST ($3K)',
      checklist: [
        'Audit our Constrained Payroll Advantage: $0 debt, $0 recurring SaaS/LLM burn, certified AZ SOS Trade Name (#9260023 thru 2032), reinstated Yuma Google Business Profile, and 97.1% net-of-card-fee margin.',
        'Stress-test the Linear Regression Run-Differential model (outbound SOW + 6-12 Mo Recompete velocity -> expected paid invoices -> working capital Exhibit R-03).',
        'Lock the $3,000 Arizona Commerce Authority AZ FAST Phase 0 grant timeline (NAICS 541715 SBIR/STTR active on SAM.gov as of 11/25).'
      ]
    },
    APEX: {
      label: 'APEX Accelerator',
      counselorTitle: 'Chris Bridgewater (Mon Nov 30 Zoom): ADE BPM007864 Red-Team, 10x10 BidMatch, PIEE/SPRS & Case #00009160',
      checklist: [
        'Post-Submission Red-Team on ADE BPM007864 (Submitted 11/25, 28d early): Confirm $1.00 Items (F) entry, toggle APP #IV0000112720 Small Business flag, and fix "Webcognita LCC" -> "Webcognita LLC" profile typo from Yuma IP.',
        'Activate $0 APEX BidMatch across all 10 NAICS x 10 PSCs + 5-Base AZ DoD Corridor (MCAS Yuma, YPG, Luke AFB 56 CONS, Davis-Monthan 355 CONS, Fort Huachuca) & confirm proactive SPRS CMMC L1 affirmation (PIEE linked).',
        'Escalate MySBA VetCert Case #00009160 (UEI EZ34U9KNJA17 SAM.gov sync) ahead of Dec 8-18 Israel OPSEC blackout (strictly zero foreign-IP portal logins).'
      ]
    },
    GRANTS: {
      label: 'Higher-Ed & Grants',
      counselorTitle: 'University & Federal R&D Focus: Non-Competing 50-State Enabling Partner (NSF AI-Ready + DOL TEN 07-25)',
      checklist: [
        'Maximize Institutional OBP: Enter NSF 26-508 AI-Ready and U.S. DOL ETA TEN No. 07-25 (Streams D & E live in /govcon-radar/) strictly as a Non-Competing Enabling Partner ($0 ZTC OER + S-A-R v2.2).',
        'Deploy 2 Frictionless 2 CFR Part 200 Rails: Option A Pre-Award Named Partner LOC ($25K-$75K/yr, zero post-award RFP) or Option B Post-Award Turnkey PO ($9.5K-$24.5K under < $25K ABOR 3-803 D.1 / $50K Uniform Guidance).',
        'Compound NAICS 541715 into SBIR/STTR Phase III Sole-Source Authority (15 U.S.C. 638(r)(4)) with 0% equity dilution and 20-year SBIR Data Rights.'
      ]
    }
  };

  // Empirical Sabermetric Scouting Matrix (Market Inefficiency Comparison)
  // obp = P(conversion per qualified at-bat/pitch or shortlisted quote)
  // avgDeal = representative contract / sprint value (USD)
  // marginRate = net contribution margin after card/direct variable fees
  // bdHoursPerAtBat = principal BD/capture hours per pitch or proposal
  // cashCost = out-of-pocket BD cash required (USD)
  function buildSabermetricLanes(live, opt) {
    const portalRatio = (live.activePortals || 71) / Math.max(1, live.totalPortals || 108);
    const pitchesWk = opt.sowPitchesPerWeek || 3;
    const maxAdaPool = (live.adaTargets || 36) + 18; // 36 core <50K cities/counties/airports + 18 special districts
    const boundedAdaAtBats = Math.min(maxAdaPool, pitchesWk * 12);
    return [
      {
        id: 'LANE-ADA-PCARD',
        name: 'Ring 0-2 <50K Municipal/County ADA P-Card Sprints',
        archetype: 'Scott Hatteberg (Walks to 1B)',
        rail: `AZ SLED P-Card (<= $10K • ${live.adaTargets || 36} core Apr 2027 targets)`,
        obp: 0.125,
        avgDeal: 7200,
        marginRate: 0.971,
        bdHoursPerUnit: 1.5,
        weeklyHrsNeeded: Number((pitchesWk * 0.5).toFixed(1)),
        monthlyCashNeeded: 0,
        annualAtBats: boundedAdaAtBats,
        whyInefficient: 'Big consultancies & SaaS vendors lose money under $25K; Webcognita ships native 9:1 DOM + PDF/UA code at $0 cloud cost with 20-yr WAEDD trust.'
      },
      {
        id: 'LANE-UA-ABOR',
        name: 'Ring 0-3 The University of Arizona & ABOR < $25K SB POs',
        archetype: 'Jeremy Giambi (High OBP)',
        rail: 'ABOR Policy 3-803 D.1 (< $25K No-Bid SB PO / <= $10K P-Card)',
        obp: 0.180,
        avgDeal: 14500,
        marginRate: 0.985,
        bdHoursPerUnit: 1.5,
        weeklyHrsNeeded: 1.0,
        monthlyCashNeeded: 0,
        annualAtBats: 8,
        whyInefficient: 'National EdTech vendors push recurring SaaS licenses that stall in IT/FERPA review; local zero-egress CaC / Hybrid RAG clears under $25K with zero bid.'
      },
      {
        id: 'LANE-4FRONTED',
        name: 'Ring 5: 4FrontED Megaregion (Imperial CA <50K ADA, NADBank USD & Tribal TERO SubK)',
        archetype: 'Erubiel Durazo (Borderlands OBP + Power)',
        rail: 'Imperial CA P-Cards • NADBank USD • Quechan/Cocopah TERO Native-Prime SubK',
        obp: 0.155,
        avgDeal: 11500,
        marginRate: 0.971,
        bdHoursPerUnit: 1.6,
        weeklyHrsNeeded: 1.0,
        monthlyCashNeeded: 0, // 11/12 4FrontED portals are $0; $50/yr Quechan Pre-Bid Tribal License is budgeted explicitly in Runs Allowed (RA) below!
        annualAtBats: 10,
        whyInefficient: 'Most Quechan/Cocopah bids enforce Indian Preference (25 U.S.C. 5307(b)) + TERO + $50 pre-bid license: team under TERO Native primes (never fight preference head-on) while pitching <50K Imperial CA P-Cards remotely ($0 CA SOS tax).'
      },
      {
        id: 'LANE-FED-GPC',
        name: 'Ring 9 AZ 5-Base DoD + Federal Recompete Sweet Spot (6-12 Mo Open-Market POs, PIEE/SPRS & Yuma LSA)',
        archetype: 'Chad Bradford (Submarine Reliever)',
        rail: 'PIEE/SPRS Linked • 5-Base AZ DoD (Luke/DM/Huachuca/MCAS/YPG) • Yuma LSA FAR 52.219-2 • 6-12m Recompetes',
        obp: 0.170,
        avgDeal: 18500,
        marginRate: 0.971,
        bdHoursPerUnit: 1.8,
        weeklyHrsNeeded: 1.2,
        monthlyCashNeeded: 0,
        annualAtBats: Math.round(12 * (0.65 + 0.35 * portalRatio)),
        whyInefficient: 'PIEE/SPRS active + authorized DoD lodging across Luke AFB, Davis-Monthan, Fort Huachuca, MCAS Yuma & YPG cuts travel overhead, while 6-12 Mo Open-Market PO recompetes trigger SB/VOSB/LSA set-asides before RFPs drop.'
      },
      {
        id: 'LANE-AZ-EQUOTE',
        name: 'Ring 3-4 AZ State APP (#IV0000112720 • ADE BPM007864 Submitted), Mesa VSS & Co-Ops',
        archetype: 'David Justice (Veteran Slugging)',
        rail: 'ADE BPM007864 QVL (Submitted 11/25) • A.R.S. 41-2535 SB eQuotes • Mesa VSS #VS0000020834 • 1GPA/Mohave',
        obp: 0.165,
        avgDeal: 32000,
        marginRate: 0.96,
        bdHoursPerUnit: 3.0,
        weeklyHrsNeeded: 1.5,
        monthlyCashNeeded: 0,
        annualAtBats: Math.max(6, Math.round(12 * portalRatio)),
        whyInefficient: 'First 5-yr State QVL bid already submitted (ADE BPM007864, 28d early) + Mesa VSS #VS0000020834 certified; out-of-state primes are barred from A.R.S. 41-2535 SB eQuotes.'
      },
      {
        id: 'LANE-GRANTS-SBIR',
        name: '50-State Enabling Partner (NSF AI-Ready + DOL TEN 07-25) + SBIR/STTR (NAICS 541715) & AZ FAST',
        archetype: 'Miguel Tejada (0%-Dilution Power)',
        rail: '2 CFR 200.331 Named Partner / 200.320 < $25K-$50K PO • DOL Streams D/E • AZ FAST ($3K -> $150K+)',
        obp: 0.205,
        avgDeal: 48000,
        marginRate: 0.95,
        bdHoursPerUnit: 3.5,
        weeklyHrsNeeded: 1.4,
        monthlyCashNeeded: 0,
        annualAtBats: 5,
        whyInefficient: '1-Click Rich HTML Gmail drafts (`alan@webcognita.com` + auto-resolved NSF/DOL PI emails) pitch 100% non-competing WCAG 2.2 AA & CaC deliverables with zero subrecipient audit burden.'
      },
      {
        id: 'LANE-OPEN-RFP-TRAP',
        name: 'Unrestricted Full-&-Open $500K+ Blind RFP Cattle Calls',
        archetype: 'Overpriced Free Agent (BENCH / AVOID)',
        rail: 'Unrestricted FAR Part 15 (>80 Bidders, Zero Prior Intake)',
        obp: 0.020,
        avgDeal: 250000,
        marginRate: 0.72,
        bdHoursPerUnit: 65.0,
        weeklyHrsNeeded: 8.0,
        monthlyCashNeeded: 450,
        annualAtBats: 6,
        isTrap: true,
        whyInefficient: 'Classic "gut-feel scouting" trap: 65+ unpaid proposal hours at 2% win odds destroys solo-principal capture capacity. Benched by knapsack solver.'
      }
    ];
  }

  // Constrained Optimization (Greedy Fractional/0-1 Knapsack by DePodesta wOPS & Marginal $/BD-Hour)
  // + Samford "The Moneyball Science" (Fatima Sajid, 2019) Offensive (OBP/SLG -> RS) & Defensive (OOBP/OSLG -> RA) Regressions
  function solveMoneyballModel(live, opt) {
    const hrsCap = Math.max(2, Number(opt.weeklyHoursCap) || 6);
    const cashCap = Math.max(0, Number(opt.monthlyCashCap) || 0);
    const biAutomationHrs = 0.6; // Carbon 4 7:30 AM MST sweep: 5 mins/day x 7 days = ~0.58 hrs/wk
    let remainingHrs = Math.max(0, hrsCap - biAutomationHrs);
    let remainingCash = cashCap;

    const rawLanes = buildSabermetricLanes(live, opt).map((lane) => {
      const expectedNetPerAtBat = lane.obp * lane.avgDeal * lane.marginRate;
      const expectedAnnualWins = lane.annualAtBats * lane.obp;
      const expectedAnnualNet = lane.annualAtBats * expectedNetPerAtBat;
      const annualBdHours = Math.max(1, lane.weeklyHrsNeeded * 48);
      const netPerBdHour = expectedAnnualNet / annualBdHours;
      // Normalize SLG to MLB sabermetric scale ($600 expected net/BD-hr = 1.000 SLG; $300/BD-hr = .500 SLG)
      const slg = Math.min(1.250, netPerBdHour / 600);
      const ops = lane.obp + slg;
      // DePodesta Regression Weighting (Samford 2019): RS = -788.5 + 2917.4*OBP + 1637.9*SLG - 369*BA
      // Clean 2-var model: RS = -804.6 + 2737.8*OBP + 1584.9*SLG (OBP carries 1.7274x weight; vanity BA carries -369 penalty!)
      const vanityBaDrag = lane.isTrap ? 0.140 : 0;
      const wops = Math.max(0.050, (DEPODESTA_OBP_WEIGHT * lane.obp) + slg - vanityBaDrag);
      return {
        ...lane,
        expectedNetPerAtBat,
        expectedAnnualWins,
        expectedAnnualNet,
        netPerBdHour,
        slg,
        ops,
        wops
      };
    });

    // Carbon 4 ranks strictly by DePodesta wOPS & marginal $/BD-hour (benching negative-BA traps)
    const ranked = [...rawLanes].sort((a, b) => (b.wops - a.wops) || (b.netPerBdHour - a.netPerBdHour));
    const roster = ranked.map((lane) => {
      if (lane.isTrap || lane.monthlyCashNeeded > remainingCash || lane.wops < 0.400) {
        return {
          ...lane,
          rosterStatus: 'BENCHED (-369 BA Trap / Cap Guard)',
          allocationRatio: 0,
          allocatedHrsWk: 0,
          projectedWins: 0,
          projectedRunsScored: 0
        };
      }
      if (remainingHrs <= 0.15) {
        return {
          ...lane,
          rosterStatus: 'BULLPEN (Cap Reached — Raise Hrs)',
          allocationRatio: 0,
          allocatedHrsWk: 0,
          projectedWins: 0,
          projectedRunsScored: 0
        };
      }
      const allocHrs = Math.min(lane.weeklyHrsNeeded, remainingHrs);
      const ratio = allocHrs / Math.max(0.1, lane.weeklyHrsNeeded);
      remainingHrs = Number((remainingHrs - allocHrs).toFixed(2));
      remainingCash = Math.max(0, remainingCash - lane.monthlyCashNeeded);
      return {
        ...lane,
        rosterStatus: ratio >= 0.95 ? 'STARTING LINEUP (100% Funded)' : `PLATOON (${Math.round(ratio * 100)}% Hrs)`,
        allocationRatio: ratio,
        allocatedHrsWk: Number(allocHrs.toFixed(1)),
        projectedWins: lane.expectedAnnualWins * ratio,
        projectedRunsScored: lane.expectedAnnualNet * ratio
      };
    });

    // Radar coverage regression multiplier: locking portals from 71/108 -> 108/108 lifts inbound OBP yield
    const portalRatio = (live.activePortals || 71) / Math.max(1, live.totalPortals || 108);
    const radarMultiplier = 0.88 + (0.18 * portalRatio);

    const totalRunsScored = Math.round(
      roster.reduce((acc, r) => acc + r.projectedRunsScored, 0) * radarMultiplier
    );
    const totalExpectedWins = Number(
      (roster.reduce((acc, r) => acc + r.projectedWins, 0) * radarMultiplier).toFixed(1)
    );

    // Defensive Regression (Samford 2019: RA = -837.4 + 2913.6*OOBP + 1514.3*OSLG)
    // In GovCon: OOBP = Compliance/ATO Disqualification Risk; OSLG = Fixed SaaS/Overhead + Unpaid RFP Bleed
    const gateRatio = (live.gatesReady || 12) / Math.max(1, live.gatesTotal || 12);
    const govconOOBP = Number(Math.max(0.035, 0.220 - (0.185 * gateRatio)).toFixed(3));
    const govconOSLG = Number((0.020 + (cashCap / 2500)).toFixed(3));
    const fourFrontedFunded = roster.some((r) => r.id === 'LANE-4FRONTED' && r.allocationRatio > 0);
    const quechanLicenseReserve = fourFrontedFunded ? 50 : 0; // $50/yr 1-Year Quechan Tribal Business License deferred until bidding a specific tribal RFP
    const coiReserve = totalExpectedWins >= 1 ? 1200 : 0;
    const gateFrictionPenalty = Math.round((1 - gateRatio) * 8500);
    const totalRunsAllowed = (cashCap * 12) + quechanLicenseReserve + coiReserve + gateFrictionPenalty;
    const runDifferential = totalRunsScored - totalRunsAllowed;

    // Bill James Pythagorean Expectation + DePodesta Playoff Clinch (>= 4.0 Signed PPQ Wins & >= $100K Net Run Difference)
    const benchmarkRuns = 35000;
    const pythagWinPct = totalRunsScored > 0
      ? Math.pow(totalRunsScored, 1.83) / (Math.pow(totalRunsScored, 1.83) + Math.pow(benchmarkRuns, 1.83))
      : 0;
    const clinchedPlayoffs = totalExpectedWins >= 4.0 && runDifferential >= 100000;

    const activeLineup = roster.filter((r) => r.allocationRatio > 0);
    const totalAllocHrs = Math.max(0.1, activeLineup.reduce((s, r) => s + r.allocatedHrsWk, 0));
    const teamObp = activeLineup.length
      ? activeLineup.reduce((s, r) => s + r.obp * r.allocatedHrsWk, 0) / totalAllocHrs
      : 0;
    const teamSlg = activeLineup.length
      ? activeLineup.reduce((s, r) => s + r.slg * r.allocatedHrsWk, 0) / totalAllocHrs
      : 0;
    const teamOps = teamObp + teamSlg;
    const teamWops = (DEPODESTA_OBP_WEIGHT * teamObp) + teamSlg;

    return {
      roster,
      biAutomationHrs,
      usedHrsWk: Number((hrsCap - remainingHrs).toFixed(1)),
      hrsCap,
      cashCap,
      totalRunsScored,
      totalRunsAllowed,
      runDifferential,
      totalExpectedWins,
      pythagWinPct,
      clinchedPlayoffs,
      teamObp,
      teamSlg,
      teamOps,
      teamWops,
      govconOOBP,
      govconOSLG
    };
  }

  function formatStat3(val) {
    const fixed = Number(val || 0).toFixed(3);
    return fixed.startsWith('0.') ? fixed.slice(1) : fixed;
  }

  function buildCanonicalBlocks(live, model) {
    const activePortals = live.activePortals || 71;
    const totalPortals = live.totalPortals || 108;
    const nextUpPortals = Math.max(0, totalPortals - activePortals);
    const pctPortals = Math.round((activePortals / Math.max(1, totalPortals)) * 100);
    const adaTargets = live.adaTargets || 36;
    const adaCountdown = live.adaCountdown || 'April 26, 2027 deadline active';
    const gatesReady = live.gatesReady || 12;
    const gatesTotal = live.gatesTotal || 12;

    return [
      {
        id: 'cs',
        step: 1,
        zone: 'Front Stage: Market Inefficiency (Who Is Undervalued)',
        area: 'cs',
        shortTitle: 'Customer Segments (Undervalued Lanes)',
        plainMeaning: 'Moneyball Rule #1: Target buyers overlooked by high-overhead primes where statutory rules put us on base.',
        counselorCue: {
          ALL: 'Big firms cannot profitably touch < $15K sprints, Yuma LSA set-asides, or Open-Market < $50K 6-12 Mo recompetes—giving Webcognita an uncrowded .125-.205 OBP home court.',
          SBDC: 'Ask SBDC: Which Ring 0-2 municipal Managers, Clerks, or Airport Directors should get our first 3 weekly < $10K ADA P-Card SOWs?',
          APEX: 'Ask Chris Bridgewater: Load all 10 NAICS x 10 PSCs into $0 BidMatch targeting Luke AFB (56 CONS), Davis-Monthan (355 CONS), Fort Huachuca, MCAS Yuma, YPG & VISN 22.',
          GRANTS: 'Ask Advisor: Which Principal Investigators at The University of Arizona, ASU, NAU, or DOL TEN 07-25 / SCC consortia need a Non-Competing AI/WCAG partner?'
        },
        items: [
          `Inefficiency #1 — Ring 0-2 <50K SLED (.125 OBP): ${adaTargets} AZ/4FrontED cities, rural counties & YUM Airport facing DOJ 28 CFR Part 35 ADA Title II (${adaCountdown})—97% margin for us.`,
          'Inefficiency #2 — Ring 0-3 Higher-Ed & 50-State Grants (.180-.205 OBP): The University of Arizona (< $25K ABOR 3-803 D.1 POs) + NSF AI-Ready & U.S. DOL TEN 07-25 PIs.',
          'Inefficiency #3 — Ring 3-4 AZ Small-Business Reserve (.165 OBP): Active APP #IV0000112720 (ADE BPM007864 submitted 11/25), Mesa VSS #VS0000020834 & A.R.S. 41-2535 SB eQuotes.',
          'Inefficiency #4 — Ring 9 5-Base AZ DoD, Recompetes & Yuma LSA (.170 OBP): PIEE/SPRS active + Yuma City LSA (FAR 52.219-2) + FEMA AZ/CA Registry + 6-12 Mo Open-Market PO recompetes.'
        ],
        defaultNote: ''
      },
      {
        id: 'vp',
        step: 2,
        zone: 'Center Core: Sabermetric Unfair Advantage (OBP + SLG)',
        area: 'vp',
        shortTitle: 'Value Propositions & Unfair Advantage',
        plainMeaning: 'Why our "Scott Hatteberg" architecture gets on base without IT/ATO strikeouts—and slugs at 97% margin.',
        counselorCue: {
          ALL: `Team OPS ${formatStat3(model.teamOps)} (${formatStat3(model.teamObp)} OBP + ${formatStat3(model.teamSlg)} SLG): zero cloud egress removes ATO outs while keeping 97% of every P-Card dollar.`,
          SBDC: 'Highlight to SBDC: SaaS overlay vendors charge recurring fees and fail screen-reader audits; we deliver permanent native DOM + PDF/UA code in one P-Card swipe.',
          APEX: 'Highlight to Chris: USMC CI (MOS 0211, 1985 USAICS Ft. Huachuca) + U.S. Army CI (MOS 97B30, TS/SCI TK 1992-2001), PIEE/SPRS active, Yuma LSA & 5-Base DoD lodging.',
          GRANTS: 'Highlight to PI: Non-Competing 50-State Enabling Partner—we bring Zenodo-DOI S-A-R v2.2 compilers and $0 ZTC OER without competing for lead grant dollars.'
        },
        items: [
          'MOAT #1 (Zero-Egress Cost Advantage): 100% client-side / local-edge code (0 cloud bytes, $0 LLM API burn) turns <= $10K P-Card & <= $15K GPC buys into ~97% margin base hits.',
          'MOAT #2 (20-Year Borderlands & Tribal Insider Trust): 3-yr Quechan Business Desk tenure, 2023 MBDA Advocate of the Year (Quechan Tribe), 15-yr WAEDD Exec. Director, 2025 SBA AZ Veteran Champion & EN/Spanish fluency.',
          'MOAT #3 (Dual-Service CI + Statutory Pedigree): 100% VOSB, USMC CI (MOS 0211) & U.S. Army CI (MOS 97B30 • TS/SCI TK), Yuma LSA (FAR 52.219-2), PIEE/SPRS active & 5-Base DoD lodging.',
          'Verified Technical Slugging: Native WCAG 2.2 AA (>= 9:1 contrast) + ISO 14289-1 (PDF/UA) CI/CD (419+ HTML pages at 0 open errors) & SQLite FTS5 BM25+RRF Hybrid RAG.'
        ],
        defaultNote: ''
      },
      {
        id: 'ch',
        step: 3,
        zone: 'Front Stage: Base-Path Channels (Walks Over Home-Run Swings)',
        area: 'ch',
        shortTitle: 'Channels (High-OBP Purchasing Rails)',
        plainMeaning: 'In Moneyball, a walk is as good as a hit—P-Cards, GPCs, and statutory SB reserves put us on 1B with zero RFP.',
        counselorCue: {
          ALL: `Radar coverage at ${activePortals}/${totalPortals} portals (${pctPortals}% • Rings 0-2 100% Locked); our 2-portal/day morning cap clears the last ${nextUpPortals} automatically.`,
          SBDC: 'Show SBDC: /govcon-radar/ -> /cac-readiness/ generates a compliant <= $9,900 P-Card SOW in 1 click so a municipal buyer can check out immediately.',
          APEX: `Ask Chris Bridgewater: Confirm ADE BPM007864 Round 2 packet, sequence MySBA Case #00009160, and target 1GPA / Mohave co-op contracts for > $100K zero-RFP slugging.`,
          GRANTS: 'Ask Advisor: Deploy 1-Click Rich HTML Gmail Drafts (alan@webcognita.com) via Option A (2 CFR 200.331 Named Partner LOC) or Option B (200.320 < $25K-$50K PO).'
        },
        items: [
          'Base-on-Balls Rails (Zero RFP): AZ SLED P-Card (<= $10K), Federal SmartPay 3 GPC (<= $15K), The University of Arizona < $25K ABOR PO & 6-12 Mo Open-Market PO Recompetes.',
          `Automated Scouting Radar (v2.2.8): ${activePortals}/${totalPortals} portals ACTIVE (${pctPortals}% • Rings 0-2 100% Locked • ${nextUpPortals} Next Up) + deduplicated 7:30 AM MST BI sweep.`,
          '1-Click Capture Funnel: /govcon-radar/ v2.2.8 (Rule-of-Thumb Recompete Timeline + DOL Streams D/E + Rich HTML alan@webcognita.com Gmail Drafts) -> /cac-readiness/ -> /support/.',
          'Extra-Base Vehicles (SLG Multipliers): ADE BPM007864 5-Yr Statewide QVL (Submitted 11/25), MySBA Case #00009160, PIEE/SPRS WAWF & 1GPA / Mohave Co-Ops.'
        ],
        defaultNote: ''
      },
      {
        id: 'cr',
        step: 4,
        zone: 'Front Stage: Retention & Past-Performance Compounding',
        area: 'cr',
        shortTitle: 'Customer Relationships (OBP Compounding)',
        plainMeaning: 'How every single turns into a signed Past Performance Questionnaire (PPQ) and repeat task order.',
        counselorCue: {
          ALL: `Regression target: ${model.totalExpectedWins} projected annual wins -> banks Exhibit R-04 PPQs needed to clinch Stage 3 cooperative & GSA vehicles.`,
          SBDC: 'Discuss with SBDC: Leveraging reinstated Yuma Google Business Profile + $4.5K-$9.9K ADA remediation singles into recurring annual WCAG / PDF-UA IV&V retainers.',
          APEX: 'Discuss with Chris: Closeout SOP capturing a signed CPARS-aligned PPQ (Exhibit R-04) on every sub-SAT P-Card/GPC & ADE QVL engagement.',
          GRANTS: 'Discuss with Advisor: Strict Non-Competing Enabling Partner governance + A.R.S. 38-503 COI disclosure on file with AWC Purchasing (11/19).'
        },
        items: [
          'Zero Hostage Licensing: Buyers own clean, Git-governed HTML/CSS/SQLite + W3C PROV-O audit logs ($0/mo recurring SaaS lock-in).',
          'Mandatory PPQ Conversion: Every sub-threshold sprint closes with a signed Exhibit R-04 Past Performance Questionnaire (turns singles into GSA/Co-Op credentials).',
          'Non-Competing Enabling Partner Trust: Never bid against partner colleges/universities for lead grants; AWC COI disclosure already filed (11/19) & unpaid UArizona DCC.',
          'Direct Veteran Principal Execution: Yuma HQ (1906 S 6th Ave • Reinstated GBP • Certified AZ SOS Trade Name #9260023) with zero junior-consultant bait-and-switch.'
        ],
        defaultNote: ''
      },
      {
        id: 'rs',
        step: 5,
        zone: 'Regression Output: Runs Scored (Bottom Right)',
        area: 'rs',
        shortTitle: 'Revenue Streams ("Runs Scored")',
        plainMeaning: 'Buy wins by buying runs: predictable singles fund cash flow while non-dilutive R&D and co-ops drive slugging.',
        counselorCue: {
          ALL: `Model forecasts $${model.totalRunsScored.toLocaleString('en-US')}/yr Runs Scored (${model.totalExpectedWins} wins) at ${model.usedHrsWk}/${model.hrsCap} hrs/wk capture cap.`,
          SBDC: 'Validate with SBDC: Singles ($4.5K-$14.9K Net-0 card settlement) fund immediate cash flow with zero AR factoring or debt.',
          APEX: 'Validate with Chris: Stacking Singles (GPC/P-Card) -> Doubles ($10K-$100K APP eQuotes & 6-12m Open-Market Recompetes) -> Triples (ADE BPM007864 QVL & 1GPA/Mohave).',
          GRANTS: 'Validate with Advisor: Non-dilutive Home Runs ($3K AZ FAST -> $125K-$305K NAICS 541715 SBIR/STTR + $25K-$75K/yr 2 CFR 200.331 enabling partner awards).'
        },
        items: [
          '1B — High-OBP Micro-Purchase Singles ($4,500-$14,900 FFP): <50K ADA Title II web/PDF-UA sprints & local Hybrid RAG prototypes via P-Card / GPC.',
          '2B — Restricted SB & Recompete Doubles ($10,001-$100,000+ FFP): AZ APP SB eQuotes, Mesa VSS, 6-12 Mo Open-Market Federal Recompetes & 2 CFR 200.320 POs.',
          '3B — Statewide QVL, Piggyback & DoD Triples ($25,000-$350,000): ADE BPM007864 5-Yr QVL task orders, DoD PIEE/WAWF awards, 1GPA/Mohave & VA Veterans First.',
          'HR — Non-Dilutive R&D & Grant Subawards ($25,000-$305,000): NSF AI-Ready / DOL TEN 07-25 partner scopes + NAICS 541715 SBIR/STTR Phase I/II (0% equity + AZ FAST $3K).'
        ],
        defaultNote: ''
      },
      {
        id: 'kr',
        step: 6,
        zone: 'Back Stage: $0-CAPEX Championship Roster',
        area: 'kr',
        shortTitle: 'Key Resources (Pre-Built Roster & Data)',
        plainMeaning: 'Every credential, compiler, and scouting dataset is already built, paid for, and debt-free.',
        counselorCue: {
          ALL: `${gatesReady}/${gatesTotal} FAR 9.104-1 & CMMC L1 gates + 121-node BM25/RRF radar + 10 NAICS x 10 PSCs + PIEE/SPRS active ($0 new CAPEX required).`,
          SBDC: 'Show SBDC: Dual Apple Silicon M1/M2 nodes (+ AGY M1/M2 Scout automation) + 13 production PWAs mean $0 equipment loans and instant delivery capacity.',
          APEX: `Show Chris: UEI EZ34U9KNJA17 (10 NAICS x 10 PSCs, Yuma LSA, FEMA AZ/CA), CAGE 4ZCN6, PIEE/SPRS active, APP #IV0000112720, Mesa #VS0000020834 & ADOT SBC #23545.`,
          GRANTS: 'Show Advisor: ORCID 0009-0002-5038-7111, Zenodo DOI 10.5281/zenodo.24170270, synced Canvas GraphQL monitor & 5-course ZTC OER fleet.'
        },
        items: [
          `Verified GovCon Roster (${gatesReady}/${gatesTotal} Gates): UEI EZ34U9KNJA17 (10 NAICS x 10 PSCs • Yuma LSA • FEMA AZ/CA), CAGE 4ZCN6, PIEE/SPRS, APP #IV0000112720, Mesa #VS0000020834, ADOT SBC #23545, E-Verify #3119395, AZ SOS Trade Name #9260023.`,
          `Sabermetric Scouting Stack: /govcon-radar/ v2.2.8 (${totalPortals} portals + ${live.statuteCount || 13} statutes = ${(totalPortals + (live.statuteCount || 13))} nodes), Rule-of-Thumb Recompete Triage & M2 Loopback Bridge.`,
          'Clean-Room Software IP: S-A-R v2.2 compiler (Zenodo DOI), 9:1 WCAG +Tagged PDF/UA CI/CD, 13 live PWAs & WCGVLT01 AES-256-GCM vault.',
          'Dual-Node Sovereign Compute: Air-gapped M1 DisplayLink Cockpit + M2 16GB Ollama/Carbon 4 Engine (< 15 min RTO continuity under FAR 9.104-1(b)) + AGY M1/M2 Scout.'
        ],
        defaultNote: ''
      },
      {
        id: 'ka',
        step: 7,
        zone: 'Back Stage: Knapsack Time Allocation (Weekly Lineup)',
        area: 'ka',
        shortTitle: 'Key Activities (Constrained Knapsack Ops)',
        plainMeaning: 'Strict plate discipline: 75-min/day 8-5 capture cap whose portal quota auto-shrinks from 2/day -> 0/day.',
        counselorCue: {
          ALL: `Knapsack allocates ${model.usedHrsWk} of ${model.hrsCap} hrs/wk (${model.biAutomationHrs}h automated BI + self-shrinking 8-5 queue) and benches 2%-win blind RFPs.`,
          SBDC: `Review daily 8-5 rhythm: 8:00-8:25 BI Triage, 8:25-8:45 Next-2 Portal Cap (auto-retires at 108/108), 8:45-4:30 Deep Work, 4:30-5:00 1 Recompete/PI Pitch.`,
          APEX: 'Enforce Plate Discipline + Travel OPSEC with Chris: Swing only at >= .150 OBP lanes, and enforce 100% zero federal/state portal logins during non-U.S. IP travel.',
          GRANTS: 'Focus R&D hours on 1-Click Rich HTML PI pitches (NSF & DOL Streams D/E), AZ FAST ($3K), and invited university 2 CFR 200.331/200.320 scopes.'
        },
        items: [
          `8:00–8:25 AM Offense (${model.biAutomationHrs} hr/wk automated prep): Triage deduplicated 7:30 AM BI Digest & stage 1-Click Rich HTML Gmail Drafts (alan@webcognita.com).`,
          `8:25–8:45 AM Auto-Shrinking Portal Cap: Complete 2 Next Up portals/day (${nextUpPortals} left -> tapers to 1/day at <=15 -> auto-retires to 0m at 108/108; U.S./Yuma IP ONLY).`,
          '4:30–5:00 PM Recompete & Partner Closeout: Dispatch 1 Sweet-Spot (6-12 Mo Open-Market PO) Capabilities brief or 50-State Enabling Partner pitch + Inbox Zero.',
          'Strict Moneyball "No-Swing Rule": Bench unrestricted >$500K blind RFPs (65+ hr burn, .020 OBP) unless wired via co-op, VOSB/LSA set-aside, or prime team.'
        ],
        defaultNote: ''
      },
      {
        id: 'kp',
        step: 8,
        zone: 'Back Stage: $0-Payroll Scouting & Farm System',
        area: 'kp',
        shortTitle: 'Key Partners ($0 Front-Office Bench)',
        plainMeaning: 'Assemble a championship legal, capture, and prime-subcontracting bench at $0 fixed payroll.',
        counselorCue: {
          ALL: 'Chris Bridgewater (AZ APEX) + AWC SBDC + VBOC + university small-business offices provide $50K+ of equivalent advisory capacity for $0.',
          SBDC: 'Partner with AWC SBDC on AZ FAST grant endorsement, cash-flow stress-testing, and Yuma/La Paz/Mohave civic introductions.',
          APEX: 'Active Assigned Counselor: Chris Bridgewater (AZ APEX Accelerator • Mon Nov 30 Zoom) for ADE BPM007864 red-team, 10x10 BidMatch, SPRS CMMC L1 & Case #00009160.',
          GRANTS: 'Partner with The University of Arizona Small Business Utilization (FNSV-Purchasing@arizona.edu), ASU/NAU PIs & DOL TEN 07-25 Community College Consortia.'
        },
        items: [
          '$0 Advisory Front Office: Arizona APEX Accelerator (Assigned Counselor: Chris Bridgewater, 12-yr Army Eng. Vet), AWC SBDC, SBA AZ District & VBOC Region IX.',
          'University & Workforce Farm System: The University of Arizona Small Business Utilization (520-621-1747), STTR PIs & DOL TEN 07-25 / SCC Community Colleges.',
          'Force-Multiplier Primes & VMS: MBO Partners, Beeline VMS, 1GPA, Mohave (MESC) & 5-Base AZ DoD Primes (Luke 56 CONS, DM 355 CONS, Ft. Huachuca, YPG, MCAS Yuma).',
          'Borderlands & Tribal TERO Partners: TERO-certified Native-owned primes on Quechan & Cocopah (respecting 25 U.S.C. 5307(b) + TERO), plus Yuma/Imperial civic leaders.'
        ],
        defaultNote: ''
      },
      {
        id: 'co',
        step: 9,
        zone: 'Constrained Payroll Floor: Runs Allowed -> $0 (Bottom Left)',
        area: 'co',
        shortTitle: 'Cost Structure ("Runs Allowed" Cap)',
        plainMeaning: 'Oakland A\'s payroll discipline: keep fixed burn near $0 so every base hit drops straight to net run differential.',
        counselorCue: {
          ALL: `Projected Runs Allowed: $${model.totalRunsAllowed.toLocaleString('en-US')}/yr vs. $${model.totalRunsScored.toLocaleString('en-US')}/yr Runs Scored -> Net Run Diff +$${model.runDifferential.toLocaleString('en-US')}/yr.`,
          SBDC: 'Confirm with SBDC: $0 SaaS bloat, $0 cloud inference burn, $0 paid bid-portal subscriptions, and COI bound strictly upon notice of award.',
          APEX: 'Confirm with Chris: DoD base lodging access (Luke/DM/Huachuca) cuts statewide travel costs; skip premature $250/yr ECA PKI certs until a paid DFARS 7012 CUI award.',
          GRANTS: 'Confirm with Advisor: Clean 2 CFR 200.414 de minimis indirect rate (up to 15% MTDC) and zero post-grant cloud hosting liability.'
        },
        items: [
          '$0 Fixed Cloud, AI & PKI Payroll: Static edge hosting ($0) + local M1/M2 Ollama ($0 token burn) + $0 Project Spectrum / SPRS L1 (defer ECA PKI until paid CUI contract).',
          '$0 Portal Scouting Payroll: Strictly $0 official tiers (SAM.gov, PIEE/SPRS, OpenGov, Bonfire, BidNet $0, app.az.gov, Mesa VSS) + $0 AZ APEX BidMatch.',
          'DoD Lodging & Licensing Discipline: Authorized DoD lodging across AZ (Luke/DM/Huachuca) slashes travel burn; bind COI post-award; defer $50/yr Quechan License until active tribal bid; remote Yuma delivery avoids $800/yr CA SOS tax.',
          'Success-Only Settlement & Tax Discipline: ~2.9% card fee only on paid GPC/P-Card sprints + strict IRC 274(c)/(d) & FAR 31.205-46 travel segregation.'
        ],
        defaultNote: ''
      }
    ];
  }

  function optSummaryText(model) {
    const starters = model.roster.filter((r) => r.allocationRatio > 0);
    return `${starters.length} high-OPS lanes funded within ${model.hrsCap} hrs/wk & $${model.cashCap}/mo cap`;
  }

  const DEFAULT_COUNSELOR_QUESTIONS = [
    '[APEX • Mon Nov 30 Chris Bridgewater #1] Post-submission red-team on ADE RFP BPM007864 (Lot 1 Round 2 QVL, submitted 11/25): confirm $1.00 Items (F) entry, toggling APP #IV0000112720 to Small Business, and fixing Supplier Legal Name typo ("Webcognita LCC" -> "Webcognita LLC") from Yuma IP.',
    '[APEX • Mon Nov 30 Chris Bridgewater #2] Load all 10 NAICS (541511, 541512, 541519, 541611, 541690, 541715, 561410, 611420, 611430, 611710) & 10 PSCs into $0 APEX BidMatch targeting the 5-Base AZ DoD Corridor (Luke 56 CONS, Davis-Monthan 355 CONS, Fort Huachuca, YPG, MCAS Yuma) + AZ SLED.',
    '[APEX • DoD SPRS & MySBA Case #00009160] Since PIEE/SPRS is now linked to active SAM.gov (CAGE 4ZCN6), should we post our 15/15 CMMC Level 1 Self-Assessment affirmation in SPRS proactively now—and do you have an APEX escalation tip for MySBA Case #00009160 ahead of Dec 8-18 Israel OPSEC blackout?',
    '[SBDC • Slugging Catalyst] With NAICS 541715 (R&D) now live on SAM.gov (11/25), can AWC SBDC review our next application window for the $3,000 Arizona Commerce Authority AZ FAST grant (rural Yuma VOSB / Yuma City LSA)?',
    '[APEX / SBDC • 6-12 Mo Recompetes & Stage 3] Best outreach cadence to Contracting Officers / OSDBUs on 6-12 Month Open-Market PO Recompetes (e.g., AZ VA VISN 22 $25K training, Navy AZ $24.5K CWF, HHS $35K Sec. 508) to bank 4 Exhibit R-04 PPQs + $100K run-rate?'
  ].join('\n');

  function computeSimpleChecksum(obj) {
    const str = JSON.stringify(obj);
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16).padStart(8, '0');
  }

  function createDefaultState() {
    return {
      schemaVersion: SCHEMA_VERSION,
      lens: 'ALL',
      viewMode: 'POSTER',
      activeFlowStep: 0,
      optimizer: {
        weeklyHoursCap: 6,
        sowPitchesPerWeek: 3,
        monthlyCashCap: 0
      },
      blockNotes: {
        cs: '', vp: '', ch: '', cr: '', rs: '', kr: '', ka: '', kp: '', co: ''
      },
      customBullets: {
        cs: '', vp: '', ch: '', cr: '', rs: '', kr: '', ka: '', kp: '', co: ''
      },
      counselorQuestions: DEFAULT_COUNSELOR_QUESTIONS,
      sessionActionItems: '',
      updatedAt: new Date().toISOString()
    };
  }

  function clampNum(val, min, max, fallback) {
    const n = Number(val);
    if (!Number.isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
  }

  function validateAndHealState(candidate, shadowCandidate) {
    const healEvents = [];
    const defaults = createDefaultState();
    const validIds = ['cs', 'vp', 'ch', 'cr', 'rs', 'kr', 'ka', 'kp', 'co'];
    const validLenses = ['ALL', 'SBDC', 'APEX', 'GRANTS'];
    const validViews = ['POSTER', 'FLOW'];

    let base = null;
    if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
      base = candidate;
    } else if (shadowCandidate && typeof shadowCandidate === 'object' && !Array.isArray(shadowCandidate)) {
      base = shadowCandidate;
      healEvents.push('Recovered BCM state from Last-Known-Good shadow snapshot after primary storage corruption.');
    } else {
      if (candidate !== null && candidate !== undefined) {
        healEvents.push('Reset malformed BCM storage to verified Moneyball v2 baseline.');
      }
      base = defaults;
    }

    if (base.schemaVersion && base.schemaVersion < SCHEMA_VERSION) {
      healEvents.push(`Auto-migrated BCM schema v${base.schemaVersion} -> v${SCHEMA_VERSION} (synced Nov 26 milestones: ADE BPM007864 submitted, Chris Bridgewater Zoom, 10x10 SAM.gov + PIEE/SPRS, 8-5 Daily Queue & Recompete Timeline; custom notes preserved).`);
    }

    const rawOpt = (base.optimizer && typeof base.optimizer === 'object') ? base.optimizer : {};
    const healedOpt = {
      weeklyHoursCap: clampNum(rawOpt.weeklyHoursCap, 3, 16, 6),
      sowPitchesPerWeek: clampNum(rawOpt.sowPitchesPerWeek, 1, 8, 3),
      monthlyCashCap: clampNum(rawOpt.monthlyCashCap, 0, 500, 0)
    };

    const isLegacyQuestions = typeof base.counselorQuestions === 'string' && (
      base.counselorQuestions.startsWith('[SBDC] Can we review Webcognita LLC eligibility')
      || base.counselorQuestions.includes('Incident #57338')
      || base.counselorQuestions.includes('staged SBA VetCert packet')
    );
    const healed = {
      schemaVersion: SCHEMA_VERSION,
      lens: validLenses.includes(base.lens) ? base.lens : 'ALL',
      viewMode: validViews.includes(base.viewMode) ? base.viewMode : 'POSTER',
      activeFlowStep: (Number.isInteger(base.activeFlowStep) && base.activeFlowStep >= 0 && base.activeFlowStep <= 9)
        ? base.activeFlowStep
        : 0,
      optimizer: healedOpt,
      blockNotes: {},
      customBullets: {},
      counselorQuestions: (typeof base.counselorQuestions === 'string' && base.counselorQuestions.trim().length > 0 && !isLegacyQuestions)
        ? base.counselorQuestions
        : DEFAULT_COUNSELOR_QUESTIONS,
      sessionActionItems: typeof base.sessionActionItems === 'string' ? base.sessionActionItems : '',
      updatedAt: typeof base.updatedAt === 'string' ? base.updatedAt : new Date().toISOString()
    };

    if (base.lens && !validLenses.includes(base.lens)) {
      healEvents.push(`Normalized invalid counselor lens "${String(base.lens)}" -> "ALL".`);
    }
    if (typeof base.counselorQuestions === 'string' && base.counselorQuestions.trim().length === 0) {
      healEvents.push('Self-healed empty Counselor Questions agenda from Moneyball SBDC/APEX checklist.');
    }

    validIds.forEach((id) => {
      const rawNote = base.blockNotes && typeof base.blockNotes === 'object' ? base.blockNotes[id] : undefined;
      const shadowNote = shadowCandidate?.blockNotes?.[id];
      if (typeof rawNote === 'string') {
        healed.blockNotes[id] = rawNote;
      } else if (typeof shadowNote === 'string') {
        healed.blockNotes[id] = shadowNote;
        healEvents.push(`Restored Step [${id.toUpperCase()}] session note from shadow backup.`);
      } else {
        healed.blockNotes[id] = '';
        if (rawNote !== undefined) healEvents.push(`Repaired missing/corrupt note slot for [${id.toUpperCase()}].`);
      }

      const rawCustom = base.customBullets && typeof base.customBullets === 'object' ? base.customBullets[id] : undefined;
      const shadowCustom = shadowCandidate?.customBullets?.[id];
      if (typeof rawCustom === 'string') {
        healed.customBullets[id] = rawCustom;
      } else if (typeof shadowCustom === 'string') {
        healed.customBullets[id] = shadowCustom;
      } else {
        healed.customBullets[id] = '';
      }
    });

    return { state: healed, healEvents };
  }

  function loadSelfHealingState() {
    let rawPrimary = null;
    let rawShadow = null;
    let parseFailedPrimary = false;

    try {
      const pStr = localStorage.getItem(STORAGE_PRIMARY_KEY);
      if (pStr) {
        const parsedP = JSON.parse(pStr);
        const expected = parsedP?.checksum;
        if (parsedP && parsedP.payload) {
          const actual = computeSimpleChecksum(parsedP.payload);
          if (!expected || expected === actual) {
            rawPrimary = parsedP.payload;
          } else {
            parseFailedPrimary = true;
          }
        } else {
          rawPrimary = parsedP;
        }
      }
    } catch (_) {
      parseFailedPrimary = true;
    }

    try {
      const sStr = localStorage.getItem(STORAGE_SHADOW_KEY);
      if (sStr) {
        const parsedS = JSON.parse(sStr);
        rawShadow = parsedS?.payload || parsedS;
      }
    } catch (_) {}

    const result = validateAndHealState(parseFailedPrimary ? null : rawPrimary, rawShadow);
    if (parseFailedPrimary && !result.healEvents.length) {
      result.healEvents.push('Primary storage checksum/JSON failed; self-healed cleanly.');
    }
    persistSelfHealingState(result.state);
    return result;
  }

  function persistSelfHealingState(stateObj) {
    stateObj.updatedAt = new Date().toISOString();
    const envelope = {
      checksum: computeSimpleChecksum(stateObj),
      savedAt: stateObj.updatedAt,
      payload: stateObj
    };
    const serialized = JSON.stringify(envelope);
    try {
      localStorage.setItem(STORAGE_PRIMARY_KEY, serialized);
      localStorage.setItem(STORAGE_SHADOW_KEY, serialized);
    } catch (_) {}
    return envelope.checksum;
  }

  async function computeAdaCountdownSafe() {
    try {
      if (typeof Temporal === 'undefined') {
        try {
          const mod = await import('https://esm.sh/temporal-polyfill');
          globalThis.Temporal = mod.Temporal;
        } catch (_) {}
      }
      if (typeof Temporal !== 'undefined') {
        const tz = 'America/Phoenix';
        const today = Temporal.Now.plainDateISO(tz);
        const deadline = Temporal.PlainDate.from('2027-04-26');
        const diff = today.until(deadline, { largestUnit: 'day' });
        if (diff.sign <= 0) return 'Enforcement Active Now';
        return `${diff.days} days left (Apr 26, 2027 MST)`;
      }
    } catch (_) {}
    const ms = Date.parse('2027-04-26T07:00:00Z') - Date.now();
    const days = Math.ceil(ms / 86400000);
    return days > 0 ? `${days} days left (Apr 26, 2027)` : 'Enforcement Active Now';
  }

  async function fetchLiveTelemetry() {
    const live = {
      synced: false,
      activePortals: 71,
      totalPortals: 108,
      statuteCount: 13,
      adaTargets: 36,
      adaCountdown: await computeAdaCountdownSafe(),
      gatesReady: 12,
      gatesTotal: 12,
      lockedRings: [0, 1, 2],
      pursueCount: 0
    };

    let userActive = new Set();
    try {
      const ua = JSON.parse(localStorage.getItem('webcognita_govcon_active_portals_v1') || 'null');
      if (Array.isArray(ua)) userActive = new Set(ua);
    } catch (_) {}

    try {
      const resp = await fetch('/govcon-radar/govcon-corpus.json', { cache: 'no-cache' });
      if (resp.ok) {
        const data = await resp.json();
        const nodes = Array.isArray(data.nodes) ? data.nodes : [];
        const portals = nodes.filter((n) => Boolean(n.isPortal));
        const statutes = nodes.filter((n) => !n.isPortal);
        live.totalPortals = portals.length || 108;
        live.statuteCount = statutes.length || 13;
        live.activePortals = portals.filter((n) => Boolean(n.portalActive) || userActive.has(n.id)).length;
        live.adaTargets = nodes.filter((n) => Boolean(n.adaApr2027)).length || 36;
        live.gatesTotal = Array.isArray(data.readinessGates) ? data.readinessGates.length : 12;

        const ringStats = {};
        portals.forEach((p) => {
          const r = p.ring;
          if (!ringStats[r]) ringStats[r] = { total: 0, active: 0 };
          ringStats[r].total += 1;
          if (p.portalActive || userActive.has(p.id)) ringStats[r].active += 1;
        });
        live.lockedRings = [0, 1, 2, 3, 4, 5, 9].filter((r) => ringStats[r] && ringStats[r].total > 0 && ringStats[r].active === ringStats[r].total);
        live.synced = true;
      }
    } catch (_) {}

    try {
      const savedGates = JSON.parse(localStorage.getItem('webcognita_govcon_gates_v1') || 'null');
      if (Array.isArray(savedGates) && savedGates.length > 0) {
        live.gatesReady = savedGates.length;
      } else {
        live.gatesReady = live.gatesTotal;
      }
    } catch (_) {}

    try {
      const decs = JSON.parse(localStorage.getItem('webcognita_bi_decisions_v1') || 'null');
      if (decs && typeof decs === 'object') {
        const vals = Object.values(decs);
        live.pursueCount = vals.filter((v) => v && v.decision === 'PURSUE').length;
        live.watchCount = vals.filter((v) => v && v.decision === 'WATCH').length;
        live.dismissCount = vals.filter((v) => v && v.decision === 'DISMISS').length;
      }
    } catch (_) {}

    // Safe M2 Carbon 4 Quant Loopback probe (only when already on loopback or permission === 'granted')
    live.m2QuantConnected = false;
    try {
      let canQueryLoopback = (location.hostname === '127.0.0.1' || location.hostname === 'localhost');
      if (!canQueryLoopback && navigator.permissions?.query) {
        const st = await navigator.permissions.query({ name: 'loopback-network' });
        canQueryLoopback = st.state === 'granted';
      }
      if (canQueryLoopback) {
        const qReq = new Request('http://127.0.0.1:8767/api/quant/moneyball', {
          method: 'GET',
          mode: 'cors',
          targetAddressSpace: 'loopback',
          signal: AbortSignal.timeout(1500)
        });
        const qResp = await fetch(qReq);
        if (qResp.ok) {
          const qData = await qResp.json();
          if (qData && qData.counts) {
            live.pursueCount = Number(qData.counts.PURSUE || 0);
            live.watchCount = Number(qData.counts.WATCH || 0);
            live.dismissCount = Number(qData.counts.DISMISS || 0);
            live.m2QuantConnected = true;
          }
        }
      }
    } catch (_) {}

    return live;
  }

  function runStrategicCoherenceChecks(blocks, live, model, checksum) {
    return [
      {
        id: 'CHK-SCHEMA',
        title: '9-Block Schema v4 & Dual-Slot Shadow Backup',
        ok: blocks.length === 9 && blocks.every((b) => Array.isArray(b.items) && b.items.length >= 3),
        detail: `9/9 Moneyball BCM blocks verified (Nov 26 milestone sync) • Checksum #${checksum} mirrored to LKG shadow storage.`
      },
      {
        id: 'CHK-SABERMETRICS',
        title: 'Carbon 4 DePodesta wOPS (1.73x OBP Weight & -369 BA Trap Guard)',
        ok: model.teamWops >= 0.850 && model.roster.some((r) => r.isTrap && r.allocationRatio === 0),
        detail: `DePodesta wOPS ${formatStat3(model.teamWops)} (1.73*${formatStat3(model.teamObp)} OBP + ${formatStat3(model.teamSlg)} SLG) • Vanity BA cattle-call benched.`
      },
      {
        id: 'CHK-REGRESSION',
        title: 'Samford Dual Regression (RS Offense vs. OOBP/OSLG Defense)',
        ok: model.runDifferential > 0 && model.govconOOBP <= 0.050,
        detail: `RS $${model.totalRunsScored.toLocaleString('en-US')} - RA $${model.totalRunsAllowed.toLocaleString('en-US')} = +$${model.runDifferential.toLocaleString('en-US')}/yr (OOBP ${formatStat3(model.govconOOBP)} • OSLG ${formatStat3(model.govconOSLG)}).`
      },
      {
        id: 'CHK-PLUMBING',
        title: 'Concentric Scouting Radar Coverage (/govcon-radar/)',
        ok: live.activePortals >= 50,
        detail: `${live.activePortals}/${live.totalPortals} portals ACTIVE (${Math.round((live.activePortals / Math.max(1, live.totalPortals)) * 100)}%) • Locked: ${live.lockedRings.map((r) => 'Ring ' + r).join(', ') || 'Syncing'}.`
      },
      {
        id: 'CHK-ADA2027',
        title: 'Market Inefficiency Window (DOJ 28 CFR Part 35 <50K)',
        ok: live.adaTargets >= 25,
        detail: `${live.adaTargets} undervalued AZ municipal/county/airport P-Card targets • ${live.adaCountdown}.`
      },
      {
        id: 'CHK-FAR9104',
        title: 'FAR 9.104-1, DoD PIEE/SPRS & 10x10 SAM.gov Roster Gate',
        ok: live.gatesReady >= live.gatesTotal,
        detail: `${live.gatesReady}/${live.gatesTotal} gates verified (UEI EZ34U9KNJA17 • CAGE 4ZCN6 • PIEE/SPRS Linked • Yuma LSA • ADE BPM007864 Submitted).`
      }
    ];
  }

  function injectStyles() {
    if (document.getElementById('bcm-counselor-styles')) return;
    const style = document.createElement('style');
    style.id = 'bcm-counselor-styles';
    style.textContent = `
      body.bcm-mode-active > .container {
        display: none !important;
      }
      #bcm-counselor-shell {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        background-color: #FAF7F2;
        color: #111827;
        min-block-size: 100dvh;
        padding-block: 1.25rem 3rem;
        padding-inline: clamp(0.85rem, 2.2vw, 1.75rem);
        line-height: 1.5;
        box-sizing: border-box;
      }
      #bcm-counselor-shell *, #bcm-counselor-shell *::before, #bcm-counselor-shell *::after {
        box-sizing: border-box;
      }
      #bcm-counselor-shell :where(a, button, input, textarea, summary):focus-visible {
        outline: 3px solid #7E061E;
        outline-offset: 2px;
      }
      .bcm-wrap {
        max-inline-size: 1480px;
        margin-inline: auto;
      }
      .bcm-topbar {
        background-color: #0B1D3A;
        color: #FFFFFF;
        border: 2px solid #0B1D3A;
        border-radius: 10px;
        padding: 1rem 1.25rem;
        margin-block-end: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: safe center;
        gap: 0.9rem;
      }
      .bcm-kicker {
        display: inline-block;
        background-color: #FFA000;
        color: #000000;
        font-size: 0.76rem;
        font-weight: 900;
        letter-spacing: 0.03em;
        padding: 0.18rem 0.6rem;
        border-radius: 999px;
        text-transform: uppercase;
        margin-block-end: 0.35rem;
      }
      .bcm-topbar h1 {
        margin: 0;
        font-size: clamp(1.22rem, 2.15vw, 1.68rem);
        line-height: 1.2;
        color: #FFFFFF;
        background-color: #0B1D3A;
      }
      .bcm-id-line {
        margin: 0.3rem 0 0 0;
        font-size: 0.83rem;
        color: #FFFFFF;
        background-color: #0B1D3A;
      }
      .bcm-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: safe center;
        gap: 0.5rem;
      }
      .bcm-btn {
        font: inherit;
        font-size: 0.84rem;
        font-weight: 800;
        min-block-size: 44px;
        padding: 0.48rem 0.9rem;
        border-radius: 6px;
        border: 2px solid #FFFFFF;
        background-color: #FFFFFF;
        color: #0B1D3A;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
      }
      .bcm-btn:hover {
        background-color: #FFA000;
        border-color: #FFA000;
        color: #000000;
      }
      .bcm-btn-crimson {
        background-color: #7E061E;
        border-color: #FFFFFF;
        color: #FFFFFF;
      }
      .bcm-btn-crimson:hover {
        background-color: #FFFFFF;
        border-color: #FFFFFF;
        color: #7E061E;
      }
      .bcm-btn-navy {
        background-color: #0B1D3A;
        border-color: #0B1D3A;
        color: #FFFFFF;
      }
      .bcm-btn-navy:hover {
        background-color: #7E061E;
        border-color: #7E061E;
        color: #FFFFFF;
      }
      .bcm-btn-subtle {
        min-block-size: 38px;
        padding: 0.3rem 0.7rem;
        font-size: 0.78rem;
        border: 1.5px solid #0B1D3A;
        background-color: #FFFFFF;
        color: #0B1D3A;
      }
      .bcm-btn-subtle:hover {
        background-color: #0B1D3A;
        color: #FFFFFF;
      }
      /* Invoker Copy Button (copy-button guide) */
      .bcm-copy-wrap {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
      }
      .bcm-copy-btn {
        font: inherit;
        font-size: 0.84rem;
        font-weight: 800;
        min-inline-size: 44px;
        min-block-size: 44px;
        padding: 0.48rem 0.9rem;
        border-radius: 6px;
        border: 2px solid #FFFFFF;
        background-color: #064E3B;
        color: #FFFFFF;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.38rem;
      }
      .bcm-copy-btn:hover {
        background-color: #FFA000;
        border-color: #FFA000;
        color: #000000;
      }
      .bcm-copy-icon::before {
        content: "\\2398";
      }
      .bcm-copy-btn[data-copied] .bcm-copy-icon::before {
        content: "\\2713";
      }
      .bcm-copy-btn[data-failed] .bcm-copy-icon::before {
        content: "!";
      }
      .bcm-copy-tip {
        display: inline-block;
        font-size: 0.78rem;
        font-weight: 800;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        background-color: #FFFFFF;
        color: #0B1D3A;
        opacity: 0;
        transition: opacity 0.15s ease;
      }
      .bcm-copy-btn[data-copied] + .bcm-copy-tip,
      .bcm-copy-btn[data-failed] + .bcm-copy-tip {
        opacity: 1;
      }
      @media (prefers-reduced-motion: reduce) {
        .bcm-copy-tip { transition: none; }
      }

      /* Self-Healing & Telemetry Strip */
      .bcm-health-box {
        background-color: #FFFFFF;
        color: #0B1D3A;
        border: 2px solid #0B1D3A;
        border-inline-start: 7px solid #064E3B;
        border-radius: 8px;
        padding: 0.8rem 1rem;
        margin-block-end: 1rem;
      }
      .bcm-health-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: safe center;
        justify-content: space-between;
      }
      .bcm-pill-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
        align-items: safe center;
      }
      .bcm-status-pill {
        display: inline-block;
        padding: 0.2rem 0.62rem;
        border-radius: 999px;
        font-size: 0.78rem;
        font-weight: 800;
        background-color: #064E3B;
        color: #FFFFFF;
      }
      .bcm-status-pill.is-navy {
        background-color: #0B1D3A;
        color: #FFFFFF;
      }
      .bcm-status-pill.is-crimson {
        background-color: #7E061E;
        color: #FFFFFF;
      }
      .bcm-heal-log {
        margin-block-start: 0.55rem;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        background-color: #F4F7FB;
        color: #0B1D3A;
        border: 1.5px solid #0B1D3A;
        font-size: 0.83rem;
        font-weight: 700;
      }
      details.bcm-coherence-details {
        margin-block-start: 0.55rem;
      }
      details.bcm-coherence-details summary {
        cursor: pointer;
        font-size: 0.84rem;
        font-weight: 800;
        color: #0B1D3A;
        background-color: #FFFFFF;
        padding-block: 0.25rem;
      }
      .bcm-checks-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
        gap: 0.55rem;
        margin-block-start: 0.55rem;
      }
      .bcm-check-card {
        background-color: #F4F7FB;
        color: #0B1D3A;
        border: 1.5px solid #0B1D3A;
        border-radius: 6px;
        padding: 0.55rem 0.75rem;
        font-size: 0.8rem;
      }

      /* Moneyball Sabermetrics, Regression & Constrained Knapsack Lab */
      .bcm-moneyball-panel {
        background-color: #FFFFFF;
        color: #0B1D3A;
        border: 2.5px solid #0B1D3A;
        border-block-start: 6px solid #0B1D3A;
        border-radius: 8px;
        padding: 1rem 1.15rem;
        margin-block-end: 1rem;
        display: grid;
        gap: 0.9rem;
      }
      .bcm-mb-top {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.75rem;
      }
      .bcm-mb-top h2 {
        margin: 0;
        font-size: 1.12rem;
        color: #0B1D3A;
        background-color: #FFFFFF;
      }
      .bcm-quant-memo {
        background-color: #F4F7FB;
        color: #0B1D3A;
        border: 2px solid #0B1D3A;
        border-inline-start: 7px solid #0B1D3A;
        border-radius: 8px;
        padding: 0.75rem 0.95rem;
        font-size: 0.85rem;
      }
      .bcm-science-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
        gap: 0.6rem;
        margin-block-start: 0.55rem;
      }
      .bcm-science-card {
        background-color: #F4F7FB;
        color: #0B1D3A;
        border: 1.5px solid #0B1D3A;
        border-radius: 6px;
        padding: 0.65rem 0.8rem;
        font-size: 0.8rem;
      }
      .bcm-science-card code {
        display: block;
        margin-block: 0.25rem;
        padding: 0.25rem 0.45rem;
        background-color: #FFFFFF;
        color: #7E061E;
        border: 1px solid #CBD5E1;
        border-radius: 4px;
        font-weight: 800;
        font-size: 0.77rem;
      }
      .bcm-scoreboard {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 205px), 1fr));
        gap: 0.65rem;
      }
      .bcm-stat-tile {
        background-color: #F4F7FB;
        color: #0B1D3A;
        border: 1.5px solid #0B1D3A;
        border-radius: 8px;
        padding: 0.65rem 0.8rem;
      }
      .bcm-stat-tile.is-clinch {
        background-color: #064E3B;
        color: #FFFFFF;
        border-color: #064E3B;
      }
      .bcm-stat-tile.is-chase {
        background-color: #7E061E;
        color: #FFFFFF;
        border-color: #7E061E;
      }
      .bcm-stat-kicker {
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .bcm-stat-big {
        font-size: 1.32rem;
        font-weight: 900;
        line-height: 1.2;
        margin-block: 0.15rem;
      }
      .bcm-stat-sub {
        font-size: 0.76rem;
        font-weight: 700;
      }

      /* Brand-Consistent Native Range Sliders (slider guide: separate WebKit & Firefox blocks + progress() fallback) */
      .bcm-sliders-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
        gap: 0.85rem;
        background-color: #F4F7FB;
        color: #0B1D3A;
        border: 1.5px solid #0B1D3A;
        border-radius: 8px;
        padding: 0.8rem 0.95rem;
      }
      .bcm-slider-field {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        min-inline-size: 0;
      }
      .bcm-slider-label-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 0.5rem;
        font-size: 0.82rem;
        font-weight: 800;
        color: #0B1D3A;
      }
      .bcm-slider-output {
        font-weight: 900;
        color: #FFFFFF;
        background-color: #0B1D3A;
        padding: 0.1rem 0.5rem;
        border-radius: 999px;
        font-size: 0.78rem;
      }
      #bcm-counselor-shell input[type="range"].bcm-range {
        --slider-track-size: 0.55rem;
        --slider-thumb-size: 1.35rem;
        --slider-track-radius: 999px;
        --slider-thumb-radius: 50%;
        --slider-track-color: #64748B;
        --slider-fill-color: #0B1D3A;
        --slider-thumb-color: #7E061E;
        --slider-direction: to right;
        --attr-min: attr(min type(<number>), 0);
        --attr-max: attr(max type(<number>), 100);
        --control-value: attr(value type(<number>), 50);
        --slider-progress: calc(
          progress(var(--control-value), var(--attr-min), var(--attr-max)) * 100%
        );
        appearance: none;
        inline-size: 100%;
        block-size: 2.5rem;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
        cursor: pointer;
      }
      #bcm-counselor-shell input[type="range"].bcm-range:dir(rtl) {
        --slider-direction: to left;
      }
      @supports not (opacity: progress(1, 0, 100)) {
        #bcm-counselor-shell input[type="range"].bcm-range {
          --slider-progress: calc(
            (var(--control-value) - var(--attr-min)) /
            (var(--attr-max) - var(--attr-min)) * 100%
          );
        }
      }
      #bcm-counselor-shell input[type="range"].bcm-range::-webkit-slider-runnable-track {
        block-size: var(--slider-track-size);
        border: 0;
        border-radius: var(--slider-track-radius);
        background: linear-gradient(
          var(--slider-direction),
          var(--slider-fill-color) var(--slider-progress),
          var(--slider-track-color) var(--slider-progress)
        );
      }
      #bcm-counselor-shell input[type="range"].bcm-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        inline-size: var(--slider-thumb-size);
        block-size: var(--slider-thumb-size);
        margin-block-start: calc((var(--slider-track-size) - var(--slider-thumb-size)) / 2);
        border: 2px solid #FFFFFF;
        border-radius: var(--slider-thumb-radius);
        background: var(--slider-thumb-color);
      }
      #bcm-counselor-shell input[type="range"].bcm-range::-moz-range-track {
        block-size: var(--slider-track-size);
        border: 0;
        border-radius: var(--slider-track-radius);
        background: var(--slider-track-color);
      }
      #bcm-counselor-shell input[type="range"].bcm-range::-moz-range-progress {
        block-size: var(--slider-track-size);
        border-radius: var(--slider-track-radius);
        background: var(--slider-fill-color);
      }
      #bcm-counselor-shell input[type="range"].bcm-range::-moz-range-thumb {
        inline-size: var(--slider-thumb-size);
        block-size: var(--slider-thumb-size);
        border: 2px solid #FFFFFF;
        border-radius: var(--slider-thumb-radius);
        background: var(--slider-thumb-color);
      }
      #bcm-counselor-shell input[type="range"].bcm-range:focus-visible {
        outline: 3px solid #7E061E;
        outline-offset: 4px;
      }

      /* Responsive Sticky Scouting Table (responsive-table guide: @container + sticky headers) */
      .bcm-table-wrap {
        overflow: auto;
        max-inline-size: 100%;
        container-type: inline-size;
        border: 2px solid #0B1D3A;
        border-radius: 8px;
      }
      table.bcm-ops-table {
        inline-size: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-size: 0.81rem;
        --col-2: "Moneyball Role & Rail";
        --col-3: "OBP (Win %)";
        --col-4: "SLG ($/Hr)";
        --col-5: "DePodesta wOPS";
        --col-6: "Carbon 4 Call";
        --col-7: "Market Inefficiency Exploited";
      }
      table.bcm-ops-table caption {
        text-align: start;
        font-weight: 900;
        font-size: 0.88rem;
        padding: 0.6rem 0.85rem;
        background-color: #0B1D3A;
        color: #FFFFFF;
      }
      table.bcm-ops-table thead {
        position: sticky;
        inset-block-start: 0;
        z-index: 2;
      }
      table.bcm-ops-table th,
      table.bcm-ops-table td {
        padding: 0.55rem 0.7rem;
        border-block-end: 1px solid #CBD5E1;
        border-inline-end: 1px solid #CBD5E1;
        text-align: start;
        vertical-align: top;
        background-color: #FFFFFF;
        color: #111827;
      }
      table.bcm-ops-table thead th {
        background-color: #E8EEF5;
        color: #0B1D3A;
        font-weight: 900;
      }
      table.bcm-ops-table tbody th {
        position: sticky;
        inset-inline-start: 0;
        z-index: 1;
        background-color: #F4F7FB;
        color: #0B1D3A;
        font-weight: 800;
      }
      table.bcm-ops-table tr.is-trap td,
      table.bcm-ops-table tr.is-trap th {
        background-color: #FFF5F5;
        color: #7E061E;
      }
      .bcm-roster-pill {
        display: inline-block;
        padding: 0.15rem 0.5rem;
        border-radius: 999px;
        font-size: 0.73rem;
        font-weight: 900;
        background-color: #064E3B;
        color: #FFFFFF;
      }
      .bcm-roster-pill.is-benched {
        background-color: #7E061E;
        color: #FFFFFF;
      }
      .bcm-roster-pill.is-bullpen {
        background-color: #0B1D3A;
        color: #FFFFFF;
      }
      @container (width < 720px) {
        table.bcm-ops-table,
        table.bcm-ops-table thead,
        table.bcm-ops-table tbody,
        table.bcm-ops-table tr,
        table.bcm-ops-table th,
        table.bcm-ops-table td {
          display: block;
        }
        table.bcm-ops-table thead {
          display: none;
        }
        table.bcm-ops-table tr {
          border-block-end: 3px solid #0B1D3A;
          margin-block-end: 0.65rem;
        }
        table.bcm-ops-table tbody th {
          position: sticky;
          inset-block-start: 0;
          z-index: 2;
          background-color: #0B1D3A;
          color: #FFFFFF;
        }
        table.bcm-ops-table td:nth-child(2)::before { content: var(--col-2) ": "; font-weight: 800; color: #0B1D3A; }
        table.bcm-ops-table td:nth-child(3)::before { content: var(--col-3) ": "; font-weight: 800; color: #0B1D3A; }
        table.bcm-ops-table td:nth-child(4)::before { content: var(--col-4) ": "; font-weight: 800; color: #0B1D3A; }
        table.bcm-ops-table td:nth-child(5)::before { content: var(--col-5) ": "; font-weight: 800; color: #0B1D3A; }
        table.bcm-ops-table td:nth-child(6)::before { content: var(--col-6) ": "; font-weight: 800; color: #0B1D3A; }
        table.bcm-ops-table td:nth-child(7)::before { content: var(--col-7) ": "; font-weight: 800; color: #0B1D3A; }
      }

      /* Flow Guide + Lens Controls (forms guide: visible radio controls inside fieldset/legend) */
      .bcm-controls-panel {
        background-color: #FFFFFF;
        color: #0B1D3A;
        border: 2px solid #0B1D3A;
        border-radius: 8px;
        padding: 0.95rem 1.1rem;
        margin-block-end: 1rem;
        display: grid;
        gap: 0.85rem;
      }
      .bcm-controls-split {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: space-between;
        align-items: flex-start;
      }
      fieldset.bcm-fieldset {
        border: 1.5px solid #0B1D3A;
        border-radius: 6px;
        padding: 0.55rem 0.75rem 0.65rem;
        margin: 0;
        background-color: #F4F7FB;
        color: #0B1D3A;
        min-inline-size: 0;
      }
      fieldset.bcm-fieldset legend {
        font-size: 0.82rem;
        font-weight: 900;
        padding-inline: 0.4rem;
        color: #0B1D3A;
        background-color: #FFFFFF;
        border: 1px solid #0B1D3A;
        border-radius: 4px;
      }
      .bcm-radio-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
        align-items: safe center;
        margin-block-start: 0.2rem;
      }
      .bcm-radio-option {
        display: inline-flex;
        align-items: center;
        gap: 0.38rem;
        background-color: #FFFFFF;
        color: #0B1D3A;
        border: 1.5px solid #0B1D3A;
        border-radius: 999px;
        padding: 0.35rem 0.75rem;
        min-block-size: 44px;
        font-size: 0.83rem;
        font-weight: 800;
        cursor: pointer;
      }
      .bcm-radio-option:has(input:checked) {
        background-color: #0B1D3A;
        color: #FFFFFF;
      }
      .bcm-radio-option input[type="radio"] {
        inline-size: 1.05rem;
        block-size: 1.05rem;
        margin: 0;
        accent-color: #FFA000;
        cursor: pointer;
      }

      /* 9-Step Flow Map */
      .bcm-flow-strip {
        background-color: #F4F7FB;
        color: #0B1D3A;
        border: 1.5px solid #0B1D3A;
        border-radius: 8px;
        padding: 0.75rem 0.9rem;
      }
      .bcm-flow-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: safe center;
        gap: 0.5rem;
        margin-block-end: 0.55rem;
      }
      .bcm-flow-steps {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        align-items: safe center;
      }
      .bcm-step-btn {
        font: inherit;
        font-size: 0.8rem;
        font-weight: 800;
        min-block-size: 42px;
        padding: 0.32rem 0.68rem;
        border-radius: 6px;
        border: 1.5px solid #0B1D3A;
        background-color: #FFFFFF;
        color: #0B1D3A;
        cursor: pointer;
      }
      .bcm-step-btn[aria-pressed="true"] {
        background-color: #7E061E;
        border-color: #7E061E;
        color: #FFFFFF;
      }
      .bcm-step-arrow {
        font-weight: 900;
        color: #0B1D3A;
        font-size: 0.9rem;
      }
      .bcm-cue-banner {
        margin-block-start: 0.65rem;
        background-color: #FFFFFF;
        color: #111827;
        border: 2px solid #7E061E;
        border-inline-start: 7px solid #7E061E;
        border-radius: 6px;
        padding: 0.75rem 0.95rem;
      }
      .bcm-lens-brief {
        background-color: #FFFFFF;
        color: #0B1D3A;
        border-inline-start: 5px solid #08454A;
        border-block: 1.5px solid #0B1D3A;
        border-inline-end: 1.5px solid #0B1D3A;
        border-radius: 6px;
        padding: 0.65rem 0.9rem;
        font-size: 0.86rem;
      }
      .bcm-lens-brief ul {
        margin: 0.35rem 0 0 1.2rem;
        padding: 0;
      }

      /* Classic 9-Block Osterwalder Business Model Canvas Poster Grid (css-layout grid-template-areas) */
      .bcm-canvas-grid {
        display: grid;
        gap: 0.75rem;
        margin-block-end: 1.25rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 1120px) {
        .bcm-canvas-grid.is-poster {
          grid-template-columns: repeat(10, minmax(0, 1fr));
          grid-template-areas:
            "kp kp ka ka vp vp cr cr cs cs"
            "kp kp kr kr vp vp ch ch cs cs"
            "co co co co co rs rs rs rs rs";
          align-items: stretch;
        }
        .bcm-canvas-grid.is-poster [data-area="kp"] { grid-area: kp; }
        .bcm-canvas-grid.is-poster [data-area="ka"] { grid-area: ka; }
        .bcm-canvas-grid.is-poster [data-area="kr"] { grid-area: kr; }
        .bcm-canvas-grid.is-poster [data-area="vp"] { grid-area: vp; }
        .bcm-canvas-grid.is-poster [data-area="cr"] { grid-area: cr; }
        .bcm-canvas-grid.is-poster [data-area="ch"] { grid-area: ch; }
        .bcm-canvas-grid.is-poster [data-area="cs"] { grid-area: cs; }
        .bcm-canvas-grid.is-poster [data-area="co"] { grid-area: co; }
        .bcm-canvas-grid.is-poster [data-area="rs"] { grid-area: rs; }
      }
      .bcm-canvas-grid.is-flow {
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
      }

      .bcm-card {
        background-color: #FFFFFF;
        color: #111827;
        border: 2px solid #0B1D3A;
        border-radius: 8px;
        padding: 0.85rem 0.95rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.65rem;
        min-inline-size: 0;
      }
      .bcm-card[data-area="vp"] {
        border-width: 2.5px;
        border-color: #7E061E;
      }
      .bcm-card.is-step-active {
        border: 3px solid #7E061E;
        box-shadow: 0 0 0 3px rgba(126, 6, 30, 0.2);
      }
      .bcm-card.is-step-dimmed {
        opacity: 0.72;
      }
      .bcm-card-head {
        border-block-end: 1.5px solid #CBD5E1;
        padding-block-end: 0.45rem;
      }
      .bcm-step-tag {
        display: inline-block;
        font-size: 0.72rem;
        font-weight: 900;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        padding: 0.14rem 0.5rem;
        border-radius: 4px;
        background-color: #0B1D3A;
        color: #FFFFFF;
        margin-block-end: 0.28rem;
      }
      .bcm-card[data-area="vp"] .bcm-step-tag {
        background-color: #7E061E;
        color: #FFFFFF;
      }
      .bcm-card[data-area="rs"] .bcm-step-tag {
        background-color: #064E3B;
        color: #FFFFFF;
      }
      .bcm-card[data-area="co"] .bcm-step-tag {
        background-color: #08454A;
        color: #FFFFFF;
      }
      .bcm-card h2 {
        margin: 0;
        font-size: 1rem;
        line-height: 1.25;
        color: #0B1D3A;
        background-color: #FFFFFF;
      }
      .bcm-plain-sub {
        margin: 0.22rem 0 0 0;
        font-size: 0.78rem;
        font-weight: 700;
        color: #0B1D3A;
        background-color: #F4F7FB;
        padding: 0.25rem 0.45rem;
        border-radius: 4px;
      }
      .bcm-list {
        margin: 0.45rem 0 0 0;
        padding-inline-start: 1.1rem;
        font-size: 0.81rem;
        line-height: 1.42;
        color: #111827;
      }
      .bcm-list li {
        margin-block-end: 0.35rem;
      }
      .bcm-cue-inline {
        font-size: 0.78rem;
        background-color: #F4F7FB;
        color: #0B1D3A;
        border-inline-start: 3.5px solid #7E061E;
        padding: 0.38rem 0.55rem;
        border-radius: 4px;
      }
      .bcm-note-group {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding-block-start: 0.35rem;
        border-block-start: 1px dashed #94A3B8;
      }
      .bcm-note-label {
        font-size: 0.77rem;
        font-weight: 800;
        color: #0B1D3A;
        background-color: #FFFFFF;
      }
      .bcm-textarea {
        font: inherit;
        font-size: max(1rem, 0.92rem);
        line-height: 1.4;
        inline-size: 100%;
        min-block-size: 56px;
        padding: 0.45rem 0.6rem;
        border: 1.5px solid #0B1D3A;
        border-radius: 6px;
        background-color: #F4F7FB;
        color: #111827;
        resize: vertical;
      }
      .bcm-textarea:focus {
        background-color: #FFFFFF;
      }

      /* Bottom Session Prep & Action Scratchpad */
      .bcm-session-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
        gap: 0.9rem;
        margin-block-end: 1rem;
      }
      .bcm-session-card {
        background-color: #FFFFFF;
        color: #0B1D3A;
        border: 2px solid #0B1D3A;
        border-radius: 8px;
        padding: 0.95rem 1.1rem;
      }
      .bcm-session-card h2 {
        margin: 0 0 0.35rem 0;
        font-size: 1.05rem;
        color: #0B1D3A;
        background-color: #FFFFFF;
      }
      .bcm-sr-only {
        position: absolute;
        clip-path: inset(50%);
        overflow: hidden;
        inline-size: 1px;
        block-size: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
        white-space: nowrap;
      }
      .bcm-footer {
        font-size: 0.82rem;
        color: #0B1D3A;
        background-color: #FFFFFF;
        border: 1.5px solid #0B1D3A;
        border-radius: 8px;
        padding: 0.75rem 1rem;
      }

      @media print {
        @page {
          size: letter landscape;
          margin: 0.25in;
        }
        body.bcm-mode-active > .container {
          display: none !important;
        }
        #bcm-counselor-shell {
          padding: 0 !important;
          background-color: #FFFFFF !important;
          font-size: 7.4pt !important;
        }
        .bcm-actions,
        .bcm-controls-panel,
        .bcm-sliders-grid,
        details.bcm-coherence-details,
        details.bcm-scouting-details,
        .bcm-no-print {
          display: none !important;
        }
        .bcm-topbar {
          padding: 0.35rem 0.6rem !important;
          margin-block-end: 0.3rem !important;
        }
        .bcm-health-box,
        .bcm-moneyball-panel {
          padding: 0.35rem 0.55rem !important;
          margin-block-end: 0.35rem !important;
        }
        .bcm-canvas-grid {
          grid-template-columns: repeat(10, minmax(0, 1fr)) !important;
          grid-template-areas:
            "kp kp ka ka vp vp cr cr cs cs"
            "kp kp kr kr vp vp ch ch cs cs"
            "co co co co co rs rs rs rs rs" !important;
          gap: 0.28rem !important;
          margin-block-end: 0.3rem !important;
        }
        .bcm-canvas-grid [data-area="kp"] { grid-area: kp !important; }
        .bcm-canvas-grid [data-area="ka"] { grid-area: ka !important; }
        .bcm-canvas-grid [data-area="kr"] { grid-area: kr !important; }
        .bcm-canvas-grid [data-area="vp"] { grid-area: vp !important; }
        .bcm-canvas-grid [data-area="cr"] { grid-area: cr !important; }
        .bcm-canvas-grid [data-area="ch"] { grid-area: ch !important; }
        .bcm-canvas-grid [data-area="cs"] { grid-area: cs !important; }
        .bcm-canvas-grid [data-area="co"] { grid-area: co !important; }
        .bcm-canvas-grid [data-area="rs"] { grid-area: rs !important; }
        .bcm-card {
          padding: 0.32rem 0.42rem !important;
          gap: 0.2rem !important;
          opacity: 1 !important;
          break-inside: avoid;
        }
        .bcm-card h2 { font-size: 8.2pt !important; }
        .bcm-plain-sub, .bcm-cue-inline { display: none !important; }
        .bcm-list { font-size: 6.7pt !important; line-height: 1.18 !important; }
        .bcm-list li { margin-block-end: 0.12rem !important; }
        .bcm-note-group:has(textarea:placeholder-shown) {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildMarkdownExport(blocks, state, live, model, checks) {
    const lensInfo = LENS_META[state.lens] || LENS_META.ALL;
    const lines = [
      '# Webcognita LLC — Moneyball Sabermetric Business Model Canvas (1-on-1 Counseling Brief)',
      '- **Entity:** WEBCOGNITA LLC (100% VOSB • Yuma City LSA FAR 52.219-2 • FEMA AZ/CA • SAM.gov UEI: EZ34U9KNJA17 • CAGE: 4ZCN6 • DoD PIEE/SPRS Active • AZ APP: #IV0000112720 • Mesa VSS: #VS0000020834 • ADOT SBC: #23545)',
      `- **Front-Office Roles:** Alan Pruitt = General Manager (Billy Beane) • Carbon 4 = Sovereign Quant (Paul DePodesta / Peter Brand)`,
      `- **Empirical Framework:** Samford University "The Moneyball Science" (Fatima Sajid, 2019 — ${SAMFORD_MONEYBALL_URL})`,
      `- **Counseling Lens:** ${lensInfo.label} — ${lensInfo.counselorTitle}`,
      `- **Carbon 4 Offensive Line:** DePodesta wOPS ${formatStat3(model.teamWops)} (1.73*OBP ${formatStat3(model.teamObp)} + SLG ${formatStat3(model.teamSlg)} • Raw OPS ${formatStat3(model.teamOps)})`,
      `- **Carbon 4 Defensive Line:** GovCon OOBP ${formatStat3(model.govconOOBP)} (Disqualification Risk) • GovCon OSLG ${formatStat3(model.govconOSLG)} (Overhead Burn)`,
      `- **Regression & Knapsack Forecast (${model.usedHrsWk}/${model.hrsCap} hrs/wk • $${model.cashCap}/mo BD cap):** ${model.totalExpectedWins} Expected Annual Wins (PPQs) • $${model.totalRunsScored.toLocaleString('en-US')} Runs Scored vs. $${model.totalRunsAllowed.toLocaleString('en-US')} Runs Allowed -> Net Run Diff +$${model.runDifferential.toLocaleString('en-US')}/yr (${model.clinchedPlayoffs ? 'STAGE 3 CLINCHED' : 'BUILDING TO STAGE 3'})`,
      `- **Live GovCon Scouting Radar:** ${live.activePortals}/${live.totalPortals} Portals Active (${Math.round((live.activePortals / Math.max(1, live.totalPortals)) * 100)}%) • ${live.adaTargets} <50K ADA Targets (${live.adaCountdown}) • ${live.gatesReady}/${live.gatesTotal} FAR 9.104-1 Gates`,
      `- **Self-Healing Diagnostics:** ${checks.filter((c) => c.ok).length}/${checks.length} Passed`,
      '',
      '## Sabermetric Market-Inefficiency Scouting Lineup (Ranked by $/BD-Hour & OPS)',
      ...model.roster.map((r) => `- **${r.name}** [${r.rosterStatus}]: OBP ${formatStat3(r.obp)} • SLG ${formatStat3(r.slg)} • OPS **${formatStat3(r.ops)}** ($${Math.round(r.netPerBdHour).toLocaleString('en-US')}/BD-hr) — _${r.whyInefficient}_`),
      '',
      '## 9-Step Business Model Flow (Market Inefficiency -> Unfair Advantage -> Runs Scored -> $0-Burn Floor)',
      ''
    ];
    blocks.forEach((b) => {
      lines.push(`### Step ${b.step}: ${b.shortTitle} (${b.zone})`);
      lines.push(`_${b.plainMeaning}_`);
      b.items.forEach((it) => lines.push(`- ${it}`));
      const note = (state.blockNotes[b.id] || '').trim();
      if (note) lines.push(`- **Session Note:** ${note}`);
      lines.push('');
    });
    if ((state.counselorQuestions || '').trim()) {
      lines.push('## Questions for 1-on-1 Counselor (SBDC / APEX Accelerator)', state.counselorQuestions.trim(), '');
    }
    if ((state.sessionActionItems || '').trim()) {
      lines.push('## Agreed Next Actions & Takeaways', state.sessionActionItems.trim(), '');
    }
    return lines.join('\n');
  }

  // Invoker Copy Button support (copy-button guide)
  const copyTimers = new WeakMap();
  let lastCopyAnnouncement = '';

  function legacyCopyFallback(text) {
    const field = Object.assign(document.createElement('textarea'), { value: text });
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;inset-block-start:0;opacity:0';
    document.body.append(field);
    field.select();
    try { return document.execCommand('copy'); } finally { field.remove(); }
  }

  function reportCopyStatus(button, ok) {
    const tip = button.nextElementSibling;
    clearTimeout(copyTimers.get(button));
    button.removeAttribute('data-copied');
    button.removeAttribute('data-failed');
    let msg = ok ? 'Copied' : 'Copy failed';
    if (msg === lastCopyAnnouncement) msg += '\u00A0';
    lastCopyAnnouncement = msg;
    if (tip) tip.textContent = '';
    void button.offsetWidth;
    button.setAttribute(ok ? 'data-copied' : 'data-failed', '');
    if (tip) requestAnimationFrame(() => { tip.textContent = msg; });
    copyTimers.set(button, setTimeout(() => {
      button.removeAttribute('data-copied');
      button.removeAttribute('data-failed');
      if (tip) tip.textContent = '';
    }, 2000));
  }

  async function runBcmCopy(button, target) {
    const text = target.matches('input, textarea') ? target.value : target.textContent.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      reportCopyStatus(button, true);
    } catch (_) {
      if (legacyCopyFallback(text)) reportCopyStatus(button, true);
      else reportCopyStatus(button, false);
    }
  }

  let copyListenersBound = false;
  function bindInvokerCopyOnce() {
    if (copyListenersBound) return;
    copyListenersBound = true;
    if ('CommandEvent' in window) {
      document.addEventListener('command', (event) => {
        if (event.command === '--copy' && event.target && event.target.id === 'bcm-markdown-export') {
          runBcmCopy(event.source, event.target);
        }
      }, true);
    } else {
      document.addEventListener('click', (event) => {
        const button = event.target.closest('button[command="--copy"][commandfor="bcm-markdown-export"]');
        if (!button) return;
        const target = document.getElementById('bcm-markdown-export');
        if (target) runBcmCopy(button, target);
      });
    }
  }

  function syncRangeCustomProps(slider) {
    slider.style.setProperty('--attr-min', slider.min || 0);
    slider.style.setProperty('--attr-max', slider.max || 100);
    slider.style.setProperty('--control-value', slider.value);
  }

  let mountedRoot = null;
  let originalTitle = '';
  let robotsMetaEl = null;
  let prevRobotsContent = null;

  async function mountBcmWorkbench() {
    injectStyles();
    bindInvokerCopyOnce();

    if (!originalTitle) originalTitle = document.title;
    document.title = 'Moneyball Business Model Canvas (#bcm/) | Webcognita LLC Counseling Workbench';
    document.body.classList.add('bcm-mode-active');

    robotsMetaEl = document.querySelector('meta[name="robots"]');
    if (!robotsMetaEl) {
      robotsMetaEl = document.createElement('meta');
      robotsMetaEl.name = 'robots';
      document.head.appendChild(robotsMetaEl);
      prevRobotsContent = null;
    } else if (prevRobotsContent === null) {
      prevRobotsContent = robotsMetaEl.getAttribute('content');
    }
    robotsMetaEl.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');

    if (!mountedRoot) {
      mountedRoot = document.createElement('div');
      mountedRoot.id = 'bcm-counselor-shell';
      mountedRoot.setAttribute('role', 'region');
      mountedRoot.setAttribute('aria-label', 'Webcognita LLC Moneyball Business Model Canvas Workbench');
      document.body.prepend(mountedRoot);
    }
    mountedRoot.hidden = false;

    let { state, healEvents } = loadSelfHealingState();
    const hashQueryIdx = (window.location.hash || '').indexOf('?');
    if (hashQueryIdx !== -1) {
      const hp = new URLSearchParams(window.location.hash.slice(hashQueryIdx + 1));
      const qLens = (hp.get('lens') || '').toUpperCase();
      if (['ALL', 'SBDC', 'APEX', 'GRANTS'].includes(qLens)) state.lens = qLens;
      const qStep = Number(hp.get('step'));
      if (Number.isInteger(qStep) && qStep >= 1 && qStep <= 9) state.activeFlowStep = qStep;
      const qView = (hp.get('view') || '').toUpperCase();
      if (['POSTER', 'FLOW'].includes(qView)) state.viewMode = qView;
    }
    let live = await fetchLiveTelemetry();

    const POSTER_AREA_ORDER = ['kp', 'ka', 'kr', 'vp', 'cr', 'ch', 'cs', 'co', 'rs'];

    function render() {
      const model = solveMoneyballModel(live, state.optimizer);
      const blocks = buildCanonicalBlocks(live, model);
      const checksum = persistSelfHealingState(state);
      const checks = runStrategicCoherenceChecks(blocks, live, model, checksum);
      const passedCount = checks.filter((c) => c.ok).length;
      const lensInfo = LENS_META[state.lens] || LENS_META.ALL;
      const activeBlock = state.activeFlowStep > 0
        ? blocks.find((b) => b.step === state.activeFlowStep)
        : null;
      const mdText = buildMarkdownExport(blocks, state, live, model, checks);

      const usePosterDomOrder = state.viewMode === 'POSTER' && window.matchMedia('(min-width: 1120px)').matches;
      const orderedBlocks = usePosterDomOrder
        ? POSTER_AREA_ORDER.map((areaKey) => blocks.find((b) => b.area === areaKey)).filter(Boolean)
        : [...blocks].sort((a, b) => a.step - b.step);

      mountedRoot.innerHTML = `
        <div class="bcm-wrap">
          <header class="bcm-topbar">
            <div>
              <span class="bcm-kicker">GM: Alan Pruitt (Billy Beane) &bull; Sovereign Quant: Carbon 4 (Paul DePodesta / Peter Brand) &bull; /#bcm/ v4</span>
              <h1>Webcognita LLC &mdash; Moneyball Business Model Canvas &amp; Carbon 4 Quant Workbench</h1>
              <p class="bcm-id-line">
                <strong>100% VOSB &bull; Yuma LSA</strong> &bull; <code>UEI: EZ34U9KNJA17</code> (10 NAICS &times; 10 PSCs) &bull; <code>CAGE: 4ZCN6</code> &bull; <code>DoD PIEE/SPRS</code> &bull; <code>AZ APP: #IV0000112720</code> (ADE BPM007864 Submitted) &bull; <code>Mesa: #VS0000020834</code> &bull; <code>ADOT SBC: #23545</code>
              </p>
            </div>
            <div class="bcm-actions">
              <span class="bcm-copy-wrap">
                <button type="button" class="bcm-copy-btn" command="--copy" commandfor="bcm-markdown-export">
                  <span class="bcm-copy-icon" aria-hidden="true"></span>
                  <span>Copy Moneyball Brief (.md)</span>
                </button>
                <span class="bcm-copy-tip" role="status"></span>
              </span>
              <button type="button" class="bcm-btn" id="bcm-btn-print">Print 1-Page Canvas</button>
              <button type="button" class="bcm-btn" id="bcm-btn-selfheal">Run Self-Heal &amp; Sync</button>
              <button type="button" class="bcm-btn" id="bcm-btn-export-json">Export JSON</button>
              <button type="button" class="bcm-btn bcm-btn-crimson" id="bcm-btn-exit">Exit #bcm/</button>
            </div>
          </header>

          <section class="bcm-health-box" aria-label="Self-Healing and Live Scouting Telemetry">
            <div class="bcm-health-row">
              <div class="bcm-pill-row" role="status" aria-live="polite">
                <span class="bcm-status-pill">Self-Healing v4: ${passedCount}/${checks.length} Healthy (#${escapeHtml(checksum)})</span>
                <span class="bcm-status-pill is-navy">Carbon 4 Quant: ${live.m2QuantConnected ? `M2 Live (${live.pursueCount || 0} Swings • ${live.dismissCount || 0} Pitches Taken)` : 'Browser Local Engine Active'}</span>
                <span class="bcm-status-pill is-navy">Scouting Radar: ${live.activePortals}/${live.totalPortals} Portals (${Math.round((live.activePortals / Math.max(1, live.totalPortals)) * 100)}%)</span>
                <span class="bcm-status-pill is-crimson">ADA &lt;50K Window: ${escapeHtml(live.adaCountdown)}</span>
              </div>
              <div class="bcm-no-print" style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                <a class="bcm-btn bcm-btn-subtle" href="/govcon-radar/">Open /govcon-radar/ &rarr;</a>
                <a class="bcm-btn bcm-btn-subtle" href="/cac-readiness/?buyer=sled&amp;tier=ada_pcard&amp;lms=pwa&amp;pillars=ada,bilingual,provo">Open P-Card SOW Builder &rarr;</a>
                <a class="bcm-btn bcm-btn-subtle" href="/capabilities-statement.html">1-Page Cap Statement &rarr;</a>
              </div>
            </div>
            ${healEvents.length ? `<div class="bcm-heal-log" role="status">Self-Heal Event Log: ${escapeHtml(healEvents.join(' • '))}</div>` : ''}
            <details class="bcm-coherence-details">
              <summary>Inspect 6 Automated Self-Healing, Sabermetric &amp; Regression Coherence Checks</summary>
              <div class="bcm-checks-grid">
                ${checks.map((c) => `
                  <div class="bcm-check-card">
                    <strong>[${c.ok ? 'PASS' : 'HEAL'}] ${escapeHtml(c.title)}</strong>
                    <div style="margin-top: 0.2rem;">${escapeHtml(c.detail)}</div>
                  </div>
                `).join('')}
              </div>
            </details>
          </section>

          <section class="bcm-moneyball-panel" aria-labelledby="bcm-mb-heading">
            <div class="bcm-mb-top">
              <div>
                <h2 id="bcm-mb-heading">Carbon 4 (&ldquo;Paul DePodesta / Peter Brand&rdquo;) Quant Engine &mdash; Grounded in <em>The Moneyball Science</em> (Samford Univ., 2019)</h2>
                <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: #111827;">
                  <strong>Front-Office Split:</strong> Alan Pruitt acts as <strong>General Manager (Billy Beane)</strong> setting mission &amp; counselor strategy; <strong>Carbon 4</strong> acts as your local <strong>Sovereign Quant (Paul DePodesta)</strong> applying linear regression and knapsack discipline across a world of pre-set statutory rules (<code>FAR 2.101</code>, <code>A.R.S. &sect; 41-2535</code>, <code>38 U.S.C. &sect; 8127</code>, <code>28 CFR Part 35</code>).
                </p>
              </div>
            </div>

            <div class="bcm-quant-memo" id="bcm-quant-memo" aria-live="polite">
              ${renderQuantMemo(model, live)}
            </div>

            <div class="bcm-scoreboard" id="bcm-scoreboard" aria-live="polite">
              ${renderScoreboardCards(model)}
            </div>

            <details class="bcm-science-details bcm-no-print">
              <summary style="cursor: pointer; font-size: 0.86rem; font-weight: 900; color: #0B1D3A;">Inspect Samford University &ldquo;The Moneyball Science&rdquo; (Fatima Sajid, 2019) &harr; Carbon 4 GovCon Regression Equations</summary>
              <div class="bcm-science-grid">
                <div class="bcm-science-card">
                  <strong>1. Playoff Threshold Regression (95 Wins &harr; Stage 3 Clinch)</strong>
                  <code>Wins = 80.8814 + 0.1058 * RunDifference (RD &gt;= 135)</code>
                  <div>DePodesta worked backward from 95 wins (+135 net runs). Carbon 4 works backward from Stage 3 vehicle eligibility: <strong>&gt;= 4 signed Exhibit R-04 PPQs + &gt;= +$100,000/yr Net Run Difference</strong> unlocks 1GPA/Mohave co-ops &amp; GSA Startup Springboard.</div>
                </div>
                <div class="bcm-science-card">
                  <strong>2. Why Vanity &ldquo;Batting Average&rdquo; Is Negative (-369 Penalty)</strong>
                  <code>RS = -788.5 + 2917.4*OBP + 1637.9*SLG - 369*BA</code>
                  <div>Controlling for OBP and SLG, flashy BA had a <strong>negative (-369)</strong> slope. In GovCon, chasing high-volume blind $500K+ RFPs (65+ unpaid hrs at 2% win odds) actively subtracts from net revenue—so Carbon 4 benches them.</div>
                </div>
                <div class="bcm-science-card">
                  <strong>3. Offensive 1.73x OBP Weighting (Walks Beat Swings)</strong>
                  <code>RS = -804.6 + 2737.8*OBP + 1584.9*SLG (2002 A&#39;s: 805 RS)</code>
                  <div>OBP (<code>2737.8</code>) carries <strong>1.7274x</strong> the run-scoring power of SLG (<code>1584.9</code>). Carbon 4 ranks lanes by <code>DePodesta wOPS = 1.73*OBP + SLG</code>, elevating zero-quote P-Cards, GPCs &amp; SB eQuotes.</div>
                </div>
                <div class="bcm-science-card">
                  <strong>4. Defensive OOBP &amp; OSLG Suppression + Sample Discipline</strong>
                  <code>RA = -837.4 + 2913.6*OOBP + 1514.3*OSLG (2002 A&#39;s: 622 RA)</code>
                  <div>Carbon 4 crushes <strong>OOBP</strong> (disqualification risk: 12/12 FAR 9.104-1 + 0-byte cloud egress) and <strong>OSLG</strong> ($0 cloud/SaaS burn). Per <a href="https://www.samford.edu/sports-analytics/fans/2019/The-Moneyball-Science" target="_blank" rel="noopener noreferrer" style="color:#0B1D3A;font-weight:800;">Samford Sports Analytics</a>, bank cash on high-sample regular-season singles before small-sample Stage 3 &ldquo;playoff&rdquo; RFPs.</div>
                </div>
              </div>
            </details>

            <form id="bcm-knapsack-form" action="#bcm/" method="GET" class="bcm-sliders-grid" aria-label="Constrained Optimization Sliders">
              <div class="bcm-slider-field">
                <div class="bcm-slider-label-row">
                  <label for="bcm-sl-hours">Weekly Capture Time Cap (Knapsack Limit):</label>
                  <output id="bcm-out-hours" for="bcm-sl-hours" class="bcm-slider-output">${state.optimizer.weeklyHoursCap} hrs/wk</output>
                </div>
                <input type="range" class="bcm-range" id="bcm-sl-hours" name="weekly_hours_cap" min="3" max="16" step="1" value="${state.optimizer.weeklyHoursCap}" aria-valuetext="${state.optimizer.weeklyHoursCap} hours per week">
                <span style="font-size: 0.75rem; font-weight: 700;">Includes 0.6 hr/wk automated 7:30 AM MST BI triage; allocates remaining hours by highest OPS.</span>
              </div>

              <div class="bcm-slider-field">
                <div class="bcm-slider-label-row">
                  <label for="bcm-sl-pitches">Outbound &lt;50K P-Card SOW Pitches / Week (OBP Engine):</label>
                  <output id="bcm-out-pitches" for="bcm-sl-pitches" class="bcm-slider-output">${state.optimizer.sowPitchesPerWeek} SOWs/wk</output>
                </div>
                <input type="range" class="bcm-range" id="bcm-sl-pitches" name="sow_pitches_wk" min="1" max="8" step="1" value="${state.optimizer.sowPitchesPerWeek}" aria-valuetext="${state.optimizer.sowPitchesPerWeek} tailored SOW pitches per week">
                <span style="font-size: 0.75rem; font-weight: 700;">Generated in 1 click via /govcon-radar/ &rarr; /cac-readiness/ for rural AZ ADA Title II targets.</span>
              </div>

              <div class="bcm-slider-field">
                <div class="bcm-slider-label-row">
                  <label for="bcm-sl-cash">Monthly Cash BD Payroll Cap (Oakland A&#39;s Budget):</label>
                  <output id="bcm-out-cash" for="bcm-sl-cash" class="bcm-slider-output">$${state.optimizer.monthlyCashCap}/mo</output>
                </div>
                <input type="range" class="bcm-range" id="bcm-sl-cash" name="monthly_cash_cap" min="0" max="500" step="50" value="${state.optimizer.monthlyCashCap}" aria-valuetext="$${state.optimizer.monthlyCashCap} per month out-of-pocket BD cap">
                <span style="font-size: 0.75rem; font-weight: 700;">$0/mo proves all 5 starting GovCon lanes operate on $0 portal tiers &amp; $0 cloud burn.</span>
              </div>
            </form>

            <details class="bcm-scouting-details" open>
              <summary style="cursor: pointer; font-size: 0.88rem; font-weight: 900; color: #0B1D3A;">Sabermetric Market-Inefficiency Scouting Leaderboard (OBP + SLG = GovCon OPS)</summary>
              <div tabindex="0" role="region" aria-labelledby="bcm-ops-table-caption" class="bcm-table-wrap" style="margin-top: 0.55rem;">
                <table class="bcm-ops-table">
                  <caption id="bcm-ops-table-caption">Empirical Lane Comparison: Undervalued Webcognita Base-Hit Lanes vs. Overpriced Open-RFP Traps</caption>
                  <thead>
                    <tr>
                      <th scope="col">Capture Lane</th>
                      <th scope="col">Moneyball Role &amp; Buying Rail</th>
                      <th scope="col">OBP (Win %)</th>
                      <th scope="col">SLG ($/BD-Hr)</th>
                      <th scope="col">DePodesta wOPS</th>
                      <th scope="col">Carbon 4 Call</th>
                      <th scope="col">Market Inefficiency Exploited</th>
                    </tr>
                  </thead>
                  <tbody id="bcm-ops-tbody">
                    ${renderScoutingRows(model)}
                  </tbody>
                </table>
              </div>
            </details>
          </section>

          <section class="bcm-controls-panel" aria-labelledby="bcm-controls-heading">
            <h2 id="bcm-controls-heading" class="bcm-sr-only">Counseling Session Controls and 9-Step Business Model Flow</h2>
            <form id="bcm-controls-form" action="#bcm/" method="GET" class="bcm-controls-split">
              <fieldset class="bcm-fieldset">
                <legend>1-on-1 Counseling Session Lens (Tailors Talking Points):</legend>
                <div class="bcm-radio-row">
                  ${Object.entries(LENS_META).map(([key, meta]) => `
                    <label class="bcm-radio-option" for="bcm-lens-${key}">
                      <input type="radio" id="bcm-lens-${key}" name="bcm_lens" value="${key}" ${state.lens === key ? 'checked' : ''}>
                      <span>${escapeHtml(meta.label)}</span>
                    </label>
                  `).join('')}
                </div>
              </fieldset>

              <fieldset class="bcm-fieldset">
                <legend>Canvas Layout Mode:</legend>
                <div class="bcm-radio-row">
                  <label class="bcm-radio-option" for="bcm-view-poster">
                    <input type="radio" id="bcm-view-poster" name="bcm_view" value="POSTER" ${state.viewMode === 'POSTER' ? 'checked' : ''}>
                    <span>Classic 9-Block Poster</span>
                  </label>
                  <label class="bcm-radio-option" for="bcm-view-flow">
                    <input type="radio" id="bcm-view-flow" name="bcm_view" value="FLOW" ${state.viewMode === 'FLOW' ? 'checked' : ''}>
                    <span>1 &rarr; 9 Story Flow Cards</span>
                  </label>
                </div>
              </fieldset>
            </form>

            <div class="bcm-lens-brief">
              <strong>Active Front-Office Focus &mdash; ${escapeHtml(lensInfo.counselorTitle)}:</strong>
              <ul>
                ${lensInfo.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
              </ul>
            </div>

            <div class="bcm-flow-strip" role="region" aria-label="9-Step Osterwalder Business Model Flow">
              <div class="bcm-flow-header">
                <div>
                  <strong>How the Moneyball BCM Flows (Click Any Step 1 &rarr; 9):</strong>
                  <span style="font-size: 0.82rem;"> Right Half (Steps 1&ndash;5: Undervalued Buyers, Unfair Advantage, Base-Path Channels &amp; Runs Scored) &rarr; Left Half (Steps 6&ndash;9: $0-CAPEX Roster, Knapsack Weekly Lineup, $0 Scouting Bench &amp; Runs-Allowed Floor).</span>
                </div>
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                  <button type="button" class="bcm-btn bcm-btn-subtle" id="bcm-flow-prev">&larr; Prev Step</button>
                  <button type="button" class="bcm-btn bcm-btn-navy" style="min-block-size: 38px; padding: 0.3rem 0.8rem; font-size: 0.8rem;" id="bcm-flow-next">${state.activeFlowStep === 0 ? 'Start Step 1 -> 9 Tour' : 'Next Step ->'}</button>
                  ${state.activeFlowStep > 0 ? '<button type="button" class="bcm-btn bcm-btn-subtle" id="bcm-flow-clear">Show All 9 Equal</button>' : ''}
                </div>
              </div>
              <div class="bcm-flow-steps" role="group" aria-label="Select BCM Flow Step">
                ${blocks.map((b, idx) => `
                  <button type="button" class="bcm-step-btn" data-step="${b.step}" aria-pressed="${state.activeFlowStep === b.step ? 'true' : 'false'}">${b.step}. ${escapeHtml(b.shortTitle.split(' (')[0].split(' & ')[0])}</button>${idx < blocks.length - 1 ? '<span class="bcm-step-arrow" aria-hidden="true">&rarr;</span>' : ''}
                `).join('')}
              </div>
              ${activeBlock ? `
                <div class="bcm-cue-banner" aria-live="polite">
                  <div style="font-size: 0.78rem; font-weight: 900; color: #7E061E; text-transform: uppercase;">
                    Step ${activeBlock.step} of 9 &bull; ${escapeHtml(activeBlock.zone)}
                  </div>
                  <div style="font-size: 1rem; font-weight: 900; color: #0B1D3A; margin-top: 0.15rem;">
                    ${escapeHtml(activeBlock.shortTitle)} &mdash; <span style="font-weight: 700;">${escapeHtml(activeBlock.plainMeaning)}</span>
                  </div>
                  <div style="font-size: 0.88rem; margin-top: 0.35rem;">
                    <strong>20-Second Counselor Prompt (${escapeHtml(lensInfo.label)}):</strong> ${escapeHtml(activeBlock.counselorCue[state.lens] || activeBlock.counselorCue.ALL)}
                  </div>
                </div>
              ` : ''}
            </div>
          </section>

          <main class="bcm-canvas-grid ${state.viewMode === 'POSTER' ? 'is-poster' : 'is-flow'}" id="bcm-main-grid" aria-label="9-Block Moneyball Business Model Canvas">
            ${orderedBlocks.map((b) => {
              const isHighlighted = state.activeFlowStep === b.step;
              const isDimmed = state.activeFlowStep > 0 && state.activeFlowStep !== b.step;
              const noteVal = state.blockNotes[b.id] || '';
              return `
                <article class="bcm-card${isHighlighted ? ' is-step-active' : ''}${isDimmed ? ' is-step-dimmed' : ''}" data-area="${b.area}" data-step-card="${b.step}">
                  <div>
                    <div class="bcm-card-head">
                      <span class="bcm-step-tag">Step ${b.step} &bull; ${escapeHtml(b.zone.split(':')[0])}</span>
                      <h2>${escapeHtml(b.shortTitle)}</h2>
                      <p class="bcm-plain-sub">${escapeHtml(b.plainMeaning)}</p>
                    </div>
                    <ul class="bcm-list">
                      ${b.items.map((it) => `<li>${escapeHtml(it)}</li>`).join('')}
                    </ul>
                  </div>
                  <div>
                    <div class="bcm-cue-inline">
                      <strong>${escapeHtml(lensInfo.label)} Cue:</strong> ${escapeHtml(b.counselorCue[state.lens] || b.counselorCue.ALL)}
                    </div>
                    <div class="bcm-note-group" style="margin-top: 0.45rem;">
                      <label class="bcm-note-label" for="bcm-note-${b.id}">Step ${b.step} Counseling Note (Auto-Saved Locally):</label>
                      <textarea class="bcm-textarea" id="bcm-note-${b.id}" name="note_${b.id}" rows="2" data-note-id="${b.id}" placeholder="Jot counselor feedback for ${escapeHtml(b.shortTitle)}...">${escapeHtml(noteVal)}</textarea>
                    </div>
                  </div>
                </article>
              `;
            }).join('')}
          </main>

          <section class="bcm-session-grid" aria-label="1-on-1 Session Agenda and Action Items">
            <div class="bcm-session-card">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <h2>Sabermetric Questions for SBDC &amp; APEX Counselors</h2>
                <button type="button" class="bcm-btn bcm-btn-subtle bcm-no-print" id="bcm-reset-questions">Restore Default Questions</button>
              </div>
              <label class="bcm-note-label" for="bcm-questions-box" style="display: block; margin: 0.35rem 0 0.25rem;">Edit Questions Prior to Your 1-on-1 Session (Self-Heals if Cleared):</label>
              <textarea class="bcm-textarea" id="bcm-questions-box" name="counselor_questions" rows="6">${escapeHtml(state.counselorQuestions)}</textarea>
            </div>

            <div class="bcm-session-card">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <h2>1-on-1 Session Takeaways &amp; Committed Next Actions</h2>
                <button type="button" class="bcm-btn bcm-btn-subtle bcm-no-print" id="bcm-reset-all">Reset All to Baseline</button>
              </div>
              <label class="bcm-note-label" for="bcm-actions-box" style="display: block; margin: 0.35rem 0 0.25rem;">Counselor Name, Date, Referrals &amp; 30-Day Commitments (Included in Print &amp; .md Copy):</label>
              <textarea class="bcm-textarea" id="bcm-actions-box" name="session_actions" rows="6" placeholder="e.g., Mon Nov 30 Zoom w/ Chris Bridgewater (AZ APEX) — 1) Red-team ADE BPM007864 + toggle APP Small Business + fix Webcognita LLC spelling; 2) Activate 10x10 BidMatch across 5-Base AZ DoD Corridor; 3) Confirm SPRS CMMC L1 affirmation &amp; MySBA Case #00009160...">${escapeHtml(state.sessionActionItems)}</textarea>
            </div>
          </section>

          <pre id="bcm-markdown-export" class="bcm-sr-only" aria-hidden="true">${escapeHtml(mdText)}</pre>

          <footer class="bcm-footer">
            <strong>Moneyball Self-Healing Architecture:</strong> Mounted exclusively via client-side URL fragment (<code>/#bcm/</code>) with <code>noindex, nofollow</code>, zero public links, zero cloud egress, checksummed dual-slot shadow <code>localStorage</code>, live <code>/govcon-radar/govcon-corpus.json</code> telemetry reconciliation, and constrained knapsack optimization.
          </footer>
        </div>
      `;

      mountedRoot.querySelectorAll('input[type="range"].bcm-range').forEach(syncRangeCustomProps);
      wireInteractions();
    }

    function renderQuantMemo(model, liveRef) {
      const starters = model.roster.filter((r) => r.allocationRatio > 0).length;
      const ledgerNote = liveRef.m2QuantConnected
        ? `Live M2 SQLite Plate Discipline: <strong>${liveRef.pursueCount || 0} Swings (Pursue)</strong> &bull; <strong>${liveRef.watchCount || 0} Watch</strong> &bull; <strong>${liveRef.dismissCount || 0} Bad Pitches Taken (Dismissed)</strong>.`
        : `Offline Zero-Egress Quant Mode (${liveRef.activePortals}/${liveRef.totalPortals} radar portals synced).`;
      return `
        <strong>Carbon 4 Quant Memo to GM (Alan Pruitt):</strong>
        Per Samford&#39;s <em>Moneyball Science</em> regression (<code>RS = -804.6 + 2737.8&middot;OBP + 1584.9&middot;SLG</code>; vanity <code>BA = -369</code>), getting on base carries <strong>1.73x</strong> the weight of slugging. Within your <strong>${model.hrsCap} hrs/wk</strong> and <strong>$${model.cashCap}/mo</strong> constraints, I funded <strong>${starters} undervalued lanes</strong> (DePodesta <code>wOPS ${formatStat3(model.teamWops)}</code>), benched the <code>.020-OBP</code> open-RFP trap, suppressed defensive <code>OOBP/OSLG</code> (<code>${formatStat3(model.govconOOBP)} / ${formatStat3(model.govconOSLG)}</code>), and forecast <strong>+$${model.runDifferential.toLocaleString('en-US')}/yr Net Run Difference</strong> (${model.totalExpectedWins} regular-season wins). ${ledgerNote}
      `;
    }

    function renderScoreboardCards(model) {
      return `
        <div class="bcm-stat-tile">
          <div class="bcm-stat-kicker">Carbon 4 DePodesta wOPS</div>
          <div class="bcm-stat-big">${formatStat3(model.teamWops)}</div>
          <div class="bcm-stat-sub">1.73&middot;OBP (${formatStat3(model.teamObp)}) + SLG (${formatStat3(model.teamSlg)})</div>
        </div>
        <div class="bcm-stat-tile">
          <div class="bcm-stat-kicker">Offense: Runs Scored (RS)</div>
          <div class="bcm-stat-big">$${model.totalRunsScored.toLocaleString('en-US')}/yr</div>
          <div class="bcm-stat-sub">${model.totalExpectedWins} Expected Wins (Signed PPQs)</div>
        </div>
        <div class="bcm-stat-tile">
          <div class="bcm-stat-kicker">Defense: Runs Allowed (RA)</div>
          <div class="bcm-stat-big">$${model.totalRunsAllowed.toLocaleString('en-US')}/yr</div>
          <div class="bcm-stat-sub">OOBP ${formatStat3(model.govconOOBP)} &bull; $50 Quechan Lic + Award COI</div>
        </div>
        <div class="bcm-stat-tile">
          <div class="bcm-stat-kicker">Net Run Difference (RD)</div>
          <div class="bcm-stat-big">+$${model.runDifferential.toLocaleString('en-US')}/yr</div>
          <div class="bcm-stat-sub">Knapsack: ${model.usedHrsWk} / ${model.hrsCap} BD hrs/wk</div>
        </div>
        <div class="bcm-stat-tile ${model.clinchedPlayoffs ? 'is-clinch' : 'is-chase'}">
          <div class="bcm-stat-kicker">Stage 3 Playoff Clinch</div>
          <div class="bcm-stat-big">${model.clinchedPlayoffs ? 'CLINCHED' : 'IN HUNT'} (${(model.pythagWinPct * 100).toFixed(0)}%)</div>
          <div class="bcm-stat-sub">${model.clinchedPlayoffs ? '>= 4 PPQs & >= +$100K GSA/Co-Op Pace' : 'Raise SOWs/wk or Hrs to hit 4 PPQs + $100K'}</div>
        </div>
      `;
    }

    function renderScoutingRows(model) {
      return model.roster.map((r) => {
        const pillClass = r.isTrap || r.rosterStatus.startsWith('BENCHED')
          ? 'bcm-roster-pill is-benched'
          : r.rosterStatus.startsWith('BULLPEN')
            ? 'bcm-roster-pill is-bullpen'
            : 'bcm-roster-pill';
        return `
          <tr class="${r.isTrap ? 'is-trap' : ''}">
            <th scope="row">${escapeHtml(r.name)}</th>
            <td><strong>${escapeHtml(r.archetype)}</strong><br><span>${escapeHtml(r.rail)}</span></td>
            <td><strong>${formatStat3(r.obp)}</strong><br><span>(${(r.obp * 100).toFixed(1)}% / pitch)</span></td>
            <td><strong>${formatStat3(r.slg)}</strong><br><span>$${Math.round(r.netPerBdHour).toLocaleString('en-US')}/BD-hr</span></td>
            <td><strong>${formatStat3(r.wops)}</strong><br><span style="font-size:0.74rem;">(OPS ${formatStat3(r.ops)})</span></td>
            <td><span class="${pillClass}">${escapeHtml(r.rosterStatus)}</span>${r.allocatedHrsWk > 0 ? `<div style="margin-top:0.2rem;font-weight:800;">${r.allocatedHrsWk} hr/wk &rarr; $${Math.round(r.projectedRunsScored).toLocaleString('en-US')}/yr</div>` : ''}</td>
            <td>${escapeHtml(r.whyInefficient)}</td>
          </tr>
        `;
      }).join('');
    }

    function updateModelWithoutLosingSliderFocus() {
      const model = solveMoneyballModel(live, state.optimizer);
      const blocks = buildCanonicalBlocks(live, model);
      const checksum = persistSelfHealingState(state);
      const checks = runStrategicCoherenceChecks(blocks, live, model, checksum);
      const qm = document.getElementById('bcm-quant-memo');
      if (qm) qm.innerHTML = renderQuantMemo(model, live);
      const sb = document.getElementById('bcm-scoreboard');
      if (sb) sb.innerHTML = renderScoreboardCards(model);
      const tb = document.getElementById('bcm-ops-tbody');
      if (tb) tb.innerHTML = renderScoutingRows(model);
      const pre = document.getElementById('bcm-markdown-export');
      if (pre) pre.textContent = buildMarkdownExport(blocks, state, live, model, checks);
    }

    function wireInteractions() {
      ['bcm-controls-form', 'bcm-knapsack-form'].forEach((fid) => {
        const f = document.getElementById(fid);
        if (f) f.addEventListener('submit', (e) => e.preventDefault());
      });

      const slHours = document.getElementById('bcm-sl-hours');
      const slPitches = document.getElementById('bcm-sl-pitches');
      const slCash = document.getElementById('bcm-sl-cash');

      if (slHours) {
        slHours.addEventListener('input', () => {
          syncRangeCustomProps(slHours);
          state.optimizer.weeklyHoursCap = Number(slHours.value);
          slHours.setAttribute('aria-valuetext', `${slHours.value} hours per week`);
          const out = document.getElementById('bcm-out-hours');
          if (out) out.textContent = `${slHours.value} hrs/wk`;
          updateModelWithoutLosingSliderFocus();
        });
        slHours.addEventListener('change', () => { healEvents = []; render(); });
      }

      if (slPitches) {
        slPitches.addEventListener('input', () => {
          syncRangeCustomProps(slPitches);
          state.optimizer.sowPitchesPerWeek = Number(slPitches.value);
          slPitches.setAttribute('aria-valuetext', `${slPitches.value} tailored SOW pitches per week`);
          const out = document.getElementById('bcm-out-pitches');
          if (out) out.textContent = `${slPitches.value} SOWs/wk`;
          updateModelWithoutLosingSliderFocus();
        });
        slPitches.addEventListener('change', () => { healEvents = []; render(); });
      }

      if (slCash) {
        slCash.addEventListener('input', () => {
          syncRangeCustomProps(slCash);
          state.optimizer.monthlyCashCap = Number(slCash.value);
          slCash.setAttribute('aria-valuetext', `$${slCash.value} per month out-of-pocket BD cap`);
          const out = document.getElementById('bcm-out-cash');
          if (out) out.textContent = `$${slCash.value}/mo`;
          updateModelWithoutLosingSliderFocus();
        });
        slCash.addEventListener('change', () => { healEvents = []; render(); });
      }

      mountedRoot.querySelectorAll('input[name="bcm_lens"]').forEach((radio) => {
        radio.addEventListener('change', () => {
          if (radio.checked) {
            state.lens = radio.value;
            healEvents = [];
            render();
          }
        });
      });

      mountedRoot.querySelectorAll('input[name="bcm_view"]').forEach((radio) => {
        radio.addEventListener('change', () => {
          if (radio.checked) {
            state.viewMode = radio.value;
            healEvents = [];
            render();
          }
        });
      });

      mountedRoot.querySelectorAll('.bcm-step-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const s = Number(btn.getAttribute('data-step'));
          state.activeFlowStep = state.activeFlowStep === s ? 0 : s;
          healEvents = [];
          render();
        });
      });

      const prevBtn = document.getElementById('bcm-flow-prev');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          state.activeFlowStep = state.activeFlowStep <= 1 ? 9 : state.activeFlowStep - 1;
          healEvents = [];
          render();
        });
      }
      const nextBtn = document.getElementById('bcm-flow-next');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          state.activeFlowStep = state.activeFlowStep >= 9 ? 1 : state.activeFlowStep + 1;
          healEvents = [];
          render();
        });
      }
      const clearBtn = document.getElementById('bcm-flow-clear');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          state.activeFlowStep = 0;
          healEvents = [];
          render();
        });
      }

      mountedRoot.querySelectorAll('textarea[data-note-id]').forEach((ta) => {
        ta.addEventListener('input', () => {
          const id = ta.getAttribute('data-note-id');
          state.blockNotes[id] = ta.value;
          updateModelWithoutLosingSliderFocus();
        });
      });

      const qBox = document.getElementById('bcm-questions-box');
      if (qBox) {
        qBox.addEventListener('input', () => {
          state.counselorQuestions = qBox.value;
          updateModelWithoutLosingSliderFocus();
        });
        qBox.addEventListener('blur', () => {
          if (!qBox.value.trim()) {
            state.counselorQuestions = DEFAULT_COUNSELOR_QUESTIONS;
            healEvents = ['Self-healed empty Counselor Questions box from canonical Moneyball SBDC/APEX agenda.'];
            render();
          }
        });
      }

      const actBox = document.getElementById('bcm-actions-box');
      if (actBox) {
        actBox.addEventListener('input', () => {
          state.sessionActionItems = actBox.value;
          updateModelWithoutLosingSliderFocus();
        });
      }

      const resetQ = document.getElementById('bcm-reset-questions');
      if (resetQ) {
        resetQ.addEventListener('click', () => {
          state.counselorQuestions = DEFAULT_COUNSELOR_QUESTIONS;
          healEvents = ['Restored canonical Moneyball SBDC + APEX counselor question set.'];
          render();
        });
      }

      const resetAll = document.getElementById('bcm-reset-all');
      if (resetAll) {
        resetAll.addEventListener('click', () => {
          state = createDefaultState();
          healEvents = ['Reset all 9 block notes, knapsack sliders, and scratchpads to verified Moneyball v2 baseline.'];
          render();
        });
      }

      const printBtn = document.getElementById('bcm-btn-print');
      if (printBtn) printBtn.addEventListener('click', () => window.print());

      const healBtn = document.getElementById('bcm-btn-selfheal');
      if (healBtn) {
        healBtn.addEventListener('click', async () => {
          const reloaded = loadSelfHealingState();
          state = reloaded.state;
          live = await fetchLiveTelemetry();
          const refreshedModel = solveMoneyballModel(live, state.optimizer);
          healEvents = reloaded.healEvents.length
            ? reloaded.healEvents
            : [`Self-heal & live scouting sync verified (${live.activePortals}/${live.totalPortals} portals • Team OPS ${formatStat3(refreshedModel.teamOps)} • 9/9 blocks intact).`];
          render();
        });
      }

      const expBtn = document.getElementById('bcm-btn-export-json');
      if (expBtn) {
        expBtn.addEventListener('click', () => {
          const model = solveMoneyballModel(live, state.optimizer);
          const payload = {
            exportedAt: new Date().toISOString(),
            entity: 'WEBCOGNITA LLC (UEI: EZ34U9KNJA17 • CAGE: 4ZCN6)',
            doctrine: 'Moneyball Sabermetrics + Regression + Constrained Knapsack Optimization',
            liveTelemetry: live,
            moneyballForecast: {
              teamObp: model.teamObp,
              teamSlg: model.teamSlg,
              teamOps: model.teamOps,
              expectedWins: model.totalExpectedWins,
              runsScored: model.totalRunsScored,
              runsAllowed: model.totalRunsAllowed,
              runDifferential: model.runDifferential,
              clinchedStage3: model.clinchedPlayoffs
            },
            state
          };
          const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `webcognita-moneyball-bcm-${new Date().toISOString().slice(0, 10)}.json`;
          a.click();
          setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        });
      }

      const exitBtn = document.getElementById('bcm-btn-exit');
      if (exitBtn) {
        exitBtn.addEventListener('click', () => {
          if (location.pathname.startsWith('/bcm')) {
            location.href = '/';
          } else {
            history.pushState('', document.title, location.pathname + location.search);
            unmountBcmWorkbench();
          }
        });
      }
    }

    render();
  }

  function unmountBcmWorkbench() {
    document.body.classList.remove('bcm-mode-active');
    if (mountedRoot) mountedRoot.hidden = true;
    if (originalTitle) document.title = originalTitle;
    if (robotsMetaEl) {
      if (prevRobotsContent === null) robotsMetaEl.remove();
      else robotsMetaEl.setAttribute('content', prevRobotsContent);
    }
  }

  window.WebcognitaBcmWorkbench = {
    mount: mountBcmWorkbench,
    unmount: unmountBcmWorkbench
  };

  mountBcmWorkbench();
})();
