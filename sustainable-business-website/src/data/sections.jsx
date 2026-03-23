/**
 * sections.jsx — Content data for all 6 report sections.
 * Each section has a title and an array of JSX page nodes.
 */

const SEC01_PAGES = [
  /* Page 1 */
  <div key="sec01-p1">
    <h2>From Value Destroyer to Value Creator</h2>
    <p>
      The <span className="mark-red">2015 "Dieselgate" emissions scandal</span> marked a structural turning point for Volkswagen.
      What began as a failure in the Compliance phase of the Dunphy et al. (2003) Waves of Sustainability
      model catalysed a transformation into VW's current third wave: the Sustaining Corporation.
    </p>
    <p>
      The scale of the 2015 scandal was exceptional even by corporate crisis standards. Defeat devices were
      fitted to approximately 11 million vehicles globally, and total regulatory fines and civil settlements
      have exceeded $33 billion — making it the single largest environmental enforcement action against an
      automotive manufacturer in history. Yet the analytical significance of Dieselgate lies not in its
      financial magnitude but in its structural character: this was not a rogue engineering decision or an
      isolated compliance failure, but a systemic suppression of emissions data that persisted for years
      across multiple geographies and required active concealment from regulators, auditors, and the market.
      It constitutes a textbook failure of stakeholder trust precisely because the organisation chose to
      manage environmental performance through deception rather than genuine reduction — the Compliance wave
      at its most dysfunctional. The structural response was correspondingly comprehensive. VW established
      the Independent Sustainability Council in 2016, creating an external body with a formal mandate to
      challenge the Board of Management on sustainability targets and execution. A board-level sustainability
      committee was introduced to embed governance accountability at the highest decision-making tier.
      Mandatory supply chain S-Rating audits were rolled out across 63,000+ suppliers, converting what had
      been a voluntary self-assessment process into a hard contractual threshold. These structural changes
      — not the financial settlements — are the mechanism by which VW has begun to convert trust deficit
      into governance credibility.
    </p>
    <p>
      VW now defines sustainability across four nested dimensions — Nature, People, Society, and Business —
      aligning with Kate Raworth's Doughnut Economics framework: operating within the ecological ceiling
      while meeting the social foundation.
    </p>
    <div className="pull-quote">
      The "regenerate+" strategy aims to reinterpret VW not merely as a car manufacturer,
      but as an integral part of society.
    </div>
    <h3>VW's Four Sustainability Dimensions</h3>
    <ul>
      <li><strong>Nature</strong> — Planetary boundaries, climate targets, circular economy</li>
      <li><strong>People</strong> — Human rights, supply chain due diligence, labour standards</li>
      <li><strong>Society</strong> — Community engagement, trust rebuilding, governance</li>
      <li><strong>Business</strong> — Sustainable profitability, green finance, EV transition</li>
    </ul>
  </div>,

  /* Page 2 */
  <div key="sec01-p2">
    <h2>Dunphy et al. (2003) — Waves of Sustainability</h2>
    <table>
      <thead>
        <tr><th>Wave</th><th>Label</th><th>Period</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>1st</td><td>Rejection</td><td>Pre-1990s</td><td>Maximise profit with minimal environmental consideration</td></tr>
        <tr><td>2nd</td><td>Compliance</td><td>1990–2015</td><td>Meeting legal minimums — culminating in the 2015 Dieselgate defeat device scandal</td></tr>
        <tr><td>3rd (current)</td><td>Transformation</td><td>2016–Present</td><td>The "regenerate+" strategy: reinterpreting VW as an integral part of society</td></tr>
      </tbody>
    </table>
    <p>
      Whilst VW has entered the Transformation wave, the 2015 scandal reveals the fragility of
      compliance-only approaches. The Dunphy model makes clear that organisations must integrate
      sustainability at the strategic core — not manage it as a risk afterthought.
    </p>
  </div>,

  /* Page 3 */
  <div key="sec01-p3">
    <h2>Doughnut Economics — Nested Dependencies</h2>
    <p>
      Unlike the "three overlapping circles" model, VW's framework adopts the 3-Nested Dependencies
      Model: Economy sits inside Society, which sits inside Environment.
    </p>
    <table>
      <thead>
        <tr><th>Layer</th><th>VW Application</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Ecological Ceiling</strong></td><td>Zero Impact Factory and net zero 2050 — planetary boundaries for climate, biodiversity, water</td></tr>
        <tr><td><strong>Social Foundation</strong></td><td>Human rights, supply chain due diligence, cobalt/lithium sourcing — S-Rating for 63,000+ suppliers</td></tr>
        <tr><td><strong>Business Economy</strong></td><td>Sustainable profitability within social and environmental bounds — 6% operating margin, €89B EV investment</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 4 */
  <div key="sec01-p4">
    <h2>Business Case Drivers</h2>
    <p>Sustainability is not charity. Four strategic drivers explain VW's €89 billion commitment.</p>
    <table>
      <thead>
        <tr><th>Driver</th><th>Detail</th><th>Metric</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Access to Markets</strong></td><td>100% EV transition in Europe by 2035 to meet EU fleet CO₂ targets (&lt;93.6g/km for 2025)</td><td>100% BEV by 2035</td></tr>
        <tr><td><strong>Operational Efficiency</strong></td><td>"Zero Impact Factory": reducing environmental impact per vehicle by 37.5% by 2030</td><td>−37.5% impact/vehicle</td></tr>
        <tr><td><strong>Access to Capital</strong></td><td>Over €15 billion in Green Bonds issued (late 2025)</td><td>€15B+ Green Bonds</td></tr>
        <tr><td><strong>Compliance</strong></td><td>Avoiding multi-billion euro fines for fleet CO₂ non-compliance. VW at 0g compliance margin for 2025</td><td><span className="mark-red">0g margin — critical</span></td></tr>
      </tbody>
    </table>
  </div>,
]

