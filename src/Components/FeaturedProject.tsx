import React from "react";

const featuredProjects = [
  {
    title: "Forest Conservation",
    image:
      "https://public.readdy.ai/ai/img_res/8daf8b90475f4fab24a4b429608d21d4.jpg",
    description:
      "Protect and restore native forests through community-led initiatives.",
  },
  {
    title: "Ocean Cleanup",
    image:
      "https://public.readdy.ai/ai/img_res/ca5db8c3f99aa3c1f4d06381ee9ccb1f.jpg",
    description: "Join global efforts to remove plastic waste from our oceans.",
  },
  {
    title: "Renewable Energy",
    image:
      "https://public.readdy.ai/ai/img_res/cc94e411782cdf0058161fb680c20597.jpg",
    description: "Support the transition to clean, renewable energy sources.",
  },
];

const FeaturedProject: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-24">
      <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
        Featured Environmental projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

// Program Card Component
const ProjectCard: React.FC<{ project: any }> = ({ project }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
    <div className="h-48 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <button className="!rounded-button bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-sm font-semibold transition-all duration-300 whitespace-nowrap">
        Learn More
      </button>
    </div>
  </div>
);

export default FeaturedProject;
