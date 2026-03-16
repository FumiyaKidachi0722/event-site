"use client";

import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Card, Label, Select, TextArea, TextInput } from "@/components/admin/form-fields";
import { fetchAdminSnapshot, saveSettings, type AdminSnapshot } from "@/lib/admin-api";

export default function AdminSettingsPage() {
  const [snapshot, setSnapshot] = useState<AdminSnapshot | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminSnapshot()
      .then(setSnapshot)
      .catch((nextError) => {
        setError(nextError instanceof Error ? nextError.message : "Failed to load settings.");
      });
  }, []);

  const event = snapshot?.event;

  return (
    <AdminShell
      title="Event Settings"
      description="Manage event identity, phase, multilingual copy, CTA URLs, and publication controls."
    >
      {error ? <Card>{error}</Card> : null}
      {!event || !snapshot ? (
        <Card>Loading settings...</Card>
      ) : (
        <form
          className="grid gap-6"
          onSubmit={async (eventAction) => {
            eventAction.preventDefault();
            setNotice("");
            setError("");
            try {
              await saveSettings(snapshot.event);
              setNotice("Settings saved.");
            } catch (nextError) {
              setError(nextError instanceof Error ? nextError.message : "Failed to save settings.");
            }
          }}
        >
          <Card className="grid gap-4 lg:grid-cols-2">
            <Label title="Event title (ja)">
              <TextInput
                value={snapshot.event.title.ja}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      title: { ...snapshot.event.title, ja: eventAction.target.value },
                    },
                  })
                }
              />
            </Label>
            <Label title="Event title (en)">
              <TextInput
                value={snapshot.event.title.en || ""}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      title: { ...snapshot.event.title, en: eventAction.target.value },
                    },
                  })
                }
              />
            </Label>
            <Label title="Subtitle (ja)">
              <TextArea
                value={snapshot.event.subtitle.ja}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      subtitle: { ...snapshot.event.subtitle, ja: eventAction.target.value },
                    },
                  })
                }
              />
            </Label>
            <Label title="Subtitle (en)">
              <TextArea
                value={snapshot.event.subtitle.en || ""}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      subtitle: { ...snapshot.event.subtitle, en: eventAction.target.value },
                    },
                  })
                }
              />
            </Label>
            <Label title="Summary (ja)">
              <TextArea
                value={snapshot.event.summary.ja}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      summary: { ...snapshot.event.summary, ja: eventAction.target.value },
                    },
                  })
                }
              />
            </Label>
            <Label title="Summary (en)">
              <TextArea
                value={snapshot.event.summary.en || ""}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      summary: { ...snapshot.event.summary, en: eventAction.target.value },
                    },
                  })
                }
              />
            </Label>
            <Label title="Phase">
              <Select
                value={snapshot.event.phase}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      phase: eventAction.target.value as "before" | "live" | "after",
                    },
                  })
                }
              >
                <option value="before">before</option>
                <option value="live">live</option>
                <option value="after">after</option>
              </Select>
            </Label>
            <Label title="Status">
              <Select
                value={snapshot.event.status}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      status: eventAction.target.value as "draft" | "published",
                    },
                  })
                }
              >
                <option value="draft">draft</option>
                <option value="published">published</option>
              </Select>
            </Label>
            <Label title="Start At">
              <TextInput
                type="datetime-local"
                value={snapshot.event.startAt.slice(0, 16)}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      startAt: new Date(eventAction.target.value).toISOString(),
                    },
                  })
                }
              />
            </Label>
            <Label title="End At">
              <TextInput
                type="datetime-local"
                value={snapshot.event.endAt.slice(0, 16)}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      endAt: new Date(eventAction.target.value).toISOString(),
                    },
                  })
                }
              />
            </Label>
            <Label title="Primary CTA URL">
              <TextInput
                value={snapshot.event.primaryCta.url}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      primaryCta: { ...snapshot.event.primaryCta, url: eventAction.target.value },
                    },
                  })
                }
              />
            </Label>
            <Label title="Primary CTA Label (ja)">
              <TextInput
                value={snapshot.event.primaryCta.label.ja}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      primaryCta: {
                        ...snapshot.event.primaryCta,
                        label: { ...snapshot.event.primaryCta.label, ja: eventAction.target.value },
                      },
                    },
                  })
                }
              />
            </Label>
            <Label title="Primary CTA Label (en)">
              <TextInput
                value={snapshot.event.primaryCta.label.en || ""}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      primaryCta: {
                        ...snapshot.event.primaryCta,
                        label: { ...snapshot.event.primaryCta.label, en: eventAction.target.value },
                      },
                    },
                  })
                }
              />
            </Label>
            <Label title="Secondary CTA URL">
              <TextInput
                value={snapshot.event.secondaryCta.url}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      secondaryCta: {
                        ...snapshot.event.secondaryCta,
                        url: eventAction.target.value,
                      },
                    },
                  })
                }
              />
            </Label>
            <Label title="Secondary CTA Label (ja)">
              <TextInput
                value={snapshot.event.secondaryCta.label.ja}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      secondaryCta: {
                        ...snapshot.event.secondaryCta,
                        label: {
                          ...snapshot.event.secondaryCta.label,
                          ja: eventAction.target.value,
                        },
                      },
                    },
                  })
                }
              />
            </Label>
            <Label title="Secondary CTA Label (en)">
              <TextInput
                value={snapshot.event.secondaryCta.label.en || ""}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      secondaryCta: {
                        ...snapshot.event.secondaryCta,
                        label: {
                          ...snapshot.event.secondaryCta.label,
                          en: eventAction.target.value,
                        },
                      },
                    },
                  })
                }
              />
            </Label>
            <Label title="Hero Image URL">
              <TextInput
                value={snapshot.event.heroImageUrl}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: { ...snapshot.event, heroImageUrl: eventAction.target.value },
                  })
                }
              />
            </Label>
            <Label title="OG Image URL">
              <TextInput
                value={snapshot.event.ogImageUrl}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: { ...snapshot.event, ogImageUrl: eventAction.target.value },
                  })
                }
              />
            </Label>
            <Label title="Hashtags (comma separated)">
              <TextInput
                value={snapshot.event.hashtags.join(", ")}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      hashtags: eventAction.target.value
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </Label>
            <Label title="Enabled locales">
              <TextInput
                value={snapshot.event.locales.join(", ")}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      locales: eventAction.target.value
                        .split(",")
                        .map((item) => item.trim())
                        .filter((item): item is "ja" | "en" => item === "ja" || item === "en"),
                    },
                  })
                }
              />
            </Label>
            <Label title="Emergency Banner Enabled">
              <Select
                value={String(snapshot.event.emergencyBanner.enabled)}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      emergencyBanner: {
                        ...snapshot.event.emergencyBanner,
                        enabled: eventAction.target.value === "true",
                      },
                    },
                  })
                }
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </Select>
            </Label>
            <Label title="Emergency Banner (ja)">
              <TextInput
                value={snapshot.event.emergencyBanner.text.ja}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      emergencyBanner: {
                        ...snapshot.event.emergencyBanner,
                        text: {
                          ...snapshot.event.emergencyBanner.text,
                          ja: eventAction.target.value,
                        },
                      },
                    },
                  })
                }
              />
            </Label>
            <Label title="Emergency Banner (en)">
              <TextInput
                value={snapshot.event.emergencyBanner.text.en || ""}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      emergencyBanner: {
                        ...snapshot.event.emergencyBanner,
                        text: {
                          ...snapshot.event.emergencyBanner.text,
                          en: eventAction.target.value,
                        },
                      },
                    },
                  })
                }
              />
            </Label>
            <Label title="Emergency Banner Link">
              <TextInput
                value={snapshot.event.emergencyBanner.link?.url || ""}
                onChange={(eventAction) =>
                  setSnapshot({
                    ...snapshot,
                    event: {
                      ...snapshot.event,
                      emergencyBanner: {
                        ...snapshot.event.emergencyBanner,
                        link: {
                          label: snapshot.event.emergencyBanner.link?.label || {
                            ja: "View",
                            en: "View",
                          },
                          url: eventAction.target.value,
                        },
                      },
                    },
                  })
                }
              />
            </Label>
          </Card>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Save settings
            </button>
            {notice ? <span className="text-sm text-emerald-300">{notice}</span> : null}
            {error ? <span className="text-sm text-rose-300">{error}</span> : null}
          </div>
        </form>
      )}
    </AdminShell>
  );
}