const SEC02_PAGES = [
  /* Page 1 */
  <div key="sec02-p1">
    <h2>Carbon Accounts &amp; Climate Targets</h2>
    <p>
      Framework: GHG Protocol Corporate Accounting and Reporting Standard.<br/>
      Formula: <strong>Activity Data × Emission Factor = GHG Emitted (tCO₂e)</strong><br/>
      Note: 1 tonne Carbon = 3.67 tCO₂e (atomic weights 12 &amp; 44)
    </p>
    <h3>Scope 1 &amp; 2 Performance (2024)</h3>
    <p>
      VW has achieved a 25% reduction in Scope 1 emissions since 2019, with market-based Scope 2
      at 4.2 MtCO₂e. Targets are SBTi validated at 1.5°C alignment.
    </p>
    <table>
      <thead>
        <tr><th>Scope</th><th>Type</th><th>Value</th><th>Note</th></tr>
      </thead>
      <tbody>
        <tr><td>Scope 1</td><td>Direct Emissions</td><td>3.3 Mt CO₂e</td><td>−25% since 2019. Fuel combustion, industrial processes.</td></tr>
        <tr><td>Scope 2</td><td>Energy Indirect</td><td>4.2 Mt CO₂e</td><td>Market-based method. Purchased electricity and heat.</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 2 */
  <div key="sec02-p2">
    <h2>The Scope 3 Trap — Critical Material Issue</h2>
    <div className="pull-quote">Scope 3: ~95% of Total Emissions</div>
    <p>
      For an automaker like VW, <span className="mark-red">Scope 3 Category 11 (Use of Sold Products) represents
      688 Mt CO₂e</span> — the single most material category. These emissions occur when customers
      drive VW vehicles, making the transition to zero-emission EVs the primary lever.
    </p>
    <table>
      <thead>
        <tr><th>Scope 3 Category</th><th>Volume</th><th>Detail</th></tr>
      </thead>
      <tbody>
        <tr><td>Cat.11 Use of Sold Products</td><td>688 Mt (92%)</td><td>Emissions from customers driving ICE vehicles. EV transition is VW's primary lever.</td></tr>
        <tr><td>Cat.1 Purchased Goods</td><td>38 Mt (5%)</td><td>Upstream supply chain. 63,000+ suppliers in 96 countries.</td></tr>
        <tr><td>Cat.4 Upstream Transport</td><td>~1%</td><td>—</td></tr>
        <tr><td>Other Scope 3</td><td>~2%</td><td>—</td></tr>
      </tbody>
    </table>
    <p>
      <strong>SBTi Note:</strong> Carbon credits and offsets cannot be counted as emission reductions
      toward science-based targets. They may only be used to neutralise genuinely residual emissions.
    </p>
    <p>
      Category 11 is structurally unavoidable for any original equipment manufacturer that continues to sell
      internal combustion engine vehicles. The emissions do not appear on VW's balance sheet — they occur
      when the end customer drives — but VW's design decisions determine their magnitude entirely. Engine
      efficiency, vehicle weight, and powertrain technology are all VW choices made years before a vehicle
      reaches the road. This asymmetry between accountability and control is why Scope 3 Category 11 is
      the defining strategic variable for any automotive OEM pursuing credible net zero commitments.
    </p>
    <p>
      The SBTi's classification of VW under the "well-below 2°C" pathway for Scope 3, rather than
      1.5°C alignment, reflects precisely this structural constraint. SBTi recognises that no automotive
      OEM can credibly commit to a 1.5°C-aligned Scope 3 reduction trajectory while continuing to sell
      ICE vehicles at scale. The gap between VW's Scope 1+2 targets (1.5°C validated) and its Scope 3
      pathway (well-below 2°C) is therefore not a governance failure but an honest reflection of the pace
      at which fleet turnover can realistically occur. This distinction matters for investors: it separates
      credible ambition from target-setting designed to appear more ambitious than the underlying portfolio
      permits.
    </p>
    <p>
      The Oxford Offsetting Principles clarify what this means in practice. Offsets cannot count against
      SBTi targets under any circumstances — they are a compensation mechanism for genuinely residual
      emissions, not a substitute for absolute reduction. For VW, this means the only viable mechanism for
      Scope 3 compliance is actual displacement of ICE vehicle sales by zero-emission equivalents. VW's
      own modelling implies that achieving the 30% carbon intensity per vehicle-km reduction by 2030
      requires approximately six times the current rate of BEV adoption through the mid-2030s. The
      mathematical reality of fleet turnover — typically 10–15 years per vehicle — means the decisions
      made in 2025 and 2026 on volume BEV product launches will determine whether the 2030 target is
      achievable or merely aspirational.
    </p>
  </div>,

  /* Page 3 */
  <div key="sec02-p3">
    <h2>SBTi Alignment &amp; Climate Targets</h2>
    <table>
      <thead>
        <tr><th>Target</th><th>Pathway</th><th>Detail</th></tr>
      </thead>
      <tbody>
        <tr><td>Scope 1 &amp; 2</td><td>1.5°C Aligned (SBTi validated)</td><td>Reduce absolute Scope 1+2 GHG emissions 50% by 2030 vs. 2018 baseline</td></tr>
        <tr><td>Scope 3</td><td>Well-below 2°C</td><td>Reduce carbon footprint per vehicle-km by 30% by 2030 vs. 2018 baseline</td></tr>
        <tr><td>Net Zero</td><td>2050 Target</td><td>Full value chain net carbon neutrality. Offsets cannot substitute real reductions.</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 4 */
  <div key="sec02-p4">
    <h2>Decarbonisation Hierarchy</h2>
    <p>Avoid → Reduce → Compensate</p>
    <h3>1. Avoid (Highest Priority)</h3>
    <ul>
      <li>100% BEV portfolio by 2035 in Europe</li>
      <li>Zero Impact Factory design</li>
      <li>Renewable energy procurement</li>
    </ul>
    <h3>2. Reduce (Core Strategy)</h3>
    <ul>
      <li>Fleet efficiency improvements</li>
      <li>Supply chain S-Rating system</li>
      <li>Circular economy — 40% recycled materials by 2040</li>
    </ul>
    <h3>3. Compensate — Residuals Only (Last Resort)</h3>
    <ul>
      <li>Carbon credits for genuinely residual emissions only</li>
      <li>Nature-based solutions</li>
      <li>High-quality verified offsets (Gold Standard)</li>
    </ul>
  </div>,
]

