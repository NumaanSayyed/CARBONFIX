import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import Stats from "../Components/Stat";
import Leaderboard from "../Components/Leaderboard";
import AboutPlatform from "../Components/AboutPlatform";
import Testimonials from "../Components/Testimonial";
import FeaturedProjects from "../Components/FeaturedProject";
import FAQ from "../Components/FAQ";
import { backend_url } from "../backend_route";
import axios from "axios";
import MedalProgress from "../Components/MedalProgress";

const Homepage: React.FC = () => {
  const [targetStats, setTargetStats] = useState({
    participants: 0,
    carbonCredits: 0,
    college: 0,
    servicePro: 0,
  });

  const [stats, setStats] = useState({
    participants: 0,
    carbonCredits: 0,
    college: 0,
    servicePro: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${backend_url}/homepage/stats`);
        const {
          total_participants,
          total_carbon_credits,
          total_service_providers,
        } = response.data;

        setTargetStats({
          participants: total_participants,
          carbonCredits: total_carbon_credits,
          college: 0,
          servicePro: total_service_providers,
        });
      } catch (error) {
        console.error("Error fetching homepage stats:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 50;

    let currentStep = 0;

    const interval = duration / steps;

    const counter = setInterval(() => {
      if (currentStep < steps) {
        setStats({
          participants: Math.round(
            (targetStats.participants / steps) * currentStep
          ),
          carbonCredits: Math.round(
            (targetStats.carbonCredits / steps) * currentStep
          ),
          college: Math.round((targetStats.college / steps) * currentStep),
          servicePro: Math.round(
            (targetStats.servicePro / steps) * currentStep
          ),
        });

        currentStep += 1;
      } else {
        setStats(targetStats);
        clearInterval(counter);
      }
    }, interval);

    return () => clearInterval(counter);
  }, [targetStats]);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats
        carbonSaved={stats.participants} //part
        college={stats.servicePro} //service provider
        participants={stats.college} //college
        carbonCredits={stats.carbonCredits} //carbonCredits
      />

      {/* Leaderboard Section */}
      <Leaderboard />

      {/* About Platform Section */}
      <AboutPlatform />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Testimonials Section */}
      <Testimonials key={location.pathname} />

      <MedalProgress />

      <FAQ />
    </>
  );
};

export default Homepage;
