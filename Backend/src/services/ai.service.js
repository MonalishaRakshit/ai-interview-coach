const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { schema } = require("../models/interviewReport.model");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

/*
async function invokeGeminiAi() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
     contents: "Hellow Gemini ! Explain what is Interview ?",
  });

  console.log(response.text);
}

module.exports = invokeGeminiAi;

*/

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe ",
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job role",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, React revision, behavioral preparation etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview",
    ),

  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

/* to generate interview report */
async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `Generate an interview report ONLY in this exact JSON structure.

                      Do not add extra fields.
                      Do not change field names.
                      Return valid JSON only.

                      {
                        "matchScore": number,

                        "technicalQuestions": [
                          {
                            "question": string,
                            "intention": string,
                            "answer": string
                          }
                        ],

                        "behavioralQuestions": [
                          {
                            "question": string,
                            "intention": string,
                            "answer": string
                          }
                        ],

                        "skillGaps": [
                          {
                            "skill": string,
                            "severity": "low" | "medium" | "high"
                          }
                        ],

                        "preparationPlan": [
                          {
                            "day": number,
                            "focus": string,
                            "tasks": [string]
                          }
                        ],

                        "title": string
                      }

                      Resume: ${resume}
                      Self Description: ${selfDescription}
                      Job Description: ${jobDescription}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      //model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        //responseSchema: zodToJsonSchema(interviewReportSchema),
      },
    });

    //console.log(response.text)

    const data = JSON.parse(response.text);

    const validatedData = interviewReportSchema.parse(data);

    return validatedData;
  } catch (err) {
    console.log(err);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

/* for generate PDF from the  HTML data of thr resume*/
async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
}

/* to convert resume data into JSON object (HTML data)  format */
async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
      ),
  });

  const prompt = `Generate a resume  for a candidate with the following details: 
                      Resume: ${resume}
                      Self Description: ${selfDescription}
                      Job Description: ${jobDescription}

                      
                      the response should be JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                      The HTML should be clean, professional, and optimized for PDF generation. 
                      Use proper spacing, headings, section dividers, readable font sizes, and a well-structured layout to ensure excellent readability.
                      Avoid excessive whitespace, large empty sections, fixed heights, or elements that could cause page layout issues when converted to PDF.
                      The content should fit naturally within 1-2 A4 pages, with clear visual hierarchy and balanced spacing between sections.
                      Ensure all important information is visible, properly aligned, and presented in a way that looks polished, modern, and recruiter-friendly.


  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };
