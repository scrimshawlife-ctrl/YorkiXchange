"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function SettingsPage() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [busy, setBusy] = useState(true);
  const [saveBusy, setSaveBusy] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.id) {
        setBusy(false);
        return;
      }

      setBusy(true);
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setProfile(data);
        setUsername(data.username ?? "");
        setDisplayName(data.display_name ?? "");
        setBio(data.bio ?? "");
      }
      setBusy(false);
    };

    load();
  }, [session?.user?.id]);

  const saveProfile = async () => {
    if (!session?.user?.id) return;

    setSaveBusy(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        display_name: displayName,
        bio,
      })
      .eq("id", session.user.id);

    setSaveBusy(false);

    if (error) toast.error(error.message);
    else toast.success("Profile updated.");
  };

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!session?.user?.id) return;
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB.");
      return;
    }

    setUploadBusy(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${session.user.id}/avatar.${fileExt}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setUploadBusy(false);
      toast.error(uploadError.message);
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);

    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: urlData.publicUrl })
      .eq("id", session.user.id);

    setUploadBusy(false);

    if (updateError) toast.error(updateError.message);
    else {
      toast.success("Avatar updated.");
      setProfile({ ...profile, avatar_url: urlData.publicUrl });
    }
  };

  if (!session) {
    return <div className="text-sm text-muted-foreground">Log in to edit your profile.</div>;
  }

  if (busy) return <div className="text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your profile and preferences.</p>
      </div>

      <Card>
        <CardHeader className="font-medium">Avatar</CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.avatar_url ?? undefined} />
            <AvatarFallback>{(displayName || "YF").slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploadBusy}
              className="text-sm"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              JPG, PNG, or GIF. Max 2MB.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="font-medium">Profile Information</CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <div className="text-sm font-medium">Username</div>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              maxLength={24}
            />
            <p className="text-xs text-muted-foreground">
              3-24 characters. Used in your profile URL.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium">Display Name</div>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your Name"
              maxLength={40}
            />
            <p className="text-xs text-muted-foreground">
              Shown throughout the site. 1-40 characters.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium">Bio</div>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself and your Yorkies…"
              maxLength={280}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Optional. Max 280 characters.
            </p>
          </div>

          <Button className="w-full" onClick={saveProfile} disabled={saveBusy}>
            {saveBusy ? "Saving…" : "Save Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
