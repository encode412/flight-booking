"use client";

import { useState } from "react";

import Button from "@/components/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { User } from "@hugeicons/core-free-icons";

const PersonalDetailsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+234",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    passportIssuingCountry: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpirationDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Personal Details
          </h1>
          <p className="text-gray-600">
            Manage your personal information to make booking easier and faster.
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center">
          <HugeiconsIcon icon={User} className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Title
            </label>
            <select
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Dr">Dr</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter  Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              placeholder="Enter Middle Name"
              value={formData.middleName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 border border-gray-300 rounded-lg bg-gray-50">
                <span className="text-xl mr-2">🇳🇬</span>
                <span className="text-gray-700">+234</span>
              </div>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Gender
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="text-gray-700">Male</span>
            </label>
            <label className="flex items-center px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="text-gray-700">Female</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Date Of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nationality
            </label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select</option>
              <option value="Nigerian">Nigerian</option>
              <option value="American">American</option>
              <option value="British">British</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Passport Issuing Country
            </label>
            <select
              name="passportIssuingCountry"
              value={formData.passportIssuingCountry}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select</option>
              <option value="Nigeria">Nigeria</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Passport Number
            </label>
            <input
              type="text"
              name="passportNumber"
              placeholder="Enter"
              value={formData.passportNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Passport Issue date
            </label>
            <input
              type="date"
              name="passportIssueDate"
              value={formData.passportIssueDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Passport Expiration date
            </label>
            <input
              type="date"
              name="passportExpirationDate"
              value={formData.passportExpirationDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button onClick={handleSubmit}>Update Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;
