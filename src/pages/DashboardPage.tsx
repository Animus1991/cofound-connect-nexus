import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { StatSkeleton, CardSkeleton, ListItemSkeleton } from "@/components/SkeletonLoaders";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Users,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  Zap,
  Eye,
  MessageSquare,
  CheckCircle2,
  Clock,
  Star,
  Flame,
  ChevronRight,
  Bookmark,
  Target,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const recentMatches = [
  { name: "Alex Chen", role: "Founder", score: 92, skills: ["AI/ML", "Python"], online: true },
  { name: "Maria Santos", role: "Investor", score: 87, skills: ["Fintech", "SaaS"], online: true },
  { name: "Dimitris P.", role: "Developer", score: 85, skills: ["React", "Node.js"], online: false },
  { name: "Lena Müller", role: "Designer", score: 81, skills: ["UI/UX", "Figma"], online: false },
];

const upcomingEvents = [
  { title: "AI Founders Meetup", date: "Mar 2, 2026", type: "Online", attendees: 45 },
  { title: "Pitch Night Athens", date: "Mar 8, 2026", type: "In-person", attendees: 120 },
  { title: "SaaS Growth Workshop", date: "Mar 15, 2026", type: "Online", attendees: 30 },
];

const activityFeed = [
  { type: "match", text: "New match with Alex Chen (92% compatibility)", time: "10m ago", icon: Zap },
  { type: "view", text: "Your profile was viewed 12 times today", time: "1h ago", icon: Eye },
  { type: "intro", text: "Elena V. sent you an intro request", time: "2h ago", icon: MessageSquare },
  { type: "saved", text: "James Okafor saved your profile", time: "5h ago", icon: Bookmark },
  { type: "milestone", text: "You reached 100+ profile views!", time: "1d ago", icon: Flame },
];

const todoItems = [
  { label: "Add 3 more skills to your profile", done: true },
  { label: "Upload a profile photo", done: false },
  { label: "Connect your LinkedIn account", done: true },
  { label: "Set your co-founder preferences", done: false },
  { label: "Send your first intro request", done: false },
];

const mentorHighlights = [
  { name: "Dr. Sarah Kim", expertise: "AI/ML Strategy", sessions: 156, rating: 4.9 },
  { name: "James Okafor", expertise: "Growth & GTM", sessions: 89, rating: 4.8 },
];

export default function DashboardPage() {
  const [savedMatches, setSavedMatches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const completedTodos = todoItems.filter((t) => t.done).length;

  useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleSave = (name: string) => {
    setSavedMatches((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const stagger = (i: number) => ({ delay: i * 0.06 });

  return (
    <AppLayout title="Dashboard">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
        {isLoading ? (
          <>
            <CardSkeleton />
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <StatSkeleton key={i} />
              ))}
            </div>
            <CardSkeleton />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <ListItemSkeleton count={4} />
              </div>
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <ListItemSkeleton count={5} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-primary/15 bg-card p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                    Welcome back, Jane
                  </h2>
                  <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                    You have <span className="text-primary font-medium">3 new matches</span> and{" "}
                    <span className="text-accent font-medium">2 pending intro requests</span>.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/discover">
                    <Button size="sm" className="gap-2">
                      <Search className="h-3.5 w-3.5" />
                      Find Co-founders
                    </Button>
                  </Link>
                  <Link to="/opportunities">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Rocket className="h-3.5 w-3.5" />
                      Post Opportunity
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Profile Views", value: "128", change: "+12%", icon: TrendingUp },
                { label: "Matches", value: "24", change: "+3 this week", icon: Zap },
                { label: "Intro Requests", value: "7", change: "2 pending", icon: ArrowUpRight },
                { label: "Connections", value: "42", change: "+5 this month", icon: Users },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ ...stagger(i + 1), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-xl border border-border/50 bg-card p-4 sm:p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_2px_16px_hsl(var(--primary)/0.08)] active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                      <stat.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-[10px] font-medium text-primary bg-primary/8 px-2 py-0.5 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Grid: Matches + Activity + Checklist */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Top Matches - takes 2 cols */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...stagger(5), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-2 rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      Top Matches
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">People most compatible with your profile</p>
                  </div>
                  <Link to="/discover">
                    <Button variant="ghost" size="sm" className="text-xs gap-1 text-primary hover:text-primary">
                      View All <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-2">
                  {recentMatches.map((match) => (
                    <div
                      key={match.name}
                      className="flex items-center justify-between rounded-xl bg-secondary/20 p-3.5 transition-all duration-200 hover:bg-secondary/40 active:scale-[0.99] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
                            <span className="text-xs font-semibold text-primary">
                              {match.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          {match.online && (
                            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-primary" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{match.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-muted-foreground">{match.role}</span>
                            <div className="flex gap-1">
                              {match.skills.slice(0, 2).map((s) => (
                                <span key={s} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleSave(match.name); }}
                          className="text-muted-foreground hover:text-accent transition-colors active:scale-95"
                        >
                          <Star className={`h-4 w-4 ${savedMatches.includes(match.name) ? "fill-accent text-accent" : ""}`} />
                        </button>
                        <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1">
                          <span className="text-xs font-bold text-primary tabular-nums">{match.score}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Getting Started Checklist */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...stagger(6), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Getting Started
                  </h3>
                  <span className="text-xs font-medium text-primary tabular-nums">
                    {completedTodos}/{todoItems.length}
                  </span>
                </div>
                <Progress value={(completedTodos / todoItems.length) * 100} className="h-1.5 mb-4" />
                <div className="space-y-1.5">
                  {todoItems.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        item.done
                          ? "text-muted-foreground/60"
                          : "text-foreground hover:bg-secondary/30 cursor-pointer"
                      }`}
                    >
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${item.done ? "text-primary" : "text-border"}`}
                      />
                      <span className={item.done ? "line-through" : ""}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Activity + Mentors + Events */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...stagger(7), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
              >
                <h3 className="font-display text-base font-semibold text-foreground mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {activityFeed.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                        <activity.icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground leading-snug">{activity.text}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mentor Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...stagger(8), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Mentor Highlights
                  </h3>
                  <Link to="/mentors">
                    <Button variant="ghost" size="sm" className="text-xs gap-1 text-primary hover:text-primary">
                      Browse <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {mentorHighlights.map((mentor) => (
                    <div key={mentor.name} className="rounded-xl bg-secondary/20 p-4">
                      <p className="text-sm font-medium text-foreground">{mentor.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{mentor.expertise}</p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-accent fill-accent" />{mentor.rating}
                        </span>
                        <span>{mentor.sessions} sessions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Events */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...stagger(9), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
              >
                <h3 className="font-display text-base font-semibold text-foreground mb-4">
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.title}
                      className="rounded-xl border border-border/30 bg-secondary/10 p-4 transition-all duration-200 hover:bg-secondary/20 cursor-pointer active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        <Badge variant="secondary" className="text-[10px] font-normal">{event.type}</Badge>
                      </div>
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.attendees}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
