import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ImpactMetrics from './components/ImpactMetrics'
import CoreExpertises from './components/CoreExpertises'
import JourneyTimeline from './components/JourneyTimeline'
import ProjectsGrid from './components/ProjectsGrid'
import ContactFooter from './components/ContactFooter'
import ProjectDetail from './components/ProjectDetail'

function HomePage() {
  return (
    <>
      <Hero />
      <ImpactMetrics />
      <CoreExpertises />
      <JourneyTimeline />
      <ProjectsGrid />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-textPrimary font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
          </Routes>
        </main>
        <ContactFooter />
      </div>
    </Router>
  )
}

export default App