const SEC03_PAGES = [
  /* Page 1 */
  <div key="sec03-p1">
    <h2>People, Planet &amp; Profit</h2>
    <p>
      Elkington's Triple Bottom Line applied to Volkswagen. The three pillars are treated as
      nested dependencies — profit operates within society, which operates within environmental limits.
    </p>
    <h3>People — Human Rights &amp; Supply Chain</h3>
    <table>
      <thead>
        <tr><th>Metric</th><th>Initiative</th><th>Detail</th></tr>
      </thead>
      <tbody>
        <tr><td>18 Materials Audited</td><td>Human Rights Due Diligence</td><td>Auditing 18 high-risk raw materials including Cobalt and Lithium to eliminate child labour</td></tr>
        <tr><td>63,000+ Suppliers</td><td>S-Rating Supplier System</td><td>Mandatory sustainability rating. <span className="mark-red">Failure on "People" criteria = no contract</span></td></tr>
        <tr><td>Full Chain Traceability</td><td>Battery Mineral Traceability</td><td>Blockchain-based tracking of Cobalt from DRC mines to VW factories</td></tr>
        <tr><td>35,000 Retrained</td><td>Workforce Transition</td><td>35,000 German workers retrained for EV/digital roles through the "Future Pact"</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 2 */
  <div key="sec03-p2">
    <h2>Planet — Circular Economy &amp; Climate</h2>
    <table>
      <thead>
        <tr><th>Metric</th><th>Initiative</th><th>Detail</th></tr>
      </thead>
      <tbody>
        <tr><td>40% by 2040</td><td>Circular Economy Target</td><td>40% circular materials in vehicles by 2040, benchmarked against Renault's Cradle-to-Cradle leadership</td></tr>
        <tr><td>−37.5% by 2030</td><td>Zero Impact Factory</td><td>Reducing environmental impact per vehicle produced by 37.5% by 2030. Zero carbon, zero waste, zero water per site.</td></tr>
        <tr><td>95%+ Recovered</td><td>Battery Closed Loop</td><td>Used EV batteries repurposed for stationary energy storage before full recycling</td></tr>
        <tr><td>Net Positive by 2030</td><td>Biodiversity Commitment</td><td>Net positive biodiversity at all new factory sites, aligned with the Kunming-Montreal Framework</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 3 */
  <div key="sec03-p3">
    <h2>Profit — Sustainable Profitability</h2>
    <table>
      <thead>
        <tr><th>Metric</th><th>Initiative</th><th>Detail</th></tr>
      </thead>
      <tbody>
        <tr><td>6% Margin Target</td><td>Operating Margin</td><td>Targeting 6% operating margin by 2025 while investing €89B in electrification and digitalisation to 2030</td></tr>
        <tr><td>€15B+ Raised</td><td>Green Bond Programme</td><td>Over €15 billion in green bonds issued (2025), providing ESG-mandated institutional capital at favourable rates</td></tr>
        <tr><td>#1 EV in Europe (2025)</td><td>EV Revenue Growth</td><td>VW reclaimed #1 EV market share in Europe in 2025 with ID.3, ID.4, ID.7 and ID.Buzz</td></tr>
        <tr><td><span className="mark-red">0g Margin — Critical</span></td><td>Avoided Fines</td><td>EU fleet CO₂ compliance at 0g margin. Each gram over = ~€95 fine × 8M+ vehicles sold</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 4 */
  <div key="sec03-p4">
    <h2>Ethics &amp; Trust — Rebuilding Post-Dieselgate</h2>
    <p>
      The Edelman Trust Barometer shows the automotive sector at ~67% global trust.
      VW carries a specific trust deficit post-2015 that demands higher transparency standards.
    </p>
    <table>
      <thead>
        <tr><th>Initiative</th><th>Detail</th></tr>
      </thead>
      <tbody>
        <tr><td>Independent Sustainability Council</td><td>VW established an independent Council to challenge the Board of Management — direct governance response to Dieselgate</td></tr>
        <tr><td>Reasonable Assurance Reporting</td><td>VW uses Reasonable Assurance (positive framing: "fairly presented") for key KPIs — a higher standard than Limited Assurance used by many competitors including Tesla</td></tr>
        <tr><td>Double Materiality (CSRD)</td><td>VW assesses both financial materiality AND impact materiality — meeting the EU CSRD standard</td></tr>
      </tbody>
    </table>
    <p>
      The distinction between Reasonable Assurance and Limited Assurance is substantive, not cosmetic.
      Under Reasonable Assurance, the external auditor — in VW's case PwC — provides a positive opinion:
      the data "fairly presents" the reported position. This is the same audit standard applied to
      financial statements and carries the same legal weight. Under Limited Assurance, by contrast, the
      auditor provides only negative assurance: nothing has come to their attention to suggest material
      error. The evidential threshold is fundamentally lower, the procedures less extensive, and the
      resulting opinion carries commensurately less authority with investors and regulators.
    </p>
    <p>
      This distinction carries particular weight in VW's case precisely because of the 2015 emissions
      reporting failure. Dieselgate demonstrated that internally reported emissions data, certified only
      through compliance-level processes, could be systematically falsified without detection. Independent
      Reasonable Assurance from PwC is the mechanism by which institutional investors and regulators can
      now distinguish reconstructed governance from a historical compliance-washing posture. When a
      competitor reports under Limited Assurance — or, as Tesla did for several years, no external
      assurance at all — the credibility gap relative to VW is not a matter of degree but of kind.
    </p>
    <p>
      Double Materiality under the EU Corporate Sustainability Reporting Directive adds a further
      dimension that prior frameworks such as GRI or TCFD do not require in full. CSRD mandates
      disclosure of both the financial risks that sustainability issues pose to the company and the
      company's impacts on the environment and society. The two assessments are conducted independently
      and must be supported by auditable evidence. This bidirectional scope forces a more comprehensive
      and internally consistent disclosure than either framework alone can produce, and it creates a
      higher bar for greenwashing because inconsistency between the two materiality assessments is
      detectable in the reported data.
    </p>
    <h3>Double Materiality Map</h3>
    <table>
      <thead>
        <tr><th>Impact Topic</th><th>Financial</th><th>Impact on World</th><th>CSRD Status</th></tr>
      </thead>
      <tbody>
        <tr><td>Climate Change / GHG</td><td>High</td><td>Critical</td><td>Material</td></tr>
        <tr><td>Battery Mineral Supply Chain</td><td>High</td><td>High</td><td>Material</td></tr>
        <tr><td>Human Rights in Supply Chain</td><td>Medium</td><td>Critical</td><td>Material</td></tr>
        <tr><td>Product Carbon Footprint</td><td>High</td><td>High</td><td>Material</td></tr>
        <tr><td>Data Security &amp; Privacy</td><td>High</td><td>Medium</td><td>Material</td></tr>
        <tr><td>Circular Economy / Waste</td><td>Medium</td><td>High</td><td>Material</td></tr>
        <tr><td>Employee Health &amp; Safety</td><td>Medium</td><td>Medium</td><td>Significant</td></tr>
        <tr><td>Biodiversity &amp; Land Use</td><td>Low</td><td>Medium</td><td>Relevant</td></tr>
      </tbody>
    </table>
  </div>,
]

