"use client";

import {
    Button,
    Checkbox,
    FileInput,
    Label,
    Radio,
    RangeSlider,
    Select,
    Textarea,
    TextInput,
    ToggleSwitch,
  } from "flowbite-react";

  import React from 'react'
  
  interface Props {}
  
  function FreightForm(props: Props) {
    const {} = props
  
    return (
        <form className="flex h-1/4 min-w-screen flex-col align-middle items-center justify-center gap-2">
        <div className="flex flex-row gap-2">
          <div className="mb-1 block">
          <Label htmlFor="fname" value="Your first name" />
          <TextInput id="fname" type="text" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-1 block">
          <Label htmlFor="lname" value="Your last name" />
          <TextInput id="lname" type="text" />
          </div>
        </div>
       <Button type="submit" className="bg-button px-6">Submit</Button>
      </form>
    )
  }
  
  export default FreightForm
  