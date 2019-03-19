import { Activity } from "./activity";
import { Attendee } from "./attendee";
import { Question, QuestionGraphNode } from "./question";

export interface TeamResult {
    teamId: string;
    score: number;
}

export interface Competition {
    _id: string;
    activities: Activity[];
    directors: Attendee[];
    maxMembers: number;
    members: Members[];
    answers: QuestionAnswers;
    questions: Question[] | QuestionGraphNode[];
    results: TeamResult[];
    password: string;
    isLive: boolean;
    onDashboard: boolean;
    description: { [lang: string]: string };
}

export interface Members {
    teamId: string;
    attendees: Attendee[];
}

export interface QuestionAnswers {
    puzzle: string;
    teamId: string;
    value: any;
    timestamp: Date | string;
}