const SEC04_PAGES = [
  /* Page 1 — Strategic Overview */
  <div key="sec04-p1">
    <h2>4-Way Strategic Benchmark</h2>
    <p>
      Comparing VW against Mercedes-Benz (Luxury), Stellantis (Regional Volume), and Toyota
      (Multi-Pathway) — a direct Volume vs. Volume comparison within the European market.
      Analysis follows the Dunphy (2003) Transformation Wave and GHG Protocol frameworks.
    </p>
    <div className="pull-quote">
      "While Stellantis leads on timeline (2038) and Mercedes leads in digital ethics, Volkswagen
      stands out for Governance Integrity — turning the 2015 trust deficit into a gold standard."
    </div>
    <h3>Strategic Comparison Matrix</h3>
    <table>
      <thead>
        <tr><th>Feature</th><th>Volkswagen</th><th>Mercedes-Benz</th><th>Stellantis</th><th>Toyota</th></tr>
      </thead>
      <tbody>
        <tr><td>Strategic Goal</td><td>regenerate+</td><td>Ambition 2039</td><td>Dare Forward 2030</td><td>Env. Challenge 2050</td></tr>
        <tr><td>Net Zero Goal</td><td>2050</td><td>2039</td><td>2038 (Entire Chain)</td><td>2050</td></tr>
        <tr><td>Assurance Level</td><td>Reasonable (Gold)</td><td>Limited/Reasonable</td><td>Limited (Standard)</td><td>Limited (Standard)</td></tr>
        <tr><td>Strategic Path</td><td>BEV-First</td><td>Luxury BEV</td><td>Multi-Energy Platform</td><td>Multi-Pathway</td></tr>
        <tr><td>Circular Focus</td><td>Closed-Loop Batteries</td><td>96% Recovery Plant</td><td>Mirafiori 4R Hub</td><td>Battery 2nd Life</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 2 — Strategic Philosophies & Brand DNA */
  <div key="sec04-p2">
    <h2>Strategic Philosophies — Brand DNA</h2>
    <p>
      Applying the Dunphy et al. (2003) 3rd Wave: Transformation lens to each competitor's
      core sustainability philosophy reveals fundamentally different approaches to value creation.
    </p>
    <table>
      <thead>
        <tr><th>Company</th><th>Philosophy</th><th>Qualitative Edge</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Volkswagen</strong></td><td>"Nature and Society Positive" — regenerate+</td><td>Four-dimensional integration: Nature, People, Society, Business embedded in core management</td></tr>
        <tr><td>Mercedes-Benz</td><td>"Luxury Integrity" — electric-only where market allows</td><td>Unique pillars: Traffic Safety and Digital Trust (ethical AI &amp; data privacy)</td></tr>
        <tr><td>Stellantis</td><td>"Dare Forward 2030" — transitioning to Sustainable Mobility Tech Company</td><td>Three pillars: Care, Tech, Value. "Care" emphasises ethical responsibility to customers and planet</td></tr>
        <tr><td>Toyota</td><td>"Multi-Pathway &amp; Happiness" — diverse tech options for all markets</td><td>Pragmatism over purity: argues BEV-only ignores infrastructure gaps in emerging markets</td></tr>
      </tbody>
    </table>
    <h3>Brand DNA — Analytical Notes</h3>
    <p>
      <strong>Volkswagen:</strong> The "regenerate+" strategy places VW at Wave 5 (Sustaining) on Dunphy's
      scale — above mere compliance or strategic proactivity. It represents an attempt to embed
      sustainability as the generative logic of the business rather than a constraint on it.
    </p>
    <p>
      <strong>Mercedes-Benz:</strong> The 2023 reversal on the full-electric mandate — Mercedes confirmed it
      would continue offering combustion and hybrid powertrains beyond 2030 where market conditions
      require — demonstrates the tension between capital market communication and product planning reality.
      The Ambition 2039 brand narrative was constructed around full electrification; the 2023 walk-back
      forced a recalibration of both the strategy and its credibility with institutional investors.
    </p>
    <p>
      <strong>Stellantis:</strong> The 2024 CFO-driven scale-back — from an aggressive battery-electric
      vehicle investment trajectory to a hybrid-hedged portfolio — represents the sharpest public example
      of the Ambition vs. Integration conflict in the industry. The reversal was driven by margin pressure
      and demand softening rather than a revision of long-term climate targets, which makes it analytically
      distinct from a deliberate strategic pivot.
    </p>
    <p>
      <strong>Toyota:</strong> The multi-pathway approach creates genuine EU compliance exposure under the
      2035 ICE ban. Hybrid vehicles — including plug-in hybrids — do not qualify as zero-emission vehicles
      under current EU regulation, meaning Toyota's core product strategy for Europe requires either a
      fundamental technological pivot by 2035 or a political revision of the mandate that cannot currently
      be relied upon.
    </p>
    <div className="pull-quote">
      Stellantis' "Dare Forward 2030" sets the industry's most aggressive Net Zero date (2038),
      but faces the Ambition vs. Integration conflict: uniting 14 disparate brands under one roadmap.
    </div>
  </div>,

  /* Page 3 — Governance & Reporting Integrity */
  <div key="sec04-p3">
    <h2>Governance &amp; Reporting Integrity</h2>
    <p>
      Graded on Materiality Approach, Assurance Level, and Governance Structure — applying
      the GHG Protocol Corporate Standard and Oxford Offsetting Principles.
    </p>
    <table>
      <thead>
        <tr><th>Benchmark</th><th>Volkswagen</th><th>Mercedes-Benz</th><th>Stellantis</th><th>Toyota</th></tr>
      </thead>
      <tbody>
        <tr><td>Materiality</td><td>Double Materiality: financial + societal impact</td><td>Holistic; Advisory Board for Integrity &amp; Sustainability</td><td>Holistic "Care" model; −50% intensity targets</td><td>Impact-focused via Six Challenges</td></tr>
        <tr><td>Assurance</td><td>Reasonable Assurance — highest audit standard, post-2015 trust rebuild</td><td>Mix of Limited/Reasonable for key indicators</td><td>Limited Assurance — industry standard</td><td>Limited Assurance — industry standard</td></tr>
        <tr><td>Governance</td><td>Independent Sustainability Council challenges the Board</td><td>Board-level member for Integrity, Governance &amp; Sustainability</td><td>Integrated Carbon Net Zero action plan across engineering/purchasing</td><td>"Sustainability Meeting" deciding long-term strategies</td></tr>
      </tbody>
    </table>
    <h3>Strengths &amp; Weaknesses</h3>
    <table>
      <thead>
        <tr><th>Company</th><th>Key Strength</th><th>Key Weakness</th></tr>
      </thead>
      <tbody>
        <tr><td>Volkswagen</td><td>Reasonable Assurance; S-Rating hard-block for 63,000+ suppliers; #1 EV Europe 2025</td><td>Razor-thin 2025 EU compliance margin; Scope 3 not SBTi-validated</td></tr>
        <tr><td>Mercedes-Benz</td><td>Net Zero 2039; Ambition Letter ties CO₂ neutrality into supplier contracts</td><td>Walked back full-electrification pledge; primarily Limited Assurance</td></tr>
        <tr><td>Stellantis</td><td>Industry-leading 2038 Net Zero; Mirafiori 4R Hub as circular economy benchmark</td><td>⚠ Scaled back "Dare Forward 2030" in 2024 following major profit warnings — itself evidence of the Ambition vs. Integration conflict. The 2038 target remains, but execution credibility is under scrutiny.</td></tr>
        <tr><td>Toyota</td><td>TPS/Kaizen operational excellence; Life Cycle Zero commitment across full vehicle life</td><td>EU 2035 BEV mandate compliance risk; Limited Assurance standard</td></tr>
      </tbody>
    </table>
    <p>
      The governance comparison reveals a structural finding that the headline metrics alone obscure.
      VW's combination of Reasonable Assurance and an Independent Sustainability Council represents the
      industry's strongest audit culture among the four companies assessed. This matters for a reason
      that goes beyond compliance optics: audit quality correlates directly with the reliability of
      published targets. A company reporting under Limited Assurance with no independent governance
      oversight can revise reported emissions figures, adjust baseline years, or restate methodology
      more easily than one whose data has been subjected to positive-opinion external audit. The
      credibility risk this creates is not theoretical — Stellantis' 2024 plan rollback demonstrated
      precisely how quickly ambitious published targets can be revised when integration pressure arrives.
      Under a Reasonable Assurance regime, such revision requires auditor re-engagement and creates a
      visible, documented break in the reporting record. The audit standard is therefore not merely a
      reporting technicality: it is a structural constraint on future opportunistic target revision, and
      VW's adoption of it post-Dieselgate carries a specific strategic signalling function to capital
      markets and regulators that competitors operating under standard Limited Assurance cannot replicate.
    </p>
  </div>,

  /* Page 4 — Management Conflicts & Risk Trade-Offs */
  <div key="sec04-p4">
    <h2>Management Conflicts &amp; Risk Trade-Off Matrix</h2>
    <p>
      Applying Lecture 2's Strategic Conflict framework: each company faces a fundamental
      trade-off that constrains its sustainability transformation.
    </p>
    <table>
      <thead>
        <tr><th>Company</th><th>Core Conflict</th><th>Financial Risk</th><th>Regulatory Risk</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Volkswagen</strong></td><td>Scale vs. Agility — transforming 600,000-employee super-tanker while needing software-driven speed</td><td>HIGH — €89B Capex commitment</td><td>LOW — aligned with EU 2035 mandate</td></tr>
        <tr><td>Mercedes-Benz</td><td>Luxury vs. Weight — heavy materials conflict with carbon-neutral fleet target by 2039</td><td>MEDIUM — selective investment</td><td>LOW-MEDIUM — slight compliance buffer</td></tr>
        <tr><td>Stellantis</td><td>Ambition vs. Integration — 2038 Net Zero while merging 14 global brands. The 2024 plan rollback validates the framework: the original targets were driven by ambitious target-setting divorced from operational and financial integration, and when margin and demand pressure arrived, the ambition collapsed — precisely the failure mode the framework predicts.</td><td>MEDIUM-HIGH — restructuring costs + plan rollback</td><td>LOW-MEDIUM — Net Zero target still ahead of EU timeline</td></tr>
        <tr><td>Toyota</td><td>Diversity vs. Regulation — Multi-Pathway pragmatism vs. EU 2035 BEV mandate squeeze</td><td>LOW — leverages existing hybrid tech</td><td>HIGH — EU 2035 BEV mandate risk</td></tr>
      </tbody>
    </table>
    <div className="pull-quote">
      "Stellantis sets the most aggressive Net Zero timeline (2038), but its Ambition vs. Integration
      conflict is the industry's highest execution risk. VW's Governance Integrity — Reasonable
      Assurance and hard-block S-Rating — is its competitive moat post-Dieselgate."
    </div>
    <h3>Stellantis 2024 Rollback — Mechanism Analysis</h3>
    <p>
      The Stellantis plan rollback in 2024 warrants detailed examination because it provides the
      clearest industry example of how the Ambition vs. Integration failure mode materialises in
      practice. The sequence of events follows a recognisable pattern. Stellantis' CFO change — with
      Natalie Knight departing and a cost-discipline agenda intensifying under the subsequent finance
      leadership — created organisational pressure to re-examine the capital commitments embedded in
      the "Dare Forward 2030" plan. This coincided with two external shocks: EV demand softening in
      European markets through the second half of 2023 and into 2024, and margin pressure from
      Tesla's sustained price cutting, which forced industry-wide responses that compressed profitability
      on existing BEV product lines. The combination of internal cost discipline pressure and external
      demand and margin deterioration is precisely the integration stress that the Ambition vs.
      Integration framework predicts will expose the gap between aspirational target-setting and
      operationally grounded commitment.
    </p>
    <p>
      The rollback validates the framework's central claim: that sustainability ambition without deep
      operational and financial integration produces targets that are vulnerable to revision the moment
      market conditions change. Stellantis' 2038 net zero date and its "Dare Forward" narrative were
      constructed under favourable market assumptions. When those assumptions broke, the targets had
      insufficient organisational embedding — in purchasing decisions, platform architecture, workforce
      planning, and capital allocation — to survive unchanged. The lesson for VW is that governance
      integrity and operational integration are not merely reputational advantages; they are structural
      defences against the same failure mode. VW's €89B committed capital, its mandatory S-Rating
      contractual architecture, and its Reasonable Assurance reporting regime collectively make the
      kind of quiet plan revision that Stellantis executed in 2024 substantially harder to perform
      without creating a visible, auditable break in the record.
    </p>
  </div>,

  /* Page 5 — Framework Summary & Net Zero Timeline */
  <div key="sec04-p5">
    <h2>Full Framework Summary Matrix</h2>
    <table>
      <thead>
        <tr><th>Framework</th><th>Volkswagen</th><th>Mercedes-Benz</th><th>Stellantis</th><th>Toyota</th></tr>
      </thead>
      <tbody>
        <tr><td>Materiality</td><td>Double Materiality</td><td>Holistic / Financial</td><td>Holistic "Care" model</td><td>Impact (Six Challenges)</td></tr>
        <tr><td>SBTi Alignment</td><td>1.5°C (S1+2 validated)</td><td>1.5°C (All Scopes)</td><td>Committed</td><td>1.5°C (S1+2 only)</td></tr>
        <tr><td>Assurance Level</td><td>Reasonable (Gold)</td><td>Limited/Reasonable</td><td>Limited (Standard)</td><td>Limited (Standard)</td></tr>
        <tr><td>Net Zero Target</td><td>2050</td><td>2039</td><td>2038</td><td>2050</td></tr>
        <tr><td>EV Strategy</td><td>100% BEV Europe 2035</td><td>Electric-only where viable</td><td>Multi-Energy Platform</td><td>Multi-Pathway (HEV/BEV)</td></tr>
        <tr><td>Circular Economy</td><td>Closed-Loop Battery System</td><td>96% Material Recovery</td><td>Mirafiori 4R Hub</td><td>Battery 2nd Life Programme</td></tr>
        <tr><td>Key Strength</td><td>Governance Integrity</td><td>Luxury Brand Trust</td><td>Earliest Net Zero (2038)</td><td>Operational Excellence (TPS)</td></tr>
        <tr><td>Key Weakness</td><td>0g EU compliance margin</td><td>Backed off all-electric</td><td>14-brand integration risk</td><td>EU regulatory squeeze</td></tr>
      </tbody>
    </table>
    <div className="pull-quote">
      Net Zero Timeline: Stellantis (2038) → Mercedes-Benz (2039) → VW / Toyota (2050).
      VW sacrifices timeline leadership for Governance Integrity — the only competitor with
      Reasonable Assurance and a hard-block supplier S-Rating system.
    </div>
  </div>,
]

