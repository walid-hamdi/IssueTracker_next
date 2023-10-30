"use client";

import { TextField } from "@radix-ui/themes";

const NewIssue = () => {
  return (
    <div className="max-w-xl">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
    </div>
  );
};

export default NewIssue;
