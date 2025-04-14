
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Save, Upload } from 'lucide-react';

interface GradePageHeaderProps {
  unsavedChanges: boolean;
  onSave: () => void;
  onSubmitFinal: () => void;
  onImport: () => void;
  onExport: () => void;
}

export const GradePageHeader: React.FC<GradePageHeaderProps> = ({
  unsavedChanges,
  onSave,
  onSubmitFinal,
  onImport,
  onExport
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Manage Grades</h1>
        <p className="text-muted-foreground">Evaluate and submit student performance</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onImport}>
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" size="sm" onClick={onSave} disabled={!unsavedChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button onClick={onSubmitFinal}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Submit Final
        </Button>
      </div>
    </div>
  );
};