const SEC05_PAGES = [
  /* Page 1 */
  <div key="sec05-p1">
    <h2>Recommended Strategy 2025–2035</h2>
    <p>
      Based on analysis of VW's sustainability performance, competitive benchmarking, and application
      of the GHG Protocol, SBTi, and Doughnut Economics frameworks.
    </p>
    <table>
      <thead>
        <tr><th>Assessment</th><th>Finding</th></tr>
      </thead>
      <tbody>
        <tr><td>Key Risk</td><td>0g EU compliance margin for 2025. Any EV sales shortfall = multi-billion fines.</td></tr>
        <tr><td>Key Gap</td><td>SBTi Scope 3 validation not yet completed. This is the #1 credibility gap.</td></tr>
        <tr><td>Key Strength</td><td>Scale and portfolio breadth. #1 EV in Europe 2025. €15B green bond momentum.</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 2 */
  <div key="sec05-p2">
    <h2>R1 — Environmental <span className="mark-red">[CRITICAL]</span></h2>
    <h3>Accelerate Scope 3 Category 11 Reduction</h3>
    <p>
      <span className="mark-red">Category 11 (Use of Sold Products) is ~94% of total Scope 3 at 688 Mt CO₂e.</span>
      No Net Zero 2050 is achievable without aggressively reducing ICE fleet share.
    </p>
    <table>
      <thead>
        <tr><th>Target</th><th>Detail</th></tr>
      </thead>
      <tbody>
        <tr><td>30% BEV share globally by 2028</td><td>Feasible with current investment trajectory (vs current ~20%)</td></tr>
        <tr><td>Full BEV in Europe by 2035</td><td>NO derogations — required for regulatory compliance</td></tr>
        <tr><td>−30% carbon intensity/vehicle-km by 2030</td><td>SBTi validated, on track vs 2018 baseline</td></tr>
      </tbody>
    </table>
    <p>
      <strong>Operations:</strong> Accelerate ID.2 (€25K entry-level) launch to democratise EVs.
      Expand IONITY charging partnership.<br/>
      <strong>Products:</strong> Redesign all future platforms as BEV-only. No new ICE platform investment post-2026.
    </p>
    <p>
      The strategic case for democratising EV access — specifically the ID.2 at a sub-€25,000 price
      point — is grounded in Category 11 emissions arithmetic, not in commercial positioning alone.
      Premium battery-electric vehicles such as the Mercedes EQS or BMW i7 do not materially shift
      the mass-market emissions curve because they displace premium ICE vehicles that represent a
      small fraction of total fleet kilometres driven. The emissions intensity of the premium segment
      is high per vehicle, but the volume is low. By contrast, the high-volume segments — the Polo,
      Golf, and A-segment equivalents — generate the majority of total fleet emissions precisely
      because their aggregate kilometres driven at scale far outweigh any premium segment contribution.
      A transition to BEV in the volume segments therefore delivers a disproportionately larger
      absolute emissions reduction than an equivalent transition in the premium segment. The ID.2 is
      not, therefore, simply a commercial response to market demand at the affordable end; it is an
      emissions abatement instrument targeting the part of the fleet that determines whether Category
      11 targets are achievable. Delaying or deprioritising the ID.2 in favour of higher-margin
      premium BEV products would be financially rational on a per-unit basis but structurally
      inconsistent with VW's Category 11 reduction commitments.
    </p>
  </div>,

  /* Page 3 */
  <div key="sec05-p3">
    <h2>R2 — Environmental [HIGH]</h2>
    <h3>Circular Economy Leadership — Battery Closed Loop</h3>
    <p>
      Benchmarked against Renault's Cradle-to-Cradle leadership, VW must establish
      battery recycling as a strategic asset, not a compliance exercise.
    </p>
    <table>
      <thead>
        <tr><th>Target</th><th>Detail</th></tr>
      </thead>
      <tbody>
        <tr><td>40% circular materials by 2040</td><td>Stretch target, requires upstream investment</td></tr>
        <tr><td>95%+ battery materials recovered</td><td>Achievable with Salzgitter facility</td></tr>
        <tr><td>Net positive biodiversity by 2030</td><td>Aligned with Kunming-Montreal framework</td></tr>
      </tbody>
    </table>
    <p>
      <strong>Operations:</strong> Scale the Salzgitter battery recycling plant to European-wide capacity.
      Partner with Redwood Materials or equivalent.<br/>
      <strong>Products:</strong> Design with "Design for Disassembly" principles — standardised battery formats.
    </p>
    <p>
      Design for Disassembly is a prerequisite for achieving circular economy targets in the battery
      supply chain, not merely a desirable design philosophy. Without it, battery recovery requires
      destructive hydrometallurgical processes — shredding, leaching, and chemical separation — that
      degrade cathode active materials in the process. Degraded cathode materials cannot be directly
      recycled into equivalent-quality new cathodes; they must be reprocessed through more
      energy-intensive refining steps that reduce overall recovery rates and eliminate the possibility
      of direct cathode-to-cathode recycling. The consequence is that circular economy targets expressed
      as percentage recovery rates are achievable in aggregate, but the recovered material is of lower
      purity and economic value than the original. VW's 2021 investment in Northvolt's recycling
      facility and its partnership with Umicore specifically addresses this constraint by combining
      hydrometallurgical capability with the design intent to enable non-destructive battery extraction.
      However, the environmental and economic benefit of those partnerships only materialises in full
      if the original battery design enables non-destructive disassembly. This creates a direct design
      feedback loop: the strategic value of the recycling infrastructure investment is determined by
      decisions made years earlier in the engineering of the battery system. For VW, this means Design
      for Disassembly cannot remain a principle applied at the product development margin — it must
      be a binding constraint applied at the platform architecture level, with standardised module
      formats that enable mechanical rather than chemical separation at end of life.
    </p>
    <h2>R3 — Social [HIGH]</h2>
    <h3>Supply Chain Human Rights — Mandatory S-Rating Enforcement</h3>
    <table>
      <thead>
        <tr><th>Target</th><th>Detail</th></tr>
      </thead>
      <tbody>
        <tr><td>100% Tier 1 suppliers S-Rated by 2026</td><td>Achievable — current system covers majority</td></tr>
        <tr><td>Extend S-Rating to Tier 2 by 2028</td><td>Requires investment in audit infrastructure</td></tr>
        <tr><td>Zero child labour incidents by 2027</td><td>Blockchain traceability programme on track</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 4 */
  <div key="sec05-p4">
    <h2>R4 — Governance [MEDIUM]</h2>
    <h3>Rebuild Trust — Upgrade to Full Reasonable Assurance</h3>
    <table>
      <thead>
        <tr><th>Target</th><th>Detail</th></tr>
      </thead>
      <tbody>
        <tr><td>Achieve CDP "A" rating by 2026</td><td>Achievable with enhanced Scope 3 disclosure (currently A−)</td></tr>
        <tr><td>Sustainability Council annual report</td><td>Governance structure already in place</td></tr>
        <tr><td>SBTi Scope 3 validation by 2026</td><td>Critical gap vs BMW — requires immediate action</td></tr>
      </tbody>
    </table>
    <p>
      <strong>Operations:</strong> Publish the Sustainability Council's challenge letters and Board responses annually.<br/>
      <strong>Products:</strong> Apply TCFD-aligned scenario analysis to all new product decisions.
    </p>
  </div>,

  /* Page 5 */
  <div key="sec05-p5">
    <h2>Strategic Roadmap — 2025–2035</h2>
    <table>
      <thead>
        <tr><th>Year</th><th>Milestones</th></tr>
      </thead>
      <tbody>
        <tr><td>2025</td><td>Achieve EU fleet CO₂ compliance (0g margin); Publish S-Rating Tier 1 data; Submit Scope 3 targets to SBTi</td></tr>
        <tr><td>2026</td><td>Launch ID.2 entry-level BEV (&lt;€25,000); Achieve CDP "A" rating; External Sustainability Council annual challenge report</td></tr>
        <tr><td>2027</td><td>100% renewable energy at all European plants; Tier 2 S-Rating pilot; Zero certified incidents of child labour in raw materials</td></tr>
        <tr><td>2028</td><td>30% BEV share globally; 20% circular materials in new vehicles; Scope 1+2 reduction 35% vs 2018</td></tr>
        <tr><td>2030</td><td>Zero Impact Factory at all European sites; −40% carbon footprint per vehicle-km vs 2018; Scope 1+2 −50% (SBTi target)</td></tr>
        <tr><td>2035</td><td>100% BEV in Europe — NO ICE sales; 40% circular materials target in sight; Net Zero preparation — residual emissions only</td></tr>
      </tbody>
    </table>
  </div>,
]

