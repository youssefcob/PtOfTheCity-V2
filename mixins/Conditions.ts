type ConditionsInfoDetail = {
    title: string;
    availableTreatment: string[];
    illness: { head: string, content: string }[];
    symptoms: { head: string, content: string }[];
}

type ConditionsInfo = {
    back: ConditionsInfoDetail;
    shoulder: ConditionsInfoDetail;
    neck: ConditionsInfoDetail;
    knees: ConditionsInfoDetail;
    abdomen: ConditionsInfoDetail;
    lowerBack: ConditionsInfoDetail;
    hands: ConditionsInfoDetail;
    elbows: ConditionsInfoDetail;
    feet: ConditionsInfoDetail;
}

const conditionsInfo: ConditionsInfo = {
    back: {
        title: 'Back',
        availableTreatment: [
            'Pain Management',
            'Manual Therapy',
            'Stretching and Flexibility Exercises',
            'Strengthening Exercises',
            'Posture Training',
            'Body Mechanics Education',
            'Activity Modification',
            'Functional Training',
            'Modalities',
            'Home Exercise Program',
            'Education'
        ],
        illness: [
            {
                head: 'Disc Bulge/Herniation/Deterioration',
                content: 'A herniated disk can compress the spinal cord and nerves, causing severe pain and mobility issues.'
            },
            {
                head: 'Sciatica',
                content: 'Sciatica is caused by compression of a lower back spinal nerve root, often caused by disc degeneration, which leads to back, hip, and outer thigh pain.'
            },
            {
                head: 'Osteoarthritis',
                content: 'A progressive degenerative disease often causes chronic pain, joint stiffness, and difficulty with everyday tasks.'
            },
            {
                head: 'Spinal Stenosis',
                content: 'Spinal stenosis can strain on the spinal cord and nerves, occurring in any part of the spine.'
            },
            {
                head: 'Spondylitis/Spondylolisthesis',
                content: 'Spondylitis Occurs when one vertebra slips relative to the adjacent one, causing discomfort'
            },
            {
                head: 'Sacroiliac Joint Dysfunction',
                content: 'Occurs between the two pelvic bones that join to the sacrum on both sides of the spine.'
            }
        ],
        symptoms: [
            {
                head: 'Pain',
                content: 'In Back diseases you might experience pain that radiates to different parts including neck, middle back, and lower back.'
            },
            {
                head: 'Stiffness',
                content: 'Difficulty in back movement and standing up from a seated position may be experienced in back problems.'
            },
            {
                head: 'Muscle Tension',
                content: 'Back problems cause muscle tension that occurs as muscle knots with trigger points that causes aggravated pain.'
            },
            {
                head: 'Limited Range of Motion',
                content: 'The inability to move your body parts within its normal range of motion'
            },
            {
                head: 'Radiating Pain',
                content: 'Back pain is linked to other body parts, as the back problems will cause pain to radiate to other body parts that are linked to the back'
            },
            {
                head: 'Numbness or Tingling',
                content: 'Back problems cause numbness in your feet and legs'
            },
            {
                head: 'Weakness',
                content: 'Refers to the loss of back muscle strength.'
            }
        ]
    },
    shoulder: {
        title: 'Shoulders',
        availableTreatment: [
            'Taping',
            'Pain Management',
            'Shockwave',
            'Neuromuscular re-education',
            'Manual Therapy',
            'Stretching and Flexibility Exercises',
            'Strengthening Exercises',
            'Posture Training',
            'Body Mechanics Education',
            'Activity Modification',
            'Functional Training',
            'Modalities',
            'Home Exercise Program'
        ],
        illness: [
            {
                head: 'Rotator Cuff Tear',
                content: 'Impacts shoulder stability, lifting, and rotation.'
            },
            {
                head: 'Frozen Shoulder (Adhesive Capsulitis)',
                content: 'Characterized by shoulder stiffness and pain'
            },
            {
                head: 'Shoulder Impingement',
                content: 'Caused by the grinding of the top outside edge of the shoulder blade against the rotator cuff below.'
            },
            {
                head: 'Shoulder Bursitis',
                content: 'Shoulder inflammation causes swelling and redness between the arm bone and shoulder tip.'
            },
            {
                head: 'Shoulder Tendonitis',
                content: 'Occurs as a result of sports injuries that require the arms to move above the head repeatedly'
            },
            {
                head: 'Labral Tears',
                content: 'A tear in the tissue that connects the ball and socket portions of the hip.'
            },
            {
                head: 'AC Joint Injuries (Shoulder Separation)',
                content: 'Occurs when trauma damages the ligaments around the collarbone and shoulder joint.'
            },
            {
                head: 'Post-Surgical Rehabilitation',
                content: 'Aims to restore muscle strength, joint function, and mobility, while preventing complications.'
            },
            {
                head: 'Instability',
                content: 'Happens when the shoulder joint ligaments are strained, torn, or separated, causing the ball of the joint to partially or fully move out of the socket.'
            }
        ],
        symptoms: [
            {
                head: 'Shoulder pain',
                content: 'Any level of discomfort in or around the area of the shoulder joint.'
            },
            {
                head: 'Stiffness',
                content: 'Shoulder pain that makes it difficult or impossible to move it'
            },
            {
                head: 'Weakness',
                content: 'Loss of strength of shoulder motion due to inability to create an adequate force.'
            },
            {
                head: 'Instability',
                content: 'Shoulder joint bones aren\'t held tightly together.'
            },
            {
                head: 'Clicking or popping',
                content: 'A sharp pain that comes along with a cracking, grinding, or popping shoulder.'
            },
            {
                head: 'Numbness or tingling',
                content: 'You might not be able to control your shoulders.'
            },
            {
                head: 'Swelling or inflammation',
                content: 'swelling and redness may spread away from the affected site and go up or down the arm.'
            },
            {
                head: 'Difficulty with overhead movements',
                content: 'Sudden pain with lifting and reaching movements'
            },
            {
                head: 'Radiating pain',
                content: 'Pain moves from the shoulder joints to the entire area around'
            },
            {
                head: 'Muscle spasms',
                content: 'Involuntary muscle contraction in the muscles of the middle or upper back or chest.'
            }
        ]
    },
    neck: {
        title: 'Neck',
        availableTreatment: [
            'Pain Management',
            'Cervical Traction',
            'Neuromuscular re-education',
            'Manual Therapy',
            'Stretching and Flexibility Exercises',
            'Strengthening Exercises',
            'Posture Training',
            'Body Mechanics Education',
            'Activity Modification',
            'Functional Training',
            'Modalities',
            'Home Exercise Program',
            'Education'
        ],
        illness: [
            {
                head: 'Cervical Strain or Sprain',
                content: 'The result of a stretch injury to the cervical spine\'s muscular and ligamentous parts.'
            },
            {
                head: 'Cervical Radiculopathy',
                content: 'Occurs due to irritation of the cervical nerve roots.'
            },
            {
                head: 'Cervical Osteoarthritis (Cervical Spondylosis)',
                content: 'Caused by natural wear and tear on the bones, discs, and joints.'
            },
            {
                head: 'Tension Headaches',
                content: 'Occur when the muscles in the neck and scalp strain or contract.'
            },
            {
                head: 'Cervical Herniated Disc (Cervical Disc Herniation)',
                content: 'Occurs When the inner component of a disc in the neck ruptures through the outer wall of the disc.'
            },
            {
                head: 'Forward Head Posture (Tech Neck)',
                content: 'Refers to the position where your head and ears are in front of your body\'s vertical midline.'
            },
            {
                head: 'Cervical Muscle Weakness or Imbalances',
                content: 'A postural dysfunction puts the neck out of the normal balanced alignment.'
            },
            {
                head: 'Post-Neck Surgery Rehabilitation',
                content: 'Aims to restore muscle strength, joint function, and mobility, while preventing complications.'
            },
            {
                head: 'Myofascial Pain Syndrome (Trigger Points)',
                content: 'Pressure on sensitive spots in your neck muscles (trigger points) creates discomfort in the muscles.'
            },
            {
                head: 'Cervicogenic Headaches',
                content: 'Recurring headaches often occur after neck movement.'
            }
        ],
        symptoms: [
            {
                head: 'Neck Pain',
                content: 'Discomfort in any of the structures in the neck.'
            },
            {
                head: 'Stiff Neck',
                content: 'When it\'s hard to use or move the neck.'
            },
            {
                head: 'Neck Tenderness',
                content: 'Painful knots might be developed that are sensitive to touch.'
            },
            {
                head: 'Limited Range of Motion',
                content: 'The inability to move the neck/head within its normal range of motion.'
            },
            {
                head: 'Neck Muscle Spasms',
                content: 'The sudden tightness and pain in your neck muscles'
            },
            {
                head: 'Radiating Pain',
                content: 'Pain moves from the neck to the entire area around'
            },
            {
                head: 'Headaches',
                content: 'The continuous head pain'
            },
            {
                head: 'Numbness or Tingling',
                content: 'A dull pain felt on the side or back of the neck.'
            },
            {
                head: 'Swelling or Lump',
                content: 'Swollen nodes that are painful to touch.'
            },
            {
                head: 'Weakness',
                content: 'When full effort does not lead to a typical muscular contraction or movement.'
            },
            {
                head: 'Dizziness or Imbalance',
                content: 'The sense that you or your surroundings are spinning or moving.'
            },
            {
                head: 'Difficulty Turning the Head',
                content: 'A condition that makes it hard or painful to turn your head.'
            }
        ]
    },
    knees: {
        title: 'Knees',
        availableTreatment: [
            'Pain Management',
            'Restoration of Range of Motion (ROM)',
            'Strengthening Exercise',
            'Balance and Proprioception Training',
            'Functional Training',
            'Gait Training',
            'Bracing or Taping',
            'Education and Home Exercise Program',
            'Modalities',
            'Manual Therapy'
        ],
        illness: [
            {
                head: 'Anterior Cruciate Ligament (ACL) Injury',
                content: 'The tear of one of the ligaments inside the knee.'
            },
            {
                head: 'Meniscus Tears',
                content: 'Caused by sudden knee twisting movements.'
            },
            {
                head: 'Patellofemoral Pain Syndrome (PFPS)',
                content: 'Pain at the front of the knee, around the kneecap.'
            },
            {
                head: 'Knee Osteoarthritis',
                content: 'Caused by joint surface wear and tear.'
            },
            {
                head: 'Iliotibial (IT) Band Syndrome',
                content: 'The inflammation of the connective tissue running from the hip to the knee joint.'
            },
            {
                head: 'Patellar Tendonitis (Jumper\'s Knee)',
                content: 'Caused by overuse of the knee joint, such as frequent jumping on hard surfaces.'
            },
            {
                head: 'Post-Surgical Rehabilitation',
                content: 'Aims to restore muscle strength, knee joint function, and mobility, while preventing complications'
            },
            {
                head: 'Knee Bursitis',
                content: 'Inflammation of a tiny fluid-filled sac (bursa) around the joint of the knees.'
            }
        ],
        symptoms: [
            {
                head: 'Pain',
                content: 'Discomfort in any of the structures in the knee joint.'
            },
            {
                head: 'Swelling',
                content: 'Swollen knees are a sign of inflammation.'
            },
            {
                head: 'Bruising',
                content: 'A result of a direct impact to the knee.'
            },
            {
                head: 'Limited Range of Motion',
                content: 'The inability to move the knees within its normal range of motion.'
            },
            {
                head: 'Instability',
                content: 'Knee joint bones aren\'t held tightly together.'
            },
            {
                head: 'Weakness',
                content: 'Loss of strength of knee motion due to inability to create an adequate force.'
            },
            {
                head: 'Stiffness',
                content: 'Knee pain that makes it difficult or impossible to move it'
            },
            {
                head: 'Tenderness to Touch',
                content: 'Occur due to injuries/inflammation and causes pain when the knees are touched.'
            },
            {
                head: 'Crepitus',
                content: 'Sounds of knee popping or knee cracking when you bend your knee.'
            },
            {
                head: 'Difficulty Walking',
                content: 'Results from knee severe pain or stiffness'
            },
            {
                head: 'Numbness and Tingling',
                content: 'You find it hard to control the knee joint and a dull pain might occur.'
            },
            {
                head: 'Heat or Warmth',
                content: 'Usually a sign of inflammation.'
            },
            {
                head: 'Pain with Weight Bearing',
                content: 'Severe knee pain with weight-bearing activities.'
            }
        ]
    },
    abdomen: {
        title: 'Abdomen',
        availableTreatment: [
            'Manual Therapy',
            'Pelvic Floor Muscle Training',
            'Breathing and Relaxation Techniques',
            'Functional Training',
            'Bladder and Bowel Management',
            'Pain Management',
            'Posture and Body Mechanics',
            'Home Exercise Program'
        ],
        illness: [
            {
                head: 'Pelvic Pain Syndromes',
                content: 'Severe pain located in the pelvic area might limit functioning.'
            },
            {
                head: 'Pelvic Organ Prolapse',
                content: 'Occurs when the muscles and tissues supporting the pelvic organs become weak and loose.'
            },
            {
                head: 'Urinary Incontinence',
                content: 'Signifies that a person accidentally releases urine.'
            },
            {
                head: 'Fecal Incontinence',
                content: 'Unable to control bowel movements can lead to stool leaks from the rectum without warning.'
            },
            {
                head: 'Dyspareunia',
                content: 'Dyspareunia refers to painful sexual intercourse, which can occur in both women and men.'
            },
            {
                head: 'Postpartum Rehabilitation',
                content: 'After childbirth, women may experience various pelvic floor issues, including weakened muscles, incontinence, or pain.'
            },
            {
                head: 'Pelvic Floor Muscle Dysfunction',
                content: 'The inability to relax and coordinate your pelvic floor muscles to have a bowel movement.'
            },
            {
                head: 'Interstitial Cystitis/Bladder Pain Syndrome',
                content: 'Involves mild to severe bladder pain and an urgent or frequent need to urinate.'
            }
        ],
        symptoms: [
            {
                head: 'Pelvic Pain',
                content: 'Pain in the lower abdomen and pelvic region'
            },
            {
                head: 'Pain During Intercourse (Dyspareunia)',
                content: 'Refers to painful sexual intercourse in both genders.'
            },
            {
                head: 'Pelvic Pressure or Heaviness',
                content: 'Pelvic floor diseases causes Increase in the abdominal pressure from above and moving down (pelvic/abdominal organs, diaphragm, core)'
            },
            {
                head: 'Urinary Symptoms',
                content: 'Urinary Incontinence: Involuntary leakage of urine, especially during activities like coughing, sneezing, laughing, or exercising. Increased Urinary Frequency. Urgency: A sudden and strong urge to urinate, sometimes resulting in leakage. Difficulty Initiating Urination.'
            },
            {
                head: 'Bowel Symptoms',
                content: 'Fecal Incontinence, Constipation, Incomplete Emptying'
            },
            {
                head: 'Pelvic Muscle Tension or Spasms',
                content: 'Involuntary contractions of the pelvic floor muscles.'
            },
            {
                head: 'Pelvic Organ Prolapse',
                content: 'Occurs when the muscles and tissues supporting the pelvic organs become weak and loose.'
            },
            {
                head: 'Lower Back Pain',
                content: 'Pain between the lower edge of the ribs and the buttock.'
            },
            {
                head: 'Recurrent Urinary Tract Infections (UTIs)',
                content: 'Three or more (UTIs) episodes within 12 months.'
            },
            {
                head: 'Painful Bowel Movements',
                content: 'Defecation pain accompanied by a scorching or pricking sensation'
            },
            {
                head: 'Difficulty Starting or Stopping Urine Flow',
                content: 'A condition where it\'s difficult to start urinating or keep it flowing.'
            },
            {
                head: 'Pelvic Floor Muscle Weakness',
                content: 'The inability to relax and coordinate your pelvic floor muscles to have a bowel movement.'
            },
            {
                head: 'Groin Pain',
                content: 'Refers to discomfort in the area where the abdomen ends and the legs begin.'
            },
            {
                head: 'Pain or Discomfort While Sitting',
                content: 'Dull or aching pain that occurs when attempting to sit.'
            },
            {
                head: 'Tailbone Pain',
                content: 'Pain in the bone at the base of the spine (coccyx), near the top of the buttock.'
            }
        ]
    },
    lowerBack: {
        title: 'Lower Back',
        availableTreatment: [
            'Pain Management',
            'Manual Therapy',
            'Stretching and Flexibility Exercises',
            'Strengthening Exercises',
            'Posture Training',
            'Body Mechanics Education',
            'Activity Modification',
            'Functional Training',
            'Modalities',
            'Home Exercise Program',
            'Education'
        ],
        illness: [
            {
                head: 'Disc Bulge/Herniation/Deterioration',
                content: 'A herniated disk can compress the spinal cord and nerves, causing severe pain and mobility issues.'
            },
            {
                head: 'Sciatica',
                content: 'Sciatica is caused by compression of a lower back spinal nerve root, often caused by disc degeneration, which leads to back, hip, and outer thigh pain.'
            },
            {
                head: 'Osteoarthritis',
                content: 'A progressive degenerative disease often causes chronic pain, joint stiffness, and difficulty with everyday tasks.'
            },
            {
                head: 'Spinal Stenosis',
                content: 'Spinal stenosis can strain on the spinal cord and nerves, occurring in any part of the spine.'
            },
            {
                head: 'Spondylitis/Spondylolisthesis',
                content: 'Spondylitis Occurs when one vertebra slips relative to the adjacent one, causing discomfort'
            },
            {
                head: 'Sacroiliac Joint Dysfunction',
                content: 'Occurs between the two pelvic bones that join to the sacrum on both sides of the spine.'
            }
        ],
        symptoms: [
            {
                head: 'Pain',
                content: 'In Back diseases you might experience pain that radiates to different parts including neck, middle back, and lower back.'
            },
            {
                head: 'Stiffness',
                content: 'Difficulty in back movement and standing up from a seated position may be experienced in back problems.'
            },
            {
                head: 'Muscle Tension',
                content: 'Back problems cause muscle tension that occurs as muscle knots with trigger points that causes aggravated pain.'
            },
            {
                head: 'Limited Range of Motion',
                content: 'The inability to move your body parts within its normal range of motion'
            },
            {
                head: 'Radiating Pain',
                content: 'Back pain is linked to other body parts, as the back problems will cause pain to radiate to other body parts that are linked to the back'
            },
            {
                head: 'Numbness or Tingling',
                content: 'Back problems cause numbness in your feet and legs'
            },
            {
                head: 'Weakness',
                content: 'Refers to the loss of back muscle strength.'
            }
        ]
    },
    hands: {
        title: 'Hands',
        availableTreatment: [
            'Paraffin wax',
            'Manual Therapy',
            'Customized Exercise Programs',
            'Splinting and Orthotics',
            'Functional Training',
            'Scar Management',
            'Pain Management Techniques'
        ],
        illness: [
            {
                head: 'Carpal Tunnel Syndrome',
                content: 'Occurs when the median nerve is compressed as it passes through the wrist.'
            },
            {
                head: 'De Quervain\'s Tenosynovitis',
                content: 'A painful ailment affecting the wrist tendons on the thumb side.'
            },
            {
                head: 'Trigger Finger',
                content: 'Happens when the tendons surrounding your finger expand or thicken.'
            },
            {
                head: 'Dupuytren\'s Contracture',
                content: 'Causing fingers to bend towards the hand\'s palm, making them unable to fully straighten.'
            },
            {
                head: 'Hand Fractures',
                content: 'A fracture in one of the hand\'s bones.'
            },
            {
                head: 'Arthritis of the Hand',
                content: 'Inflammation that causes joint pain and stiffness'
            },
            {
                head: 'Ganglion Cysts',
                content: 'A fluid-filled bump is often found above joints or tendons in the hand or wrist.'
            },
            {
                head: 'Raynaud\'s Disease',
                content: 'Causes numbness and coldness in the fingers triggered by cold weather or stress.'
            },
            {
                head: 'Hand Tendon Injuries',
                content: 'Soft tissue injuries that link muscles and joints'
            }
        ],
        symptoms: [
            {
                head: 'Pain',
                content: 'It might stop you from doing normal activities.'
            },
            {
                head: 'Swelling',
                content: 'Hand and wrist swellings or lumps can occur.'
            },
            {
                head: 'Stiffness',
                content: 'Stiff hands or fingers can cause pain and limited movement.'
            },
            {
                head: 'Numbness and Tingling',
                content: 'You might not be able to control your hand or wrist.'
            },
            {
                head: 'Weakness',
                content: 'A weak grip or hand can hinder regular chores.'
            },
            {
                head: 'Redness and Warmth',
                content: 'A splotchy red color might appear on the hands and fingers in addition to a warm sensation.'
            },
            {
                head: 'Changes in Skin Color',
                content: 'Finger and hand discoloration can be caused by cold weather or stress.'
            },
            {
                head: 'Joint Deformities',
                content: 'Happens when a joint becomes bent out of shape.'
            },
            {
                head: 'Limited Range of Motion',
                content: 'The inability to move your hands/wrist within its normal range of motion'
            }
        ]
    },
    elbows: {
        title: 'Elbows',
        availableTreatment: [
            'Ultrasound',
            'Shockwave',
            'Manual Therapy',
            'Stretching and Flexibility Exercises',
            'Strengthening Exercises',
            'Body Mechanics Education',
            'Activity Modification',
            'Functional Training',
            'Home Exercise Program'
        ],
        illness: [
            {
                head: 'Tennis Elbow (Lateral joint pain)',
                content: 'Wrist tendon swelling or rupture causing backward bending.'
            },
            {
                head: 'Golfer\'s Elbow (Medial joint pain)',
                content: 'Elbow pain occurs at bony bump where forearm muscles attach.'
            },
            {
                head: 'Olecranon Bursitis',
                content: 'Throbbing ache around your elbow joint'
            },
            {
                head: 'Elbow Fractures and Dislocations',
                content: 'Could be complete or partial, and typically occurs following a trauma, such as a fall or accident.'
            },
            {
                head: 'Osteoarthritis of the Elbow',
                content: 'Occurs when the elbow\'s cartilage surface is worn out or injured.'
            },
            {
                head: 'Ligament Sprains',
                content: 'Injuries to the ligaments surrounding the elbow joint'
            },
            {
                head: 'Tendonitis or Tendinosis',
                content: 'An inflammation of the connective tissue that connects the forearm muscles to the elbow'
            }
        ],
        symptoms: [
            {
                head: 'Elbow effusion',
                content: 'A swollen elbow occurs due to too much fluid accumulated around it.'
            },
            {
                head: 'Pain',
                content: 'Elbow pain varies in intensity and can be triggered by movement.'
            },
            {
                head: 'Muscle Tension',
                content: 'Elbow pain might be represented as muscle tension in the form of muscle knots, or trigger points.'
            },
            {
                head: 'Limited Range of Motion',
                content: 'The inability to move your elbow, arm and hand within its normal range of motion.'
            },
            {
                head: 'Radiating Pain',
                content: 'The pain could travel from the elbow to the upper arm or the lower arm'
            },
            {
                head: 'Numbness or Tingling',
                content: 'Elbow Injuries cause numbness and tingling in the arm and hand.'
            }
        ]
    },
    feet: {
        title: 'Feet',
        availableTreatment: [
            'Pain Management',
            'Restoration of Range of Motion (ROM)',
            'Strengthening Exercise',
            'Balance and Proprioception Training',
            'Functional Training',
            'Gait Training',
            'Bracing or Taping',
            'Education and Home Exercise Program',
            'Modalities',
            'Manual Therapy'
        ],
        illness: [
            {
                head: 'Ankle Sprains',
                content: 'The tearing of the ankle ligaments.'
            },
            {
                head: 'Achilles Tendonitis',
                content: 'Causes pain along the back of the leg near the heel.'
            },
            {
                head: 'Plantar Fasciitis',
                content: 'The inflammation of the ligament that connects the heel to the toes.'
            },
            {
                head: 'Achilles Tendon Rupture',
                content: 'An injury that affects the back of the lower leg.'
            },
            {
                head: 'Chronic Ankle Instability',
                content: 'A condition where the lateral side of the ankle cannot support weight and continues to roll to that side.'
            },
            {
                head: 'Tarsal Tunnel Syndrome',
                content: 'A condition in which the tibial nerve is being compressed, causing foot and ankle pain.'
            },
            {
                head: 'Ankle Fractures',
                content: 'One or more of the bones that make up the ankle joint are broken.'
            },
            {
                head: 'Osteoarthritis of the Ankle',
                content: 'The loss of the cartilage layer in the ankle, causes the bones to rub against each other.'
            }
        ],
        symptoms: [
            {
                head: 'Pain',
                content: 'Discomfort in any of the structures in the foot/ankle'
            },
            {
                head: 'Swelling',
                content: 'Swelling can occur in the ankle region as a result of the diseases that hit that body part.'
            },
            {
                head: 'Bruising',
                content: 'Usually occurs with ligament tissue tears and serious sprains.'
            },
            {
                head: 'Limited Range of Motion',
                content: 'The inability to move the foot/ankle within its normal range of motion.'
            },
            {
                head: 'Instability',
                content: 'Ankle joint bones aren\'t held tightly together.'
            },
            {
                head: 'Weakness',
                content: 'Loss of strength of foot/ankle motion due to inability to create an adequate force.'
            },
            {
                head: 'Stiffness',
                content: 'Foot/ankle pain that makes it difficult or impossible to move it'
            },
            {
                head: 'Tenderness to Touch',
                content: 'Occur due to injuries/inflammation and causes pain when the ankles are touched'
            },
            {
                head: 'Crepitus',
                content: 'A snapping sound in the ankle while moving/rotating the ankle.'
            },
            {
                head: 'Difficulty Walking',
                content: 'Results from foot/ankle severe pain or stiffness.'
            },
            {
                head: 'Numbness and Tingling',
                content: 'You find it hard to control the ankle joint and a dull pain might occur.'
            },
            {
                head: 'Heat or Warmth',
                content: 'Usually a sign of inflammation.'
            },
            {
                head: 'Pain with Weight Bearing',
                content: 'Severe ankle pain with weight-bearing activities.'
            }
        ]
    }
}
export { conditionsInfo, type ConditionsInfoDetail };