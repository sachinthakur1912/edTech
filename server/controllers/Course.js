const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Category = require("../models/Category");
const mongoose = require("mongoose");

// create courses handler function
exports.createCourse = async (req, res) => {
  try {
    // fetch all details from request body
    const { courseName, courseDescription, price, whatWillYouLearn, category } =
      req.body;
    const thumbnail = req.files.thumbnailImage;
    // validation
    if (
      !courseName ||
      !courseDescription ||
      !price ||
      !whatWillYouLearn ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }
    // role validation
    const userId = req.user.user.id;
    const instructorDetails = await User.findById(userId);
    // console.log("instructorDetails", instructorDetails);
    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor not found",
      });
    }
    // category validation
    const categoryDetails = await Category.findOne({ name: category });
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
    // upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    // create course
    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      instructor: instructorDetails._id,
      whatWillYouLearn: whatWillYouLearn,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });
    // add course to user
  
  

const instructorDetails_id = instructorDetails._id.toString();
const categoryDetails_id = categoryDetails._id.toString();

    await User.findByIdAndUpdate(
      instructorDetails_id,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // add course to category

   const categoryDetails2= await Category.findByIdAndUpdate(
       categoryDetails_id ,

      {
        $push: {
          course: newCourse._id,
        },
      },

      { new: true }
    );
    // return response
    console.log(categoryDetails2)
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.log("Error occured while creating course", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// get all courses handler function
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {}
        ,
        {
          courseName: true,
          // courseDescription: true,
          // price: true,
          // whatWillYouLearn: true,
          // category: true,
          // thumbnail: true,
          instructor: true,
        }
    // );
    ).populate("instructor")
    .exec();
    return res.status(200).json({
      success: true,
      courses: allCourses,
      message: "Courses fetched successfully",
    });
  } catch (error) {
    console.log("Error occured while fetching courses", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// get course details for a single course handler functioin 
exports.getCourseDetails = async (req, res) => {
  try{
    // get id
    const {courseId}=req.body;
    // validation
    if(!courseId){
      return res.status(400).json({
        success:false,
        message:"Please provide courseId"
      })
    }
    const courseDetails = await Course.findById(
                                                {_id:courseId})
                                               .populate({
                                                  path:"instructor",
                                                  populate:{
                                                    path:"additionalDetails"
                                                  }
                                               })
                                                .populate("category")
                                                .populate("ratingAndReviews")
                                                .populate({
                                                  path:"sections",
                                                  populate:{
                                                    path:"subSection"
                                                  }
                                                })
                                                .exec();
    if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:"Course not found"
      })
    }
    return res.status(200).json({
      success:true,
      course:courseDetails,
      message:"Course fetched successfully"
    })
  }catch(error){
    console.log("Error occured while fetching course details",error);
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}