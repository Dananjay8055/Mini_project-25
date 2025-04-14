
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ErrorLayout from "@/components/layouts/ErrorLayout";
import { FileX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <ErrorLayout
      title="404: Page Not Found"
      description="We couldn't find the page you're looking for. The page may have been moved, deleted, or never existed."
      icon={<FileX className="h-12 w-12 text-muted-foreground" />}
    />
  );
};

export default NotFound;
