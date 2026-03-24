import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Paperclip from '../components/Paperclip'
import './AIScreen.css'

export default function AIScreen({ onBack }) {
  const docRef = useRef(null)

  useGSAP(() => {
    gsap.from(docRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, { scope: docRef })

  function handleBack() {
    const tl = gsap.timeline({ onComplete: onBack })
    tl.to(docRef.current, { opacity: 0, y: 20, duration: 0.25, ease: 'power2.in' })
  }

  return (
    <div className="ai-screen">
      <div className="reading-doc" ref={docRef}>
        <button className="reading-doc__back" onClick={handleBack}>
          ← BACK
        </button>

        <div className="reading-doc__paperclip">
          <Paperclip />
        </div>

        <div className="reading-doc__header">
          <span className="reading-doc__section-code">AI</span>
          <span className="reading-doc__sep">·</span>
          <span className="reading-doc__section-title">USE STATEMENT</span>
        </div>

        <div className="reading-doc__body">
          <h2>Artificial Intelligence Use Disclosure</h2>
          <p>
            <strong>Course:</strong> Sustainable Business (IB)<br/>
            <strong>Institution:</strong> Imperial College London Business School<br/>
            <strong>Group:</strong> O | <strong>Assessment:</strong> Website Report (40%)<br/>
            <strong>Submission Date:</strong> 23rd March 2026
          </p>

          <hr/>

          <h3>Declaration</h3>
          <p>
            This document constitutes the group's full disclosure of all artificial intelligence tools
            used in the preparation of this advisory report. It is submitted in accordance with the
            Imperial College London Academic Integrity Policy and the specific requirements of
            Dr James Robey's Sustainable Business module.
          </p>

          <p>
            The following disclosure details the manner in which Artificial Intelligence (AI) tools
            were integrated into the research, analytical, and technical processes undertaken in the
            production of this project. It will not be possible to proceed without first acknowledging
            that the team comprised individuals with substantially differing levels of technical
            expertise; a circumstance which, be that as it may, ultimately shaped the methodology
            adopted and informed the precise configuration of AI tools employed at each stage of
            development.
          </p>
          <p>
            On the whole, AI was positioned not as an author or autonomous contributor, but as a
            research facilitator and technical executor operating under continuous human direction,
            a philosophy generally understood in the literature as a "Human-in-the-Loop" (HITL)
            approach. Every strategic recommendation, quantitative data point, and analytical argument
            presented on the website was either independently derived or manually verified against
            official primary sources, including the Volkswagen Group (VWG) 2024 Sustainability Report,
            Carbon Disclosure Project (CDP) filings, and European Union (EU) Taxonomy disclosures.
            What is more, the final analysis and all substantive intellectual contributions remain
            unambiguously the work of the group.
          </p>
          <p>
            The following disclosure is structured across three areas: research and scoping, technical
            development, and academic integrity.
          </p>

          <h3>Research and Scoping</h3>
          <p>
            The analytical challenge of auditing a corporation of VWG's scale, a group operating
            across more than 100 production facilities globally and reporting against frameworks
            including the Task Force on Climate-related Financial Disclosures (TCFD) and the Science
            Based Targets initiative (SBTi), presented a genuine risk of scope deficiency; that is,
            the inadvertent omission of material issues buried within hundreds of pages of corporate
            disclosure. To mitigate said risk, large language models (LLMs), specifically GPT-4o
            (OpenAI) and Gemini Flash (Google), were employed not to generate analytical content, but
            to interrogate the completeness of the research plan itself. Prompts were structured so as
            to elicit critical challenge, for instance requesting that the model identify dimensions of
            VWG's sustainability exposure that an initial research framework may have overlooked, rather
            than to produce substantive claims. Furthermore, Perplexity AI was utilised as a
            citation-directed search instrument, whereby the group sought the locations of relevant data
            (specific report sections, CDP response categories, EU Taxonomy alignment tables) rather
            than the data itself, thereby preserving the integrity of the primary source chain. It can
            be seen that this distinction between asking AI for facts and asking AI for the location of
            facts was central to the group's approach to academic rigour throughout.
          </p>

          <h3>Technical Development</h3>
          <p>
            The interactive website was developed using an AI-assisted coding methodology, reflecting
            the significant disparity in programming experience across the group. The primary
            development tool was Claude Code (Anthropic), a terminal-based AI coding agent capable of
            reading, writing, and editing code files directly within a local development environment.
            The website was built on a React and Vite framework, with animations implemented via GSAP
            and Framer Motion, and deployed continuously to Vercel through a GitHub integration whereby
            approved changes were reflected on the live site within approximately thirty seconds of each
            commit. Throughout development, Vite's local development server provided a real-time visual
            preview of every AI-generated change, creating an iterative review loop wherein no
            modification was committed without prior visual approval.
          </p>
          <p>
            Voice-to-text transcription, via Whisper Flow, was employed to dictate development
            instructions verbally rather than through typed prompts; a methodological choice that proved
            consequential, as spoken natural language produces markedly richer contextual descriptions
            than typed shorthand, a distinction that materially improved the precision and quality of
            the AI's output across successive iterations. What is more, structured development workflows
            were enforced through the Superpowers plugin for Claude Code, which required design intent
            to be formalised before implementation, large features to be decomposed into step-by-step
            plans prior to execution, and experimental work to be isolated in separate branches so as to
            preserve the stability of the main codebase throughout. For tasks of sufficient scale, such
            as the concurrent redevelopment of all seven data visualisation charts, multiple subagents
            were dispatched in parallel, reducing what would otherwise have been a sequential process of
            considerable duration into a single coordinated operation.
          </p>
          <p>
            It can be seen that the design concept itself, a neobrutalist aesthetic built around
            physical office objects comprising a filing cabinet for document navigation, a tablet for
            data visualisations, and a cathode-ray tube monitor for the executive summary video, was
            established through collaborative discussion with the AI prior to any technical
            implementation. This front-loaded conceptualisation process, wherein aesthetic and
            architectural decisions were resolved before code was written, was instrumental in
            preventing scope creep and maintaining visual coherence across the site's numerous iterative
            revisions.
          </p>

          <h3>Academic Integrity and Verification</h3>
          <p>
            Recognising the well-documented susceptibility of large language models to factual
            confabulation, the group implemented a mandatory verification workflow applied to every
            quantitative claim incorporated into the website. Source triangulation was conducted for all
            data points, including carbon reduction percentages, scope emissions figures, and SBTi
            alignment assessments, each of which was individually cross-referenced against the relevant
            page of the originating primary document before inclusion. Calculations proposed or
            structured by AI, particularly those relating to competitive benchmarking ratios, were
            manually re-derived to guard against unit misinterpretation. Citation mapping ensured that
            every analytical claim could be traced to a specific disclosure, with AI serving solely to
            locate the relevant passage rather than to characterise its significance.
          </p>
          <p>
            The limitations of AI in this project were, on the whole, most apparent in tasks requiring
            genuine strategic judgement. When prompted to critique the group's proposed strategy for
            VWG, the models produced responses of a notably templated character, lacking the
            industry-specific intuition and capacity for reasoned trade-off that the analytical brief
            demanded. The substantive creative work of reconciling near-term economic pressures with
            long-term environmental commitments in a credible and nuanced strategy required human
            deliberation that said tools could not meaningfully replicate. Be that as it may, the AI's
            contribution to data synthesis, research scoping, and technical execution was of considerable
            utility, and it can be seen that the project would not have reached its present standard of
            technical and presentational quality without it.
          </p>

          <hr/>

          <h3>Acknowledgement</h3>
          <p>
            We acknowledge the use of Claude Code (Anthropic), GPT-4o (OpenAI), Gemini Flash (Google),
            and Perplexity AI in the research, development, and technical production of this project.
            All quantitative data and strategic analysis were manually verified against official
            Volkswagen Group public disclosures. The final analysis and all intellectual contributions
            are those of the group.
          </p>

          <hr/>

          <p style={{ fontSize: '11px', color: 'rgba(15,15,15,0.55)', letterSpacing: '0.04em' }}>
            © 2026 Group O — Imperial College London Business School.<br/>
            Data sources: VW Group Sustainability Report 2024, CDP, SBTi Registry.
          </p>
        </div>
      </div>
    </div>
  )
}
