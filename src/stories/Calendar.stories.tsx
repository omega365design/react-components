import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Calendar from "../components/Calendar/Calendar";
import { ChakraProvider } from "@chakra-ui/react";

export default {
  title: "Calendar",
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

let Template: ComponentStory<typeof Calendar> = (args: any) => (
  <Calendar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
