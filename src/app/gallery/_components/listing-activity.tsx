"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export const ListingActivity = () => {
  return (
    <Tabs className="w-full">
      <TabsList>
        <TabsTrigger value="currently-listed">Currently listed</TabsTrigger>
        <TabsTrigger value="latest-sold">Latest sold</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
