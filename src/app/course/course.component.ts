import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from "rxjs";
import { Lesson } from "../shared/model/lesson";
import { CoursesHttpService } from "../services/courses-http.service";
import { Course } from "../shared/model/course";
import { LessonsPagerService } from "../services/lessons-pager.service";

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    providers: [LessonsPagerService]
})
export class CourseComponent implements OnInit, OnDestroy {

    @Input()
    id: number;

    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    details$: Observable<Lesson>;

    constructor(private coursesService: CoursesHttpService,
        private lessonsPager: LessonsPagerService) {
    }

    ngOnInit() {
        this.course$ = this.coursesService.findCourseById(this.id);
        this.lessons$ = this.lessonsPager.lessonsPage$;

        this.lessonsPager.loadFirstPage(this.id);
    }

    previousLessonsPage() {
        this.lessonsPager.previous();
    }

    nextLessonsPage() {
        this.lessonsPager.next();
    }

    ngOnDestroy() {
        console.log('destroying CourseComponent ...');
    }

    selectDetail(lesson: Lesson) {
        this.details$ = this.coursesService.findLessonDetailById(lesson.url);
    }

    backToMaster() {
        this.details$ = undefined;
    }

}

