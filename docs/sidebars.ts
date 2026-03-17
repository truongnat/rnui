import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "category",
      label: "Introduction",
      items: ["getting-started", "theming", "headless"],
    },
    {
      type: "category",
      label: "Components",
      items: [
        "components/button",
        "components/bottom-sheet",
      ],
    },
  ],
};

export default sidebars;