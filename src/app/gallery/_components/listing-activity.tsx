"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { ActivityItem } from "./activity-item";

export const ListingActivity = () => {
  return (
    <Tabs className="w-full">
      <TabsList defaultValue="currently-listed">
        <TabsTrigger value="currently-listed">Currently listed</TabsTrigger>
        <TabsTrigger value="latest-sold">Latest sold</TabsTrigger>
      </TabsList>
      <TabsContent value="currently-listed">
        <ul>
          <li className="flex items-center">
            <p>1</p>
            <ActivityItem />
          </li>
          <li>
            <ActivityItem />
          </li>
          <li>
            <ActivityItem />
          </li>
        </ul>
      </TabsContent>
    </Tabs>
  );
};
