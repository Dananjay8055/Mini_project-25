
import { useState } from 'react';
import ErrorLayout from '@/components/layouts/ErrorLayout';
import { AlertTriangle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface GenericErrorProps {
  error?: Error;
  resetError?: () => void;
}

const GenericError = ({ error, resetError }: GenericErrorProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  
  const handleRetry = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };
  
  return (
    <ErrorLayout
      title="Something Went Wrong"
      description="We encountered an unexpected error. Our team has been notified and is working on a solution."
      icon={<AlertTriangle className="h-12 w-12 text-amber-500" />}
      showRetry={true}
      retryAction={handleRetry}
    >
      {error && (
        <Accordion type="single" collapsible className="w-full text-left">
          <AccordionItem value="error-details">
            <AccordionTrigger className="text-sm text-muted-foreground">View Technical Details</AccordionTrigger>
            <AccordionContent>
              <div className="bg-muted p-4 rounded text-sm font-mono overflow-auto max-h-40 text-left">
                <p className="font-bold">{error.name}</p>
                <p className="text-red-500">{error.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{error.stack}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </ErrorLayout>
  );
};

export default GenericError;
