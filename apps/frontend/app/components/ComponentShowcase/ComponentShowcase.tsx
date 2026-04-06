import { useState } from "react";
import Box from "@mui/material/Box";

import { AppButton } from "../Button/AppButton";
import { DataTable } from "../DataTable/DataTable";
import { AutocompleteInput } from "../inputs/AutocompleteInput/AutocompleteInput";
import { CheckboxField } from "../inputs/CheckboxField/CheckboxField";
import { DateInput } from "../inputs/DateInput/DateInput";
import { NumberInput } from "../inputs/NumberInput/NumberInput";
import { RadioGroupField } from "../inputs/RadioGroupField/RadioGroupField";
import { TextInput } from "../inputs/TextInput/TextInput";
import { AppList } from "../List/AppList";
import { Surface } from "../Surface/Surface";
import { AppText } from "../Text/AppText";
import { AppTitle } from "../Title/AppTitle";
import { activityItems, tableColumns, tableRows, teamOptions } from "./ComponentShowcase.data";

/**
 * Displays a composed library preview used in Storybook and on the home route.
 */
export function ComponentShowcase() {
  const [team, setTeam] = useState(teamOptions[1] ?? null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [releaseMode, setReleaseMode] = useState("guarded");

  return (
    <div className="pm-showcase">
      <Surface accent="primary" className="pm-showcase__hero">
        <AppTitle
          kicker="Component library"
          subtitle="MUI-backed building blocks with a colorful hacker visual system, tuned for Storybook review."
          variant="h1"
        >
          Frontend command deck
        </AppTitle>
        <AppText tone="muted" variant="body1">
          The first pass covers form primitives, display primitives, and a data table with sorting,
          row selection, and pagination.
        </AppText>
        <div className="pm-showcase__actions">
          <AppButton>Publish build</AppButton>
          <AppButton tone="secondary">Queue review</AppButton>
          <AppButton tone="ghost">Inspect token map</AppButton>
        </div>
      </Surface>

      <Box className="app-grid app-grid--halves">
        <Surface
          accent="secondary"
          description="Compact, readable field styling across the base inputs."
          eyebrow="Forms"
          title="Signal entry"
        >
          <div className="app-stack">
            <TextInput
              fullWidth
              helperText="Visible in activity feeds and filters."
              label="Project title"
              placeholder="Neon dashboard"
            />
            <Box className="app-grid app-grid--halves">
              <NumberInput
                fullWidth
                defaultValue={8}
                helperText="Estimate remaining work."
                htmlInputProps={{ max: 21, min: 1 }}
                label="Story points"
              />
              <DateInput
                fullWidth
                defaultValue="2026-04-12"
                helperText="Target handoff date."
                label="Launch date"
              />
            </Box>
            <AutocompleteInput
              fullWidth
              helperText="Local filtering is built in, and loading states can be shown for remote search."
              label="Owning team"
              options={teamOptions}
              value={team}
              onChange={setTeam}
            />
            <CheckboxField
              description="Notify watchers when status changes or ownership moves."
              label="Post updates automatically"
              checked={notificationsEnabled}
              onChange={setNotificationsEnabled}
            />
            <RadioGroupField
              helperText="Use a guarded rollout when approvals still matter."
              label="Release strategy"
              name="release-mode"
              options={[
                {
                  label: "Guarded",
                  value: "guarded",
                  description: "Manual sign-off before environment promotion.",
                },
                {
                  label: "Fast lane",
                  value: "fast",
                  description: "Auto-promote once checks complete.",
                },
              ]}
              value={releaseMode}
              onChange={setReleaseMode}
            />
          </div>
        </Surface>

        <Box className="app-stack">
          <Surface
            accent="primary"
            description="Type, title, and surface primitives define the visual hierarchy."
            eyebrow="Display"
            title="Readable by default"
          >
            <AppText tone="accent" variant="subtitle2">
              focus.visible = true
            </AppText>
            <AppText variant="body1">
              Strong contrast, monospace accents, and measured glow effects keep the library
              colorful without hiding the information density you need in a project management app.
            </AppText>
            <AppText mono tone="muted" variant="body2">
              team: {team?.label ?? "none"} / notifications: {String(notificationsEnabled)} / mode:{" "}
              {releaseMode}
            </AppText>
          </Surface>
          <AppList
            description="Useful for activity streams, side panels, and compact summaries."
            items={activityItems}
            title="Recent activity"
          />
        </Box>
      </Box>

      <DataTable columns={tableColumns} rows={tableRows} title="Execution board" />
    </div>
  );
}