const SEC06_PAGES = [
  /* Page 1 */
  <div key="sec06-p1">
    <h2>Executive Summary</h2>
    <p>
      A 30-minute briefing for the Volkswagen Board of Management. Key findings, competitive
      position, and the five critical actions required for 2025–2035.
    </p>
    <div className="pull-quote">
      "VW's shift from a Value Destroyer to a Reasonable Assurance leader proves that transformation
      is possible — but its razor-thin compliance margin makes 2025–2030 a make-or-break era."
    </div>
    <h3>Key Findings</h3>
    <ol>
      <li><strong>VW is in Transformation (Wave 3)</strong> — Following Dieselgate, VW has structurally reoriented. The "regenerate+" strategy positions VW as an integral part of society.</li>
      <li><strong><span className="mark-red">Scope 3 is the Battle Ground</span></strong> — ~95% of VW's total emissions are Scope 3, with Category 11 at 688 Mt CO₂e. The EV transition is the climate strategy.</li>
      <li><strong>People &amp; Planet Pillar Credible</strong> — VW's S-Rating system, cobalt traceability, and Reasonable Assurance reporting put VW ahead of Mercedes-Benz and Toyota on transparency.</li>
      <li><strong>Key Differentiator vs Stellantis</strong> — Stellantis leads on timeline (2038) but scaled back its "Dare Forward" plan in 2024. VW's governance integrity is the stronger structural signal.</li>
    </ol>
  </div>,

  /* Page 2 */
  <div key="sec06-p2">
    <h2>Five Critical Actions — Board Priorities</h2>
    <table>
      <thead>
        <tr><th>#</th><th>Action</th><th>Timing</th></tr>
      </thead>
      <tbody>
        <tr><td><span className="circle-red">01</span></td><td>Submit Scope 3 targets to SBTi for validation — close the #1 credibility gap vs Mercedes-Benz</td><td>Immediate</td></tr>
        <tr><td><span className="circle-red">02</span></td><td>Execute 2025 EU CO₂ compliance at 0g margin — any delay = billions in fines</td><td>Critical</td></tr>
        <tr><td>03</td><td>Launch ID.2 entry-level BEV to drive Category 11 reductions at scale</td><td>2026</td></tr>
        <tr><td>04</td><td>Extend S-Rating to Tier 2 suppliers — complete the cobalt/lithium traceability chain</td><td>2027–2028</td></tr>
        <tr><td>05</td><td>Achieve CDP "A" rating and publish Sustainability Council challenge report annually</td><td>2026</td></tr>
      </tbody>
    </table>
    <hr/>
    <h3>Analytical Frameworks Applied</h3>
    <table>
      <thead>
        <tr><th>Framework</th><th>Application</th></tr>
      </thead>
      <tbody>
        <tr><td>Dunphy et al. (2003)</td><td>Categorising VW's journey through 3 Waves of Sustainability</td></tr>
        <tr><td>GHG Protocol</td><td>Scope 1, 2 &amp; 3 emissions accounting</td></tr>
        <tr><td>SBTi</td><td>1.5°C alignment for Scope 1+2; Well-below 2°C for Scope 3</td></tr>
        <tr><td>Doughnut Economics</td><td>3-Nested Dependencies model</td></tr>
        <tr><td>Triple Bottom Line</td><td>People, Planet, Profit as nested, not overlapping</td></tr>
        <tr><td>Double Materiality (EU CSRD)</td><td>Financial + Impact materiality for comprehensive risk assessment</td></tr>
      </tbody>
    </table>
  </div>,
]

const SECTIONS = {
  'SEC-01': { title: 'OVERVIEW', pages: SEC01_PAGES },
  'SEC-02': { title: 'CARBON ACCOUNTING', pages: SEC02_PAGES },
  'SEC-03': { title: 'TRIPLE BOTTOM LINE', pages: SEC03_PAGES },
  'SEC-04': { title: 'BENCHMARKING', pages: SEC04_PAGES },
  'SEC-05': { title: 'STRATEGY 2035', pages: SEC05_PAGES },
  'SEC-06': { title: 'EXECUTIVE SUMMARY', pages: SEC06_PAGES },
}

export function getSectionData(code) {
  return SECTIONS[code] ?? { title: 'UNKNOWN', pages: [<p key="err">Section not found.</p>] }
}
