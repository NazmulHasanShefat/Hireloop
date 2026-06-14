"use client";

import React from "react";
// Import HeroUI Aria components
import { Card, TextField, Label, Input, TextArea, Button, toast } from "@heroui/react";
// Import Icons from react-icons
import { FaLink, FaBriefcase, FaRegCommentDots } from "react-icons/fa";
import { postJobApplication } from "@/lib/actions/jobApplication";

export default function ApplicationForm({ currentJob, applicant}) {
  console.log(currentJob)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect all data using standard FormData + Object.fromEntries
    const formDataInstance = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formDataInstance.entries());

    console.log("Complete Data for Database:", formValues);
    const result = await postJobApplication(formValues)
    console.log("this is result",result)
    if(result.insertedId){
      toast.success("your application submited successfully")
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 lg:mt-20">
      <Card className="p-6 border border-default-100 shadow-xl">
        
        {/* --- Card Header Section --- */}
        <Card.Header className="flex flex-col items-start gap-1 mb-6">
          <Card.Title className="text-2xl font-bold text-foreground">
            Apply for Position
          </Card.Title>
          <Card.Description className="text-sm text-default-500">
            {/* Role: <span className="font-semibold text-primary">{jobTitle}</span> (ID: {jobId}) */}
          </Card.Description>
        </Card.Header>

        {/* --- Main Application Form --- */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Hidden fields passed dynamically during fromEntries parsing */}
          <input type="hidden" name="jobId" value={currentJob?._id} />
          <input type="hidden" name="companyName" value={currentJob?.companyName} />
          <input type="hidden" name="jobTitle" value={currentJob?.jobTitle} />
          <input type="hidden" name="applicantName" value={applicant?.name} />
          <input type="hidden" name="applicantEmail" value={applicant?.email} />
          <input type="hidden" name="applicant_id" value={applicant?.id} />

          {/* --- Resume Link Input Group --- */}
          <TextField className="w-full flex flex-col gap-1.5" name="resumeLink" type="url" isRequired>
            <Label className="text-sm font-medium text-foreground">
              Resume Link <span className="text-danger">*</span>
            </Label>
            <div className="relative flex items-center">
              <FaLink className="absolute left-3 text-default-400 size-4 pointer-events-none" />
              <Input 
                placeholder="https://drive.google.com/file/d/..." 
                className="w-full pl-10 pr-3 py-2 border border-default-300 rounded-md bg-transparent text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground"
              />
            </div>
          </TextField>

          {/* --- Portfolio Website Input Group --- */}
          <TextField className="w-full flex flex-col gap-1.5" name="portfolioLink" type="url">
            <Label className="text-sm font-medium text-foreground">
              Portfolio Website Link
            </Label>
            <div className="relative flex items-center">
              <FaBriefcase className="absolute left-3 text-default-400 size-4 pointer-events-none" />
              <Input 
                placeholder="https://yourportfolio.com" 
                className="w-full pl-10 pr-3 py-2 border border-default-300 rounded-md bg-transparent text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground"
              />
            </div>
          </TextField>

          {/* --- Message / Short Note Input Group --- */}
          <TextField className="w-full flex flex-col gap-1.5" name="message">
            <Label className="text-sm font-medium text-foreground">
              Message / Short Note
            </Label>
            <div className="relative flex items-start">
              <FaRegCommentDots className="absolute left-3 top-3 text-default-400 size-4 pointer-events-none" />
              <TextArea 
                placeholder="Tell the hiring team a bit about yourself..." 
                rows={4}
                className="w-full pl-10 pr-3 py-2 border border-default-300 rounded-md bg-transparent text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground resize-none"
              />
            </div>
          </TextField>

          {/* --- Card Footer / Submit Button --- */}
          <Card.Footer className="p-0 pt-2">
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-md shadow-md hover:opacity-90 active:scale-[0.99] transition-all text-sm"
            >
              Submit Application
            </Button>
          </Card.Footer>
        </form>

      </Card>
    </div>
  );
}