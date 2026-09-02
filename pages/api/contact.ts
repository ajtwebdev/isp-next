import type { NextApiRequest, NextApiResponse } from "next";

const SUBMIT_CONTACT_FORM_MUTATION = `
  mutation SubmitContactForm(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String
    $message: String!
  ) {
    submitContactForm(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        message: $message
      }
    ) {
      success
      message
      id
    }
  }
`;

interface ContactFormRequestBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string; 
}

interface ContactFormResponse {
  success: boolean;
  message?: string;
  id?: string;
}

interface SubmitContactFormResult {
  success: boolean;
  message: string;
  id: string;
}

interface WPGraphQLError {
  message: string;
  [key: string]: unknown;
}

interface WPGraphQLResponse {
  data?: {
    submitContactForm?: SubmitContactFormResult;
  };
  errors?: WPGraphQLError[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactFormResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { firstName, lastName, email, phone, message, website } =
    (req.body || {}) as ContactFormRequestBody;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  if (website) {
    return res.status(200).json({ success: true, message: "OK" });
  }

  if (!process.env.WORDPRESS_GRAPHQL_ENDPOINT) {
    console.error("WORDPRESS_GRAPHQL_ENDPOINT env variable is not set");
    return res.status(500).json({ success: false, message: "Server misconfigured. Please try again later." });
  }

  try {
    const wpResponse = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: SUBMIT_CONTACT_FORM_MUTATION,
        variables: { firstName, lastName, email, phone: phone || "", message },
      }),
    });

    let json: WPGraphQLResponse;
    try {
      json = (await wpResponse.json()) as WPGraphQLResponse;
    } catch (parseErr) {
      console.error(
        "WPGraphQL response was not valid JSON. Status:",
        wpResponse.status,
        "StatusText:",
        wpResponse.statusText
      );
      return res.status(502).json({ success: false, message: "Failed to submit form" });
    }

    if (json.errors) {
      console.error("WPGraphQL contact form errors:", json.errors);
      return res.status(502).json({
        success: false,
        message: json.errors[0]?.message || "Failed to submit form",
      });
    }

    const result = json?.data?.submitContactForm;

    if (result?.success) {
      return res.status(200).json({ success: true, message: result.message, id: result.id });
    }

    return res.status(400).json({
      success: false,
      message: result?.message || "Something went wrong. Please try again.",
    });
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    console.error("Contact form submission error:", errMessage, err);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}