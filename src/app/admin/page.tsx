"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LogOut, Mail, Phone, RefreshCw } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type Lead = {
  id: string;
  name: string;
  company: string | null;
  phone: string;
  email: string;
  requirement: string | null;
  message: string | null;
  created_at: string;
};

function LoginForm({ onSignedIn }: { onSignedIn: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }
    onSignedIn();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <p className="font-display text-2xl font-semibold">
        BM <span className="text-primary">Xpress</span> Admin
      </p>
      <p className="mt-2 text-sm text-muted-foreground">Sign in to view contact form leads.</p>

      {!isSupabaseConfigured && (
        <p className="mt-6 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs text-primary">
          Supabase env vars are not set. Add them to enable admin login.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="admin@bmxpress.in" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required placeholder="••••••••" />
        </div>
        {error && <p className="text-xs text-primary">{error}</p>}
        <Button type="submit" disabled={loading} className="mt-2">
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-xs text-muted-foreground">
        No account yet? Create one from Supabase Dashboard → Authentication → Users → Add user.
      </p>
    </div>
  );
}

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-2xl font-semibold">Leads</p>
            <p className="text-sm text-muted-foreground">{leads.length} total submissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchLeads}>
              <RefreshCw size={14} /> Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={onSignOut}>
              <LogOut size={14} /> Sign out
            </Button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          {loading ? (
            <p className="p-6 text-sm text-muted-foreground">Loading leads…</p>
          ) : leads.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No submissions yet.</p>
          ) : (
            <div className="divide-y divide-border">
              {leads.map((lead) => (
                <div key={lead.id} className="grid gap-2 p-5 sm:grid-cols-[1fr_1fr_2fr]">
                  <div>
                    <p className="text-sm font-semibold">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.company || "—"}</p>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5"><Phone size={12} /> {lead.phone}</p>
                    <p className="flex items-center gap-1.5"><Mail size={12} /> {lead.email}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium text-foreground">{lead.requirement || "—"}</p>
                    <p className="mt-1">{lead.message}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider">
                      {new Date(lead.created_at).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  if (!checked) return null;

  if (!session) {
    return <LoginForm onSignedIn={() => {}} />;
  }

  return <Dashboard onSignOut={() => supabase.auth.signOut()} />;
}
