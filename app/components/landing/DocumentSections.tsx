import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/layout/ui/Card";
import { FileText, FileSpreadsheet, FileQuestion, GraduationCap, Layers } from 'lucide-react';

const DocumentTypes = () => {
  const documents = [
    { 
      title: "CV", 
      icon: FileText, 
      description: "Craft a compelling CV that showcases your academic journey, research accomplishments, and teaching experiences. Our AI-powered platform helps you create a standout CV tailored to your field and career stage."
    },
    { 
      title: "Cover Letter", 
      icon: FileSpreadsheet, 
      description: "Compose impactful cover letters that highlight your unique qualifications and enthusiasm for each position. Our tools guide you in articulating your fit for specific roles and institutions."
    },
    { 
      title: "Research Statement", 
      icon: FileQuestion, 
      description: "Develop a clear and persuasive research statement that outlines your past work, current projects, and future directions. We help you effectively communicate the significance and potential impact of your research."
    },
    { 
      title: "Teaching Philosophy", 
      icon: GraduationCap, 
      description: "Articulate your approach to education and student engagement. Our platform assists in creating a teaching philosophy that reflects your pedagogical methods, experiences, and commitment to student learning."
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F4F9]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#005F73] font-['Playfair_Display',serif]">Craft Your Complete Academic Portfolio</h2>
        <p className="text-center text-lg mb-12 text-[#2B2B2B]">Lumina empowers you to create all the essential documents for your academic job applications. Our AI-assisted platform guides you through crafting each piece of your portfolio, ensuring you present your best self to potential employers.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {documents.map((doc, index) => (
            <Card key={index} className="bg-white border-[#9D8CB0]">
              <CardHeader>
                <doc.icon className="h-10 w-10 text-[#7B5EA7] mb-4" />
                <CardTitle className="text-xl font-bold text-[#005F73]">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#2B2B2B]">{doc.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const TemplateShowcase = () => {
  const templateTypes = [
    {
      type: "CV",
      description: "Choose from a variety of CV templates designed for different academic fields and career stages. From traditional layouts for senior academics to modern designs for early-career researchers, we have options to suit every need.",
      examples: ["Classic Academic", "Modern Research-Focused", "Creative Academic", "Compact One-Page"]
    },
    {
      type: "Cover Letter",
      description: "Our cover letter templates help you make a strong first impression. Whether you're emphasizing research, teaching, or interdisciplinary expertise, our templates guide you in showcasing your strengths.",
      examples: ["Traditional Academic", "Research Emphasis", "Teaching Focus", "Interdisciplinary Approach"]
    },
    {
      type: "Research Statement",
      description: "Effectively communicate your research journey with our specialized templates. From comprehensive overviews to future-oriented plans, our options help you articulate the impact and potential of your work.",
      examples: ["Comprehensive Overview", "Future-Oriented Plan", "Impact-Focused Summary"]
    },
    {
      type: "Teaching Philosophy",
      description: "Express your educational approach with clarity and conviction. Our teaching philosophy templates cater to various pedagogical styles and disciplinary contexts.",
      examples: ["Student-Centered Approach", "Innovative Methods", "Discipline-Specific Pedagogy"]
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#005F73] font-['Playfair_Display',serif]">Tailored Templates for Every Academic Need</h2>
        <p className="text-center text-lg mb-12 text-[#2B2B2B]">Lumina offers a wide range of professionally designed templates for each document type. Our templates are crafted to highlight your unique strengths and adapt to various academic disciplines and career stages.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templateTypes.map((type, index) => (
            <Card key={index} className="bg-[#F8F4F9] border-[#9D8CB0]">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#005F73]">{type.type} Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#2B2B2B] mb-4">{type.description}</p>
                <div className="mt-4">
                  <strong className="text-[#7B5EA7]">Example templates:</strong>
                  <ul className="list-disc list-inside mt-2">
                    {type.examples.map((example, i) => (
                      <li key={i} className="text-[#2B2B2B]">{example}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { DocumentTypes, TemplateShowcase };