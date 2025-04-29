import React from "react"
import './LandingPage.css'
import { useState, useRef, useEffect } from "react"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { HiMenu, HiChevronLeft, HiChevronRight, HiMail, HiPhone, HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Image } from "antd"
export default function LandingPage() {
  // Header state
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Stories slider state
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [storyTouchStart, setStoryTouchStart] = useState(0)
  const [storyTouchEnd, setStoryTouchEnd] = useState(0)
  const storySliderRef = useRef(null)

  // Featured cases slider state
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)
  const [caseTouchStart, setCaseTouchStart] = useState(0)
  const [caseTouchEnd, setCaseTouchEnd] = useState(0)
  const caseSliderRef = useRef(null)

  // Stories data
  const stories = [
    {
      id: 1,
      title: "Mohammad's Recovery From Illness",
      description: "Mohammad received critical medical treatment thanks to generous donors",
      image: "/assets/ProjectGraduationImages/Rectangle 4.svg",
    },
    {
      id: 2,
      title: "Fatima's Education Journey",
      description: "Fatima was able to continue her studies with the help of our donors",
      image: "/assets/ProjectGraduationImages/Rectangle 4-1.svg",
    },
    {
      id: 3,
      title: "Ahmed's Family Support",
      description: "Ahmed's family received food and shelter during difficult times",
      image: "/assets/ProjectGraduationImages/Rectangle 4-2.svg",
    },
  ]

  // Featured cases data
  const featuredCases = [
    {
      id: 1,
      title: "Food for a Family",
      description: "This family needs immediate food assistance for their five children",
      image: "/assets/ProjectGraduationImages/Rectangle 4-3.svg",
    },
    {
      id: 2,
      title: "Medical Treatment",
      description: "Urgent medical treatment needed for a child with chronic illness",
      image: "/assets/ProjectGraduationImages/Rectangle 4-4.svg",
    },
    {
      id: 3,
      title: "Shelter Repair",
      description: "Help repair a family's home damaged by recent storms",
      image: "/assets/ProjectGraduationImages/Rectangle 4-5.svg",
    },
  ]

  // Categories data
  const categories = [
    {
      icon: "/assets/types/Group (2).svg",
      title: "Medical Aid",
      description: "Provide Healthcare, Medical Supplies, And Medications To Those In Need",
      color: "category-red",
    },
    {
      icon: "/assets/types/Group2.svg",
      title: "Food Assistance",
      description: "Deliver Food Baskets, Hot Meals, Or Grocery Vouchers",
      color: "category-yellow",
    },
    {
      icon: "/assets/types/Group3.svg",
      title: "Shelter Support",
      description: "Help With Repairs, Clothing, And Temporary Accommodation",
      color: "category-blue",
    },
    {
      icon: "/assets/types/Group (5).svg",
      title: "Financial & Utility Support",
      description: "Assistance With Bills, Rent, And Energy Or Water Expenses",
      color: "category-green",
    },
    {
      icon: "/assets/types/Group (4).svg",
      title: "Cleaning Supplies",
      description: "Disinfectants, Soaps, And Other Hygiene Products",
      color: "category-purple",
    },
    {
      icon: "/assets/types/Group (3).svg",
      title: "Emergency Psychological Support",
      description: "Professional Mental Health Services Offered By Skilled Volunteers",
      color: "category-orange",
    },
  ]

  // How it works data
  const beneficiarySteps = [
    {
      icon: "/assets/ProjectGraduationIcons/Vector.svg",
      title: "Submit Your Request",
      description: "Fill Out The Help Request Form Directly On The Website",
    },
    {
      icon: "/assets/ProjectGraduationIcons/Vector-1.svg",
      title: "Wait For Review",
      description: "Your Request Will Be Reviewed And Verified By The Agents",
    },
    {
      icon: "/assets/ProjectGraduationIcons/Vector-2.svg",
      title: "Receive The Help",
      description: "A Volunteer Will Deliver The Assistance To Your Location",
    },
  ]

  const donorSteps = [
    {
      icon: "/assets/ProjectGraduationIcons/Vector-3.svg",
      title: "Choose A Case",
      description: "Browse The Available Requests And Pick A Case To Support",
    },
    {
      icon: "/assets/ProjectGraduationIcons/Vector-4.svg",
      title: "Select Donation Type",
      description: "Decide Whether You Want To Donate Money Or Items",
    },
    {
      icon: "/assets/ProjectGraduationIcons/Vector-5.svg",
      title: "Complete The Donation",
      description: "Send Your Donation – A Volunteer Will Handle The Delivery",
    },
  ]

  const volunteerSteps = [
    {
      icon: "/assets/ProjectGraduationIcons/Vector-6.svg",
      title: "Create Your Account",
      description: "Sign Up As A Volunteer And Complete Your Profile With Your Skills",
    },
    {
      icon: "/assets/ProjectGraduationIcons/Vector-7.svg",
      title: "Pick A Delivery Task",
      description: "Choose From Available Tasks Based On Your Location And Availability",
    },
    {
      icon: "/assets/ProjectGraduationIcons/Vector-8.svg",
      title: "Deliver The Help",
      description: "Collect The Donations And Deliver Them To The Recipient",
    },
  ]

  // Stories slider functions
  const handlePrevStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex === 0 ? stories.length - 1 : prevIndex - 1))
  }

  const handleNextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex === stories.length - 1 ? 0 : prevIndex + 1))
  }

  const handleStoryDotClick = (index) => {
    setCurrentStoryIndex(index)
  }

  // Touch events for stories slider
  const handleStoryTouchStart = (e) => {
    setStoryTouchStart(e.targetTouches[0].clientX)
  }

  const handleStoryTouchMove = (e) => {
    setStoryTouchEnd(e.targetTouches[0].clientX)
  }

  const handleStoryTouchEnd = () => {
    if (storyTouchStart - storyTouchEnd > 50) {
      // Swipe left
      handleNextStory()
    }

    if (storyTouchStart - storyTouchEnd < -50) {
      // Swipe right
      handlePrevStory()
    }
  }

  // Cases slider functions
  const handlePrevCase = () => {
    setCurrentCaseIndex((prevIndex) => (prevIndex === 0 ? featuredCases.length - 1 : prevIndex - 1))
  }

  const handleNextCase = () => {
    setCurrentCaseIndex((prevIndex) => (prevIndex === featuredCases.length - 1 ? 0 : prevIndex + 1))
  }

  const handleCaseDotClick = (index) => {
    setCurrentCaseIndex(index)
  }

  // Touch events for cases slider
  const handleCaseTouchStart = (e) => {
    setCaseTouchStart(e.targetTouches[0].clientX)
  }

  const handleCaseTouchMove = (e) => {
    setCaseTouchEnd(e.targetTouches[0].clientX)
  }

  const handleCaseTouchEnd = () => {
    if (caseTouchStart - caseTouchEnd > 50) {
      // Swipe left
      handleNextCase()
    }

    if (caseTouchStart - caseTouchEnd < -50) {
      // Swipe right
      handlePrevCase()
    }
  }

  // Auto slide for stories every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextStory()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentStoryIndex])

  return (
    <div className="page-container">
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title">Giving Is The Bridge Of Hope</h1>
              <p className="hero-description">
                Send Your Donations To Those In Need And We Make Sure They Reach Those Who Truly Need Them
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary">Donate Now</button>
                <button className="btn btn-outline">Request Help</button>
              </div>
            </div>
            <div className="hero-image-container">
              <div className="hero-image-circle">
                <Image
                  src="/assets/headerbanner.svg"
                  alt="Child receiving aid"
                  preview={false}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="container about-container">
            <div className="about-image-container">
              <div className="about-image-circle">
                <Image src="/assets/headerbanner2.svg" alt="People in need" fill className="about-image" />
              </div>
            </div>
            <div className="about-content">
              <h2 className="section-title">About</h2>
              <p className="about-description">
                We Are A Digital Platform Designed To Connect Those In Need With Donors And Volunteers. It Is Simple And
                Secure Way You Can Submit Help Requests, Donate Money, Volunteer, And Track The Progress Of Your Donation
                Or Request. We Believe In Transparency, We Believe Technology Can Empower Fast And Efficient Charitable
                Support Worldwide.
              </p>
              <button className="btn btn-outline btn-with-icon">
                Get To Know Us <HiArrowRight className="btn-icon" />
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <div className="container">
            <h2 className="section-title text-center">How It Works</h2>

            <div className="process-section">
              <h3 className="process-title">Beneficiary</h3>
              <div className="process-steps">
                {beneficiarySteps.map((step, index) => (
                  <div key={index} className="process-step">
                    <div className="step-icon-container">
                      <Image preview={false} src={step.icon || "/placeholder.svg"} alt={step.title} width={40} height={40} />
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="process-section">
              <h3 className="process-title">Donor</h3>
              <div className="process-steps">
                {donorSteps.map((step, index) => (
                  <div key={index} className="process-step">
                    <div className="step-icon-container">
                      <Image preview={false} src={step.icon || "/placeholder.svg"} alt={step.title} width={40} height={40} />
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="process-section">
              <h3 className="process-title">Volunteers</h3>
              <div className="process-steps">
                {volunteerSteps.map((step, index) => (
                  <div key={index} className="process-step">
                    <div className="step-icon-container">
                      <Image preview={false} src={step.icon || "/placeholder.svg"} alt={step.title} width={40} height={40} />
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Categories</span>
              <h2 className="section-title text-center">Types Of Aid We Provide</h2>
              <p className="section-subtitle">Essential And Emergency Aid Delivered Quickly To Those In Need</p>
            </div>

            <div className="categories-grid">
              {categories.map((category, index) => (
                <div key={index} className={`category-card ${category.color}`}>
                  <div className="category-icon-container">
                    <Image preview={false} src={category.icon || "/placeholder.svg"} alt={category.title} width={64} height={64} />
                  </div>
                  <h3 className="category-title">{category.title}</h3>
                  <p className="category-description">{category.description}</p>
                  <button className="btn btn-primary btn-full">Explore This Aid</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stories Section */}
        <section className="stories-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title text-center">Stories Of Hope And Giving</h2>
              <p className="section-subtitle">Join Us In Turning Urgent Needs Into Hope, And Giving Into Change</p>
            </div>

            <div className="slider-header">
              <h3 className="slider-title">Success Stories</h3>
              <div className="slider-controls">
                <button onClick={handlePrevStory} className="slider-control" aria-label="Previous slide">
                  <HiChevronLeft className="control-icon" />
                </button>
                <button onClick={handleNextStory} className="slider-control" aria-label="Next slide">
                  <HiChevronRight className="control-icon" />
                </button>
              </div>
            </div>

            <div
              className="slider-container"
              ref={storySliderRef}
              onTouchStart={handleStoryTouchStart}
              onTouchMove={handleStoryTouchMove}
              onTouchEnd={handleStoryTouchEnd}
            >
              <div
                className="slider-track"
                style={{ transform: `translateX(-${currentStoryIndex * 100}%)` }}
              >
                {stories.map((story) => (
                  <div key={story.id} className="slider-slide">
                    <div className="story-card">
                      <div className="story-image-container">
                        <Image preview={false} src={story.image || "/placeholder.svg"} alt={story.title} fill className="story-image" />
                      </div>
                      <div className="story-content">
                        <h4 className="story-title">{story.title}</h4>
                        <p className="story-description">{story.description}</p>
                        <div className="story-buttons">
                          <button className="btn btn-primary">Start Donating</button>
                          <button className="btn btn-outline">Read The Story</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots indicator */}
              <div className="slider-dots">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStoryDotClick(index)}
                    className={`slider-dot ${currentStoryIndex === index ? "active" : ""}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cases Section */}
        <section className="featured-cases-section">
          <div className="container">
            <div className="slider-header">
              <h3 className="slider-title">Featured Cases</h3>
              <div className="slider-controls">
                <button onClick={handlePrevCase} className="slider-control" aria-label="Previous slide">
                  <HiChevronLeft className="control-icon" />
                </button>
                <button onClick={handleNextCase} className="slider-control" aria-label="Next slide">
                  <HiChevronRight className="control-icon" />
                </button>
              </div>
            </div>

            <div
              className="slider-container"
              ref={caseSliderRef}
              onTouchStart={handleCaseTouchStart}
              onTouchMove={handleCaseTouchMove}
              onTouchEnd={handleCaseTouchEnd}
            >
              <div
                className="slider-track"
                style={{ transform: `translateX(-${currentCaseIndex * 100}%)` }}
              >
                {featuredCases.map((caseItem) => (
                  <div key={caseItem.id} className="slider-slide">
                    <div className="case-card">
                      <div className="case-image-container">
                        <Image
                          preview={false}
                          src={caseItem.image || "/placeholder.svg"}
                          alt={caseItem.title}
                          fill
                          className="case-image"
                        />
                      </div>
                      <div className="case-content">
                        <h4 className="case-title">{caseItem.title}</h4>
                        <p className="case-description">{caseItem.description}</p>
                        <div className="case-buttons">
                          <button className="btn btn-primary">Start Donating</button>
                          <button className="btn btn-outline">Case Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots indicator */}
              <div className="slider-dots">
                {featuredCases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCaseDotClick(index)}
                    className={`slider-dot ${currentCaseIndex === index ? "active" : ""}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <div className="container">
            <h2 className="cta-title">Your Donation Today... Hope For A Better Tomorrow</h2>
            <div className="cta-buttons">
              <button className="btn btn-primary">Start Donating</button>
              <button className="btn btn-outline">Learn More</button>
            </div>
            <p className="cta-subtitle">Make A Real Difference In The Lives Of Those In Need</p>
          </div>
        </section>
      </main>
    </div>
  )
}

