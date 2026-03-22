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
            <strong>Group:</strong> O | <strong>Assessment:</strong> Website Report (30%)<br/>
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

          <h3>AI Tools Used</h3>
          <p>
            <em>This section is a placeholder. The group must complete this document before submission
            with a full account of which AI tools were used, in which tasks, and what human
            verification and critical evaluation was applied.</em>
          </p>
          <p>
            The completed document should cover: content research and drafting, data verification,
            framework application, writing refinement, and website development. For each use,
            describe the nature of the AI input, the human editorial oversight applied, and any
            limitations identified.
          </p>
          <p>
            Target length: 1,000–2,000 words.
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
