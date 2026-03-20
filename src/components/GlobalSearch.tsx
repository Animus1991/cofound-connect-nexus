import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Search,
  Users,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Home,
  Target,
  User,
  MapPin,
  Zap,
} from "lucide-react";

// Mock searchable data
const searchableProfiles = [
  { id: 1, name: "Alex Chen", role: "Founder", skills: ["AI/ML", "Python"], location: "San Francisco", matchScore: 92 },
  { id: 2, name: "Maria Santos", role: "Investor", skills: ["Fintech", "SaaS"], location: "London", matchScore: 87 },
  { id: 3, name: "Dimitris Papadopoulos", role: "Co-Founder", skills: ["React", "Node.js"], location: "Athens", matchScore: 85 },
  { id: 4, name: "Sarah Kim", role: "Mentor", skills: ["Product", "Growth"], location: "Remote", matchScore: 79 },
  { id: 5, name: "James Okafor", role: "Founder", skills: ["Climate-tech", "Ops"], location: "Lagos", matchScore: 76 },
  { id: 6, name: "Lena Müller", role: "Co-Founder", skills: ["UI/UX", "Figma"], location: "Berlin", matchScore: 73 },
];

const searchableCommunities = [
  { id: "1", title: "AI Founders Hub", members: 234, category: "Technology" },
  { id: "2", title: "SaaS Growth Collective", members: 189, category: "Business" },
  { id: "3", title: "Climate Tech Alliance", members: 156, category: "Impact" },
  { id: "4", title: "Women in Startups", members: 312, category: "Community" },
  { id: "5", title: "Design for Startups", members: 98, category: "Design" },
];

const searchableOpportunities = [
  { id: "1", title: "CTO Co-founder — AI Recruitment Platform", org: "TalentAI", type: "cofounder" },
  { id: "2", title: "Lead Frontend Engineer", org: "GreenMetrics", type: "job" },
  { id: "3", title: "Growth Marketing Consultant", org: "FinFlow", type: "freelance" },
  { id: "4", title: "Technical Co-founder — EdTech", org: "LearnPath", type: "cofounder" },
];

const quickNav = [
  { label: "Dashboard", path: "/dashboard", icon: Home },
  { label: "Discover Matches", path: "/discover", icon: Search },
  { label: "Messages", path: "/messages", icon: MessageSquare },
  { label: "Mentors", path: "/mentors", icon: GraduationCap },
  { label: "Communities", path: "/communities", icon: Users },
  { label: "Opportunities", path: "/opportunities", icon: Briefcase },
  { label: "Milestones", path: "/milestones", icon: Target },
  { label: "Profile", path: "/profile", icon: User },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback(
    (path: string) => {
      setOpen(false);
      navigate(path);
    },
    [navigate]
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/30 px-3 py-1.5 text-sm text-muted-foreground transition-all duration-200 hover:bg-secondary/50 hover:border-border hover:text-foreground active:scale-[0.98]"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border border-border/50 bg-secondary/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search profiles, communities, opportunities…" />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-6">
              <Search className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No results found</p>
              <p className="text-xs text-muted-foreground/60">Try a different search term</p>
            </div>
          </CommandEmpty>

          <CommandGroup heading="Quick Navigation">
            {quickNav.map((item) => (
              <CommandItem
                key={item.path}
                value={item.label}
                onSelect={() => handleSelect(item.path)}
                className="gap-3 py-2.5"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary">
                  <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="People">
            {searchableProfiles.map((profile) => (
              <CommandItem
                key={`profile-${profile.id}`}
                value={`${profile.name} ${profile.role} ${profile.skills.join(" ")} ${profile.location}`}
                onSelect={() => handleSelect("/discover")}
                className="gap-3 py-2.5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <span className="text-[10px] font-semibold text-primary">
                    {profile.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{profile.name}</span>
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground">
                      {profile.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <MapPin className="h-2.5 w-2.5" />
                    {profile.location}
                    <span className="text-primary font-medium">{profile.matchScore}% match</span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Communities">
            {searchableCommunities.map((community) => (
              <CommandItem
                key={`community-${community.id}`}
                value={`${community.title} ${community.category}`}
                onSelect={() => handleSelect(`/communities/${community.id}`)}
                className="gap-3 py-2.5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                  <Users className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">{community.title}</span>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{community.category}</span>
                    <span>·</span>
                    <span>{community.members} members</span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Opportunities">
            {searchableOpportunities.map((opp) => (
              <CommandItem
                key={`opp-${opp.id}`}
                value={`${opp.title} ${opp.org} ${opp.type}`}
                onSelect={() => handleSelect("/opportunities")}
                className="gap-3 py-2.5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium truncate">{opp.title}</span>
                  <div className="text-[11px] text-muted-foreground">{opp.org}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
