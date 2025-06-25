import React from "react";
import Header from "./components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Form from "./components/Form";
import { ToastContainer, Bounce } from "react-toastify";
import DownloadCard from "./components/DownloadCard";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Header />
      <Tabs defaultValue="registration" className="w-full">
        <TabsList className="w-full ">
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="download_ID">Download ID Card</TabsTrigger>
        </TabsList>

        <TabsContent value="registration">
          <Form />
        </TabsContent>
        <TabsContent value="download_ID">
         <DownloadCard/>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default App;
