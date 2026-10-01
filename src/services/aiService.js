const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Analyze ticket content using Gemini AI
 * @param {string} title - Ticket title
 * @param {string} description - Ticket description
 * @returns {Object} AI Analysis results (category, priority, sentiment, suggestedResponse)
 */
const analyzeTicket = async (title, description) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Analyze the following IT support ticket and provide the output strictly as a JSON object.
      Do not include Markdown formatting, code blocks, or any other text.

      Ticket Title: ${title}
      Ticket Description: ${description}

      JSON Structure Required:
      {
        "category": "String (e.g., Hardware, Software, Network, Billing, General)",
        "priority": "String (low, medium, high)",
        "sentiment": "String (positive, neutral, negative)",
        "suggestedResponse": "String (A brief, professional response to the customer)"
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean the response to ensure valid JSON parsing
    const cleanedResponse = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error('AI Service Error:', error.message);
    // Fallback values in case of API failure
    return {
      category: 'General',
      priority: 'medium',
      sentiment: 'neutral',
      suggestedResponse: 'Thank you for reaching out. Our support team is reviewing your ticket.',
    };
  }
};

module.exports = { analyzeTicket };