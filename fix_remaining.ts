import { readFileSync, writeFileSync } from "fs";

function fixLucide(file: string) {
  let content = readFileSync(file, "utf8");
  // Replace <IconName ... /> with (<IconName ... /> as any)
  content = content.replace(/(<(Mail|Star|Archive|Trash2|Lock|Search|User|Settings)[^>]*\/>)/g, "($1 as any)");
  writeFileSync(file, content);
}

fixLucide("apps/storybook/stories/List.stories.tsx");
fixLucide("apps/storybook/stories/FormControls.stories.tsx");
fixLucide("apps/storybook/stories/BottomSheet.stories.tsx");
fixLucide("apps/storybook/stories/InputsExtra.stories.tsx");

function fixInputsExtra() {
  const file = "apps/storybook/stories/InputsExtra.stories.tsx";
  let content = readFileSync(file, "utf8");
  content = content.replace(/checked \/>/g, "checked={true as any} />");
  content = content.replace(/on \/>/g, "on={true as any} />");
  writeFileSync(file, content);
}
fixInputsExtra();
