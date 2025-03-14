import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import Stats from "../Components/Stat";
import Leaderboard from "../Components/Leaderboard";
import AboutPlatform from "../Components/AboutPlatform";
import Testimonials from "../Components/Testimonial";
import FeaturedPrograms from "../Components/FeaturedProgram";
import FAQ from "../Components/FAQ";
const Homepage: React.FC = () => {
    const [carbonSaved, setCarbonSaved] = useState(0);
    const [treesPlanted, setTreesPlanted] = useState(0);
    const [participants, setParticipants] = useState(0);

    useEffect(() => {
        const targetCarbon = 15789;
        const targetTrees = 42356;
        const targetParticipants = 8934;
        const duration = 2000;
        const steps = 50;
        const carbonIncrement = targetCarbon / steps;
        const treesIncrement = targetTrees / steps;
        const participantsIncrement = targetParticipants / steps;
        const interval = duration / steps;
        let currentStep = 0;
        const counter = setInterval(() => {
            if (currentStep < steps) {
                setCarbonSaved(Math.round(carbonIncrement * currentStep));
                setTreesPlanted(Math.round(treesIncrement * currentStep));
                setParticipants(Math.round(participantsIncrement * currentStep));
                currentStep += 1;
            } else {
                setCarbonSaved(targetCarbon);
                setTreesPlanted(targetTrees);
                setParticipants(targetParticipants);
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
            <Stats carbonSaved={carbonSaved} treesPlanted={treesPlanted} participants={participants} />

            {/* Leaderboard Section */}
            <Leaderboard />

            {/* About Platform Section */}
            <AboutPlatform />

            {/* Featured Programs Section */}
            <FeaturedPrograms />

            {/* Testimonials Section */}
            <Testimonials />

            <FAQ />
        </>
    );
};

export default Homepage;
