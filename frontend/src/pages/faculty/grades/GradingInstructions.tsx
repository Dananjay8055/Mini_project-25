
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const GradingInstructions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Grading Instructions</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <ul className="list-disc list-inside space-y-1">
          <li>Enter scores from 0-100 for each assessment category</li>
          <li>Total grade is calculated automatically using the weighted formula</li>
          <li>Letter grades are assigned according to the university grading scale</li>
          <li>Click "Save" to save your progress without submitting</li>
          <li>Click "Submit Final" when you are ready to submit the grades to the registrar</li>
          <li>Once submitted, grades can only be changed by contacting the registrar</li>
        </ul>
      </CardContent>
    </Card>
  );
};
