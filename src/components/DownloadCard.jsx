import React, { useState, useRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";

const DownloadCard = () => {
  const [Cnic, setCnic] = useState(null);
  const [profile, setprofile] = useState(null);
  const cardRef = useRef(null);
  const [Loading, setLoading] = useState(false);

  const getStudent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://smit-form-production.up.railway.app/getCnic/${Cnic}`
      );
      setprofile(response.data.student);
    } catch (error) {
      if (error) {
        setprofile(null);
      }
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePDFDownload = async () => {
    const card = cardRef.current;
    if (!card) return;

    // Wait for image to fully load
    const img = card.querySelector("img");
    if (img && !img.complete) {
      await new Promise((res) => {
        img.onload = res;
        img.onerror = res;
      });
    }

    // Temporarily hide download button
    const downloadBtn = card.querySelector(".no-print");
    if (downloadBtn) downloadBtn.style.display = "none";

    const canvas = await html2canvas(card, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    if (downloadBtn) downloadBtn.style.display = "block";

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 20, width, height);
    pdf.save(`${profile.fullName}_StudentCard.pdf`);
  };
  return (
    <>
      <div className="container flex justify-center items-center flex-row">
        <div className="content mt-5 w-[500px]">
          <Label>CNIC (Which you provided during form submission)</Label>
          <Input
            value={Cnic}
            onChange={(e) => setCnic(e.target.value)}
            className="w-full text-xs mt-3"
            type="text"
            placeholder="CNIC (Which you provided during form submission)"
          />
          <Button
            disabled={Loading}
            className="w-full mt-4"
            onClick={getStudent}
          >
            Submit
          </Button>
        </div>
      </div>
      {profile && (
        <div className="container mb-10">
          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center items-center justify-center">
            <Card
              ref={cardRef}
              className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center"
            >
              <CardHeader className="flex flex-col items-center gap-2">
                <img
                  src={profile.photoUrl}
                  alt="Profile"
                  crossOrigin="anonymous"
                  className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                />
                <CardTitle className="text-xl font-bold text-gray-800">
                  {profile.fullName}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  CNIC: {profile.cnic}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 mt-4 text-left text-sm text-gray-700">
                <p>
                  <span className="font-medium">Father Name:</span>{" "}
                  {profile.fatherName}
                </p>
                <p>
                  <span className="font-medium">Date of Birth:</span>{" "}
                  {profile.dob}
                </p>
                <p>
                  <span className="font-medium">City:</span> {profile.city}
                </p>
                <p>
                  <span className="font-medium">Course:</span> {profile.course}
                </p>
              </CardContent>
            </Card>

            {/* Download Button - separate from card and responsive */}
            <div className="no-print sm:mt-0 mt-4 w-full sm:w-auto">
              <Button
                onClick={handlePDFDownload}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                Download Card as PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadCard;
