import { Subject, SubjectID } from '@models/subjects/Subject';

export interface SubjectCardProps {
  subject: Subject;

  onClick: (subjectId: SubjectID) => void;
}
