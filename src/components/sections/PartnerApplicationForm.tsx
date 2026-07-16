"use client";

import { useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CheckCircle2, Loader2, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type Status = "idle" | "loading" | "success" | "error";

const vehicles = [
  { value: "BIKE", label: "Bike" },
  { value: "SCOOTER", label: "Scooter" },
  { value: "CYCLE", label: "Cycle" },
  { value: "EV", label: "EV" },
];

const workingTimes = ["Morning", "Afternoon", "Evening", "Night", "Flexible / Full day"];

async function uploadFile(file: File, applicationId: string, kind: string) {
  const path = `${applicationId}/${kind}-${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("partner-documents").upload(path, file);
  if (error) throw error;
  return path;
}

export function PartnerApplicationForm() {
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState("BIKE");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("Please accept the terms to continue.");
      return;
    }
    setStatus("loading");
    setError(null);

    if (!isSupabaseConfigured) {
      setStatus("error");
      setError("Form is not connected yet — add Supabase env vars to enable submissions.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const applicationId = crypto.randomUUID();

    try {
      const resumeFile = formData.get("resume") as File | null;
      const documentFiles = formData.getAll("documents") as File[];

      let resumePath: string | null = null;
      if (resumeFile && resumeFile.size > 0) {
        resumePath = await uploadFile(resumeFile, applicationId, "resume");
      }

      const documentPaths: string[] = [];
      for (const doc of documentFiles) {
        if (doc && doc.size > 0) {
          documentPaths.push(await uploadFile(doc, applicationId, "document"));
        }
      }

      const payload = {
        id: applicationId,
        full_name: String(formData.get("full_name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        email: String(formData.get("email") ?? "") || null,
        city: String(formData.get("city") ?? ""),
        area: String(formData.get("area") ?? "") || null,
        vehicle_type: vehicle,
        driving_license_number: String(formData.get("driving_license_number") ?? "") || null,
        aadhaar_number: String(formData.get("aadhaar_number") ?? "") || null,
        pan_number: String(formData.get("pan_number") ?? "") || null,
        bank_name: String(formData.get("bank_name") ?? "") || null,
        account_number: String(formData.get("account_number") ?? "") || null,
        ifsc_code: String(formData.get("ifsc_code") ?? "") || null,
        experience_years: formData.get("experience_years")
          ? Number(formData.get("experience_years"))
          : null,
        preferred_working_time: String(formData.get("preferred_working_time") ?? "") || null,
        resume_path: resumePath,
        document_paths: documentPaths,
        terms_accepted: true,
      };

      const { error: insertError } = await supabase.from("delivery_partner_applications").insert([payload]);
      if (insertError) throw insertError;

      setStatus("success");
      form.reset();
      setVehicle("BIKE");
      setTermsAccepted(false);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".js-swap", { opacity: 0, y: 10, duration: 0.5 });
    },
    { scope: root, dependencies: [status === "success"], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="mx-auto max-w-2xl rounded-3xl border border-border bg-white p-6 shadow-[0_24px_60px_-32px_rgba(14,23,48,0.28)] sm:p-10">
      <>
        {status === "success" ? (
          <div className="js-swap flex flex-col items-center py-10 text-center">
            <CheckCircle2 className="text-primary" size={48} />
            <p className="font-display mt-4 text-xl font-semibold">Application received</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Our onboarding team will call you shortly to verify your documents and get you started.
            </p>
            <Button variant="outline" size="sm" className="mt-6" onClick={() => setStatus("idle")}>
              Submit another
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="js-swap grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" name="full_name" required placeholder="Your full name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required placeholder="10-digit mobile number" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required placeholder="e.g. Berhampore" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="area">Area</Label>
              <Input id="area" name="area" placeholder="Locality / neighbourhood" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="vehicle_type">Vehicle</Label>
              <select
                id="vehicle_type"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="flex h-12 w-full rounded-xl border border-border bg-foreground/[0.03] px-4 text-sm outline-none focus-visible:border-primary/60"
              >
                {vehicles.map((v) => (
                  <option key={v.value} value={v.value}>{v.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="driving_license_number">Driving License Number</Label>
              <Input id="driving_license_number" name="driving_license_number" placeholder="Optional for cycle" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="aadhaar_number">Aadhaar Number</Label>
              <Input id="aadhaar_number" name="aadhaar_number" placeholder="XXXX XXXX XXXX" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pan_number">PAN Number</Label>
              <Input id="pan_number" name="pan_number" placeholder="ABCDE1234F" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="experience_years">Experience (years)</Label>
              <Input id="experience_years" name="experience_years" type="number" min="0" step="0.5" placeholder="0" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="bank_name">Bank Name</Label>
              <Input id="bank_name" name="bank_name" placeholder="Bank name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="account_number">Account Number</Label>
              <Input id="account_number" name="account_number" placeholder="Bank account number" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="ifsc_code">IFSC Code</Label>
              <Input id="ifsc_code" name="ifsc_code" placeholder="e.g. SBIN0001234" />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="preferred_working_time">Preferred Working Time</Label>
              <select
                id="preferred_working_time"
                name="preferred_working_time"
                defaultValue=""
                className="flex h-12 w-full rounded-xl border border-border bg-foreground/[0.03] px-4 text-sm outline-none focus-visible:border-primary/60"
              >
                <option value="" disabled>Select a preference</option>
                {workingTimes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="resume" className="flex items-center gap-1.5">
                <Upload size={12} /> Resume (optional)
              </Label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                className="text-xs text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-xs file:font-medium file:text-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="documents" className="flex items-center gap-1.5">
                <Upload size={12} /> ID Documents (Aadhaar / PAN / License scans)
              </Label>
              <input
                id="documents"
                name="documents"
                type="file"
                multiple
                accept=".pdf,image/*"
                className="text-xs text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-xs file:font-medium file:text-primary"
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground sm:col-span-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#E30613]"
              />
              I agree to the <a href="/terms" className="text-primary underline">Terms of Service</a> and{" "}
              <a href="/privacy" className="text-primary underline">Privacy Policy</a>, and confirm the
              information provided is accurate.
            </label>

            {error && <p className="text-xs text-primary sm:col-span-2">{error}</p>}

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting
                  </>
                ) : (
                  <>
                    <Send size={16} /> Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </>
    </div>
  );
}
