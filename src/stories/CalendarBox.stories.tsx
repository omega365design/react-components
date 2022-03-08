import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import CalendarBox from "../components/CalendarBox/CalendarBox";

export default {
  title: "Calendar Box",
  component: CalendarBox,
} as ComponentMeta<typeof CalendarBox>;

let Template: ComponentStory<typeof CalendarBox> = (args: any) => (
  <CalendarBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
