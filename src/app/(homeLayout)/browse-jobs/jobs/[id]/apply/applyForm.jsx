"use client";

import React from "react";
// Importing from HeroUI v3.x
import { Input, Textarea, Button, Card, CardHeader, CardBody } from "@heroui/react";
// Importing professional icons from react-icons (FontAwesome 5 collection)
import { FaLink, FaBriefcase, FaRegCommentDots } from "react-icons/fa";

export default function ApplicationForm({ 
  jobId = "JOB-101", 
  jobTitle = "Frontend Developer", 
  applicantName = "John Doe", 
  applicantEmail = "john.doe@example.com" 
}) {

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Create a FormData instance from the submitted form HTML element
    const formDataInstance = new FormData(e.currentTarget);

    // 2. Convert the entries into a clean JavaScript object
    const formValues = Object.fromEntries(formDataInstance.entries());

    // 3. This object contains all values including hidden fields
    console.log("Data ready to post to database:", formValues);
    
    // Example: fetch('/api/apply', { method: 'POST', body: JSON.stringify(formValues) })
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <Card className="p-4 shadow-lg border border-default-100">
        <CardHeader className="flex flex-col items-start gap-1 pb-4">
          <h2 className="text-2xl font-bold text-foreground">Apply for Position</h2>
          <p className="text-sm text-default-500">
            Applying for: <span className="font-semibold text-primary">{jobTitle}</span> ({jobId})
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* --- Hidden Fields (Still caught by FormEntry) --- */}
            <input type="hidden" name="jobId" value={jobId} />
            <input type="hidden" name="jobTitle" value={jobTitle} />
            <input type="hidden" name="applicantName" value={applicantName} />
            <input type="hidden" name="applicantEmail" value={applicantEmail} />

            {/* --- Resume Link Input --- */}
            <Input
              type="url"
              name="resumeLink"
              label="Resume Link"
              labelPlacement="outside"
              placeholder="https://drive.google.com/file/d/..."
              isRequired
              variant="bordered"
              radius="md"
              startContent={
                <FaLink className="text-default-400 pointer-events-none flex-shrink-0 text-small" />
              }
            />

            {/* --- Portfolio Website Link Input --- */}
            <Input
              type="url"
              name="portfolioLink"
              label="Portfolio Website Link"
              labelPlacement="outside"
              placeholder="https://yourportfolio.com"
              variant="bordered"
              radius="md"
              startContent={
                <FaBriefcase className="text-default-400 pointer-events-none flex-shrink-0 text-small" />
              }
            />

            {/* --- Message / Short Note Textarea --- */}
            <Textarea
              name="message"
              label="Message / Short Note"
              labelPlacement="outside"
              placeholder="Tell the hiring team a bit about yourself..."
              variant="bordered"
              radius="md"
              minRows={4}
              disableAnimation
              disableAutosize
              startContent={
                <FaRegCommentDots className="text-default-400 pointer-events-none flex-shrink-0 text-small mt-0.5" />
              }
            />

            {/* --- Submit Button --- */}
            <Button
              type="submit"
              color="primary"
              className="font-medium mt-2"
              size="lg"
              radius="md"
            >
              Submit Application
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}