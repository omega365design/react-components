import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Calendar from "../components/Calendar";

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

export const Primary: ComponentStory<typeof Calendar> = () => <Calendar />