import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import AboutUs from "@/components/about-us"
import ProjectTimeline from "@/components/project-timeline"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Features />
          <AboutUs />
          <ProjectTimeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
