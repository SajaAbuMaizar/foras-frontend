'use client';

import { useState } from 'react';
import { useFormSubmit } from '../hooks/useFormSubmit';
import FormSection from './FormSection';
import InputField from './InputField';
import SelectField from './SelectField';
import MapInput from './MapInput';
import LoadingOverlay from './LoadingOverlay';
import { City, Field } from '@/types/postJobTypes';
import CheckBoxField from './CheckboxField';


type JobFormProps = {
    cities: City[];
    fields: Field[];
};

export default function JobForm({ cities, fields }: JobFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit } = useFormSubmit(setIsLoading);

    return (
        <>
            <form onSubmit={handleSubmit} id="jobForm" encType="multipart/form-data">
                <div className="flex flex-wrap gap-6">
                    {/* Left Section */}
                    <FormSection>
                        <InputField
                            id="jobTitle"
                            name="jobTitle"
                            label="Job Title"
                            type="text"
                            required
                        />

                        <InputField
                            id="description"
                            name="jobDescription"
                            label="Job Description"
                            type="textarea"
                            rows={4}
                            required
                        />

                        <SelectField
                            id="location"
                            name="city"
                            label="Location"
                            options={cities.map(city => ({ value: city.id, label: city.name }))}
                            required
                        />

                        <MapInput />

                        <SelectField
                            id="jobType"
                            name="jobType"
                            label="Job Type"
                            options={[
                                { value: 'full-time', label: 'Full Time' },
                                { value: 'part-time', label: 'Part Time' },
                                // ... other options
                            ]}
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
                            name="field"
                            label="Industry"
                            options={fields.map(field => ({ value: field.id, label: field.name }))}
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
                            name="jobRequiredQualifications"
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

                        <CheckBoxField
                            id="hebrew"
                            name="hebrew"
                            label="Hebrew Required?"
                        />
                    </FormSection>
                </div>

                <button type="submit" className="btn btn-primary">
                    نشر الوظيفة
                </button>
            </form>

            <LoadingOverlay visible={isLoading} />
        </>
    );
}