import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import Stats from "../Components/Stat";
import Leaderboard from "../Components/Leaderboard";
import AboutPlatform from "../Components/AboutPlatform";
import Testimonials from "../Components/Testimonial";
import FeaturedProjects from "../Components/FeaturedProject";
import FAQ from "../Components/FAQ";

const Homepage: React.FC = () => {
    const [carbonSaved, setCarbonSaved] = useState(0);
    const [treesPlanted, setTreesPlanted] = useState(0);
    const [participants, setParticipants] = useState(0);
    const [carbonCredits, setCarbonCredits] = useState(0);

    useEffect(() => {
        const targetCarbon = 15789;
        const targetTrees = 42356;
        const targetParticipants = 8934;
        const targetCarbonCredits = 6290;

        const duration = 2000;
        const steps = 50;

        const carbonIncrement = targetCarbon / steps;
        const treesIncrement = targetTrees / steps;
        const participantsIncrement = targetParticipants / steps;
        const carbonCreditsIncrement = targetCarbonCredits / steps;

        const interval = duration / steps;
        let currentStep = 0;

        const counter = setInterval(() => {
            if (currentStep < steps) {
                setCarbonSaved(Math.round(carbonIncrement * currentStep));
                setTreesPlanted(Math.round(treesIncrement * currentStep));
                setParticipants(Math.round(participantsIncrement * currentStep));
                setCarbonCredits(Math.round(carbonCreditsIncrement * currentStep));
                currentStep += 1;
            } else {
                setCarbonSaved(targetCarbon);
                setTreesPlanted(targetTrees);
                setParticipants(targetParticipants);
                setCarbonCredits(targetCarbonCredits);
                clearInterval(counter);
            }
        }, interval);
        return () => clearInterval(counter);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <Hero />

            {/* Stats Section */}
            <Stats carbonSaved={carbonSaved} treesPlanted={treesPlanted} participants={participants} carbonCredits={carbonCredits} />

            {/* Leaderboard Section */}
            <Leaderboard />

            {/* About Platform Section */}
            <AboutPlatform />

            {/* Featured Projects Section */}
            <FeaturedProjects />

            {/* Testimonials Section */}
            <Testimonials />

            <FAQ />
        </>
    );
};

export default Homepage;