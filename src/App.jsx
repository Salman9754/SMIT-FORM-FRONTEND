import React from "react";
import Header from "./components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Form from "./components/Form";

function App() {
  return (
    <>
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
          <p>This is the Id Card tab content</p>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default App;
