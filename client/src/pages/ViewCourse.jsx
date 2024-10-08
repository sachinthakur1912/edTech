import React from "react";
import { useEffect, useState } from "react";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import { Outlet, useParams } from "react-router-dom";
import {
  getCourseDetails,
  getLectureDetails,
} from "../services/operationa/course";
import { useDispatch, useSelector } from "react-redux";
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar";

export default function ViewCourse() {
  const courseId = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  // const {courseSectionData,totalNoOfLectures,courseEntireData,completedLectures}=useSelector((state)=>state.viewCourse)
  const [reviewModal, setReviewModal] = useState(false);
  useEffect(() => {
    (async () => {
      const courseData = await getLectureDetails({ courseId, token });
      console.log("Course Data here... ", courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.sections));

      dispatch(setEntireCourseData(courseData.courseDetails));

      dispatch(setCompletedLectures(courseData.completedVideos));

      let lectures = 0;
      courseData?.courseDetails?.sections?.forEach((sec) => {
        lectures += sec.subSection.length;
      });

      dispatch(setTotalNoOfLectures(lectures));
    })();
  }, []);
  return (
    <div className="flex">
      <div className="h-[100%]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
      </div>

      <div>
        <Outlet />
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
}
