/**
 * sections.jsx — Content data for all 6 report sections.
 * Each section has a title and an array of JSX page nodes.
 */

const SEC01_PAGES = [
  /* Page 1 */
  <div key="sec01-p1">
    <h2>From Value Destroyer to Value Creator</h2>
    <p>
      The 2015 "Dieselgate" emissions scandal marked a structural turning point for Volkswagen.
      What began as a failure in the Compliance phase of the Dunphy et al. (2003) Waves of Sustainability
      model catalysed a transformation into VW's current third wave: the Sustaining Corporation.
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
        <tr><td><strong>Compliance</strong></td><td>Avoiding multi-billion euro fines for fleet CO₂ non-compliance. VW at 0g compliance margin for 2025</td><td>0g margin — critical</td></tr>
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
      For an automaker like VW, Scope 3 Category 11 (Use of Sold Products) represents
      688 Mt CO₂e — the single most material category. These emissions occur when customers
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
        <tr><td>63,000+ Suppliers</td><td>S-Rating Supplier System</td><td>Mandatory sustainability rating. Failure on "People" criteria = no contract</td></tr>
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
        <tr><td>Net Positive by 2030</td><td>Biodiversity Commitment</td><td>Net positive biodiversity at all new factory sites, aligned with Kunming-Montreal Framework</td></tr>
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
        <tr><td>0g Margin — Critical</td><td>Avoided Fines</td><td>EU fleet CO₂ compliance at 0g margin. Each gram over = ~€95 fine × 8M+ vehicles sold</td></tr>
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
  /* Page 1 */
  <div key="sec04-p1">
    <h2>Quantitative &amp; Qualitative Benchmark</h2>
    <p>
      Comparing VW against Mercedes-Benz, BMW, Toyota, and BYD across SBTi alignment,
      carbon intensity, EV strategy, reporting quality, and regulatory compliance.
    </p>
    <div className="pull-quote">
      "While Mercedes-Benz targets an earlier net-zero date (2039), Volkswagen is betting on massive
      industrial scale and a more aggressive 2035 EV-only mandate in Europe."
    </div>
    <h3>Strategic Comparison Matrix</h3>
    <table>
      <thead>
        <tr><th>Company</th><th>EV Strategy</th><th>SBTi</th><th>Carbon/vehicle</th><th>EU Compliance</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Volkswagen</strong></td><td>All-In BEV</td><td>1.5°C (S1+2)</td><td>0.68 tCO₂e</td><td>0g margin ⚠</td></tr>
        <tr><td>Mercedes-Benz</td><td>Flexible (50/50 by 2030)</td><td>1.5°C (All Scopes)</td><td>0.54 tCO₂e</td><td>+8g over</td></tr>
        <tr><td>BMW</td><td>Technology Openness</td><td>1.5°C (All Scopes)</td><td>0.58 tCO₂e</td><td>+13g over</td></tr>
        <tr><td>Toyota</td><td>Multi-Pathway (HEV)</td><td>1.5°C (S1+2)</td><td>0.72 tCO₂e</td><td>Compliance risk EU</td></tr>
        <tr><td>BYD</td><td>Vertical Integration</td><td>Not disclosed</td><td>0.52 tCO₂e</td><td>Outside EU</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 2 */
  <div key="sec04-p2">
    <h2>Compliance Clock — EU CO₂ Targets 2025</h2>
    <p>
      EU fleet-wide CO₂ target: &lt;93.6g/km for 2025. Each gram of non-compliance = ~€95 fine
      × all vehicles sold. For VW's 8M+ annual volume, this means billions at stake.
    </p>
    <table>
      <thead>
        <tr><th>Company</th><th>Position</th></tr>
      </thead>
      <tbody>
        <tr><td>BMW</td><td>+13g over-compliant</td></tr>
        <tr><td>Mercedes-Benz</td><td>+8g over-compliant</td></tr>
        <tr><td>Volkswagen ⚠</td><td>~0g margin — CRITICAL</td></tr>
        <tr><td>Toyota</td><td>Compliance risk EU</td></tr>
      </tbody>
    </table>
    <div className="pull-quote">
      VW's razor-thin 2025 compliance margin means any unexpected slowdown in EV sales in H2 2025
      could trigger multi-billion euro fines — making 2025–2030 VW's most critical execution period.
    </div>
  </div>,

  /* Page 3 */
  <div key="sec04-p3">
    <h2>Anti-Greenwash Analysis — Transparency Index</h2>
    <table>
      <thead>
        <tr><th>Company</th><th>Score</th><th>Assurance Level</th><th>CDP</th><th>SBTi</th></tr>
      </thead>
      <tbody>
        <tr><td>BMW</td><td>95</td><td>Reasonable</td><td>A</td><td>Validated (All Scopes)</td></tr>
        <tr><td>Volkswagen</td><td>88</td><td>Reasonable</td><td>A−</td><td>Validated (S1+2)</td></tr>
        <tr><td>Mercedes-Benz</td><td>78</td><td>Limited</td><td>A−</td><td>Validated (All Scopes)</td></tr>
        <tr><td>Toyota</td><td>65</td><td>Limited</td><td>B</td><td>Validated (S1+2)</td></tr>
      </tbody>
    </table>
    <h3>Strengths &amp; Weaknesses</h3>
    <table>
      <thead>
        <tr><th>Company</th><th>Key Strength</th><th>Key Weakness</th></tr>
      </thead>
      <tbody>
        <tr><td>Volkswagen</td><td>#1 EV Europe 2025; Reasonable Assurance; S-Rating 63,000+ suppliers</td><td>Razor-thin 2025 compliance margin; Scope 3 not SBTi-validated</td></tr>
        <tr><td>Mercedes-Benz</td><td>Net Zero 2039; carbon-neutral plants since 2022</td><td>Walked back full-electrification pledge; Limited Assurance</td></tr>
        <tr><td>BYD</td><td>Global #1 BEV by volume; owns full supply chain</td><td>No SBTi nor public CDP disclosure</td></tr>
        <tr><td>Toyota</td><td>TPS/Kaizen operational excellence; high Edelman trust</td><td>EU 2035 BEV mandate lock-out risk</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 4 */
  <div key="sec04-p4">
    <h2>Risk Trade-Off Matrix</h2>
    <table>
      <thead>
        <tr><th>Company</th><th>Strategy</th><th>Financial Risk</th><th>Regulatory Risk</th></tr>
      </thead>
      <tbody>
        <tr><td>Volkswagen</td><td>All-In BEV</td><td>HIGH — €89B Capex</td><td>LOW — compliant with EU mandate</td></tr>
        <tr><td>Mercedes-Benz</td><td>Flexible / Luxury BEV</td><td>MEDIUM — selective investment</td><td>LOW-MEDIUM — slight buffer</td></tr>
        <tr><td>BYD</td><td>Vertical Integration BEV</td><td>LOW — owns supply chain</td><td>LOW — leads in China/Global</td></tr>
        <tr><td>Toyota</td><td>Multi-Pathway (HEV)</td><td>LOW — leverages existing tech</td><td>HIGH — EU 2035 BEV mandate risk</td></tr>
      </tbody>
    </table>
    <div className="pull-quote">
      "The automotive industry is split into two camps. VW and BYD are betting on a BEV-only future.
      Toyota uses a multi-pathway approach. VW's move to Reasonable Assurance and its 2035 BEV mandate
      position it as the more transparent leader in the global Transformation Wave."
    </div>
  </div>,

  /* Page 5 */
  <div key="sec04-p5">
    <h2>Framework Summary Matrix</h2>
    <table>
      <thead>
        <tr><th>Framework</th><th>Volkswagen</th><th>Mercedes-Benz</th><th>BYD</th><th>Toyota</th></tr>
      </thead>
      <tbody>
        <tr><td>Materiality</td><td>Double Materiality</td><td>Financial focus</td><td>Impact focus</td><td>Hybrid-centric Impact</td></tr>
        <tr><td>SBTi Alignment</td><td>1.5°C (S1+2 validated)</td><td>1.5°C (All Scopes)</td><td>Committed</td><td>1.5°C (S1&amp;2 only)</td></tr>
        <tr><td>Assurance Level</td><td>Reasonable</td><td>Limited</td><td>CSRD (limited)</td><td>Limited</td></tr>
        <tr><td>Net Zero Target</td><td>2050</td><td>2039</td><td>2045</td><td>2050</td></tr>
        <tr><td>EV Strategy</td><td>100% BEV Europe 2035</td><td>50/50 by 2030 (revised)</td><td>BEV + PHEV</td><td>Multi-Pathway</td></tr>
        <tr><td>Key Strength</td><td>Industrial Scale</td><td>Luxury Efficiency</td><td>Vertical Integration</td><td>Operational Lean (TPS)</td></tr>
        <tr><td>Key Weakness</td><td>Compliance margin 0g</td><td>Backed off all-electric</td><td>No SBTi/CDP</td><td>EU regulatory risk</td></tr>
      </tbody>
    </table>
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
        <tr><td>Key Gap vs BMW</td><td>SBTi Scope 3 validation not yet completed. This is the #1 credibility gap.</td></tr>
        <tr><td>Key Strength</td><td>Scale and portfolio breadth. #1 EV in Europe 2025. €15B green bond momentum.</td></tr>
      </tbody>
    </table>
  </div>,

  /* Page 2 */
  <div key="sec05-p2">
    <h2>R1 — Environmental [CRITICAL]</h2>
    <h3>Accelerate Scope 3 Category 11 Reduction</h3>
    <p>
      Category 11 (Use of Sold Products) is ~94% of total Scope 3 at 688 Mt CO₂e.
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
      <li><strong>Scope 3 is the Battle Ground</strong> — ~95% of VW's total emissions are Scope 3, with Category 11 at 688 Mt CO₂e. The EV transition is the climate strategy.</li>
      <li><strong>People &amp; Planet Pillar Credible</strong> — VW's S-Rating system, cobalt traceability, and Reasonable Assurance reporting put VW ahead of Mercedes-Benz and Toyota on transparency.</li>
      <li><strong>Key Differentiator vs Mercedes-Benz</strong> — Mercedes targets Net Zero by 2039 but backed off its all-electric pledge. VW's Reasonable Assurance standard and 2035 BEV mandate are stronger structural signals.</li>
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
        <tr><td>01</td><td>Submit Scope 3 targets to SBTi for validation — close the #1 credibility gap vs Mercedes-Benz and BMW</td><td>Immediate</td></tr>
        <tr><td>02</td><td>Execute 2025 EU CO₂ compliance at 0g margin — any delay = billions in fines</td><td>Critical</td></tr>
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

  /* Page 3 — Video placeholder */
  <div key="sec06-p3">
    <h2>Advisory Video — Executive Briefing</h2>
    <p>
      VW Sustainability Strategy 2035 — Executive Advisory Summary<br/>
      Imperial College London Business School | Group O | Duration: ~2 minutes
    </p>
    <div className="video-block" style={{ background: '#0f0f0f', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #000' }}>
      <span style={{ color: '#e8a020', fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.1em' }}>
        VIDEO — TO BE RECORDED AND EMBEDDED
      </span>
    </div>
    <p style={{ marginTop: '12px', color: 'rgba(15,15,15,0.6)', fontSize: '13px' }}>
      Placeholder. Replace with an mp4 src or YouTube embed once the recording is complete.
    </p>
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
