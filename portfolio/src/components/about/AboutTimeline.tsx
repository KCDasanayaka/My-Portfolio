"use client";

import { motion } from "framer-motion";
import styles from "@/styles/AboutTimeline.module.css";

const timelineItems = [


  {
    number: "01",
    year: "2025 Feb-Aug",
    title: "UI/UX Designer",
    role: "Limitless Ideation",
    company: "Internship",
    description:
      "My internship was where design moved from theory into real-world products. I worked across interfaces, user experiences and digital products while learning how design decisions are shaped by users, business requirements and development constraints.",
  },

  {
    number: "02",
    year: "2025 Sept-",
    title: "Freelancer",
    role: "UI/UX · Web · Brand Design",
    company: "",
    description:
      "Working independently allowed me to explore different industries, visual styles and design problems - from websites and digital products to branding and promotional experiences.",
  },

];


export default function AboutTimeline() {

  return (
    <section className={styles.timelineSection}>

      {/* HEADER */}

      <div className={styles.timelineHeader}>
        <div>
          <p className={styles.eyebrow}>
            THE JOURNEY
          </p>

          <h2>
            MY JOURNEY
          </h2>

        </div>

      </div>


      {/* TIMELINE */}

      <div className={styles.timeline}>

        {/* CONTINUOUS LINE */}

        <div className={styles.timelineLine} />

        <div className={styles.timelineItems}>

          {timelineItems.map((item, index) => (

            <motion.article
              key={item.number}
              className={`${styles.timelineItem} ${
                index % 2 === 0
                  ? styles.left
                  : styles.right
              }`}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* CARD */}

              <div className={styles.timelineCard}>

                <div className={styles.cardTop}>

                  <span className={styles.number}>
                    {item.number}
                  </span>

                  <span className={styles.year}>
                    {item.year}
                  </span>

                </div>


                <h3>
                  {item.title}
                </h3>


                <p className={styles.role}>
                  {item.role}
                </p>


                <p className={styles.company}>
                  {item.company}
                </p>


                <p className={styles.description}>
                  {item.description}
                </p>

              </div>


              {/* CENTER DOT */}

              <div className={styles.timelineDot}>
                <span />
              </div>
            </motion.article>

          ))}

        </div>
      </div>


      {/* END STATEMENT */}

      <div className={styles.timelineEnd}>
        <span>
          AND THE JOURNEY CONTINUES
        </span>
        <div />
      </div>

    </section>
  );
}