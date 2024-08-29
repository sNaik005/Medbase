import os
import cv2
import json
import sys

def getData():

    if len(sys.argv) > 1:
        filePath = sys.argv[1]
    sample = cv2.imread(filePath, 1) # gui input
    best_score = counter = 0
    filename = image = kp1 = kp2 = mp = None
    for file in [file for file in os.listdir("fingerprints")]:  # path for mongo input
        # if counter % 10 == 0:
        #     print(file)
        counter += 1
        fingerprint_img = cv2.imread("fingerprints/" + file, 1)  # mongo input
        sift = cv2.SIFT_create()
        keypoints_1, des1 = sift.detectAndCompute(sample, None)
        keypoints_2, des2 = sift.detectAndCompute(fingerprint_img, None)

        flann = cv2.FlannBasedMatcher({"algorithm": 1, "trees": 10}, {})
        matches = flann.knnMatch(des1, des2, k=2)

        match_points = []
        for p, q in matches:
            if p.distance < 0.1 * q.distance:
                match_points.append(p)

            keypoints = 0
            if len(keypoints_1) <= len(keypoints_2):
                keypoints = len(keypoints_1)
            else:
                keypoints = len(keypoints_2)
            if len(match_points) / keypoints * 100 > best_score:
                best_score = len(match_points) / keypoints * 100
                filename = file
                image = fingerprint_img
                kp1, kp2, mp = keypoints_1, keypoints_2, match_points

    best_match = {
        "filename": filename,
        "best_score": best_score,
    }
    print("form python file")

   
    print(json.dumps(best_match))
   
    # return (best_match)
   


getData()

# Print the JSON result
