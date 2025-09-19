"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/use-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import CourseCardSearch from "@/components/CourseCardSearch";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const LoadingSkeleton = () => {
  
    return (
        <div className="landing-skeleton">
            <div className="landing-skeleton__hero">
                <div className="landing-skeleton__hero-content">
                    <Skeleton className="landing-skeleton__title" />
                    <Skeleton className="landing-skeleton__subtitle" />
                    <Skeleton className="landing-skeleton__subtitle-secondary" />
                    <Skeleton className="landing-skeleton__button" />

                </div>
                <Skeleton className="landing-skeleton__hero-image" />
            </div>
            <div className="landing-skeleton__featured">
                <Skeleton className="landing-skeleton__featured-title" />
                <Skeleton className="landing-skeleton__featured-description" />
                <div className="landing-skeleton__tags">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="landing-skeleton__tag" />
                    ))}
                </div>
                <div className="landing-skeleton__courses">
                    {
                        Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} className="landing-skeleton__course-card" />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
const Landing = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`,{
      scroll: false
    })
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <div>Error loading courses</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="landing"
    >
      <motion.div
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Courses</h1>
          <p className="landing__description">
            This is the list of courses available on Rampy.
            <br />
            Courses when taken will help you gain practical skills.
          </p>
          <div className="landing__cta">
            <Link href={"/search"}
              scroll={false}
            >
              <div className="landing__cta-button">Explore Courses</div>
            </Link>
          </div>
        </div>
        <div className="landing__hero-images">
          {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Hero Image ${index + 1}`}
              fill
              priority={index === currentImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`landing__hero-image ${index === currentImage ? "landing__hero-image--active" : ""}`}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{
            y: 20,
          opacity: 0,
        }}
        whileInView={{
            y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        viewport={{
            amount: 0.3,
            once: true,
        }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">Featured Courses</h2>
        <p className="landing__featured-description">
          From beginner to advanced, we have courses for everyone.
        </p>
        <div className="landing__tags">
            {
                ["Web Development", "Data Science", "Graphic Design",
                    "Digital Marketing", "UI/UX Design"
                ].map((tag, index) => (
                    <span key={index} className="landing__tag">{tag}</span>
                ))
            }
        </div>
        <div className="landing__courses">
            {/* courses display goes here */}
            {courses && courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
                viewport={{amount: 0.4}}
                
              >
                <CourseCardSearch 
                  course={course}
                  onClick={() => handleCourseClick(course.courseId)}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
