"use client";

import { useState } from "react";
import { useFormSubmit } from "../hooks/useFormSubmit";
import FormSection from "./FormSection";
import InputField from "./InputField";
import SelectField from "./SelectField";
import MapInput from "./MapInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import CheckBoxField from "./CheckboxField";
import { Option } from "@/types/jobs/postJobTypes";
import { fetchCities, fetchIndustries } from "@/lib/api";
import { useOptions } from "@/context/options/OptionsContext";

export default function JobForm() {
  const { cities, industries, loading: optionsLoading } = useOptions();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit } = useFormSubmit(setIsLoading);

  const jobTypeOptions: Option[] = [
    { code: "full-time", id: "1", nameAr: "دوام كامل", nameHe: "משרה מלאה" },
    { code: "part-time", id: "2", nameAr: "دوام جزئي", nameHe: "משרה חלקית" },
    // Add other job types as needed
  ];

  return (
    <>
      <form onSubmit={handleSubmit} id="jobForm" encType="multipart/form-data">
        <div className="flex flex-wrap gap-6">
          {/* Left Section */}
          <FormSection>
            <label className="block text-sm font-medium text-gray-700">
              שפת המשרה
            </label>
            <select
              id="language"
              name="language"
              required
              className="mt-1 block w-full border-gray-300 rounded-md"
            >
              <option value="he">עברית</option>
              <option value="ar">عربي</option>
            </select>

            <InputField
              id="jobTitle"
              name="jobTitle"
              label="Job Title"
              type="text"
              required
            />
            <InputField
              id="jobDescription"
              name="jobDescription"
              label="Job Description"
              type="textarea"
              rows={4}
              required
            />

            <SelectField
              id="city"
              name="city"
              label="Location"
              options={cities}
              required
            />

            {/*<MapInput />*/}

            <SelectField
              id="jobType"
              name="jobType"
              label="Job Type"
              options={jobTypeOptions}
              required
            />
          </FormSection>

          {/* Vertical Divider */}
          <div className="relative w-full lg:w-1/12">
            <div className="absolute top-0 bottom-0 left-1/2 border-l border-black/10 h-full -translate-x-1/2"></div>
          </div>

          {/* Right Section */}
          <FormSection>
            <SelectField
              id="industry"
              name="industry"
              label="Industry"
              options={industries}
              required
            />

            <InputField
              id="salary"
              name="salary"
              label="Salary"
              type="text"
              required
            />

            <InputField
              id="requiredQualifications"
              name="requiredQualifications"
              label="Required Qualifications"
              type="textarea"
              rows={4}
              required
            />

            <InputField
              id="jobImage"
              name="jobImage"
              label="Job Image"
              type="file"
              accept="image/*"
              required
              helperText="Accepted formats: JPEG, PNG, GIF. Max size: 1MB."
            />

            <CheckBoxField
              id="transportation"
              name="transportation"
              label="Transportation Available?"
            />

            <CheckBoxField id="hebrew" name="hebrew" label="Hebrew Required?" />
          </FormSection>
        </div>

        <button type="submit" className="btn btn-primary">
          نشر الوظيفة
        </button>
      </form>

      <LoadingSpinner visible={isLoading} message="Submitting your job..." />
    </>
  );
}
