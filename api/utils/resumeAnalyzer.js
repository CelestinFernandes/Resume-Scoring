// // api/utils/resumeAnalyzer.js

// import dotenv from 'dotenv';
// import Groq from 'groq-sdk';
// import mongoose from 'mongoose';
// import Resume from "../models/Resume.js"
// dotenv.config();

// export async function analyzeResume(resumeText, jobDescription) {
//   try {
//     console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);

//     if (!process.env.GROQ_API_KEY) {
//       throw new Error('GROQ_API_KEY is not configured in environment variables');
//     }

//     const groq = new Groq({
//       apiKey: process.env.GROQ_API_KEY
//     });

//     const prompt = `
//       Act as an experienced ATS (Application Tracking System) with expertise in tech field analysis.
//       Evaluate the following resume against the job description.

//       Resume Text:
//       ${resumeText}

//       Job Description:
//       ${jobDescription}

//       Provide analysis in the following JSON structure:
//       {
//         "matchPercentage": "XX",
//         "missingKeywords": ["keyword1", "keyword2"],
//         "profileSummary": "detailed summary",
//         "keyStrengths": ["strength1", "strength2"],
//         "suggestedImprovements": ["improvement1", "improvement2"],
//         "scoringDetails": {
//           "relevanceScore": 75,
//           "sectionsScore": 80,
//           "formattingScore": 70,
//           "summary": {
//             "strengths": ["Strong technical skills", "Clear work experience"],
//             "weaknesses": ["Missing educational background", "Lack of leadership skills"]
//           },
//           "criteriaExplanation": {
//             "relevanceToJob": "The resume contains most of the important keywords from the job description, but some specific technical skills are missing.",
//             "keySections": "The resume includes summary, skills, and experience sections but lacks a formal education section.",
//             "formatting": "The resume formatting is clean and easy to read but lacks a consistent use of bullet points and headers for better organization."
//           }
//         }
//       }
//     `;

//     const completion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       model: "mixtral-8x7b-32768",
//       temperature: 0.7,
//       max_tokens: 1500,
//       top_p: 0.9,
//     });

//     // console.log("Raw Groq API response:", completion.choices[0]?.message?.content);
    
//     const responseContent = completion.choices[0]?.message?.content;
//     if (!responseContent) {
//       throw new Error('No response received from Groq API');
//     }
    
//     const jsonStartIndex = responseContent.indexOf('{');
//     if (jsonStartIndex === -1) {
//       throw new Error('No JSON content found in the response');
//     }
    
//     const jsonResponse = responseContent.slice(jsonStartIndex);
    
//     let analysis;
//     try {
//       const jsonString = jsonResponse.match(/{.*}/s)[0];
//       const nonJsonData = jsonResponse.replace(jsonString, '').trim();

//       let jsonObject;
//       try {
//         jsonObject = JSON.parse(jsonString);
//       } catch (error) {
//         console.error('Invalid JSON:', error);
//       }

//       jsonObject.randomPara = nonJsonData;
//       let finalData = JSON.stringify(jsonObject, null, 2);
//       analysis = JSON.parse(finalData);

//     } catch (parseError) {
//       console.error("Error parsing response from Groq API:", parseError.message);
//       throw new Error('Received non-JSON response from Groq API');
//     }

//     return analysis;

//   } catch (error) {
//     console.error('Resume analysis error:', error);
//     throw new Error(`Error analyzing resume: ${error.message}`);
//   }
// }


// utils/resumeAnalyzer.js
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import Resume from "../models/resume.js";
dotenv.config();

export async function analyzeResume(resumeText, jobDescription) {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured in environment variables');
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const prompt = `
      Analyze the following resume against the job description and provide a structured score and analysis.
      
      Resume Text:
      ${resumeText}

      Job Description:
      ${jobDescription}

      Return ONLY a JSON object in exactly this format with no additional text:
      {
        "score": xx,
        "scoringDetails": {
          "relevanceScore": xx,
          "sectionsScore": xx,
          "formattingScore": xx,
          "summary": {
            "strengths": ["strength 1"......."strength n"],
            "weaknesses": ["weakness 1"......."weakness n"],
          },
          "criteriaExplanation": {
            "relevanceToJob": "Explanation of relevance",
            "keySections": "Explanation of sections",
            "formatting": "Explanation of formatting"
          }
        }
      }`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
      temperature: 0.5,
      max_tokens: 1500,
      top_p: 0.9,
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error('No response received from Groq API');
    }

    console.log('Raw API response:', responseContent);

    // Extract JSON from response and parse it
    let analysis;
    try {
      // Find the JSON object in the response
      const jsonMatch = responseContent.match(/{[\s\S]*}/);
      if (!jsonMatch) {
        throw new Error('No JSON content found in the response');
      }
      analysis = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      throw new Error('Failed to parse API response');
    }

    console.log('Parsed analysis:', analysis);

    // Validate required fields and handle missing ones
    const { score, scoringDetails } = analysis;

    // Default values for missing fields
    const transformedData = {
      filename: resumeText.substring(0, 25),
      text: resumeText,
      JD: jobDescription,
      Score: score !== undefined ? Number(score) : 0, // Default to 0 if missing
      scoringDetails: {
        relevanceScore: scoringDetails?.relevanceScore !== undefined ? Number(scoringDetails.relevanceScore) : 0,
        sectionsScore: scoringDetails?.sectionsScore !== undefined ? Number(scoringDetails.sectionsScore) : 0,
        formattingScore: scoringDetails?.formattingScore !== undefined ? Number(scoringDetails.formattingScore) : 0,
        summary: {
          strengths: scoringDetails?.summary?.strengths || [],
          weaknesses: scoringDetails?.summary?.weaknesses || []
        },
        criteriaExplanation: {
          relevanceToJob: scoringDetails?.criteriaExplanation?.relevanceToJob || '',
          keySections: scoringDetails?.criteriaExplanation?.keySections || '',
          formatting: scoringDetails?.criteriaExplanation?.formatting || ''
        }
      }
    };

    console.log('Transformed data:', transformedData);

    // Validate the transformed data
    if (!transformedData.Score || 
        !transformedData.scoringDetails.relevanceScore || 
        !transformedData.scoringDetails.sectionsScore || 
        !transformedData.scoringDetails.formattingScore) {
      throw new Error('Missing required scores in transformed data');
    }

    // Create and save the resume document
    const resume = new Resume(transformedData);
    const savedResume = await resume.save();
    console.log('Saved resume:', savedResume);

    return transformedData;

  } catch (error) {
    console.error('Resume analysis error:', error);
    throw new Error(`Error analyzing resume: ${error.message}`);
  }
}
