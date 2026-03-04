import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowLeft, SearchX } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20"
        >
          <SearchX className="h-12 w-12 text-primary" />
        </motion.div>
        <h1 className="font-display text-7xl font-bold text-foreground mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-2">Page not found</p>
        <p className="text-sm text-muted-foreground/70 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="hero" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="gap-2">
              <Rocket className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
