import React from "react";
import styles from "./markModal.module.css";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaBullseye,
    FaRocket,
    FaLightbulb,
} from "react-icons/fa";

// Badge data
const badgeData = [
    { icon: <FaBullseye />, label: "Accuracy Ace", color: "#60A5FA" },
    { icon: <FaRocket />, label: "Fast Thinker", color: "#A78BFA" },
    { icon: <FaLightbulb />, label: "Bright Mind", color: "#FBBF24" },
    { icon: <FaRocket />, label: "Speed Master" },
    { icon: <FaLightbulb />, label: "Puzzle Solver" },
    { icon: <FaBullseye />, label: "Sharp Shooter" },
];

// Points: First = 5, then +10 each subsequent
const getPointsForBadge = (index) => 5 + (index * 10);

const MarkModal = ({ modalVisible, updateVisibility, correct, score = 0 }) => {
    if (!modalVisible) return null;

    // Determine earned badges
    const earned = [];
    badgeData.forEach((badge, idx) => {
        const badgePoints = getPointsForBadge(idx);
        if (score >= badgePoints) {
            earned.push({ ...badge, points: badgePoints });
        }
    });

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalView}>
                <div className={styles.iconWrapper}>
                    {correct ? (
                        <FaCheckCircle className={styles.successIcon} />
                    ) : (
                        <FaTimesCircle className={styles.failIcon} />
                    )}
                </div>

                <h2 className={styles.message}>
                    {correct ? "Very Good!" : "Failed"}
                </h2>

                {correct && (
                    <div className={styles.badgeContainer}>
                        <p className={styles.badgeHeading}>Badges Earned</p>
                        <div className={styles.badges}>
                            {earned.length > 0 ? (
                                earned.map((badge, idx) => (
                                    <div key={idx} className={styles.badgeCard}>
                                        <span
                                            className={styles.icon}
                                            style={{ color: badge.color || "#10b981" }}
                                        >
                                            {badge.icon}
                                        </span>
                                        <span className={styles.label}>{badge.label}</span>
                                        <span className={styles.points}>
                                            {badge.points} pts
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p>No new badges earned this time.</p>
                            )}
                        </div>
                    </div>
                )}

                {!correct && (
                    <div className={styles.badgeContainer}>
                        <p className={styles.badgeHeading}>
                            You didn’t unlock any new badges this time.
                        </p>
                    </div>
                )}

                <div className={styles.modalButtonContainer}>
                    <button className={styles.acceptBtn} onClick={updateVisibility}>
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarkModal;
