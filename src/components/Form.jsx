import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const cnicRegex = /^[0-9]{13}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = yup.object().shape({
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  course: yup.string().required("Course is required"),
  proficiency: yup.string().required("Computer proficiency is required"),
  fullName: yup.string().required("Full name is required"),
  fatherName: yup.string().required("Father name is required"),
  email: yup
    .string()
    .matches(emailRegex, "Invalid email")
    .required("Email is required"),
  phone: yup.string().required("Phone is required"),
  cnic: yup
    .string()
    .matches(cnicRegex, "Invalid CNIC (XXXXX-XXXXXXX-X)")
    .required("CNIC is required"),
  fatherCnic: yup
    .string()
    .matches(cnicRegex, "Invalid CNIC (XXXXX-XXXXXXX-X)")
    .required("Father CNIC is required"),
  dob: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  qualification: yup.string().required("Last qualification is required"),
  laptop: yup.string().required("Laptop status is required"),
  photo: yup
    .mixed()
    .required("Picture is required")
    .test(
      "fileSize",
      "File must be under 1MB",
      (file) => file && file.size < 1024 * 1024
    )
    .test(
      "fileType",
      "Only JPG, JPEG or PNG allowed",
      (file) =>
        file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    ),
});

const Form = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Submitted");
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    setTimeout(() => {
      reset();

      // clear image preview
      setImagePreview(null);
    }, 2000);
  };

  const InputField = ({ label, name, type = "text", fullWidth = false }) => (
    <div className={`${fullWidth ? "w-full" : "w-full sm:w-1/2"} px-2`}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} type={type} {...register(name)} placeholder={label} />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );

  const SelectField = ({
    label,
    name,
    options,
    placeholder,
    fullWidth = false,
    control,
  }) => (
    <div className={`${fullWidth ? "w-full" : "w-full sm:w-1/2"} px-2`}>
      <Label>{label}</Label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-4xl mx-auto mt-10"
      >
        {/* Row 1 */}
        <div className="flex flex-wrap -mx-2">
          <SelectField
            label="Country"
            control={control}
            name="country"
            placeholder="Select Country"
            options={["Pakistan", "Turkey"]}
          />
          <SelectField
            label="City"
            control={control}
            name="city"
            placeholder="Select City"
            options={["Karachi", "Lahore", "Islamabad"]}
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap -mx-2">
          <SelectField
            label="Course or Event"
            control={control}
            name="course"
            placeholder="Select Course"
            options={["Web Development", "ML & AI", "Graphic Design"]}
          />
          <SelectField
            label="Computer Proficiency"
            control={control}
            name="proficiency"
            placeholder="Select Proficiency"
            options={["None", "Beginner", "Intermediate", "Advanced"]}
          />
        </div>

        {/* Rows 3–6 */}
        <div className="flex flex-wrap -mx-2">
          <InputField label="Full Name" name="fullName" />
          <InputField label="Father Name" name="fatherName" />
        </div>
        <div className="flex flex-wrap -mx-2">
          <InputField label="Email" name="email" type="email" />
          <InputField label="Phone" name="phone" />
        </div>
        <div className="flex flex-wrap -mx-2">
          <InputField label="CNIC" name="cnic" />
          <InputField label="Father CNIC" name="fatherCnic" />
        </div>
        <div className="flex flex-wrap -mx-2">
          <InputField label="Date of Birth" name="dob" type="date" />
          <SelectField
            label="Gender"
            control={control}
            name="gender"
            placeholder="Select Gender"
            options={["Male", "Female", "Other"]}
          />
        </div>

        {/* Full-width Rows */}
        <div className="flex flex-wrap -mx-2">
          <InputField label="Address" name="address" fullWidth />
        </div>

        <div className="flex flex-wrap -mx-2">
          <SelectField
            label="Last Qualification"
            control={control}
            name="qualification"
            placeholder="Select Qualification"
            options={["Matric", "Intermediate", "Bachelor", "Master"]}
            fullWidth
          />
        </div>

        <div className="flex flex-wrap -mx-2">
          <SelectField
            label="Do you have a Laptop?"
            control={control}
            name="laptop"
            placeholder="Select Option"
            options={["Yes", "No"]}
            fullWidth
          />
        </div>

        <Controller
          control={control}
          name="photo"
          defaultValue={null}
          render={({ field }) => (
            <div className="px-2 w-full">
              <Label className="block">Picture</Label>
              <div className="border-gray-400 rounded-md p-4 flex items-start sm:items-center gap-4 sm:flex-row flex-col">
                {/* Upload Box */}
                <div className="relative w-32 h-32 flex items-center justify-center border rounded-md bg-gray-50 overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">+ Upload</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImagePreview(URL.createObjectURL(file));
                        field.onChange(file); // ✅ updates RHF value
                      }
                    }}
                  />
                </div>

                {/* Upload Guidelines */}
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  <li>With white or blue background</li>
                  <li>File size must be less than 1MB</li>
                  <li>File type: jpg, jpeg, png</li>
                  <li>Upload your recent passport size picture</li>
                  <li>
                    Your face should be clearly visible without any glasses
                  </li>
                </ul>
              </div>

              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Form;
