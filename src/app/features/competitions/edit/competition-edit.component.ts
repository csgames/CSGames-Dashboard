import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { getCompetitionEditCompetition, getCompetitionEditError, getCompetitionEditLoading, State } from "./store/competition-edit.reducer";
import {
    LoadCompetition,
    OpenCreateQuestionModal, OpenSettingsModal,
    OpenUpdateQuestionModal, ResetStore,
    SaveQuestionsAndDescription
} from "./store/competition-edit.actions";
import { Question, QuestionGraphNode } from "../../../api/models/question";
import { Competition } from "../../../api/models/competition";
import { Subscription } from "rxjs";

@Component({
    selector: "app-edit-competition",
    templateUrl: "competition-edit.template.html",
    styleUrls: ["./competition-edit.style.scss"]
})
export class CompetitionEditComponent implements OnInit, OnDestroy {

    public id: string;

    loading$ = this.store$.pipe(select(getCompetitionEditLoading));
    error$ = this.store$.pipe(select(getCompetitionEditError));
    competition$ = this.store$.pipe(select(getCompetitionEditCompetition));

    public competition: Competition;

    private competitionIdSub$: Subscription;
    private competitionSub$: Subscription;

    constructor(private store$: Store<State>, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.store$.dispatch(new ResetStore());
        this.competitionIdSub$ = this.activatedRoute.params.subscribe(
            params => {
                this.id = params["id"];
                this.store$.dispatch(new LoadCompetition(this.id));
            }
        );
        this.competitionSub$ = this.competition$.subscribe(c => {
            console.log(c);
            this.competition = c;
        });
    }

    ngOnDestroy(): void {
        this.competitionIdSub$.unsubscribe();
        this.competitionSub$.unsubscribe();
    }

    clickEditQuestion(question: QuestionGraphNode) {
        this.store$.dispatch(new OpenUpdateQuestionModal(question.question as Question));
    }

    clickAddQuestion() {
        this.store$.dispatch(new OpenCreateQuestionModal());
    }

    clickSave() {
        const questionGraphNodes = (this.competition.questions as QuestionGraphNode[])
            .map((q: QuestionGraphNode) => {
                return {
                    ...q,
                    question: (q.question as Question)._id
                } as unknown;
            });
        this.store$.dispatch(new SaveQuestionsAndDescription({
            description: this.competition.description,
            questions: questionGraphNodes as QuestionGraphNode[]
        }));
    }

    clickSettings() {
        this.store$.dispatch(new OpenSettingsModal(this.competition));
    }
}